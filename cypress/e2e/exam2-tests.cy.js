it('Test 1', () => {
    cy.visit('http://http://localhost:8081')
    cy.get('button').should('contain', 'update')
    cy.get('button').should('contain', 'update')
})