describe('Me tests', () => {

  beforeEach(() => {
    cy.intercept('POST','/api/auth/login',{ fixture: 'session.json', },).as("loginRequest");
    cy.intercept('GET','/api/sub/user',{ fixture: 'subTheme.json', },).as("subThemeLstRequest");
    cy.intercept('GET','/api/user/5',{ fixture: 'user.json', },).as("userRequest");

    cy.visit('http://localhost:4200/login')

    cy.get('[data-cy="emailField_login"]').click();
    cy.get('[data-cy="emailInput_login"]').type('denis@gmail.com');
    cy.get('[data-cy="passwordField_login"]').click();
    cy.get('[data-cy="passwordInput_login"]').type('test!1234');

    cy.get('[data-cy="submitBtn_login"]').click();
    cy.location('pathname').should('include', 'feed/article');

    cy.get('[data-cy="me_nav"]').click();
    cy.location('pathname').should('include', 'me');
  });

    it('Check delete session', () => {
        
    })
})