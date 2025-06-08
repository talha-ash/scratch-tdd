import { createToastProvider } from '~/shared/infrastructure/toast/toastProvider';
import { LoginForm } from '../components/loginForm';
import { ComposeProvider } from '~/shared/diContext';
import { createQueryClientProvider } from '~/shared/infrastructure/tanqStackQueryClient';
import { Toaster } from 'react-hot-toast';

describe('Login ', () => {
    it('login successfully', () => {
        const providers = [createToastProvider(), createQueryClientProvider()];
        cy.mount(
            <ComposeProvider providers={providers}>
                <div>
                    <LoginForm />
                    <Toaster />
                </div>
            </ComposeProvider>,
        );
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

        cy.get('[data-testid="email"]').clear().type('john@gmail.com');
        cy.get('[data-testid="password"]').clear().type('password12345');
        cy.get('[data-testid="submit-button"]').click();

        cy.wait('@loginRequest').then((interception) => {
            expect(interception.request.body).to.deep.equal({
                email: 'john@gmail.com',
                password: 'password12345',
            });
        });

        cy.get('#_rht_toaster').contains(/Login Successfully/);
    });
});
