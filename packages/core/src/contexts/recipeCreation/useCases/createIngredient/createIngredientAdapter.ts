import { gql } from 'graphql-request';
import { CoreShared } from '~core/main';
import type { Ingredient, IngredientSchemaType } from '../../domain/ingredient';
import type { ResultAsync } from 'neverthrow';
import type { GqlErrorType } from '~core/shared/infrastructure/graphqlClient/types';

export function createIngredient(
    payload: IngredientSchemaType,
): ResultAsync<Ingredient, GqlErrorType> {
    const mutation = gql`
        mutation AddIngredient($name: String!, $description: String!, $imageUrl: Upload!) {
            createIngredient(name: $name, description: $description, imageUrl: $imageUrl) {
                id
                name
                description
                imageUrl
            }
        }
    `;

    const imageUrl = payload.imageFile;

    return CoreShared.graphqlClient.request<Ingredient>({
        document: mutation,
        variables: { ...payload, imageUrl, imageFile: null },
    });
}
