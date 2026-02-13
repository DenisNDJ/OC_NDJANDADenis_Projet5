describe('NavBar tests', () => {

  it('Check the nav bar', () => {
    cy.visit('http://localhost:4200/login')
    
    cy.intercept('POST','/api/auth/login',{ fixture: 'session.json', },).as("loginRequest");

    cy.get('[data-cy="article_nav"]').should('not.exist');
    cy.get('[data-cy="theme_nav"]').should('not.exist');
    cy.get('[data-cy="me_nav"]').should('not.exist');
    cy.get('[data-cy="logout_nav"]').should('not.exist');

    cy.get('[data-cy="emailField_login"]').click();
    cy.get('[data-cy="emailInput_login"]').type('denis@gmail.com');
    cy.get('[data-cy="passwordField_login"]').click();
    cy.get('[data-cy="passwordInput_login"]').type('test!1234');
    cy.get('[data-cy="submitBtn_login"]').click();

    cy.location('pathname').should('include', 'feed/article');

    cy.get('[data-cy="article_nav"]').should('be.visible');
    cy.get('[data-cy="theme_nav"]').should('be.visible');
    cy.get('[data-cy="me_nav"]').should('be.visible');
    cy.get('[data-cy="logout_nav"]').should('be.visible');

    cy.get('[data-cy="theme_nav"]').click();
    cy.location('pathname').should('include', 'feed/theme');
    cy.get('[data-cy="article_nav"]').click();
    cy.location('pathname').should('include', 'feed/article');
    cy.get('[data-cy="me_nav"]').click();
    cy.location('pathname').should('include', 'me');
    cy.get('[data-cy="logout_nav"]').click();
    cy.location('pathname').should('include', '');
  })

})