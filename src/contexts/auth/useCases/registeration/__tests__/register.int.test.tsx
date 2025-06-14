import { createToastProvider } from '~/shared/infrastructure/toast/toastProvider';
import { ComposeProvider } from '~/shared/diContext';
import { createQueryClientProvider } from '~/shared/infrastructure/tanqStackQueryClient';
import { Toaster } from 'react-hot-toast';
import { REGISTER_SUCCESSFULLY } from '~/contexts/auth/constants/textConstant';
import { RegisterForm } from '~/contexts/auth/components/registerForm';

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
});
