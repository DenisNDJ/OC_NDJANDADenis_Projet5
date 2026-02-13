describe('Register tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200/register')
    });

    it('Check missing or wrong input', () => {
        cy.get('button[type=submit]').should('be.disabled');
        cy.get('[data-cy="username_register"]').type('denis');
        cy.get('button[type=submit]').should('be.disabled');
        cy.get('[data-cy="email_register"]').type('notEmail');
        cy.get('button[type=submit]').should('be.disabled');
        cy.get('[data-cy="password_register"]').type('password');
        cy.get('button[type=submit]').should('be.disabled');
        cy.get('[data-cy="email_register"]').clear();
        cy.get('[data-cy="email_register"]').type('denis@gmail.com');
        cy.get('button[type=submit]').should('be.disabled');
    })

    it('Regiter', () => {
        cy.intercept(
        'POST',
        '/api/auth/register', 
        {
            statusCode: 200,
        }
        ).as('loginFailedRequest');

        cy.get('[data-cy="username_register"]').type('denis');
        cy.get('[data-cy="email_register"]').type('denis@gmail.com');
        cy.get('[data-cy="password_register"]').type('ndjanda&1A');
        cy.get('button[type=submit]').click();
        cy.location('pathname').should('include', 'login');
    })

    it('Fail to Regiter', () => {
        cy.intercept(
        'POST',
        '/api/auth/register', 
        {
            statusCode: 401
        }
        ).as('loginFailedRequest');
        
        cy.get('[data-cy="username_register"]').type('denis');
        cy.get('[data-cy="email_register"]').type('denis@gmail.com');
        cy.get('[data-cy="password_register"]').type('ndjanda&1A');
        cy.get('button[type=submit]').click();
        cy.get('p.error').should('have.text', 'An error occurred');
        cy.get('p.error').should('be.visible');
    })
})