import common = require('mocha/lib/interfaces/common');
import accordionTestData from '../data/accordionTestData';

beforeEach(() => {
    cy.visit('/components/accordion');
})

describe('ids Accordion Demo test', () => {
    const allCombinations = [] as {
        appearance: (typeof accordionTestData.allModes)[number];
        size: (typeof accordionTestData.allSizes)[number];
    }[];

    accordionTestData.allModes.forEach((appearance) => {
        accordionTestData.allSizes.forEach((size) => {
            allCombinations.push({ appearance, size });
        });
    });

    it('Checks common css rules of Accordion', () => {
        allCombinations.forEach((item) => {
            const accordionSelector = `details[idsaccordion][ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
            cy.get(accordionSelector).should('be.visible').should(($el) => {
                const styles = window.getComputedStyle($el[0]);
                expect(styles.display).to.equal(accordionTestData.display);
                expect(styles.flexDirection).to.equal(accordionTestData.flexDirection);
                expect(styles.alignItems).to.equal(accordionTestData.alignItems);
            });
        });
    });

    it('Checks the color of Accordion', () => {
        allCombinations.forEach((item) => {
            const accordionSelector = `details[idsaccordion][ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
            cy.get(accordionSelector).should('be.visible').should(($el) => {
                const styles = window.getComputedStyle($el[0]);
                expect(styles.backgroundColor).to.equal(accordionTestData.white);
                expect(styles.color).to.equal(accordionTestData.black);
            });
        });
    });

    it('Checks border color of a focused Accordion', () => {
        allCombinations.forEach((item) => {
            const accordionSelector = `details[idsaccordion][ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
            cy.get(accordionSelector).click().should('be.visible').should(($el) => {
                const styles = window.getComputedStyle($el[0]);
                expect(styles.borderTopColor).to.equal(accordionTestData.borderColor);
            });
        });
    });

    it('Checks radius of the Accordion', () => {
        allCombinations.forEach((item) => {
            const accordionSelector = `details[idsaccordion][ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
            cy.get(accordionSelector).click().should('be.visible').should(($el) => {
                const styles = window.getComputedStyle($el[0]);
                expect(styles.borderTopLeftRadius).to.equal(accordionTestData.radius);
            });
        });
    });

    it('Checks all padding of Accordion', () => {
        allCombinations.forEach((item) => {
            const accordionSelector = `details[idsaccordion][ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
            cy.get(accordionSelector).should('be.visible').should(($el) => {
                const style = window.getComputedStyle($el[0]);
                expect(style.paddingTop).to.equal(accordionTestData.padding);
            });
        });
    });

    it('Checks all GAP of Accordion', () => {
        allCombinations.forEach((item) => {
            const accordionSelector = `details[idsaccordion][ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
            cy.get(accordionSelector).should('be.visible').should(($el) => {
                const style = window.getComputedStyle($el[0]);
                expect(style.columnGap).to.equal(accordionTestData.gap);
                expect(style.rowGap).to.equal(accordionTestData.gap);
            });
        });
    });
 
    it('Check the Accordion text color', () => {
        allCombinations.forEach((item) => {
            const accordionSelector = `details[idsaccordion][ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
            cy.get(accordionSelector).find('svg').should('be.visible').then(($el) => {
                const style = window.getComputedStyle($el[0]);
                if (item.appearance === 'text') {
                    expect(style.color).to.equal(accordionTestData.textColor);
                } else {
                    expect(style.color).to.equal(accordionTestData.filledColor);
                }
            });
        });
    });

    //Text tulajdonságok
    it('Checks the subtext font sizes', () => {
        allCombinations.forEach((item) => {
            accordionTestData.allFontSize.forEach((font) => {
                accordionTestData.allLineHeight.forEach((lineHeight) => {
                    accordionTestData.allLetterSpacing.forEach((letterSpacing) => {
                        const accordionSelector = `details[idsaccordion][ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
                        cy.get(accordionSelector).should('be.visible').within(() => {
                            cy.get('summary.ids-accordion-summary > .ids-accordion-title').should('be.visible').then(($el) => {
                                const style = window.getComputedStyle($el[0]);
                                expect(style.fontSize).to.equal(font[item.size]);
                                expect(style.fontStyle).to.equal(accordionTestData.fontStyle);
                                expect(style.fontWeight).to.equal(accordionTestData.fontWeight);
                                expect(style.lineHeight).to.equal(lineHeight[item.size]);
                                expect(style.letterSpacing).to.equal(letterSpacing[item.size]);
                            });
                        });
                    });
                });
            });
        });
    });

    it('Checks the subtext of the Accordion', () => {
        allCombinations.forEach((item) => {
            const accordionSelector = `details[idsaccordion][ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
            const expectedText = `${item.appearance}-${item.size} accordion`;

            cy.get(accordionSelector).click().should('be.visible').within(() => {
                cy.get('summary.ids-accordion-summary').should('be.visible').contains(expectedText);
                cy.get('.ids-accordion-content').should('be.visible').contains('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');
            });
        });
    });

    it('Checks the subtext of the Accordion and verifies it hides on dblclick', () => {
        allCombinations.forEach((item) => {
            const accordionSelector = `details[idsaccordion][ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
            cy.get(accordionSelector).dblclick().should('not.have.attr', 'open')
        });
    });

    it('Checks the subtext parameters of the Accordion', () => {
        allCombinations.forEach((item) => {
            const accordionSelector = `details[idsaccordion][ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
            const expectedText = `${item.appearance}-${item.size} accordion`;
            accordionTestData.allGap.forEach((gap) => {
                accordionTestData.allPadding.forEach((padding) => {
                    cy.get(accordionSelector).click().should('be.visible').within(() => {
                        cy.get('summary.ids-accordion-summary').should('be.visible').contains(expectedText);
                        cy.get('.ids-accordion-content').should('be.visible').contains('Lorem Ipsum is simply dummy text of the printing and typesetting industry.').then(($el) => {
                            const style = window.getComputedStyle($el[0]);
                            expect(style.fontSize).to.equal(accordionTestData.fontSizeText);
                            expect(style.fontStyle).to.equal(accordionTestData.fontStyle);
                            expect(style.fontWeight).to.equal(accordionTestData.fontWeightText);
                            expect(style.lineHeight).to.equal(accordionTestData.lineHeightText);
                            expect(style.display).to.equal(accordionTestData.display);
                            expect(style.flexDirection).to.equal(accordionTestData.flexDirection);
                            expect(style.alignItems).to.equal(accordionTestData.alignButtonItems);
                            expect(style.columnGap).to.equal(gap[item.size]);
                            expect(style.rowGap).to.equal(gap[item.size]);
                            expect(style.paddingTop).to.equal(padding[item.size]);
                        });
                    });
                });
            });
        });
    });

    it('Checks the subtext colors of the Accordion', () => {
        allCombinations.forEach((item) => {
            const accordionSelector = `details[idsaccordion][ng-reflect-appearance="${item.appearance}"][ng-reflect-size="${item.size}"]`;
            const expectedText = `${item.appearance}-${item.size} accordion`;
            cy.get(accordionSelector).click().should('be.visible').within(() => {
                cy.get('summary.ids-accordion-summary').should('be.visible').contains(expectedText);
                cy.get('.ids-accordion-content').should('be.visible').contains('Lorem Ipsum is simply dummy text of the printing and typesetting industry.').then(($el) => {
                    const style = window.getComputedStyle($el[0]);
                    expect(style.backgroundColor).to.equal(accordionTestData.white);
                    expect(style.color).to.equal(accordionTestData.black);
                });
            });
        });
    });




});