// cypress/integration/spec.js
context('Simple render and routing', () => {
  it('loads page that do not exists', () => {
    cy.visit('/not-found')
    cy.get('.not-found-page')
  })

  it('loads normal page and try to access user page without login', () => {
    cy.visit('/')

    // click on button to go to user page
    cy.get('.header-component-btn').eq(0).click()

    // it must be redirected to login
    cy.url().should('include', '/login')

    // fill form with wrong mail and should require valid mail
    cy.get('.ant-input').eq(0).type('Jonh Doe')
    cy.get('.ant-input').eq(1).type('123123')
    cy.get('.login-form-confirm-button').click()
    cy.get('.ant-form-item-explain').contains("'email' is not a valid email")

    // fill with valid mail and no password
    cy.get('.ant-input').eq(0).clear()
    cy.get('.ant-input').eq(0).type('john@mail.com')
    cy.get('.ant-input').eq(1).clear()
    cy.get('.login-form-confirm-button').click()
    cy.get('.ant-form-item-explain').contains("'password' is required")

    // login and go to order page
    cy.get('.ant-input').eq(1).type('123123')
    cy.get('.login-form-confirm-button').click()
    cy.url().should('include', '/user')

    // navigate back to landing and then user page, it expects not to require login again
    cy.visit('/')
    cy.get('.header-component-btn').eq(0).click()
    cy.url().should('include', '/user')

    // delete last item
    cy.get('.anticon-delete').last().click()
    cy.get('.ant-btn-primary').contains('Yes').click({force: true})
    cy.get('.ant-table-cell').should('not.have.value', '#ord-2018-b6012cc8')

    // edit first item and check if changed after open modal again
    cy.get('.anticon-edit').last().click()
    cy.get(".order-form-modal-component").should('be.visible');
    cy.get('.ant-select').click()
    cy.get(".ant-select-item-option-content").eq(1).click();
    cy.get(".okBtn").click();
    cy.get('.anticon-edit').last().click()
    cy.get('.ant-select-selection-item').last().contains("pending")

    // close modal and logout
    cy.get(".cancelBtn").click();
    cy.get(".header-component-link").click();
    cy.url().should('eq', 'http://localhost:3001/')


  })
})
