describe('Article details tests', () => {

  it('Check details', () => {
    cy.intercept('GET','/api/article/subscribed',{ fixture: 'subArticles.json', },).as("articleLstRequest");
    cy.intercept('POST','/api/auth/login',{ fixture: 'session.json', },).as("loginRequest");
    cy.intercept('GET','/api/article/2',{ fixture: 'article2.json', },).as("articleRequest");
    cy.intercept('GET','/api/article/2/comment',{ fixture: 'comments.json', },).as("commentRequest");
    
    cy.visit('http://localhost:4200/login')
    
    cy.get('[data-cy="emailField_login"]').click();
    cy.get('[data-cy="emailInput_login"]').type('denis@gmail.com');
    cy.get('[data-cy="passwordField_login"]').click();
    cy.get('[data-cy="passwordInput_login"]').type('test!1234');
    cy.get('[data-cy="submitBtn_login"]').click();
    
    cy.location('pathname').should('include', 'feed/article');
    
    cy.get('[data-cy="article-card"]').first().click();
    cy.location('pathname').should('include', 'article/detail/2');
    
    cy.get('[data-cy="article-card-header-title"]').should('have.text', 'Le JAVA');
    cy.get('[data-cy="article-card-header-user"]').should('have.text', 'Denis');
  })

})