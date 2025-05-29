import React from "react";

describe("<Stepper />", () => {
  it("mounts", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <div>
        <h1>Hello</h1>
      </div>,
    );

    cy.get("h1").should("have.text", "Hello");
  });
});
