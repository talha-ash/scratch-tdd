import { Toaster } from 'react-hot-toast';
import { RegisterForm } from '~/contexts/auth/components/registerForm';
import {
    EMAIL_IS_INVALID,
    PASSWORD_IS_NOT_PROPER,
    PASSWORDS_DO_NOT_MATCH,
    REGISTER_SUCCESSFULLY,
    USERNAME_NOT_PROPER,
} from '~/contexts/auth/constants/textConstant';
import { ComposeProvider } from '~/shared/diContext';
import { createQueryClientProvider } from '~/shared/infrastructure/tanqStackQueryClient';
import { createToastProvider } from '~/shared/infrastructure/toast/toastProvider';

beforeEach(() => {
    const providers = [createToastProvider(), createQueryClientProvider()];
    cy.mount(
        <ComposeProvider providers={providers}>
            <div>
                <RegisterForm />
                <Toaster />
            </div>
        </ComposeProvider>,
    );
});

describe('Registration ', () => {
    it.only('registration successfully', () => {
        const requestName = 'registerRequest';

        cy.intercept('POST', 'http://localhost:4000/api/v1/register', {
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
        }).as(requestName);

        const email = 'john@gmail.com';
        const password = 'password12345';
        const username = 'john';

        cy.get('[data-testid="email"]').clear().type(email);
        cy.get('[data-testid="username"]').clear().type(username);
        cy.get('[data-testid="password"]').clear().type(password);
        cy.get('[data-testid="passwordConfirm"]').clear().type(password);

        cy.get('[data-testid="submit-button"]').click();

        cy.wait(`@${requestName}`).then((interception) => {
            expect(interception.request.body).to.deep.equal({
                email,
                password,
                passwordConfirm: password,
                username,
            });
        });

        cy.get('#_rht_toaster').contains(REGISTER_SUCCESSFULLY);
    });
    it.only('validate registration', () => {
        const email = 'john@gmail';
        const password = 'passwor';
        const username = 'jo';

        cy.get('[data-testid="email"]').clear().type(email);
        cy.get('[data-testid="username"]').clear().type(username);
        cy.get('[data-testid="password"]').clear().type(password);
        cy.get('[data-testid="passwordConfirm"]').clear().type(password);

        cy.get('[data-testid="submit-button"]').click();

        cy.get('#email-error').contains(EMAIL_IS_INVALID);
        cy.get('#password-error').contains(PASSWORD_IS_NOT_PROPER);
        cy.get('#username-error').contains(USERNAME_NOT_PROPER);
    });

    it.only('validate password match', () => {
        const email = 'john@gmail.com';
        const password = 'password';
        const username = 'john';

        cy.get('[data-testid="email"]').clear().type(email);
        cy.get('[data-testid="username"]').clear().type(username);
        cy.get('[data-testid="password"]').clear().type(password);
        cy.get('[data-testid="passwordConfirm"]').clear().type('password12345');

        cy.get('[data-testid="submit-button"]').click();
        cy.get('#passwordConfirm-error').contains(PASSWORDS_DO_NOT_MATCH);
    });
});
