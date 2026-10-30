import { IdsButtonGroupComponent } from './button-group.component';
import { IdsButtonComponent } from './button.component';

import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'jest-axe';

@Component({
  imports: [
    IdsButtonComponent,
    IdsButtonGroupComponent,
  ],
  template: `
    <ids-button-group>
      <button idsButton type="button">First</button>
      <button idsButton type="button">Second</button>
      <span class="stray">Not projected</span>
    </ids-button-group>
  `,
})
class TestHostComponent {
  public group = viewChild.required(IdsButtonGroupComponent);
}

let fixture: ComponentFixture<TestHostComponent>;
let element: HTMLElement;

function buttons(): HTMLButtonElement[] {
  return Array.from(element.querySelectorAll<HTMLButtonElement>('ids-button-group > button'));
}

beforeEach(async() => {
  await TestBed.configureTestingModule({
    imports: [TestHostComponent],
  }).compileComponents();

  fixture = TestBed.createComponent(TestHostComponent);
  element = fixture.nativeElement as HTMLElement;
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
});

describe('IdsButtonGroupComponent rendering', () => {
  it('should create', () => {
    expect(fixture.componentInstance.group()).toBeTruthy();
  });

  it('should apply the default host classes', () => {
    const group = element.querySelector('ids-button-group')!;

    expect(group.classList.contains('ids-button-group')).toBe(true);
    expect(group.classList.contains('ids-button-group-compact')).toBe(true);
  });

  it('should generate an id', () => {
    expect(element.querySelector('ids-button-group')?.id).toMatch(/^ids-button-group-\d+$/);
  });

  it('should project the buttons in their original order', () => {
    expect(buttons().map((button) => button.textContent?.trim())).toEqual([
      'First',
      'Second',
    ]);
  });

  it('should not project content that is not a button', () => {
    expect(element.querySelector('.stray')).toBeNull();
  });
});

describe('IdsButtonGroupComponent accessibility', () => {
  it('should keep every grouped button focusable in the tab order', () => {
    buttons().forEach((button) => {
      expect(button.disabled).toBe(false);
      expect(button.getAttribute('tabindex')).not.toBe('-1');
    });
  });

  it('should move the focus between the grouped buttons', () => {
    const [
      first,
      second,
    ] = buttons();

    first.focus();
    expect(document.activeElement).toBe(first);

    second.focus();
    expect(document.activeElement).toBe(second);
  });

  it('should have no axe violations', async() => {
    expect(await axe(element)).toHaveNoViolations();
  });
});
