import { LoginForm } from '../components/loginForm';

describe('Login ', () => {
    it('check input initials', () => {
        cy.mount(<LoginForm />);

        cy.get('[data-testId="email"]').should('have.value', 'user@email.com');
        cy.get('[data-testId="password"]').should('have.value', '●●●●●●●●');
    });

    it('login successfully', () => {
        cy.mount(<LoginForm />);

        cy.intercept('POST', '/api/v1/login', {
            statusCode: 200,
            body: {
                user: {
                    id: 1,
                    email: 'user@example.com',
                    username: 'jhon',                    
                    age: 'user',
                },
                token: 'mock-jwt-token-123',                
            },
        }).as('loginRequest');

        cy.get('[data-testId="email"]').clear().type('john@gmail.com');
        cy.get('[data-testId="password"]').clear().type('password12345');
        cy.get('[data-testId="submit-button"]').click();

        cy.wait('@loginRequest').then((interception) => {
            expect(interception.request.body).to.deep.equal({
                email: 'john@gmail.com',
                password: 'password12345',
            });
        });

        cy.get('#_rht_toaster', { timeout: 2000 }).contains(/Login Successfully/);
    });
});
