describe('login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/')
    })

    it('connexion', () => {
        // id username
        // id password
        cy.get('#username').type('test@gmail.com')
        cy.get('#password').type('mysuperpassword');
        cy.get('#submitlogin').click();

        // should be wrong credentials
        cy.get('.p-message-wrapper').should('exist');
    })

    it('wrong inscription', () => {

        // Select an option in p-selectButton (assuming the options are loaded asynchronously)
        cy.get('p-selectButton').click(); // Click to open the dropdown

        cy.get('#username').type('user');
        cy.get('#email').type('user');
        cy.get('#password').type('mysuperpassword');
        cy.get('#passwordconfirmation').type('mysuperpassword');
        cy.get('#submitregister').click();

        // should be wrong credentials
        cy.get('.p-message-wrapper').should('exist');
    })

    it('inscription mots de passe differents', () => {

        // Select an option in p-selectButton (assuming the options are loaded asynchronously)
        cy.get('p-selectButton').click(); // Click to open the dropdown

        cy.get('#username').type('monsuperusername');
        cy.get('#email').type('lalalalalalala@gmail.com');
        cy.get('#password').type('mysuperpassword@23243804!');
        cy.get('#passwordconfirmation').type('mysuperpassword');
        cy.get('#submitregister').click();

        // should be wrong credentials
        cy.get('.p-message-wrapper').should('exist');
    })

    it('inscription valide', () => {

        // Select an option in p-selectButton (assuming the options are loaded asynchronously)
        cy.get('p-selectButton').click(); // Click to open the dropdown

        cy.get('#username').type('monsuperusername');
        cy.get('#email').type('lalalalalalala@gmail.com');
        cy.get('#password').type('mysuperpassword@23243804!');
        cy.get('#passwordconfirmation').type('mysuperpassword@23243804!');
        cy.get('#submitregister').click();
    })
})
