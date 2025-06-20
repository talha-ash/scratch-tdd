import { getEmailField, getPasswordField, getSubmitButton } from '../pageObject/LoginPage';

export function submitLoginForm(email: string, password: string) {
    getEmailField().clear().type(email);
    getPasswordField().clear().type(password);
    getSubmitButton().click();
}

export function interceptLoginRequestSuccess<T>(name: string, body?: T) {
    cy.intercept('POST', 'http://localhost:4000/api/v1/login', {
        statusCode: 200,
        body: body ?? {data: {
            user: {
                id: 1,
                email: 'user@example.com',
                username: 'jhon',
                age: 'user',
            },
            token: 'mock-jwt-token-123',
        }},
    }).as(name);
}

export function interceptLoginRequestNotFound<T>(name: string, body?: T) {
    cy.intercept('POST', 'http://localhost:4000/api/v1/login', {
        statusCode: 404,
        body: body ?? {
            data: {
                error: true,
                message: 'User Not Found',
            },
        },
    }).as(name);
}
