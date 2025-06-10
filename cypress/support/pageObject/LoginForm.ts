export function getEmailField() {
    return cy.get('[data-testid="email"]');
}
export function getPasswordField() {
    return cy.get('[data-testid="password"]');
}

export function getSubmitButton() {
    return cy.get('[data-testid="submit-button"]');
}

export function submitLoginForm(email: string, password: string) {
    getEmailField().clear().type(email);
    getPasswordField().clear().type(password);
    getSubmitButton().click();
}
