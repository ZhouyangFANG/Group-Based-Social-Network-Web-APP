describe('Test resgiter', () => {
    it('Test registration', () => {

        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.visit('http://localhost:3000/registration');
        cy.get('#userName').type('testCypress').should('have.value', 'testCypress');
        cy.get('#password').type('password').should('have.value', 'password');
        cy.get('#registerBtn').click().then(()=>{
            expect(stub.getCall(0)).to.be.calledWith('Success!')
        });
    });

    it('Test registration dup', () => {
        const stub = cy.stub()
        cy.on('window:alert', stub)
        cy.visit('http://localhost:3000/registration');
        cy.get('#userName').type('testCypress').should('have.value', 'testCypress');
        cy.get('#password').type('password').should('have.value', 'password');
        cy.get('#registerBtn').click().then(()=>{
            expect(stub.getCall(0)).to.be.calledWith('Failure')
        });
    });
});