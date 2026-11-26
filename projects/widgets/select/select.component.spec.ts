import { IdsSelectComponent } from './select.component';

import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IdsFormFieldComponent, IdsOptionComponent } from '@i-cell/ids-angular/forms';

@Component({
  imports: [
    FormsModule,
    IdsFormFieldComponent,
    IdsSelectComponent,
    IdsOptionComponent,
  ],
  template: `
    <ids-form-field>
      <ids-select [clearable]="clearable()" [readonly]="readonly()" [(ngModel)]="value">
        <ids-option value="a">A</ids-option>
        <ids-option value="b">B</ids-option>
      </ids-select>
    </ids-form-field>
  `,
})
class TestHostComponent {
  public value = 'a';
  public clearable = signal(true);
  public readonly = signal(false);
}

describe('IdsSelectComponent', () => {
  let component: IdsSelectComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(IdsSelectComponent)).componentInstance as IdsSelectComponent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('IdsSelectComponent clearable', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let select: IdsSelectComponent;
  let selectElement: HTMLElement;

  const clearButton = (): HTMLButtonElement | null => selectElement.querySelector('ids-clear-value button');

  const settle = async(): Promise<void> => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    await settle();
    const selectDebugElement = fixture.debugElement.query(By.directive(IdsSelectComponent));
    select = selectDebugElement.componentInstance as IdsSelectComponent;
    selectElement = selectDebugElement.nativeElement;
  });

  it('should show the clear button only when clearable and a value is selected', async() => {
    expect(clearButton()).not.toBeNull();

    host.clearable.set(false);
    await settle();
    expect(clearButton()).toBeNull();
  });

  it('should not show the clear button when readonly', async() => {
    host.readonly.set(true);
    await settle();

    expect(clearButton()).toBeNull();
  });

  it('should clear the value on click without opening the panel, and keep focus on the select', async() => {
    clearButton()!.click();
    await settle();

    expect(host.value).toBeUndefined();
    expect(select.isPanelOpen()).toBe(false);
    expect(clearButton()).toBeNull();
    expect(document.activeElement).toBe(selectElement);
  });

  it('should clear without opening the panel when Enter or Space is pressed on the clear button', async() => {
    for (const key of [
      'Enter',
      ' ',
    ]) {
      host.value = 'a';
      await settle();

      const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
      clearButton()!.dispatchEvent(event);
      await settle();

      expect(event.defaultPrevented).toBe(true);
      expect(host.value).toBeUndefined();
      expect(select.isPanelOpen()).toBe(false);
    }
  });

  it('should not clear when readonly', async() => {
    host.readonly.set(true);
    await settle();

    select.clear();
    await settle();

    expect(host.value).toBe('a');
  });
});
