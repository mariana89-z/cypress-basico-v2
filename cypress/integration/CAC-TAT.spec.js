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
		cy.contains('button', 'Enviar')

		cy.get('.success').should('be.visible')
	})

	it('Exibe mensagem de erro ao submenter o formulário com um email com formatação inválida', function() {
		cy.get('#firstName').type('Mariana')
		cy.get('#lastName').type('Zeferino')
		cy.get('#email').type('mariana.cristhina89@gmail,com')
		cy.get('#open-text-area').type('Teste')
		cy.contains('button', 'Enviar').click()

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
		cy.contains('button', 'Enviar').click()

		cy.get('.error').should('be.visible')
	})

	it('Preenche e limpa os campos nome, sobrenome, email e telefone', function () {
		cy.get('#firstName')
		  .type('Mariana')
		  .should('have.value', 'Mariana')
		  .clear()
		  .should('have.value', '')
		cy.get('#lastName')
		  .type('Zeferino')
		  .should('have.value', 'Zeferino')
		  .clear()
		  .should('have.value', '')
		cy.get('#email')
		  .type('mariana.cristhina89@gmail,com')
		  .should('have.value', 'mariana.cristhina89@gmail,com')
		  .clear()  
		  .should('have.value', '')
		cy.get('#phone')
		  .type('1234567890')
		  .should('have.value', '1234567890')
		  .clear()  
		  .should('have.value', '')
	})

	it.only('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
		cy.contains('button', 'Enviar').click()

		cy.get('.error').should('be.visible')
	})

	it.only('Envia o formulário com sucesso usando um comando customizado', function () {
		cy.fillMandatoryFieldsAndSubmit()

		cy.get('.success').should('be.visible')
	})	

	it.only('Seleciona um produto (YouTube) por seu texto', function () {
		cy.get('#product')
		  .select('YouTube')
		  .should('have.value', 'youtube')

	})

	it('Seleciona um produto (Mentoria) por seu valor (value)', function () {
		cy.get('#product')
		  .select('mentoria')
		  .should('have.value', 'mentoria')
	})
	
	it('Seleciona um produto (Blog) por seu índice', function () {
		cy.get('#product')
		  .select(1)
		  .should('have.value', 'blog')
	})	
	
	it.only('Marca o tipo de atendimento "Feedback"', function () {
		cy.get('input[type="radio"][value="feedback"]')
		  .check()
		  .should('have.value', 'feedback')
		  
	})
	
	it.only('Marca cada tipo de atendimento"', function () {
		cy.get('input[type="radio"]')
		  .should('have.length', 3)
		  .each(function($radio) {
			cy.wrap($radio).check()
			cy.wrap($radio).should('be.checked')
		  })
		  
	})
	
	it.only('Marca ambos checkboxes, depois desmarca o último"', function () {
		cy.get('input[type="checkbox"]')
		  .check()
		  .should('be.checked')
		  .last()
		  .uncheck()
		  .should('not.be.checked')
		  
	})
})