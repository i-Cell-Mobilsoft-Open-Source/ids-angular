import { IdsAutocompleteHintComponent } from './autocomplete-hint.component';

import { IdsMessageVariant, IdsMessageVariantType } from '../message/types/message-variant.type';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { axe } from 'jest-axe';

@Component({
  imports: [IdsAutocompleteHintComponent],
  template: '<ids-autocomplete-hint [size]="size" [variant]="variant">No results</ids-autocomplete-hint>',
})
class TestHostComponent {
  public size: IdsSizeType = IdsSize.COMFORTABLE;
  public variant: IdsMessageVariantType = IdsMessageVariant.SURFACE;
}

let fixture: ComponentFixture<TestHostComponent>;
let element: HTMLElement;

function message(): HTMLElement {
  return element.querySelector<HTMLElement>('ids-autocomplete-hint .ids-autocomplete-hint__wrapper ids-hint-message')!;
}

beforeEach(async() => {
  await TestBed.configureTestingModule({
    imports: [TestHostComponent],
  }).compileComponents();

  fixture = TestBed.createComponent(TestHostComponent);
  element = fixture.nativeElement as HTMLElement;
  fixture.detectChanges();
});

describe('IdsAutocompleteHintComponent rendering', () => {
  it('should project its content into a hint message with the default size and variant', () => {
    expect(element.querySelector('ids-autocomplete-hint')!.classList).toContain('ids-autocomplete-hint');
    expect(message().textContent?.trim()).toBe('No results');
    expect(message().classList).toContain('ids-message-comfortable');
    expect(message().classList).toContain('ids-message-surface');
  });

  it('should pass the size and variant to the hint message', () => {
    Object.assign(fixture.componentInstance, { size: IdsSize.COMPACT, variant: IdsMessageVariant.LIGHT });
    fixture.detectChanges();

    expect(message().classList).toContain('ids-message-compact');
    expect(message().classList).toContain('ids-message-light');
  });
});

describe('IdsAutocompleteHintComponent accessibility', () => {
  it('should have no axe violations', async() => {
    expect(await axe(element)).toHaveNoViolations();
  });
});
