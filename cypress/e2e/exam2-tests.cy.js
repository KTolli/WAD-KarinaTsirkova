it('Test 1', () => {
    cy.visit('http://localhost:8081')
    cy.get('.code')
    cy.get('button').should('contain', 'update')
})