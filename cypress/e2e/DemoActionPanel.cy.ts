import common = require('mocha/lib/interfaces/common');
import actionPanelTestData from '../data/actionPanelTestData';

beforeEach(() => {
    cy.visit('/components/overlay-panel');
})

describe('ids Action Item Button Demo test', () => {
    const allCombinations = [] as {
        appearance: (typeof actionPanelTestData.allModes)[number];
        size: (typeof actionPanelTestData.allSizes)[number];
        variant: (typeof actionPanelTestData.allVariants)[number];
    }[];

    actionPanelTestData.allModes.forEach((appearance) => {
        actionPanelTestData.allSizes.forEach((size) => {
            actionPanelTestData.allVariants.forEach((variant) => {
                allCombinations.push({ appearance, size, variant });
            });
        });
    });

    it('Checks the height of Overlay Panel', () => {
        allCombinations.forEach((item) => {
            actionPanelTestData.allWidth.forEach((width) => {
                const actionPanelSelector = `ids-overlay-panel[ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
                cy.get(actionPanelSelector).should('be.visible').should(($el) => {
                    expect($el).to.have.css('width', width[item.size]);
                });
            });
        });
    });

    it('Checks common css rules of Overlay Panel', () => {
        allCombinations.forEach((item) => {
            const actionPanelSelector = `ids-overlay-panel[ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
            cy.get(actionPanelSelector).should('be.visible').should(($el) => {
                const styles = window.getComputedStyle($el[0]);
                expect(styles.display).to.equal(actionPanelTestData.display);
                expect(styles.width).to.equal(actionPanelTestData.width);
                expect(styles.flexDirection).to.equal(actionPanelTestData.flexDirection);
                expect(styles.alignItems).to.equal(actionPanelTestData.alignItems);
            });

        });
    });

    it('Checks the color of Overlay Panel', () => {
        allCombinations.forEach((item) => {
            const actionPanelSelector = `ids-overlay-panel[ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
            cy.get(actionPanelSelector).should('be.visible').should(($el) => {
                const styles = window.getComputedStyle($el[0]);
                expect(styles.backgroundColor).to.equal(actionPanelTestData.white);
                expect(styles.color).to.equal(actionPanelTestData.black);
            });
        });
    });

    it('Checks outline border color of Overlay Panel', () => {
        allCombinations.forEach((item) => {
            const actionPanelSelector = `ids-overlay-panel[ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
            if (item.appearance === 'elevated') {
                cy.get(actionPanelSelector).click().should('be.visible').should(($el) => {
                    const styles = window.getComputedStyle($el[0]);
                    expect(styles.borderTopColor).to.equal(actionPanelTestData.elevatedBorderColor);
                });
            } else if (item.appearance === 'outlined') {
                cy.get(actionPanelSelector).click().should('be.visible').should(($el) => {
                    const styles = window.getComputedStyle($el[0]);
                    expect(styles.borderTopColor).to.equal(actionPanelTestData.outlinedBorderColor);
                });
            } else {
                cy.get(actionPanelSelector).click().should('be.visible').should(($el) => {
                    const styles = window.getComputedStyle($el[0]);
                    expect(styles.borderTopColor).to.equal(actionPanelTestData.filledBorderColor);
                });
            }
        });
    });

    it('Checks radius of Panel', () => {
        allCombinations.forEach((item) => {
            actionPanelTestData.allRadius.forEach((radius) => {
                const actionPanelSelector = `ids-overlay-panel[ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
                cy.get(actionPanelSelector).should('be.visible').then(($el) => {
                    const styles = window.getComputedStyle($el[0]);
                    expect(styles.borderTopLeftRadius).to.equal(radius[item.size]);
                    expect(styles.borderTopRightRadius).to.equal(radius[item.size]);
                    expect(styles.borderBottomLeftRadius).to.equal(radius[item.size]);
                    expect(styles.borderBottomRightRadius).to.equal(radius[item.size]);
                });
            });
        });
    });

    it('Checks all padding of Overlay Panel', () => {
        allCombinations.forEach((item) => {
            actionPanelTestData.allPadding.forEach((padding) => {
                const actionPanelSelector = `ids-overlay-panel[ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
                cy.get(actionPanelSelector).should('be.visible').then(($el) => {
                    const styles = window.getComputedStyle($el[0]);
                    expect(styles.paddingTop).to.equal(padding[item.size]);
                    expect(styles.paddingLeft).to.equal(padding[item.size]);
                    expect(styles.paddingBottom).to.equal(padding[item.size]);
                    expect(styles.paddingRight).to.equal(padding[item.size]);
                });
            });
        });
    });

    it('Checks all GAP of Overlay Panel', () => {
        allCombinations.forEach((item) => {
            actionPanelTestData.allGap.forEach((gap) => {
                const actionPanelSelector = `ids-overlay-panel[ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
                cy.get(actionPanelSelector).should('be.visible').should(($el) => {
                    const styles = window.getComputedStyle($el[0]);
                    expect(styles.columnGap).to.equal(gap[item.size]);
                    expect(styles.rowGap).to.equal(gap[item.size]);
                });
            });
        });
    });
// BUG ticket => IDS-501
    it('Checks box-shadow of Overlay Panel', () => {
        allCombinations.forEach((item) => {
            const actionPanelSelector = `ids-overlay-panel[ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
            if (item.appearance === 'filled') {
                cy.get(actionPanelSelector).click().should('be.visible').should(($el) => {
                    const styles = window.getComputedStyle($el[0]);
                    expect(styles.boxShadow).to.equal('none');
                });
            }
            else if (item.appearance === 'elevated') {
                cy.get(actionPanelSelector).click().should('be.visible').should(($el) => {
                    const styles = window.getComputedStyle($el[0]);
                    expect(styles.boxShadow).to.equal(actionPanelTestData.elevatedBoxShadow);
                });
            } else {
                cy.get(actionPanelSelector).click().should('be.visible').should(($el) => {
                    const styles = window.getComputedStyle($el[0]);
                    expect(styles.boxShadow).to.equal(actionPanelTestData.outlineBoxShadow);
                });
            }
        });
    });


});