import {
    EMAIL_IS_INVALID,
    PASSWORD_IS_NOT_PROPER,
    PASSWORDS_DO_NOT_MATCH,
    REGISTER_SUCCESSFULLY,
    USERNAME_NOT_PROPER,
} from '~/contexts/auth/constants/textConstant';
import { mountComponentWithRouter } from '~/shared/utils/test/mountComponentWithRouter';
import { RegisterationForm } from '../components/registerationForm';
import {
    interceptRegisterRequestSuccess,
    submitRegisterForm,
} from '~cypress/support/actions/registerAction';

beforeEach(() => {
    mountComponentWithRouter(RegisterationForm);
});

describe('Registration ', () => {
    it('registration successfully', () => {
        const requestName = 'registerRequest';

        interceptRegisterRequestSuccess(requestName);

        const email = 'user@example.com';
        const password = 'password12345';
        const username = 'jhon';

        submitRegisterForm({ email, password, username, passwordConfirm: password });

        cy.wait(`@${requestName}`).then((interception) => {
            expect(interception.request.body).to.deep.equal({
                user: {
                    email,
                    username,
                    password,
                    passwordConfirm: password,
                },
            });
        });

        cy.get('#_rht_toaster').contains(REGISTER_SUCCESSFULLY);
    });
    it('validate registration', () => {
        const email = 'john@gmail';
        const password = 'passwor';
        const username = 'jo';

        submitRegisterForm({ email, password, username, passwordConfirm: password });
        cy.get('#email-error').contains(EMAIL_IS_INVALID);
        cy.get('#password-error').contains(PASSWORD_IS_NOT_PROPER);
        cy.get('#username-error').contains(USERNAME_NOT_PROPER);
    });

    it('validate password match', () => {
        const email = 'john@gmail.com';
        const password = 'password';
        const username = 'john';

        submitRegisterForm({ email, password, username, passwordConfirm: 'password12345' });
        cy.get('#passwordConfirm-error').contains(PASSWORDS_DO_NOT_MATCH);
    });
});
