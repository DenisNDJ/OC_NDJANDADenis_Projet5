describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:4200')
    cy.get('span.mdc-button__label').should('have.text', 'Commencer');
    cy.get('span.mdc-button__label').should('have.class', 'mdc-button__label');
    cy.get('span.mdc-button__label').should('be.visible');
  })
})