import { IdsRadioGroupComponent } from './radio-group.component';
import { IdsRadioComponent } from './radio.component';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  imports: [
    IdsRadioGroupComponent,
    IdsRadioComponent,
  ],
  template: `
    <ids-radio-group name="test-radio-group">
      <ids-radio />
      <ids-radio />
    </ids-radio-group>
  `,
})
class TestHostComponent {
}

describe('IdsRadioComponent', () => {
  let component: IdsRadioComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(IdsRadioComponent)).componentInstance as IdsRadioComponent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
