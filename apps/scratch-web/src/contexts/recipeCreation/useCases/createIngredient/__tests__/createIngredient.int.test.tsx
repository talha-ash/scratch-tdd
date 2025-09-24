import * as createIngredientAction from '~cypress/support/actions/createIngredientAction.ts';
import { CreateIngredientForm } from '../components/createIngredientForm';
import { mountComponentWithRouter } from '~/shared/lib/test/mountComponentWithRouter';
import { AuthContext } from 'core';
import { parse } from 'graphql';

const { EMAIL_IS_INVALID, LOGIN_SUCCESSFULLY, PASSWORD_IS_INCORRECT, USER_NOT_FOUND } =
    AuthContext.AuthConstants;
beforeEach(async () => {
    mountComponentWithRouter(CreateIngredientForm);
});
describe('Create Ingredient ', () => {
    it('Create Ingredient successfully', () => {
        const requestName = 'createIngredient';
        const name = 'Potato';
        const description = 'Potato is great';
        const imageFile = 'ingredient.jpeg';

        createIngredientAction.interceptCreateIngredientRequestSuccess(requestName, {
            name,
            description,
            imageFile,
        });

        createIngredientAction.submitCreateIngredientForm(name, description, imageFile);

        cy.wait(`@${requestName}`).interceptFormData((interception) => {
            const variables = JSON.parse(interception.operations).variables;
            expect(interception['0']).to.equal(imageFile);
            expect(variables.name).to.equal(name);
            expect(variables.description).to.equal(description);
        });

        // Todo make reuse function
        cy.get('.toaster-container').contains("Create Ingredient Successfully");
    });
});
