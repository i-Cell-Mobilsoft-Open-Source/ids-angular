import { IdsCheckboxGroupComponent } from './checkbox-group.component';
import { IdsCheckboxComponent } from './checkbox.component';
import { IdsCheckboxVariantType } from './types/checkbox-variant.type';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsErrorMessageComponent, IdsHintMessageComponent } from '@i-cell/ids-angular/forms';

@Component({
  imports: [
    IdsCheckboxComponent,
    IdsCheckboxGroupComponent,
    IdsHintMessageComponent,
    IdsErrorMessageComponent,
    ReactiveFormsModule,
  ],
  template: `
    <ids-checkbox [size]="size" [variant]="variant">
      Single hint
      <ids-hint-message [disabled]="true">Hint</ids-hint-message>
    </ids-checkbox>
    <ids-checkbox [size]="size" [variant]="variant" [formControl]="invalidControl">
      Single error
      <ids-error-message>Error</ids-error-message>
    </ids-checkbox>
    <ids-checkbox-group [size]="groupSize" [variant]="groupVariant">
      <ids-hint-message>Group hint</ids-hint-message>
      <ids-error-message>Group error</ids-error-message>
      <ids-checkbox size="comfortable" variant="light">
        Child hint
        <ids-hint-message>Child hint</ids-hint-message>
      </ids-checkbox>
      <ids-checkbox size="comfortable" variant="light" [formControl]="invalidControl">
        Child error
        <ids-error-message>Child error</ids-error-message>
      </ids-checkbox>
    </ids-checkbox-group>
  `,
})
class TestHostComponent {
  public size: IdsSizeType = 'compact';
  public variant: IdsCheckboxVariantType = 'surface';
  public groupSize: IdsSizeType | null = 'compact';
  public groupVariant: IdsCheckboxVariantType | null = 'surface';
  public invalidControl = new FormControl(false, Validators.requiredTrue);

  constructor() {
    this.invalidControl.markAsTouched();
  }
}

describe('Checkbox message inheritance', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  it('should update single, group and child hint/error classes for every size and variant', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const host = fixture.componentInstance;
    const element: HTMLElement = fixture.nativeElement;

    const expectedMessageCount = 6;

    for (const size of [
      'dense',
      'compact',
      'comfortable',
      'spacious',
    ] as const) {
      for (const variant of [
        'surface',
        'light',
        'dark',
      ] as const) {
        host.size = size;
        host.groupSize = size;
        host.variant = variant;
        host.groupVariant = variant;
        fixture.detectChanges();

        const messages = element.querySelectorAll('ids-hint-message, ids-error-message');
        expect(messages).toHaveLength(expectedMessageCount);
        messages.forEach((message) => {
          expect(message.classList.contains(`ids-message-${size}`)).toBe(true);
          expect(message.classList.contains(`ids-message-${variant}`)).toBe(true);
          const classes = Array.from(message.classList);
          expect(classes.filter((name) => /^ids-message-(dense|compact|comfortable|spacious)$/.test(name))).toHaveLength(1);
          expect(classes.filter((name) => /^ids-message-(surface|light|dark)$/.test(name))).toHaveLength(1);
        });
      }
    }
    expect(element.querySelector('ids-hint-message')?.classList.contains('ids-message-disabled')).toBe(true);
  });

  it('should fall back to message defaults and child settings when group settings become null', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const host = fixture.componentInstance;
    const element: HTMLElement = fixture.nativeElement;
    host.groupSize = 'spacious';
    host.groupVariant = 'dark';
    fixture.detectChanges();
    host.groupSize = null;
    host.groupVariant = null;
    fixture.detectChanges();

    const group = element.querySelector('ids-checkbox-group')!;
    const groupHint = group.querySelector('ids-hint-message')!;
    expect(groupHint.classList.contains('ids-message-compact')).toBe(true);
    expect(groupHint.classList.contains('ids-message-surface')).toBe(true);
    group.querySelectorAll('ids-checkbox ids-hint-message, ids-checkbox ids-error-message').forEach((message) => {
      expect(message.classList.contains('ids-message-comfortable')).toBe(true);
      expect(message.classList.contains('ids-message-light')).toBe(true);
    });
  });
});
