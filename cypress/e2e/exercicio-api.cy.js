/// <reference types="cypress" />
import contrato from '../contracts/produtos.contract'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => { 
    cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios',
    }).should((response) =>{
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": "TESTE",
        "email": "testteste1234@qa.com.br",
        "password": "teste",
        "administrador": "true"
      },
  }).then((response) => {
      expect(response.status).to.equal(201)
      expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    })
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      failOnStatusCode: false,
      body: {
        "nome": "Marcelo Mouro",
        "email": "emailinvalido#qa.com.br",
        "password": "teste",
        "administrador": "true"
      },
    }).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body.message).to.equal('Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')
    })
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    const userId = 'KL7uXFtKk0Hju2tE'
    cy.request({
      method: 'PUT',
      url: `usuarios/${userId}`,
      body: {
        "nome": "Fulano da Silva Editado",
        "email": "editado12345@qa.com.br",
        "password": "teste3",
        "administrador": "true"
      },
     }).then((response) => {
         expect(response.status).to.equal(201)
         expect(response.body.message).to.equal('Detalhes da conta modificados com sucesso.')
      })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    const userId = '0uxuPY0cbmQhpEz1'
    cy.request({
      method: 'DELETE',
      url: `usuarios/${userId}`,
    }).then((response) => {
      expect(response.status).to.equal(200)
    }) 
  });
});
