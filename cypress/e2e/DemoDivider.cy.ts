import dividerTestData from '../data/dividerTestData';
import 'cypress-real-events/support';

beforeEach(() => {
  cy.visit('/components/dividers');
})

describe('ids Divider Demo test', () => {
  const allCombinations = [] as {
    size: (typeof dividerTestData.allSizes)[number];
    variant: (typeof dividerTestData.allVariants)[number];
  }[];

  dividerTestData.allSizes.forEach((size) => {
    dividerTestData.allVariants.forEach((variant) => {
      allCombinations.push({ size, variant });
    });
  });

  it('Checks width of horizontal divider', () => {
    allCombinations.forEach((item) => {
      const dividerSelector = `#${item.variant}-${item.size}-horizontal-divider`;
      cy.get(dividerSelector).should('be.visible')//.invoke('width', '300px').should('be.visible') => funkcionális teszt, felületen új értéket (300px) beírva tesztelhető azzal az értékkel (is)
        .should('have.css', 'width').and('eq', dividerTestData.verticalWidth);
    });
  });

  it('Checks heigth of vertical divider', () => {
    allCombinations.forEach((item) => {
      const dividerSelector = `#${item.variant}-${item.size}-vertical-divider`;
      cy.get(dividerSelector).should('be.visible')
        .should('have.css', 'height').and('eq', dividerTestData.verticalHeight);
    });
  });

  it('Checks the height of each horizontal divider', () => {
    allCombinations.forEach((item) => {
      dividerTestData.allHeight.forEach((height) => {
        const dividerSelector = `#${item.variant}-${item.size}-horizontal-divider`;
        cy.get(dividerSelector).should('be.visible').then(($el) => {
          const styles = window.getComputedStyle($el[0]);
          expect(styles.height).to.equal(height[item.size]);
        });
      });
    });
  });

  it('Checks the height of each vertical divider', () => {
    allCombinations.forEach((item) => {
      dividerTestData.allWidth.forEach((width) => {
        const dividerSelector = `#${item.variant}-${item.size}-vertical-divider`;
        cy.get(dividerSelector).should('be.visible').then(($el) => {
          const styles = window.getComputedStyle($el[0]);
          expect(styles.width).to.equal(width[item.size]);
        });
      });
    });
  });

  it('Checks common css rules of vertical divider', () => {
    allCombinations.forEach((item) => {
      dividerTestData.common.forEach((common) => {
        const dividerSelector = `#${item.variant}-${item.size}-vertical-divider`;
        cy.get(dividerSelector).should('be.visible').then(($el) => {
          expect($el).to.have.css('flex-shrink', common['flexShrink']);
          //expect($el).to.have.css('height', common['height']);
          expect($el).to.have.css('align-items', common['alignItems']);
          expect($el).to.have.css('display', common['display']);
          expect($el).to.have.css('justify-content', common['justifyContent']);
        });
      });
    });

  });

  it('Checks common css rules of horizontal divider', () => {
    allCombinations.forEach((item) => {
      dividerTestData.common.forEach((common) => {
        const dividerSelector = `#${item.variant}-${item.size}-horizontal-divider`;
        cy.get(dividerSelector).should('be.visible').then(($el) => {
          expect($el).to.have.css('flex-shrink', common['flexShrink']);
          //expect($el).to.have.css('width', common['width']);
          expect($el).to.have.css('align-items', common['alignItems']);
          expect($el).to.have.css('display', common['display']);
          expect($el).to.have.css('justify-content', common['justifyContent']);
        });
      });
    });
  });

  it('Checks the color of vertical divider', () => {
    allCombinations.forEach((item) => {
      dividerTestData.enabledBgColors.forEach((bgColor) => {
        const dividerSelector = `#${item.variant}-${item.size}-vertical-divider`;
        cy.get(dividerSelector).should('be.visible').should(($el) => {
          const styles = window.getComputedStyle($el[0]);
          expect(styles.backgroundColor).to.equal(bgColor[item.variant]);
        });
      });
    });
  });

  it('Checks the color of horizontal divider', () => {
    allCombinations.forEach((item) => {
      dividerTestData.enabledBgColors.forEach((bgColor) => {
        const dividerSelector = `#${item.variant}-${item.size}-horizontal-divider`;
        cy.get(dividerSelector).should('be.visible').should(($el) => {
          const styles = window.getComputedStyle($el[0]);
          expect(styles.backgroundColor).to.equal(bgColor[item.variant]);
        });
      });
    });
  });

  it('Checks for the existence of border radius of vertical divider', () => {
    allCombinations.forEach((item) => {
      const dividerSelector = `#${item.variant}-${item.size}-vertical-divider`;
      cy.get(dividerSelector).should('be.visible').should('have.css', { 'border-radius': dividerTestData.allRadius });
    });
  });

  it('Checks all border radius of vertical divider', () => {
    allCombinations.forEach((item) => {
      const dividerSelector = `#${item.variant}-${item.size}-vertical-divider`;
      cy.get(dividerSelector).should('be.visible').then(($el) => {
        const styles = window.getComputedStyle($el[0]);
        expect(styles.borderBottomLeftRadius).to.equal(dividerTestData.allRadius);
        expect(styles.borderBottomRightRadius).to.equal(dividerTestData.allRadius);
        expect(styles.borderTopLeftRadius).to.equal(dividerTestData.allRadius);
        expect(styles.borderTopLeftRadius).to.equal(dividerTestData.allRadius);
      });
    });
  });

  it('Checks for the existence of border radius of horizontal divider', () => {
    allCombinations.forEach((item) => {
      const dividerSelector = `#${item.variant}-${item.size}-horizontal-divider`;
      cy.get(dividerSelector).should('be.visible').should('have.css', { 'border-radius': dividerTestData.allRadius });
    });
  });

  it('Checks all border radius of vertical divider', () => {
    allCombinations.forEach((item) => {
      const dividerSelector = `#${item.variant}-${item.size}-horizontal-divider`;
      cy.get(dividerSelector).should('be.visible').then(($el) => {
        const styles = window.getComputedStyle($el[0]);
        expect(styles.borderBottomLeftRadius).to.equal(dividerTestData.allRadius);
        expect(styles.borderBottomRightRadius).to.equal(dividerTestData.allRadius);
        expect(styles.borderTopLeftRadius).to.equal(dividerTestData.allRadius);
        expect(styles.borderTopLeftRadius).to.equal(dividerTestData.allRadius);
      });
    });
  });

  it('Checks all padding of vertical divider', () => {
    allCombinations.forEach((item) => {
      const dividerSelector = `#${item.variant}-${item.size}-vertical-divider`;
      cy.get(dividerSelector).should('be.visible').then(($el) => {
        const styles = window.getComputedStyle($el[0]);
        expect(styles.paddingTop).to.equal(dividerTestData.allPadding);
        expect(styles.paddingBottom).to.equal(dividerTestData.allPadding);
        expect(styles.paddingLeft).to.equal(dividerTestData.allPadding);
        expect(styles.paddingRight).to.equal(dividerTestData.allPadding);
      });
    });
  });

  it('Checks all padding of horizontal divider', () => {
    allCombinations.forEach((item) => {
      const dividerSelector = `#${item.variant}-${item.size}-horizontal-divider`;
      cy.get(dividerSelector).should('be.visible').then(($el) => {
        const styles = window.getComputedStyle($el[0]);
        expect(styles.paddingTop).to.equal(dividerTestData.allPadding);
        expect(styles.paddingBottom).to.equal(dividerTestData.allPadding);
        expect(styles.paddingLeft).to.equal(dividerTestData.allPadding);
        expect(styles.paddingRight).to.equal(dividerTestData.allPadding);
      });
    });
  });

});
