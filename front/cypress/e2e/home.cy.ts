describe('Home tests', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200')
  });

  it('Check login button', () => {
    cy.get('[data-cy="login-btn-home"]').should('be.visible');
    cy.get('[data-cy="login-btn-home"]').should('be.not.disabled');
    cy.get('[data-cy="login-btn-home"]').click();

    cy.location('pathname').should('include', 'login');
  })

  it('Check register button', () => {
    cy.get('[data-cy="register-btn-home"]').should('be.visible');
    cy.get('[data-cy="register-btn-home"]').should('be.not.disabled');
    cy.get('[data-cy="register-btn-home"]').click();

    cy.location('pathname').should('include', 'register');
  })

})