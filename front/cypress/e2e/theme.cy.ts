describe('Theme list tests', () => {

  beforeEach(() => {
    cy.intercept('GET','/api/theme',{ fixture: 'allTheme.json', },).as("themeLstRequest");
    cy.intercept('POST','/api/auth/login',{ fixture: 'session.json', },).as("loginRequest");

    cy.visit('http://localhost:4200/login')

    cy.get('[data-cy="emailField_login"]').click();
    cy.get('[data-cy="emailInput_login"]').type('denis@gmail.com');
    cy.get('[data-cy="passwordField_login"]').click();
    cy.get('[data-cy="passwordInput_login"]').type('test!1234');

    cy.get('[data-cy="submitBtn_login"]').click();
    cy.location('pathname').should('include', 'feed/article');

    cy.get('[data-cy="theme_nav"]').click();
    cy.location('pathname').should('include', 'feed/theme');
  });

  it('Check list lenght', () => {
    cy.fixture('allTheme.json').then((theme)=>{
        cy.get("[data-cy='theme-card']").should('have.length', theme.length);
    });
  })

    it('Check list info', () => {
        cy.get('[data-cy="theme-name"]').first().should('have.text', 'Le C');
        cy.get('[data-cy="theme-content"]').first().should('have.text', ' Le theme du C ');
        cy.get('[data-cy="sub-btn"]').first().should('have.text', ' Déjà abonné ');
        cy.get('[data-cy="sub-btn"]').first().should('be.disabled');
        cy.get('[data-cy="theme-name"]').last().should('have.text', 'Le JAVA');
        cy.get('[data-cy="theme-content"]').last().should('have.text', ' Le theme du JAVA ');
        cy.get('[data-cy="sub-btn"]').last().should('have.text', ' S\'abonner ');
        cy.get('[data-cy="sub-btn"]').last().should('be.enabled');
    })


})