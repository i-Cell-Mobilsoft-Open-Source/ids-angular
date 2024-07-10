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
import { readTokens } from './readTokens';

before(() => {
  try {
    cy.task('log', 'Reading tokens from JSON');
    cy.readFile('node_modules/@i-cell/ids-tokens/tokens/tokens.json', 'utf-8').then((parsedContent: object) => {
      globalThis.tokens = readTokens(parsedContent);
    });
  } catch (error) {
    cy.task('error', 'Could not read tokens:', error);
  }
});
