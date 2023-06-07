/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
	beforeEach(function() {
		cy.visit('./src/index.html')
	})

	it('verifica o título da aplicação', function() {
		cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

	it('preenche os campos obrigatórios e envia o formulário', function() {
      const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.' 

		cy.get('#firstName').type('Mariana')
		cy.get('#lastName').type('Zeferino')
		cy.get('#email').type('mariana.cristhina89@gmail.com')
		cy.get('#open-text-area').type('Teste')
		cy.get('#open-text-area').type(longText, { delay: 0})
		cy.get('.button[type="submit"]').click()

		cy.get('.success').should('be.visible')
	})

	it('Exibe mensagem de erro ao submenter o formulário com um email com formatação inválida', function() {
		cy.get('#firstName').type('Mariana')
		cy.get('#lastName').type('Zeferino')
		cy.get('#email').type('mariana.cristhina89@gmail,com')
		cy.get('#open-text-area').type('Teste')
		cy.get('.button[type="submit"]').click()

		cy.get('.error').should('be.visible')
	})

	it.only('Campo telefone continua vazio quando preenchido com valor não-numérico', function() {
		cy.get('#phone').type('abc')
		  .type('abcdefghij')
		  .should('have.value', '')
	})

	it.only('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
		cy.get('#firstName').type('Mariana')
		cy.get('#lastName').type('Zeferino')
		cy.get('#email').type('mariana.cristhina89@gmail,com')
		cy.get('#phone-checkbox')
		cy.get('#open-text-area').type('Teste')
		cy.get('.button[type="submit"]').click()

		cy.get('.error').should('be.visible')
	})



  })