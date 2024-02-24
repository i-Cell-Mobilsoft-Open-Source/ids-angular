import buttonTestData from '../data/buttonTestData';
import 'cypress-real-events/support';

describe('ids Button Demo test', () => {
  const allCombinations = [] as {
    mode: (typeof buttonTestData.allModes)[number];
    size: (typeof buttonTestData.allSizes)[number];
    variant: (typeof buttonTestData.allVariants)[number];
  }[];

  buttonTestData.allModes.forEach((mode) => {
    buttonTestData.allSizes.forEach((size) => {
      buttonTestData.allVariants.forEach((variant) => {
        allCombinations.push({ mode, size, variant });
      });
    });
  });

  it('Checks the content, min-width and height of button', () => {
    cy.visit('/components/buttons');

    allCombinations.forEach((item) => {
      buttonTestData.allHeight.forEach((height) => {
        buttonTestData.allWidth.forEach((minwidth) => {
          const buttonSelector = `#${item.mode}-${item.variant}-${item.size}-button`;
          cy.get(buttonSelector)
            .should('be.visible')
            .contains(`${item.mode} ${item.variant} ${item.size} button`)
            .should('have.css', {
              height: height[item.size],
              'min-width': minwidth[item.size],
            });
        });
      });
    });
  });

  it('Checks the font-size of button', () => {
    cy.visit('/components/buttons');

    allCombinations.forEach((item) => {
      buttonTestData.allFontSize.forEach((font) => {
        const buttonSelector = `#${item.mode}-${item.variant}-${item.size}-button`;
        cy.get(buttonSelector)
          .should('be.visible')
          .contains(`${item.mode} ${item.variant} ${item.size} button`)
          .should('have.css', { 'font-size': font[item.size] });
      });
    });
  });

  it('Checks the line-height of button', () => {
    cy.visit('/components/buttons');

    allCombinations.forEach((item) => {
      buttonTestData.allLineHeight.forEach((lineHeigt) => {
        const buttonSelector = `#${item.mode}-${item.variant}-${item.size}-button`;
        cy.get(buttonSelector)
          .should('be.visible')
          .should('have.css', { 'line-height': lineHeigt[item.size] });
      });
    });
  });

  it('Checks common css rules of button', () => {
    cy.visit('/components/buttons');

    allCombinations.forEach((item) => {
      buttonTestData.common.forEach((common) => {
        const buttonSelector = `#${item.mode}-${item.variant}-${item.size}-button`;
        cy.get(buttonSelector).should('be.visible').should('have.css', {
          'flex-shrink': common['flexShrink'],
          'font-weight': common['fontWeight'],
          width: common['width'],
          'align-items': common['alignItems'],
          display: common['display'],
          'justify-content': common['justifyContent'],
        });
      });
    });
  });

  it('Checks the color of button', () => {
    cy.visit('/components/buttons');

    allCombinations.forEach((item) => {
      buttonTestData.enabledBgColors.forEach((bgColor) => {
        buttonTestData.enabledColors.forEach((color) => {
          buttonTestData.hoveredColors.forEach((enabledColor) => {
            const buttonSelector = `#${item.mode}-${item.variant}-${item.size}-button`;
            if (item.mode === 'outlined' || item.mode === 'text') {
              cy.get(buttonSelector)
                .should('be.visible')
                .should(($el) => {
                  const styles = window.getComputedStyle($el[0]);
                  expect(styles.backgroundColor).to.equal(buttonTestData.white);
                  expect(styles.color).to.equal(color[item.variant]);
                });
            } else {
              cy.get(buttonSelector)
                .should('be.visible')
                .should(($el) => {
                  const styles = window.getComputedStyle($el[0]);
                  expect(styles.backgroundColor).to.equal(
                    bgColor[item.variant]
                  );
                  expect(styles.color).to.equal(enabledColor[item.variant]);
                });
            }
          });
        });
      });
    });
  });

  it('Checks focused state of button', () => {
    cy.visit('/components/buttons');

    allCombinations.forEach((item) => {
      const buttonSelector = `#${item.mode}-${item.variant}-${item.size}-button`;
      if (item.variant === 'light') {
        cy.get(buttonSelector)
          .click()
          .should('have.focus')
          .should('be.visible')
          .should('have.css', 'outline')
          .and('eq', buttonTestData.white2);
      } else {
        cy.get(buttonSelector)
          .click()
          .should('have.focus')
          .should('be.visible')
          .should('have.css', 'outline')
          .and('eq', buttonTestData.black);
      }
    });
  });

  it('Checks color of button with FOCUSED state', () => {
    cy.visit('/components/buttons');

    allCombinations.forEach((item) => {
      buttonTestData.focusedFilledBgColors.forEach((bgColor) => {
        buttonTestData.focusedColors.forEach((color) => {
          buttonTestData.focusedOutlineTextColors.forEach((outlineColor) => {
            const button = cy.get(
              `#${item.mode}-${item.variant}-${item.size}-button`
            );
            if (item.mode === 'outlined' || item.mode === 'text') {
              button.realClick({ pointer: 'mouse' }).should(($el) => {
                const styles = window.getComputedStyle($el[0]);
                expect(styles.backgroundColor).to.equal(buttonTestData.white);
                expect(styles.color).to.equal(outlineColor[item.variant]);
              });
            } else {
              button.realClick({ pointer: 'mouse' }).should(($el) => {
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

  it('Checks color and background color of button with hovered state', () => {
    cy.visit('/components/buttons');

    allCombinations.forEach((item) => {
      buttonTestData.hoveredBgColors.forEach((bgColor) => {
        buttonTestData.hoveredOutlineTextColors.forEach((outlineColor) => {
          buttonTestData.hoveredColors.forEach((color) => {
            const button = cy.get(
              `#${item.mode}-${item.variant}-${item.size}-button`
            );
            if (item.mode === 'outlined') {
              button.realHover({ pointer: 'mouse' }).should(($el) => {
                const styles = window.getComputedStyle($el[0]);
                expect(styles.backgroundColor).to.equal(
                  buttonTestData.hoverdOutlineBg
                );
                expect(styles.color).to.equal(outlineColor[item.variant]);
              });
            } else if (item.mode === 'text') {
              button.realHover({ pointer: 'mouse' }).should(($el) => {
                const styles = window.getComputedStyle($el[0]);
                expect(styles.backgroundColor).to.equal(
                  buttonTestData.hoveredTextBgColors
                );
                expect(styles.color).to.equal(outlineColor[item.variant]);
              });
            } else {
              button.realHover({ pointer: 'mouse' }).should(($el) => {
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

  it('Checks color of button with active (pressed) state', () => {
    cy.visit('/components/buttons');

    allCombinations.forEach((item) => {
      buttonTestData.activeBgColors.forEach((bgColor) => {
        buttonTestData.activeColors.forEach((color) => {
          buttonTestData.activeOutlineTextColors.forEach((outlineColor) => {
            const buttonSelector = `#${item.mode}-${item.variant}-${item.size}-button`;
            if (item.mode === 'outlined' || item.mode === 'text') {
              cy.get(buttonSelector).then((button) => {
                cy.wrap(button)
                  .realMouseDown({ pointer: 'mouse' })
                  .should(($el) => {
                    const styles = window.getComputedStyle($el[0]);
                    expect(styles.backgroundColor).to.equal(
                      buttonTestData.disabledBgColors
                    );
                    expect(styles.color).to.equal(outlineColor[item.variant]);
                  })
                  .realMouseUp({ pointer: 'mouse' });
              });
            } else {
              cy.get(buttonSelector).then((button) => {
                cy.wrap(button)
                  .realMouseDown({ pointer: 'mouse' })
                  .should(($el) => {
                    const styles = window.getComputedStyle($el[0]);
                    expect(styles.backgroundColor).to.equal(
                      bgColor[item.variant]
                    );
                    expect(styles.color).to.equal(color[item.variant]);
                  })
                  .realMouseUp({ pointer: 'mouse' });
              });
            }
          });
        });
      });
    });
  });

  it('Checks color of disabled state button', () => {
    cy.visit('/components/buttons');

    allCombinations.forEach((item) => {
      if (
        item.variant === 'error' ||
        item.variant === 'success' ||
        item.variant === 'warning'
      ) {
        return;
      }
      const button = cy.get(
        `#${item.mode}-${item.variant}-${item.size}-disabled-button`
      );
      if (item.mode === 'outlined' || item.mode === 'text') {
        button.should(($el) => {
          const styles = window.getComputedStyle($el[0]);
          expect(styles.backgroundColor).to.equal(buttonTestData.white);
          expect(styles.color).to.equal(buttonTestData.disabledTextColors);
        });
      } else {
        button.should(($el) => {
          const styles = window.getComputedStyle($el[0]);
          expect(styles.backgroundColor).to.equal(
            buttonTestData.disabledBgColors
          );
          expect(styles.color).to.equal(buttonTestData.disabledTextColors);
        });
      }
    });
  });

  it('Checks left and right border radius of button', () => {
    cy.visit('/components/buttons');

    allCombinations.forEach((item) => {
      const buttonSelector = `#${item.mode}-${item.variant}-${item.size}-button`;
      cy.get(buttonSelector)
        .should('be.visible')
        .should('have.css', { 'border-radius': buttonTestData.allRadius });
    });
  });

  it('Checks all padding top and bottom values of button', () => {
    cy.visit('/components/buttons');

    allCombinations.forEach((item) => {
      buttonTestData.topBottomPadding.forEach((padding) => {
        const buttonSelector = `#${item.mode}-${item.variant}-${item.size}-button`;
        cy.get(buttonSelector)
          .should('be.visible')
          .should('have.css', 'padding-top')
          .and('eq', padding[item.size]);
        cy.get(buttonSelector)
          .should('be.visible')
          .should('have.css', 'padding-bottom')
          .and('eq', padding[item.size]);
      });
    });
  });

  it('Checks all padding left and right values of button', () => {
    cy.visit('/components/buttons');

    allCombinations.forEach((item) => {
      buttonTestData.leftRightPadding.forEach((padding) => {
        const buttonSelector = `#${item.mode}-${item.variant}-${item.size}-button`;
        cy.get(buttonSelector)
          .should('be.visible')
          .should('have.css', 'padding-left')
          .and('eq', padding[item.size]);
        cy.get(buttonSelector)
          .should('be.visible')
          .should('have.css', 'padding-right')
          .and('eq', padding[item.size]);
      });
    });
  });
});
