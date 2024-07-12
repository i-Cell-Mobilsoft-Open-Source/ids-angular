import 'cypress-real-events/support';

const allSizes = [
  'compact',
  'comfortable',
  'spacious',
  'dense',
] as const;
const allVariants = [
  'primary',
  'secondary',
  'brand',
  'error',
  'success',
  'warning',
  'light',
  'dark',
  'surface'
] as const;

beforeEach(() => {
  cy.visit('/components/divider');
})

describe('ids Divider Demo test', () => {
  let comp = null;
  let compSize = null;
  const allCombinations = allSizes.flatMap((size) => allVariants.map((variant) => ({ size, variant })));

  before(() => {
    comp = globalThis.tokens.component;
    compSize = globalThis.tokens['comp-size'];
  });

  it('Checks the height of each horizontal divider', () => {
    allCombinations.forEach(({ size, variant }) => {
      const dividerSelector = `#${variant}-${size}-horizontal-divider`;
      cy.get(dividerSelector).should('be.visible').then(($el) => {
        const styles = window.getComputedStyle($el[0]);
        expect(styles.height).to.equal(compSize.divider.size.height[size]);
      });
    });
  });

  it('Checks the height of each vertical divider', () => {
    allCombinations.forEach(({ size, variant }) => {
      const dividerSelector = `#${variant}-${size}-vertical-divider`;
      cy.get(dividerSelector).should('be.visible').then(($el) => {
        const styles = window.getComputedStyle($el[0]);
        expect(styles.width).to.equal(compSize.divider.size.width[size]);
      });
    });
  });

  it('Checks the color of vertical divider', () => {
    allCombinations.forEach(({ size, variant }) => {
      const dividerSelector = `#${variant}-${size}-vertical-divider`;
      cy.get(dividerSelector).should('be.visible').then(($el) => {
        const styles = window.getComputedStyle($el[0]);
        expect(styles.backgroundColor).to.equal(comp.divider.color.bg[variant].enabled.light);
      });
    });
  });

  it('Checks the color of horizontal divider', () => {
    allCombinations.forEach(({ size, variant }) => {
      const dividerSelector = `#${variant}-${size}-horizontal-divider`;
      cy.get(dividerSelector).should('be.visible').should(($el) => {
        const styles = window.getComputedStyle($el[0]);
        expect(styles.backgroundColor).to.equal(comp.divider.color.bg[variant].enabled.light);
      });
    });
  });

  it('Checks for the existence of border radius of vertical divider', () => {
    allCombinations.forEach(({ size, variant }) => {
      const dividerSelector = `#${variant}-${size}-vertical-divider`;
      cy.get(dividerSelector).should('be.visible').should('have.css', { 'border-radius': compSize.divider.size['border-radius'][size] });
    });
  });

  it('Checks all border radius of vertical divider', () => {
    allCombinations.forEach(({ size, variant }) => {
      const dividerSelector = `#${variant}-${size}-vertical-divider`;
      cy.get(dividerSelector).should('be.visible').then(($el) => {
        const styles = window.getComputedStyle($el[0]);
        const radius = compSize.divider.size['border-radius'][size];
        expect(styles.borderBottomLeftRadius).to.equal(radius);
        expect(styles.borderBottomRightRadius).to.equal(radius);
        expect(styles.borderTopLeftRadius).to.equal(radius);
        expect(styles.borderTopLeftRadius).to.equal(radius);
      });
    });
  });

  it('Checks for the existence of border radius of horizontal divider', () => {
    allCombinations.forEach(({ size, variant }) => {
      const dividerSelector = `#${variant}-${size}-horizontal-divider`;
      cy.get(dividerSelector).should('be.visible').should('have.css', { 'border-radius': compSize.divider.size['border-radius'][size] });
    });
  });

  it('Checks all border radius of vertical divider', () => {
    allCombinations.forEach(({ size, variant }) => {
      const dividerSelector = `#${variant}-${size}-horizontal-divider`;
      cy.get(dividerSelector).should('be.visible').then(($el) => {
        const styles = window.getComputedStyle($el[0]);
        const radius = compSize.divider.size['border-radius'][size];
        expect(styles.borderBottomLeftRadius).to.equal(radius);
        expect(styles.borderBottomRightRadius).to.equal(radius);
        expect(styles.borderTopLeftRadius).to.equal(radius);
        expect(styles.borderTopLeftRadius).to.equal(radius);
      });
    });
  });

});
