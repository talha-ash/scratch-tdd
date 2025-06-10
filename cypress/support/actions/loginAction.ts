import { getEmailField, getPasswordField, getSubmitButton } from '../pageObject/LoginPage';

export function submitLoginForm(email: string, password: string) {
    getEmailField().clear().type(email);
    getPasswordField().clear().type(password);
    getSubmitButton().click();
}
