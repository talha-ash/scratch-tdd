import {
    ClientError,
    GraphQLClient,
    type RequestMiddleware,
    type ResponseMiddleware,
} from 'graphql-request';
import { err, ok, Result, ResultAsync } from 'neverthrow';
import type { User } from '~core/contexts/auth/domain';
import type { AxiosHttpClient } from '../apiClient';
import type {
    getTokenType,
    GqlErrorType,
    IGraphqlClient,
    IGraphqlRequestConfig,
    RefreshPromiseResolveType,
    setTokenAndUserType,
} from './types';

export class GqlClient implements IGraphqlClient {
    private graphqlInstance: GraphQLClient;
    private refreshingToken: boolean;
    private resolverQueue: Array<(value: RefreshPromiseResolveType) => void>;
    private calledTime: number;
    public refreshEndpoint: string;
    constructor(
        baseURL: string,
        refreshEndpoint: string,
        private getToken: getTokenType,
        private setTokenAndUser: setTokenAndUserType,
        private apiClient: AxiosHttpClient,
    ) {
        this.refreshingToken = false;

        this.refreshEndpoint = refreshEndpoint;
        this.resolverQueue = [];
        this.calledTime = 0;

        this.graphqlInstance = new GraphQLClient(baseURL, {
            requestMiddleware: this.requestMiddleware.call(this),
            responseMiddleware: this.responseMiddleware.call(this),
        });
    }
    request<T>(config: IGraphqlRequestConfig): ResultAsync<T, GqlErrorType> {
        const response = ResultAsync.fromPromise(
            this.graphqlInstance.request<T>(config.document, config.variables),
            (err) => {
                return this.handleError(err);
            },
        );

        return response.andThen((resp) => {
            return this.handleSuccessResponse(resp);
        });
    }

    private handleError(err: unknown): GqlErrorType {
        if (err instanceof ClientError) {
            return { type: 'auth', message: err.response.message as string };
        } else if (err instanceof TypeError) {
            if (err.cause instanceof AggregateError) {
                return { type: 'network', message: 'server not reached' };
            }
        }
        return { type: 'unknown', message: 'something went wrong' };
    }
    private handleSuccessResponse<T = never>(resp: T): Result<T, never> {
        return ok(resp);
    }

    private async waitForRefresh() {
        this.calledTime = this.calledTime + 1;
        const promise = new Promise<RefreshPromiseResolveType>((res) => {
            this.resolverQueue.push(res);
        });

        if (this.calledTime == 1) {
            this.performRefresh();
        }

        return promise;
    }

    private async performRefresh() {
        const result = await this.apiClient.get<{ data: { token: string; user: User } }, unknown>(
            this.refreshEndpoint,
        );
        if (result.isOk()) {
            const data = result.value.data;
            this.setTokenAndUser(data.data.token, data.data.user);
            this.resetTokenRefreshState();
            this.resolveQueueWithOk();
        } else {
            this.resetTokenRefreshState();
            this.resolveQueueWithError();
        }
    }

    private resetTokenRefreshState(): void {
        this.refreshingToken = false;
        this.calledTime = 0;
    }

    private resolveQueueWithOk(): void {
        this.resolverQueue.forEach((res, index) => res(ok({ index })));
        this.resolverQueue = [];
    }

    private resolveQueueWithError(): void {
        this.resolverQueue.forEach((res, index) => res(err({ index })));
        this.resolverQueue = [];
    }

    requestMiddleware(): RequestMiddleware {
        return async (request) => {
            const controller = new AbortController();
            // @ts-expect-error lib request header are not iterable we use this fix
            const oldHeaders = Object.fromEntries(request.headers?.entries());
            if (this.refreshingToken) {
                const result = await this.waitForRefresh();

                if (result.isOk()) {
                    return {
                        ...request,
                        headers: {
                            ...oldHeaders,
                            authorization: `Bearer ${this.getToken()}`,
                        },
                    };
                } else {
                    controller.abort();
                    return {
                        ...request,
                        signal: controller.signal,
                    };
                }
            }
            return {
                ...request,
                headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${this.getToken()}`,
                },
            };
        };
    }
    responseMiddleware(): ResponseMiddleware {
        return async (response) => {
            if (response instanceof ClientError) {
                const authError = response.message.includes('unauthenticated');
                console.log(response.request);

                if (authError) {
                    this.refreshingToken = true;
                    const result = await this.waitForRefresh();

                    if (result.isOk()) {
                        this.refreshingToken = false;

                        const result = await this.graphqlInstance.request(
                            response.request.query as string,
                            response.request.variables,
                        );
                        //Todo: Handle error
                        response.response = result as typeof response.response;
                    } else {
                        //so refresh token expire too
                        response.message = this.refreshEndpoint;
                        response.response = { status: 401, message: this.refreshEndpoint };
                    }
                }
            }
        };
    }
}

export function graphqlClientFactory({
    baseUrl,
    refreshEndpoint,
    getToken,
    setTokenAndUser,
    apiClient,
}: {
    baseUrl: string;
    refreshEndpoint: string;
    getToken: getTokenType;
    setTokenAndUser: setTokenAndUserType;
    apiClient: AxiosHttpClient;
}) {
    return new GqlClient(baseUrl, refreshEndpoint, getToken, setTokenAndUser, apiClient);
}
