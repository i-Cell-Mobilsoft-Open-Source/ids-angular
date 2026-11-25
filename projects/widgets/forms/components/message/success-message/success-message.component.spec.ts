import { IdsSuccessMessageComponent } from './success-message.component';

import { IdsMessageDirective } from '../../../directives/message.directive';
import { IDS_MESSAGE_PARENT_FORM_FIELD, IdsMessageParentFormField } from '../types/message-parent-form-field';

import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsSuccessMessageComponent', () => {
  let component: IdsSuccessMessageComponent;
  let fixture: ComponentFixture<IdsSuccessMessageComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsSuccessMessageComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsSuccessMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  imports: [IdsMessageDirective],
  template: '<span idsMessage [disabled]="true">Message</span>',
})
class DisabledMessageHostComponent {}

describe('IdsSuccessMessageComponent with a message parent', () => {
  let parent: IdsMessageParentFormField;

  beforeEach(() => {
    parent = { size: signal(null), variant: signal(null) };
    TestBed.configureTestingModule({
      imports: [IdsSuccessMessageComponent],
      providers: [{ provide: IDS_MESSAGE_PARENT_FORM_FIELD, useValue: parent }],
    });
  });

  it('renders an enabled success message when the parent has no disabled signal', () => {
    const fixture = TestBed.createComponent(IdsSuccessMessageComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList).not.toContain('ids-message-disabled');
    expect(fixture.nativeElement.querySelector('ids-icon').classList).toContain('ids-icon-success');
  });

  it('uses its own disabled input when the parent has no disabled signal', () => {
    const fixture = TestBed.createComponent(DisabledMessageHostComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[idsMessage]').classList).toContain('ids-message-disabled');
  });

  it('updates the message and icon when the parent disabled signal changes', () => {
    const disabled = signal(true);
    parent.disabled = disabled;
    const fixture = TestBed.createComponent(IdsSuccessMessageComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList).toContain('ids-message-disabled');
    expect(fixture.nativeElement.querySelector('ids-icon').classList).not.toContain('ids-icon-success');

    disabled.set(false);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList).not.toContain('ids-message-disabled');
    expect(fixture.nativeElement.querySelector('ids-icon').classList).toContain('ids-icon-success');
  });
});
