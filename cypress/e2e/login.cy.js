describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
    cy.on('uncaught:exception', () => false);
  });

  it('should login successfully with valid credentials', () => {
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        status: 'success',
        data: { token: 'fake-token' },
      },
    }).as('loginRequest');

    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        data: { user: { id: '1', name: 'Test User' } },
      },
    }).as('getUser');

    cy.get('input[placeholder="Masukkan email"]').type('test@gmail.com');
    cy.get('input[placeholder="Masukkan password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.wait('@getUser');

    cy.url().should('include', '/');
    cy.contains('Daftar Thread').should('be.visible');
  });

  it('should show error message with invalid credentials', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError');
    });

    cy.intercept('POST', '**/login', {
      statusCode: 401,
      body: {
        status: 'fail',
        message: 'Invalid credentials',
      },
    }).as('loginFail');

    cy.get('input[placeholder="Masukkan email"]').type('wrong@gmail.com');
    cy.get('input[placeholder="Masukkan password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginFail');

    cy.get('@consoleError').should('be.calledWith', 'Invalid credentials');
  });
});
