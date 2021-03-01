describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Tester',
      username: 'test',
      password: 'tester'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in').click()
  })

  describe('Login', function(){
    it('user can log in', function() {
      cy.contains('log in').click()
      cy.get('#username').type('test')
      cy.get('#password').type('tester')
      cy.get('#login-button').click()

      cy.contains('Tester logged-in')
    })

    it('login fails with wrong password', function() {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'tester' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('yooo')
      cy.get('#url').type('url.es')
      cy.contains('save').click()
      cy.contains('TITLE: a blog created by cypress AUTHOR: yoo')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another blog cypress',
          author: 'moi',
          url: 'jiji.es'
        })
      })

      it('it can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.get('html').should('contain', 'likes 1')
      })

      it('you can delete it', function () {
        cy.contains('view').click()
        cy.contains('delete').click()
        cy.get('html').should('not.contain', 'another blog cypress')
      })

      describe('and two more blogs exist', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'a super liked blog cypress',
            author: 'moi',
            url: 'jiji.es',
            likes: 1001
          })
          cy.createBlog({
            title: 'a somewhat noticed blog cypress',
            author: 'moi',
            url: 'jiji.es',
            likes: 50
          })
        })

        it('blogs are organized by most likes', function () {
          cy.get('#0').contains('a super liked blog cypress')
          cy.get('#1').contains('a somewhat noticed blog cypress')
          cy.get('#2').contains('another blog cypress')
        })
      })
    })
  })
})