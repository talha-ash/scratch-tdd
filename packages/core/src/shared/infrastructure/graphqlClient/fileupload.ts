import type { RequestInitExtended } from 'graphql-request';

const isExtractableFile = <ValueType>(value: ValueType) => {
    return (
        (typeof File !== 'undefined' && value instanceof File) ||
        (typeof Blob !== 'undefined' && value instanceof Blob)
    );
};

export const fileUploadMiddleware = (request: RequestInitExtended) => {
    const files = Object.entries(request.variables || {}).flatMap(
        ([variableKey, variableValue]) => {
            if (isExtractableFile(variableValue)) {
                return [
                    {
                        variableKey: [`variables.${variableKey}`],
                        file: variableValue,
                    },
                ];
            }

            if (
                Array.isArray(variableValue) &&
                variableValue.every((item) => isExtractableFile(item))
            ) {
                return variableValue.map((file, fileIndex) => {
                    return {
                        variableKey: [`variables.${variableKey}.${fileIndex}`],
                        file,
                    };
                });
            }

            return [];
        },
    );

    if (!files.length) {
        const { ...newHeaders } = request.headers as Record<string, string>;

        return {
            ...request,
            headers: newHeaders,
        };
    }

    const form = new FormData();
    form.append('operations', request.body as string);

    const map = files.reduce((accumulator, { variableKey }, index) => {
        return {
            ...accumulator,
            [index.toString()]: variableKey,
        };
    }, {});

    form.append('map', JSON.stringify(map));

    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        form.append(index.toString(), file.file);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { 'Content-Type': contentType, ...newHeaders } = request.headers as Record<
        string,
        string
    >;

    return {
        ...request,
        body: form,
        headers: newHeaders,
    };
};
