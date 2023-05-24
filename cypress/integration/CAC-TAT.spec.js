/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
	beforeEach(function() {
		cy.visit('./src/index.html')
	})

	it('verifica o título da aplicação', function() {
		cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

	it('preenche os campos obrigatórios e envia o formulário', function() {
		cy.get('#firstName').type('Mariana')
		cy.get('#lastName').type('Zeferino')
		cy.get('#email').type('mariana.cristhina89@gmail.com')
		cy.get('#open-text-area').type('Teste')
		cy.get('.button[type="submit"]').click()

		cy.get('.success').should('be.visible')
		cy.get('.error').should('Exibe mensagem de erro ao submenter o formulário com um email com formatação inválida')

    })
  })