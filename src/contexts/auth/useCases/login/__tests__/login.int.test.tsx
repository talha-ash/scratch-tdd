import {
    EMAIL_IS_INVALID,
    LOGIN_SUCCESSFULLY,
    PASSWORD_IS_INCORRECT,
    USER_NOT_FOUND,
} from '~/contexts/auth/constants/textConstant';
import * as loginAction from '~cypress/support/actions/loginAction';
import { LoginForm } from '../components/loginForm';
import { mountComponentWithRouter } from '~/shared/utils/test/mountComponentWithRouter';

beforeEach(async () => {
    mountComponentWithRouter(LoginForm);
});
describe('Login ', () => {
    it('login successfully', () => {
        const requestName = 'loginRequest';
        loginAction.interceptLoginRequestSuccess(requestName);

        const email = 'john@gmail.com';
        const password = 'password12345';

        loginAction.submitLoginForm(email, password);

        cy.wait(`@${requestName}`).then((interception) => {
            expect(interception.request.body).to.deep.equal({
                email: email,
                password: password,
            });
        });

        cy.get('#_rht_toaster').contains(LOGIN_SUCCESSFULLY);
    });
    it('Toast user not found', () => {
        const requestName = 'loginRequest';
        loginAction.interceptLoginRequestNotFound(requestName);

        const email = 'john@gmail.com';
        const password = 'password12345';

        loginAction.submitLoginForm(email, password);

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

        loginAction.submitLoginForm(email, password);

        cy.get('#email-error').contains(EMAIL_IS_INVALID);
        cy.get('#password-error').contains(PASSWORD_IS_INCORRECT);
    });

    it('Navigate To Register Page', () => {
        cy.get('[data-testid="create-account"]').click();
        cy.url().should('contain', 'register');
    });
});
