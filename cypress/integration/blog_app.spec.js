describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser({ name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen' })
    cy.createUser({ name: 'Arto Hellas', username: 'hellas', password: 'sekret' })
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username')
        .type('mluukkai')
      cy.get('#password')
        .type('salainen')
      cy.get('#login-button')
        .click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username')
        .type('mluukkai')
      cy.get('#password')
        .type('wrong')
      cy.get('#login-button')
        .click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html')
        .should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog')
        .click()
      cy.get('#title')
        .type('a note created by cypress')
      cy.get('#author')
        .type('Yomi Oladele')
      cy.get('#url')
        .type('www.cypress.com')
      cy.get('#createBlog')
        .click()

      cy.contains('a note created by cypress Yomi Oladele')
    })

    describe('and blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another note cypress 1',
          author: 'Mike Adell',
          url: 'www.gogogo.com'
        })
        cy.createBlog({
          title: 'another note cypress 2',
          author: 'Ben Adell',
          url: 'www.gofish.com'
        })
        cy.createBlog({
          title: 'another note cypress 3',
          author: 'Mike Adellin',
          url: 'www.grant.com'
        })
      })

      it('any of those can be liked', function () {
        cy.contains('another note cypress 2')
          .parent()
          .find('#viewButton')
          .click()
        cy.contains('another note cypress 2')
          .parent()
          .find('#likeButton')
          .click()
        cy.contains('another note cypress 2')
          .contains('Ben Adell')
          .contains('http://gofish.com')
          .contains(1)
      })

      it('user who created the blog can delete it', function () {
        cy.contains('another note cypress 3')
          .parent()
          .find('#viewButton')
          .click()
        cy.contains('another note cypress 3')
          .parent()
          .find('#deleteButton')
          .click()
        cy.get('form')
          .parent()
          .should('not.contain', 'another note cypress 3')
      })

      describe('for other signed in user', function () {
        beforeEach(function () {
          cy.login({ username: 'hellas', password: 'sekret' })
        })

        it('this user can also like blogs created by other users', function () {
          cy.contains('another note cypress 1')
            .parent().find('#viewButton')
            .click()
          cy.contains('another note cypress 1')
            .parent().find('#likeButton')
            .click()
          cy.contains('another note cypress 1')
            .contains('Mike Adell')
            .contains('http://gogogo.com')
            .contains(1)
        })

        it('this user can not delete blogs created by others', function () {
          cy.contains('another note cypress 2')
            .parent()
            .find('#viewButton')
            .click()
            .should('not.contain', '#deleteButton')
          cy.contains('another note cypress 2')
        })
      })
    })
  })
})