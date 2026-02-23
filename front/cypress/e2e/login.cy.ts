describe('Login tests', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200/login')
  
  });

  it('Check missing and invalid input', () => {
    cy.get('[data-cy="emailField_login"]').click();
    cy.get('[data-cy="emailInput_login"]').type('notEmail');
    cy.get('[data-cy="submitBtn_login"]').should('be.disabled');
    cy.get('[data-cy="passwordField_login"]').click();
    cy.get('[data-cy="passwordInput_login"]').type('password');
    cy.get('[data-cy="submitBtn_login"]').should('be.disabled');
    cy.get('[data-cy="emailInput_login"]').clear();
    cy.get('[data-cy="submitBtn_login"]').should('be.disabled');
  })

  it('Check error message invalid password', () => {
    cy.intercept('POST', '/api/auth/login', { statusCode: 401, }).as('loginFailedRequest');

    cy.get('[data-cy="emailField_login"]').click();
    cy.get('[data-cy="emailInput_login"]').type('denis@gmail.com');
    cy.get('[data-cy="passwordField_login"]').click();
    cy.get('[data-cy="passwordInput_login"]').type('wrongPassmord');
    cy.get('[data-cy="submitBtn_login"]').click();
    cy.get('p.error').should('have.text', 'Erreur de connexion');
    cy.get('p.error').should('be.visible');
  })

  it('Check back button', () => {
    cy.get('[data-cy="bckBtn_login"]').click();

    cy.location('pathname').should('include', '');
  })

  it('Check login and logout', () => {
    cy.intercept('POST','/api/auth/login',{ fixture: 'session.json', },).as("loginRequest");

    cy.get('[data-cy="emailField_login"]').click();
    cy.get('[data-cy="emailInput_login"]').type('denis@gmail.com');
    cy.get('[data-cy="passwordField_login"]').click();
    cy.get('[data-cy="passwordInput_login"]').type('test!1234');
    cy.get('[data-cy="submitBtn_login"]').click();

    cy.location('pathname').should('include', 'feed/article');

    cy.get('[data-cy="logout_nav"]').click();

    cy.location('pathname').should('include', '');
  })


})