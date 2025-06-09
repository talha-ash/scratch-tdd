import { createToastProvider } from '~/shared/infrastructure/toast/toastProvider';
import { LoginForm } from '../../../components/loginForm';
import { ComposeProvider } from '~/shared/diContext';
import { createQueryClientProvider } from '~/shared/infrastructure/tanqStackQueryClient';
import { Toaster } from 'react-hot-toast';
import { EMAIL_IS_INVALID, LOGIN_SUCCESSFULLY, PASSWORD_IS_REQUIRED } from '~/contexts/auth/constants/textConstant';

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

        const email = "john@gmail.com"
        const password = "password12345"

        cy.get('[data-testid="email"]').clear().type(email);
        cy.get('[data-testid="password"]').clear().type(password);
        cy.get('[data-testid="submit-button"]').click();

        cy.wait('@loginRequest').then((interception) => {
            expect(interception.request.body).to.deep.equal({
                email: email,
                password: password,
            });
        });

        cy.get('#_rht_toaster').contains(LOGIN_SUCCESSFULLY);
    });
    it('login validation failed', () => {
        const providers = [createToastProvider(), createQueryClientProvider()];
        cy.mount(
            <ComposeProvider providers={providers}>
                <div>
                    <LoginForm />
                    <Toaster />
                </div>
            </ComposeProvider>,
        );       

        const email = "john@gmail"
        const password = ""

        cy.get('[data-testid="email"]').clear().type(email);
        cy.get('[data-testid="password"]').clear().type(password);
        cy.get('[data-testid="submit-button"]').click();

        cy.get('#email-error').contains(EMAIL_IS_INVALID);
        cy.get('#password-error').contains(PASSWORD_IS_REQUIRED);
    });
});
