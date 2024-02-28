
import iconButtonTestData from '../data/iconButtonTestData';
import 'cypress-real-events/support';

beforeEach(() => {
  cy.visit('/components/icon-button');
})

describe('ids IconButton Demo test', () => {
  const allCombinations = [] as {
    mode: (typeof iconButtonTestData.allModes)[number];
    size: (typeof iconButtonTestData.allSizes)[number];
    variant: (typeof iconButtonTestData.allVariants)[number];
  }[];

  iconButtonTestData.allModes.forEach((mode) => {
    iconButtonTestData.allSizes.forEach((size) => {
      iconButtonTestData.allVariants.forEach((variant) => {
        allCombinations.push({ mode, size, variant });
      });
    });
  });
  //kész
  xit('Checks the width and height of icon button', () => {
    allCombinations.forEach((item) => {
      iconButtonTestData.allHeight.forEach((height) => {
        iconButtonTestData.allWidth.forEach((width) => {
          const buttonSelector = `#${item.mode}-${item.variant}-${item.size}-icon-button`;
          cy.get(buttonSelector).should('be.visible').should('have.css', { 'height': height[item.size], 'width': width[item.size] });
        });
      });
    });
  });
  // kész
  xit('Checks common css rules of icon button', () => {
    allCombinations.forEach((item) => {
      iconButtonTestData.common.forEach((common) => {
        const buttonSelector = `#${item.mode}-${item.variant}-${item.size}-icon-button`;
        cy.get(buttonSelector).should('be.visible').should('have.css', {
          'flex-shrink': common['flexShrink'],
          'hight': common['hight'],
          'width': common['width'],
          'align-items': common['alignItems'],
          'display': common['display'],
          'justify-content': common['justifyContent'],
        });
      });
    });
  });
  //kész
  xit('Checks the color of icon button', () => {
    allCombinations.forEach((item) => {
      iconButtonTestData.enabledBgColors.forEach((bgColor) => {
        iconButtonTestData.enabledColors.forEach((color) => {
          iconButtonTestData.hoveredColors.forEach((enabledColor) => {
            const buttonSelector = `#${item.mode}-${item.variant}-${item.size}-icon-button`;
            if (item.mode === 'outlined' || item.mode === 'standard') {
              cy.get(buttonSelector).should('be.visible').should(($el) => {
                const styles = window.getComputedStyle($el[0]);
                expect(styles.backgroundColor).to.equal(iconButtonTestData.white);
                expect(styles.color).to.equal(color[item.variant]);
              });
            } else {
              cy.get(buttonSelector).should('be.visible').should(($el) => {
                const styles = window.getComputedStyle($el[0]);
                expect(styles.backgroundColor).to.equal(bgColor[item.variant]);
                expect(styles.color).to.equal(enabledColor[item.variant]);
              });
            }
          });
        });
      });
    });
  });
  //kész
  xit('Checks focused state of icon button', () => {
    allCombinations.forEach((item) => {
      const buttonSelector = `#${item.mode}-${item.variant}-${item.size}-icon-button`;
      if (item.variant === 'light') {
        cy.get(buttonSelector).click().should('have.focus').should('be.visible')
          .should('have.css', 'outline').and('eq', iconButtonTestData.white2);
      } else {
        cy.get(buttonSelector).click().should('have.focus').should('be.visible')
          .should('have.css', 'outline').and('eq', iconButtonTestData.black);
      }
    });
  });

  //kész
  xit('Checks color of icon button with FOCUSED state', () => {
    allCombinations.forEach((item) => {
      iconButtonTestData.focusedFilledBgColors.forEach((bgColor) => {
        iconButtonTestData.focusedFilledColors.forEach((color) => {
          iconButtonTestData.focusedOutlineTextColors.forEach((outlineColor) => {
            iconButtonTestData.focusedTextColors.forEach((standardColor) => {  //3 felé bontva, mivel a secondary eltér az iconnál - ellentétben a buttonnal
              iconButtonTestData.focusedSurfaceBgColors.forEach((standardBgColor) => {
                const button = cy.get(`#${item.mode}-${item.variant}-${item.size}-icon-button`);
                if (item.mode === 'outlined') { //|| item.mode === 'standard') {
                  button.realClick({ pointer: "mouse" }).should(($el) => {
                    const styles = window.getComputedStyle($el[0]);
                    expect(styles.backgroundColor).to.equal(iconButtonTestData.hoverdFocusedOutlineBg);
                    expect(styles.color).to.equal(outlineColor[item.variant]);
                  });
                } else if (item.mode === 'standard') {
                  button.realClick({ pointer: "mouse" }).should(($el) => {
                    const styles = window.getComputedStyle($el[0]);
                    expect(styles.backgroundColor).to.equal(standardBgColor[item.variant]); //error BG fehér a Figmaban
                    expect(styles.color).to.equal(standardColor[item.variant]);
                  });
                } else {
                  button.realClick({ pointer: "mouse" }).should(($el) => {
                    const styles = window.getComputedStyle($el[0]);
                    expect(styles.backgroundColor).to.equal(bgColor[item.variant]);
                    expect(styles.color).to.equal(color[item.variant]);
                  });
                }
              })
            })
          });
        });
      });
    });
  });


  //kész
  xit('Checks color and background color of button with hovered state', () => {
    allCombinations.forEach((item) => {
      iconButtonTestData.hoveredBgColors.forEach((bgColor) => {
        iconButtonTestData.hoveredOutlineColors.forEach((outlineColor) => {
          iconButtonTestData.hoveredColors.forEach((color) => {
            iconButtonTestData.hoveredStandardColors.forEach((standardColor) => {
              const button = cy.get(`#${item.mode}-${item.variant}-${item.size}-icon-button`);
              if (item.mode === 'outlined') {
                button.realHover({ pointer: "mouse" }).should(($el) => {
                  const styles = window.getComputedStyle($el[0]);
                  expect(styles.backgroundColor).to.equal(iconButtonTestData.hoverdFocusedOutlineBg);
                  expect(styles.color).to.equal(outlineColor[item.variant]); // figma szerinti színek szerint beállítva: expected 'rgb(0, 60, 255)' to equal 'rgb(0, 59, 235)'
                });
              } else if (item.mode === 'standard') {
                button.realHover({ pointer: "mouse" }).should(($el) => {
                  const styles = window.getComputedStyle($el[0]);
                  expect(styles.backgroundColor).to.equal(iconButtonTestData.hoveredStandardBgColors);
                  expect(styles.color).to.equal(standardColor[item.variant]); // itt: expected 'rgb(0, 60, 255)' to equal 'rgb(0, 59, 235)'
                });
              } else { //filled
                button.realHover({ pointer: "mouse" }).should(($el) => {
                  const styles = window.getComputedStyle($el[0]);
                  expect(styles.backgroundColor).to.equal(bgColor[item.variant]);
                  expect(styles.color).to.equal(color[item.variant]);
                });
              }
            })
          });
        });
      });
    });
  });
  // WIP Figma szerint jó, színek egységesítése után újranézni
  xit('Checks color of icon button with active (pressed) state', () => {
    allCombinations.forEach((item) => {
      iconButtonTestData.activeBgColors.forEach((bgColor) => {
        iconButtonTestData.activeFilledColors.forEach((color) => {
          iconButtonTestData.activeOutlineColors.forEach((outlineColor) => {
            iconButtonTestData.activeStandardColors.forEach((standardColor) => {
              const buttonSelector = `#${item.mode}-${item.variant}-${item.size}-icon-button`;
              cy.get(buttonSelector).then(button => {
                cy.wrap(button).realMouseDown({ pointer: "mouse" }).should(($el) => {
                  const styles = window.getComputedStyle($el[0]);
                  if (item.mode === 'outlined') {
                    expect(styles.backgroundColor).to.equal(iconButtonTestData.disabledBgColors); // Figma szerint jó, csak: expected 'rgb(241, 245, 249)' to equal 'rgb(226, 232, 240)'
                    expect(styles.color).to.equal(outlineColor[item.variant]);
                  } else if (item.mode === 'standard') {
                    expect(styles.backgroundColor).to.equal(iconButtonTestData.disabledBgColors);  // Figma szerint jó, csak: expected 'rgb(241, 245, 249)' to equal 'rgb(226, 232, 240)'
                    expect(styles.color).to.equal(standardColor[item.variant]); // Figma szerint jó, csak: (expected 'rgb(71, 85, 105)' to equal 'rgb(51, 65, 85)')
                  }
                  else {
                    expect(styles.backgroundColor).to.equal(bgColor[item.variant]);
                    expect(styles.color).to.equal(color[item.variant]);
                  }
                }).realMouseUp({ pointer: "mouse" });
              });


              // } else if (item.mode === 'standard') {
              //     cy.get(buttonSelector).then(button => {
              //         cy.wrap(button).realMouseDown({ pointer: "mouse" }).should(($el) => {
              //             const styles = window.getComputedStyle($el[0]);
              //             //expect(styles.backgroundColor).to.equal(iconButtonTestData.disabledBgColors);  // Figma szerint jó, csak: expected 'rgb(241, 245, 249)' to equal 'rgb(226, 232, 240)'
              //             expect(styles.color).to.equal(standardColor[item.variant]); // Figma szerint jó, csak: (expected 'rgb(71, 85, 105)' to equal 'rgb(51, 65, 85)')
              //         });
              //     });
              // } else { // filled
              //     cy.get(buttonSelector).then(button => {
              //         cy.wrap(button).realMouseDown({ pointer: "mouse" }).should(($el) => {
              //             const styles = window.getComputedStyle($el[0]);
              //             expect(styles.backgroundColor).to.equal(bgColor[item.variant]);
              //             expect(styles.color).to.equal(color[item.variant]);
              //         }).realMouseUp({ pointer: "mouse" });
              //     });
              // }
            });
          });
        });
      });
    });
  });

  // kész
  xit('Checks color of disabled state icon button', () => {
    allCombinations.forEach((item) => {
      if (item.variant === 'error' || item.variant === 'success' || item.variant === 'warning') {
        return;
      }
      const button = cy.get(`#${item.mode}-${item.variant}-${item.size}-disabled-icon-button`);
      if (item.mode === 'outlined' || item.mode === 'standard') {
        button.should(($el) => {
          const styles = window.getComputedStyle($el[0]);
          expect(styles.backgroundColor).to.equal(iconButtonTestData.white);
          expect(styles.color).to.equal(iconButtonTestData.disabledTextColors);
        });
      } else {
        button.should(($el) => {
          const styles = window.getComputedStyle($el[0]);
          expect(styles.backgroundColor).to.equal(iconButtonTestData.disabledBgColors);
          expect(styles.color).to.equal(iconButtonTestData.disabledTextColors);
        });
      }
    });
  });
  //kész
  xit('Checks left and right border radius of icon button', () => {
    allCombinations.forEach((item) => {
      const buttonSelector = `#${item.mode}-${item.variant}-${item.size}-icon-button`;
      cy.get(buttonSelector).should('be.visible').should('have.css', { 'border-radius': iconButtonTestData.allRadius });
    });
  });
  //kész
  xit('Checks all padding of icon button', () => {
    allCombinations.forEach((item) => {
      const buttonSelector = `#${item.mode}-${item.variant}-${item.size}-icon-button`;
      cy.get(buttonSelector).should('be.visible').then(($el) => {
        const styles = window.getComputedStyle($el[0]);
        expect(styles.paddingTop).to.equal(iconButtonTestData.allPadding);
        expect(styles.paddingBottom).to.equal(iconButtonTestData.allPadding);
        expect(styles.paddingLeft).to.equal(iconButtonTestData.allPadding);
        expect(styles.paddingRight).to.equal(iconButtonTestData.allPadding);
      });
    });
  });
});
