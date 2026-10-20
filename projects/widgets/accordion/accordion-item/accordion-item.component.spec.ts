// The accordion must load before the item because of their circular import.

import { IdsAccordionComponent } from '../accordion.component';

// eslint-disable-next-line import/order
import { IdsAccordionItemComponent } from './accordion-item.component';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [
    IdsAccordionComponent,
    IdsAccordionItemComponent,
  ],
  template: `
    <ids-accordion>
      <ids-accordion-item summary="Summary">Content</ids-accordion-item>
    </ids-accordion>
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
    component = fixture.debugElement.query(By.directive(IdsAccordionItemComponent)).componentInstance as IdsAccordionItemComponent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
