import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message: string) {
          console.log(message);

          return null;
        },
      });
    },
    specPattern: 'cypress/e2e/**/*.cy.ts',
    baseUrl: 'http://localhost:4200',
  },
});
