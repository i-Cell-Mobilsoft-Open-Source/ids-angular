import { IdsAccordionItemComponent } from './accordion-item.component';

import { IdsAccordionComponent } from '../accordion.component';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

const accordionMock = {
  disabled: (): boolean => false,
  hasLeadingIcon: (): boolean => false,
  hasTrailingIcon: (): boolean => true,
  headingLevel: (): string => 'h3',
};

@Component({
  imports: [IdsAccordionItemComponent],
  providers: [
    {
      provide: IdsAccordionComponent,
      useValue: accordionMock,
    },
  ],
  template: `
    <ids-accordion-item summary="Test">
      Content
    </ids-accordion-item>
  `,
})
class TestHostComponent {}

describe('IdsAccordionItemComponent', () => {
  let component: IdsAccordionItemComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideNoopAnimations()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(IdsAccordionItemComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
