import { IdsFieldsetRowComponent } from './fieldset-row.component';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'jest-axe';

@Component({
  imports: [IdsFieldsetRowComponent],
  template: `
    <fieldset>
      <legend>Address</legend>
      <ids-fieldset-row>
        <label for="city">City</label>
        <input id="city" />
        <label for="zip">ZIP code</label>
        <input id="zip" />
      </ids-fieldset-row>
    </fieldset>
  `,
})
class TestHostComponent {}

let fixture: ComponentFixture<TestHostComponent>;
let element: HTMLElement;

function row(): HTMLElement {
  return element.querySelector<HTMLElement>('ids-fieldset-row')!;
}

beforeEach(async() => {
  await TestBed.configureTestingModule({
    imports: [TestHostComponent],
  }).compileComponents();

  fixture = TestBed.createComponent(TestHostComponent);
  element = fixture.nativeElement as HTMLElement;
  fixture.detectChanges();
});

describe('IdsFieldsetRowComponent rendering', () => {
  it('should render the host class and project its content', () => {
    expect(row().classList).toContain('ids-fieldset-row');
    expect(row().querySelectorAll('input')).toHaveLength(2);
  });
});

describe('IdsFieldsetRowComponent accessibility', () => {
  it('should not add any role or focus stop of its own', () => {
    expect(row().hasAttribute('role')).toBe(false);
    expect(row().hasAttribute('tabindex')).toBe(false);
  });

  it('should have no axe violations', async() => {
    expect(await axe(element)).toHaveNoViolations();
  });
});
