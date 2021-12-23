describe('Test resgiter', () => {
    it('Test registration', () => {

        // const stub = cy.stub()
        // cy.on('window:alert', stub)

        cy.visit('http://localhost:8080/registration');
        cy.get('#userName').type('testCypress').should('have.value', 'testCypress');
        cy.get('#password').type('password').should('have.value', 'password');
        cy.get('#registerBtn').click().then(()=>{
            cy.on('window:alert',(txt)=>{
                //Mocha assertions
                expect(txt).to.contains('Success!');
             })
        });
    });

    it('Test registration dup', () => {
        const stub = cy.stub()
        cy.on('window:alert', stub)
        cy.visit('http://localhost:8080/registration');
        cy.get('#userName').type('testCypress').should('have.value', 'testCypress');
        cy.get('#password').type('password').should('have.value', 'password');
        cy.get('#registerBtn').click().then(()=>{
            cy.on('window:alert',(txt)=>{
                expect(txt).to.contains('Failure');
             })
        });
    });
});