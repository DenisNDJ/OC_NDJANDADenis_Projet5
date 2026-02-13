describe('Article list tests', () => {

  beforeEach(() => {
    cy.intercept('GET','/api/article/subscribed',{ fixture: 'subArticles.json', },).as("articleLstRequest");
    cy.intercept('POST','/api/auth/login',{ fixture: 'session.json', },).as("loginRequest");

    cy.visit('http://localhost:4200/login')

    cy.get('[data-cy="emailField_login"]').click();
    cy.get('[data-cy="emailInput_login"]').type('denis@gmail.com');
    cy.get('[data-cy="passwordField_login"]').click();
    cy.get('[data-cy="passwordInput_login"]').type('test!1234');
    cy.get('[data-cy="submitBtn_login"]').click();

    cy.location('pathname').should('include', 'feed/article');
  });

  it('Check list lenght', () => {
    cy.fixture('subArticles.json').then((article)=>{
        cy.get("[data-cy='article-card']").should('have.length', article.length);
    });
  })

    it('Check the create button', () => {
        cy.get('[data-cy="create-btn"]').should('be.visible');
    })

    it('Check the sort button', () => {
        cy.get('[data-cy="sort-btn"]').should('be.visible');
        
        cy.get('[data-cy="date_article"]').first().should('have.text', 'December 12, 2026');
        cy.get('[data-cy="date_article"]').last().should('have.text', 'November 11, 2026');
        cy.get('[data-cy="sort-btn"]').click();
        cy.get('[data-cy="date_article"]').first().should('have.text', 'November 11, 2026');
        cy.get('[data-cy="date_article"]').last().should('have.text', 'December 12, 2026');
    })

    it('Check the article click', () => {
        cy.get('[data-cy="article-card"]').first().click();
        cy.location('pathname').should('include', 'article/detail/2');
    })

    it('Check article info', () => {
        
        cy.get('[data-cy="titre_article"]').first().should('have.text', 'Le JAVA');
        cy.get('[data-cy="date_article"]').first().should('have.text', 'December 12, 2026');
        cy.get('[data-cy="user_article"]').first().should('have.text', 'Denis');
        cy.get('[data-cy="content_article"]').first().should('have.text', ' Le content du JAVA ');

        cy.get('[data-cy="titre_article"]').last().should('have.text', 'Le C');
        cy.get('[data-cy="date_article"]').last().should('have.text', 'November 11, 2026');
        cy.get('[data-cy="user_article"]').last().should('have.text', 'Ndjanda');
        cy.get('[data-cy="content_article"]').last().should('have.text', ' Le content du C ');
    })


})