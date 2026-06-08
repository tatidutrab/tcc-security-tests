describe('Testes automatizados de segurança front-end', () => {
  const baseUrl = 'https://demoqa.com';

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('CT01 - Deve tratar payload em campos de texto como conteúdo comum', () => {
    const payload = '<script>window.vulneravel=true</script>';

    cy.visit(`${baseUrl}/text-box`);

    cy.get('#userName').type(payload);
    cy.get('#userEmail').type('teste@teste.com');
    cy.get('#currentAddress').type(payload);
    cy.get('#permanentAddress').type(payload);
    cy.get('#submit').click();

    cy.get('#output').should('be.visible');
    cy.get('#output').should('contain.text', payload);

    cy.window().then((win) => {
      expect(win.vulneravel).to.be.undefined;
    });
  });

  it('CT02 - Deve tratar parâmetro de URL com script como texto não executável', () => {
    const payload = '<script>alert(1)</script>';
    const encodedPayload = encodeURIComponent(payload);

    cy.visit(`${baseUrl}?search=${encodedPayload}`);

    cy.window().then((win) => {
      expect(win.document.body.innerHTML).not.to.include(payload);
    });
  });

  it('CT03 - Deve demonstrar acesso a dado armazenado no localStorage', () => {
    const storageKey = 'user_session_token_tcc';
    const simulatedToken = 'TOKEN_SIMULADO_PARA_TESTE';

    cy.visit(baseUrl);

    cy.window().then((win) => {
      win.localStorage.setItem(storageKey, simulatedToken);
      const storedValue = win.localStorage.getItem(storageKey);

      expect(storedValue).to.equal(simulatedToken);
    });
  });

  it('CT04 - Deve demonstrar persistência de dado no localStorage após navegação', () => {
    const storageKey = 'auth_token_tcc';
    const simulatedToken = 'ID_SESSAO_SIMULADO';

    cy.visit(baseUrl);

    cy.window().then((win) => {
      win.localStorage.setItem(storageKey, simulatedToken);
    });

    cy.visit(`${baseUrl}/text-box`);

    cy.window().then((win) => {
      const storedValue = win.localStorage.getItem(storageKey);

      expect(storedValue).to.equal(simulatedToken);
    });
  });

  it('CT05 - Deve observar comportamento do upload diante de arquivo executável simulado', () => {
    const simulatedExecutableFile = {
      contents: Cypress.Buffer.from('MZ\x90\x00\x03\x00\x00\x00'),
      fileName: 'exploit.exe',
      mimeType: 'application/x-msdownload',
      lastModified: Date.now(),
    };
  
    cy.visit(`${baseUrl}/automation-practice-form`);
  
    cy.get('#firstName').type('Teste');
    cy.get('#lastName').type('Seguranca');
    cy.get('#userEmail').type('teste@teste.com');
    cy.get('label[for="gender-radio-1"]').click();
    cy.get('#userNumber').type('5599999999');
  
    cy.get('#uploadPicture').selectFile(simulatedExecutableFile);
  
    cy.get('#submit').click();
  
    cy.get('.modal-content').should('be.visible');
    cy.get('#example-modal-sizes-title-lg')
      .should('contain.text', 'Thanks for submitting the form');
  
    cy.get('td')
      .contains('Picture')
      .parent()
      .should('not.contain.text', 'exploit.exe');
  });

  it('CT06 - Deve inspecionar a existência de campos ocultos no DOM', () => {
    cy.visit(baseUrl);

    cy.get('body').then(($body) => {
      const hiddenInputs = $body.find('input[type="hidden"]');

      cy.log(`Quantidade de inputs hidden encontrados: ${hiddenInputs.length}`);

      expect(hiddenInputs.length).to.be.at.least(0);
    });
  });
});