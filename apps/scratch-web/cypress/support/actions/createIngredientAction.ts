import { interceptFormData } from 'cypress-intercept-formdata';

// Todo create module to help write test with less boilerplate for Graphql Request
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function interceptCreateIngredientRequestSuccess(name: string, body: any) {
    cy.intercept('POST', 'http://localhost:4000/api/v1/', (req) => {
        const formData = interceptFormData(req);
        const operationName = JSON.parse(formData.operations).operationName;

        if (operationName == 'AddIngredient') {
            req.reply(body);
        }
    }).as(name);
}

export function submitCreateIngredientForm(name: string, description: string, imageFile: string) {
    cy.get('[data-testid="name"]').clear().type(name);
    cy.get('[data-testid="description"]').clear().type(description);
    cy.get('[data-testid="imageFile"]').selectFile(`cypress/fixtures/${imageFile}`);
    cy.get('[data-testid="submit-button"]').click();
}
