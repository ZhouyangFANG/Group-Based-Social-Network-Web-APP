describe('Test login', () => {
    it('Test login', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('#email').type('testCypress').should('have.value', 'testCypress');
        cy.get('#password').type('password').should('have.value', 'password');
        cy.get('#loginBtn').click();
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/groups')
        });
    });

});