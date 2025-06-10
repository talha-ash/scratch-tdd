export function getEmailField() {
    return cy.get('[data-testid="email"]');
}
export function getPasswordField() {
    return cy.get('[data-testid="password"]');
}

export function getSubmitButton() {
    return cy.get('[data-testid="submit-button"]');
}

