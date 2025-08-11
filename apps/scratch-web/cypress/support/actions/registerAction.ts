export function submitRegisterForm(params: {
    email: string;
    password: string;
    username: string;
    passwordConfirm?: string;
}) {
    cy.get('[data-testid="email"]').clear().type(params.email);
    cy.get('[data-testid="username"]').clear().type(params.username);
    cy.get('[data-testid="password"]').clear().type(params.password);
    cy.get('[data-testid="passwordConfirm"]')
        .clear()
        .type(params.passwordConfirm ?? params.password);

    cy.get('[data-testid="submit-button"]').click();
}

export function interceptRegisterRequestSuccess<T>(name: string, body?: T) {
    cy.intercept('POST', 'http://localhost:4000/api/v1/register', {
        statusCode: 200,
        body: body ?? {
            user: {
                id: 1,
                email: 'user@example.com',
                username: 'jhon',
                age: 'user',
            },
            token: 'mock-jwt-token-123',
        },
    }).as(name);
}
