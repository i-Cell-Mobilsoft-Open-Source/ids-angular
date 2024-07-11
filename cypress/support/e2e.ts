// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

before(() => {
  try {
    cy.task('log', 'Reading tokens from JSON');
    cy.readFile('node_modules/@i-cell/ids-tokens/test/testData.json', 'utf-8').then((parsedContent: object) => {
      globalThis.tokens = parsedContent;
    });
  } catch (error) {
    cy.task('log', '[ERROR] Could not read tokens:', error);
  }
});
