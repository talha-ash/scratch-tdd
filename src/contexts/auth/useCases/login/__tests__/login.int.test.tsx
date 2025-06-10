import { createToastProvider } from '~/shared/infrastructure/toast/toastProvider';
import { LoginForm } from '../../../components/loginForm';
import { ComposeProvider } from '~/shared/diContext';
import { createQueryClientProvider } from '~/shared/infrastructure/tanqStackQueryClient';
import { Toaster } from 'react-hot-toast';
import {
    EMAIL_IS_INVALID,
    LOGIN_SUCCESSFULLY,
    PASSWORD_IS_INCORRECT,
    USER_NOT_FOUND,
} from '~/contexts/auth/constants/textConstant';

import * as LoginFormObject from '~cypress/support/pageObject/LoginForm';

beforeEach(() => {
    const providers = [createToastProvider(), createQueryClientProvider()];
    cy.mount(
        <ComposeProvider providers={providers}>
            <div>
                <LoginForm />
                <Toaster />
            </div>
        </ComposeProvider>,
    );
});
describe('Login ', () => {
    it('login successfully', () => {
        cy.intercept('POST', 'http://localhost:4000/api/v1/login', {
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

        const email = 'john@gmail.com';
        const password = 'password12345';

        LoginFormObject.submitLoginForm(email, password);

        cy.wait('@loginRequest').then((interception) => {
            expect(interception.request.body).to.deep.equal({
                email: email,
                password: password,
            });
        });

        cy.get('#_rht_toaster').contains(LOGIN_SUCCESSFULLY);
    });
    it('Toast user not found', () => {
        cy.intercept('POST', 'http://localhost:4000/api/v1/login', {
            statusCode: 404,
            body: {
                data: {
                    error: true,
                    message: 'User Not Found',
                },
            },
        }).as('loginRequest');

        const email = 'john@gmail.com';
        const password = 'password12345';

        LoginFormObject.submitLoginForm(email, password);

        cy.wait('@loginRequest').then((interception) => {
            expect(interception.request.body).to.deep.equal({
                email: email,
                password: password,
            });
        });

        cy.get('#_rht_toaster').contains(USER_NOT_FOUND);
    });
    it('Incorrect email and password', () => {
        const email = 'john@gmail';
        const password = 'abc';

        LoginFormObject.submitLoginForm(email, password);

        cy.get('#email-error').contains(EMAIL_IS_INVALID);
        cy.get('#password-error').contains(PASSWORD_IS_INCORRECT);
    });
});
