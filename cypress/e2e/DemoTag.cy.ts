import tagTestData from '../data/tagTestData';
import 'cypress-real-events/support';

beforeEach(() => {
    cy.visit('/components/tag');
})

describe('ids tags Demo test', () => {
    const allCombinations = [] as {
        mode: (typeof tagTestData.allModes)[number];
        size: (typeof tagTestData.allSizes)[number];
        variant: (typeof tagTestData.allVariants)[number];
    }[];

    tagTestData.allModes.forEach((mode) => {
        tagTestData.allSizes.forEach((size) => {
            tagTestData.allVariants.forEach((variant) => {
                allCombinations.push({ mode, size, variant });
            });
        });
    });

    it('Checks the height of tags', () => {
        allCombinations.forEach((item) => {
            tagTestData.allHeight.forEach((height) => {
                const tagSelector = `#${item.mode}-${item.variant}-${item.size}-tag`;
                cy.get(tagSelector).should('be.visible').should(($el) => {
                    expect($el).to.have.css('height', height[item.size]);
                });
            });
        });
    });

    it('Checks the width and height of tags leading icon', () => {
        allCombinations.forEach((item) => {
            tagTestData.allLeadingHeight.forEach((height) => {
                tagTestData.allLeadingWidth.forEach((width) => {
                    const tagSelector = `#${item.mode}-${item.variant}-${item.size}-tag`;
                    cy.get(tagSelector).find('svg').should('exist').should(($el) => {
                        const styles = window.getComputedStyle($el[0]);
                        expect(styles.height).to.equal(height[item.size]);
                        expect(styles.width).to.equal(width[item.size]);
                    });
                });
            });
        });
    });

    it('Checks the width and height of tags trailing icon', () => {
        allCombinations.forEach((item) => {
            tagTestData.allLeadingHeight.forEach((height) => {
                tagTestData.allLeadingWidth.forEach((width) => {
                    const tagSelector = `#${item.mode}-${item.variant}-${item.size}-tag`;
                    cy.get(tagSelector).find('svg').should('exist').should(($el) => {
                        const styles = window.getComputedStyle($el[1]);
                        expect(styles.height).to.equal(height[item.size]);
                        expect(styles.width).to.equal(width[item.size]);
                    });
                });
            });
        });
    });

    it('Checks common css rules of tags', () => {
        allCombinations.forEach((item) => {
            tagTestData.common.forEach((common) => {
                const tagSelector = `#${item.mode}-${item.variant}-${item.size}-tag`;
                cy.get(tagSelector)
                    .should('be.visible')
                    .should('have.css', 'flex-shrink', common['flexShrink'])
                    .should('have.css', 'font-weight', common['fontWeight'])
                    .should('have.css', 'align-items', common['alignItems'])
                    .should('have.css', 'display', common['display'])
                    .should('have.css', 'justify-content', common['justifyContent']);
            });
        });
    });

    it('Checks the font-size of tags', () => {
        allCombinations.forEach((item) => {
            tagTestData.allFontSize.forEach((font) => {
                const tagSelector = `#${item.mode}-${item.variant}-${item.size}-tag`;
                cy.get(tagSelector).should('be.visible').should(($el) => {
                    const styles = window.getComputedStyle($el[0]);
                    expect(styles.fontSize).to.equal(font[item.size]);
                    expect(styles.fontWeight).to.equal(tagTestData.allFontWeight);
                });
            });
        });
    });

    it('Checks the line-height of tags', () => {
        allCombinations.forEach((item) => {
            tagTestData.allLineHeight.forEach((lineHeigt) => {
                const tagSelector = `#${item.mode}-${item.variant}-${item.size}-tag`;
                cy.get(tagSelector).should('be.visible').should(($el) => {
                    const styles = window.getComputedStyle($el[0]);
                    expect(styles.lineHeight).to.equal(lineHeigt[item.size]);
                });
            });
        });
    });

    it('Checks the color of tags', () => {
        allCombinations.forEach((item) => {
            tagTestData.enabledBgColors.forEach((bgColor) => {
                tagTestData.enabledColors.forEach((color) => {
                    const tagSelector = `#${item.mode}-${item.variant}-${item.size}-tag`;
                    if (item.mode === 'filled') {
                        cy.get(tagSelector).should('be.visible').should(($el) => {
                            const styles = window.getComputedStyle($el[0]);
                            expect(styles.backgroundColor).to.equal(bgColor[item.variant]);
                            expect(styles.color).to.equal(color[item.variant]);
                        });
                    } else {
                        cy.get(tagSelector).should('be.visible').should(($el) => {
                            const styles = window.getComputedStyle($el[0]);
                            expect(styles.backgroundColor).to.equal(tagTestData.white);
                            expect(styles.color).to.equal(bgColor[item.variant]);
                        });
                    }
                });
            });
        });
    });

    it('Checks the color of tags leading Icon', () => {
        allCombinations.forEach((item) => {
            tagTestData.enabledBgColors.forEach((bgColor) => {
                tagTestData.enabledColors.forEach((color) => {
                    const tagSelector = `#${item.mode}-${item.variant}-${item.size}-tag`;
                    if (item.mode === 'filled') {
                        cy.get(tagSelector).find('svg').should('exist').should(($el) => {
                            const styles = window.getComputedStyle($el[0]);
                            expect(styles.color).to.equal(color[item.variant]);
                        });
                    } else {
                        cy.get(tagSelector).find('svg').should('exist').should(($el) => {
                            const styles = window.getComputedStyle($el[0]);
                            expect(styles.color).to.equal(bgColor[item.variant]);
                        });
                    }
                });
            });
        });
    });

    it('Checks the color of tags trailing Icon', () => {
        allCombinations.forEach((item) => {
            tagTestData.enabledBgColors.forEach((bgColor) => {
                tagTestData.enabledColors.forEach((color) => {
                    const tagSelector = `#${item.mode}-${item.variant}-${item.size}-tag`;
                    if (item.mode === 'filled') {
                        cy.get(tagSelector).find('svg').should('exist').should(($el) => {
                            const styles = window.getComputedStyle($el[1]);
                            expect(styles.color).to.equal(color[item.variant]);
                        });
                    } else {
                        cy.get(tagSelector).find('svg').should('exist').should(($el) => {
                            const styles = window.getComputedStyle($el[1]);
                            expect(styles.color).to.equal(bgColor[item.variant]);
                        });
                    }
                });
            });
        });
    });

    it('Checks color and background color of tags with hovered state', () => {
        allCombinations.forEach((item) => {
            tagTestData.hoveredBgColors.forEach((bgColor) => {
                tagTestData.hoveredOutlineColors.forEach((outlineColor) => {
                    tagTestData.focusedColors.forEach((color) => {
                        const button = cy.get(`#${item.mode}-${item.variant}-${item.size}-tag`);
                        if (item.mode === 'outlined') {
                            button.realHover({ pointer: "mouse" }).should(($el) => {
                                const styles = window.getComputedStyle($el[0]);
                                expect(styles.backgroundColor).to.equal(tagTestData.hoverdOutlineBg);
                                expect(styles.color).to.equal(outlineColor[item.variant]);
                            });
                        } else {
                            button.realHover({ pointer: "mouse" }).should(($el) => {
                                const styles = window.getComputedStyle($el[0]);
                                expect(styles.backgroundColor).to.equal(bgColor[item.variant]);
                                expect(styles.color).to.equal(color[item.variant]);
                            });
                        }
                    });
                });
            });
        });
    });

    it('Checks focused state of tags', () => {
        allCombinations.forEach((item) => {
            const tagSelector = `#${item.mode}-${item.variant}-${item.size}-tag`;
            if (item.variant === 'light') {
                cy.get(tagSelector).click().should('have.focus').should('be.visible')
                    .should('have.css', 'outline').and('eq', tagTestData.white2);
            } else {
                cy.get(tagSelector).click().should('have.focus').should('be.visible')
                    .should('have.css', 'outline').and('eq', tagTestData.black);
            }
        });
    });

    it('Checks color of tags with FOCUSED state', () => {
        allCombinations.forEach((item) => {
            tagTestData.focusedBgColors.forEach((bgColor) => {
                tagTestData.focusedColors.forEach((color) => {
                    tagTestData.focusedOutlineColors.forEach((outlineColor) => {
                        const button = cy.get(`#${item.mode}-${item.variant}-${item.size}-tag`);
                        if (item.mode === 'outlined') {
                            button.realClick({ pointer: "mouse" }).should(($el) => {
                                const styles = window.getComputedStyle($el[0]);
                                expect(styles.backgroundColor).to.equal(tagTestData.white);
                                expect(styles.color).to.equal(outlineColor[item.variant]);
                            });
                        } else {
                            button.realClick({ pointer: "mouse" }).should(($el) => {
                                const styles = window.getComputedStyle($el[0]);
                                expect(styles.backgroundColor).to.equal(bgColor[item.variant]);
                                expect(styles.color).to.equal(color[item.variant]);
                            });
                        }
                    });
                });
            });
        });
    });

    it('Checks color of tags with active (pressed) state', () => {
        allCombinations.forEach((item) => {
            tagTestData.activeBgColors.forEach((bgColor) => {
                tagTestData.focusedColors.forEach((color) => {
                    tagTestData.activeOutlineColors.forEach((outlineColor) => {
                        const buttonSelector = `#${item.mode}-${item.variant}-${item.size}-tag`;
                        cy.get(buttonSelector).then(button => {
                            cy.wrap(button).realMouseDown({ pointer: "mouse" }).should(($el) => {
                                const styles = window.getComputedStyle($el[0]);
                                if (item.mode === 'outlined') {
                                    expect(styles.backgroundColor).to.equal(tagTestData.activeOutlineBg);
                                    expect(styles.color).to.equal(outlineColor[item.variant]);
                                } else {
                                    expect(styles.backgroundColor).to.equal(bgColor[item.variant]);
                                    expect(styles.color).to.equal(color[item.variant]);
                                }
                            }).realMouseUp({ pointer: "mouse" });
                        });
                    });
                });
            });
        });
    });

    // it('Checks color of disabled state tags', () => {
    //     allCombinations.forEach((item) => {
    //         if (item.variant === 'error' || item.variant === 'success' || item.variant === 'warning') {
    //             return;
    //         }
    //         const button = cy.get(`#${item.mode}-${item.variant}-${item.size}-disabled-tag`);
    //         if (item.mode === 'outlined') {
    //             button.should(($el) => {
    //                 const styles = window.getComputedStyle($el[0]);
    //                 expect(styles.backgroundColor).to.equal(tagTestData.white);
    //                 expect(styles.color).to.equal(tagTestData.disabledTextColors);
    //             });
    //         } else {
    //             button.should(($el) => {
    //                 const styles = window.getComputedStyle($el[0]);
    //                 expect(styles.backgroundColor).to.equal(tagTestData.disabledBgColors);
    //                 expect(styles.color).to.equal(tagTestData.disabledTextColors);
    //             });
    //         }
    //     });
    // });

    it('Checks left and right border radius of tags', () => {
        allCombinations.forEach((item) => {
            tagTestData.Radius.forEach((allRadius) => {
                const avatarSelector = `#${item.mode}-${item.variant}-${item.size}-tag`;
                cy.get(avatarSelector).should('be.visible').then(($el) => {
                    const styles = window.getComputedStyle($el[0]);
                    expect(styles.borderTopLeftRadius).to.equal(allRadius[item.size]);
                    expect(styles.borderTopRightRadius).to.equal(allRadius[item.size]);
                    expect(styles.borderBottomLeftRadius).to.equal(allRadius[item.size]);
                    expect(styles.borderBottomRightRadius).to.equal(allRadius[item.size]);
                });
            });
        });
    });

    it('Checks all padding of tags', () => {
        allCombinations.forEach((item) => {
            tagTestData.topBottomPadding.forEach((topPadding) => {
                tagTestData.leftRightPadding.forEach((sidePadding) => {
                    const tagSelector = `#${item.mode}-${item.variant}-${item.size}-tag`;
                    cy.get(tagSelector).should('be.visible').then(($el) => {
                        const styles = window.getComputedStyle($el[0]);
                        expect(styles.paddingTop).to.equal(topPadding[item.size]);
                        expect(styles.paddingLeft).to.equal(sidePadding[item.size]);
                        expect(styles.paddingBottom).to.equal(topPadding[item.size]);
                        expect(styles.paddingRight).to.equal(sidePadding[item.size]);
                    });
                });
            });
        });
    });

    it('Checks all GAP of tags', () => {
        allCombinations.forEach((item) => {
            tagTestData.columnGap.forEach((gapColumn) => {
                tagTestData.rowGap.forEach((gapRow) => {
                    const tagSelector = `#${item.mode}-${item.variant}-${item.size}-tag`;
                    cy.get(tagSelector).should('be.visible').should(($el) => {
                        const styles = window.getComputedStyle($el[0]);
                        expect(styles.columnGap).to.equal(gapColumn[item.size]);
                        expect(styles.rowGap).to.equal(gapRow[item.size]);
                    });
                });
            });
        });
    });

});