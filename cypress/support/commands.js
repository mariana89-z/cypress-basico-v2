Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function (){
	cy.get('#firstName').type('Mariana')
	cy.get('#lastName').type('Zeferino')
	cy.get('#email').type('mariana.cristhina89@gmail.com')
	cy.get('#open-text-area').type('Teste')
	cy.contains('button', 'Enviar').click()

  })



