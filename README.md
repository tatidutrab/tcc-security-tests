# TCC Security Tests

Projeto desenvolvido como parte do Trabalho de Conclusão de Curso do MBA em Engenharia de Software EAD da USP/ESALQ.

## Objetivo

Investigar a utilização de ferramentas open source no apoio ao gerenciamento, implementação e execução de testes de segurança voltados à camada front-end de aplicações web, utilizando como referência as recomendações do OWASP Web Security Testing Guide (WSTG).

## Contexto da Pesquisa

A pesquisa foi desenvolvida por meio de estudo de caso em ambiente controlado, utilizando uma aplicação web pública para a execução de cenários experimentais relacionados à segurança do lado cliente (Client-Side Security Testing).

Os cenários implementados contemplam aspectos como:

- Validação de entradas de dados;
- Testes relacionados a Cross-Site Scripting (XSS);
- Armazenamento de informações no navegador;
- Persistência de dados em localStorage;
- Upload de arquivos;
- Inspeção de elementos presentes no DOM.

## Tecnologias Utilizadas

- Cypress 15.14.2
- JavaScript
- Node.js
- Mocha
- Chai

## Referencial Utilizado

- OWASP Web Security Testing Guide (WSTG) v4.2
- ISO/IEC 27002
- Literatura relacionada à segurança da informação e aplicações front-end

## Aplicação-Alvo

DemoQA (ToolsQA)

https://demoqa.com

## Estrutura do Projeto
securityTests.cy.js](https://github.com/tatidutrab/tcc-security-tests/blob/master/cypress/e2e/securityTests.cy.js)

```text
cypress/
└── e2e/
    └── securityTests.cy.js

package.json
README.md
```

## Autor

Tatiana Dutra

MBA em Engenharia de Software
USP/ESALQ

## Finalidade

Este repositório possui finalidade exclusivamente acadêmica e foi criado para disponibilizar os artefatos técnicos utilizados na pesquisa, favorecendo a transparência e a reprodutibilidade dos experimentos realizados.
