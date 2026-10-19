// The directive must load before the item because of their circular import.

import { IdsSegmentedControlDirective } from './segmented-control.directive';
// eslint-disable-next-line import/order
import { IdsSegmentedControlItemComponent } from './segmented-control-item.component';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

@Component({
  imports: [
    FormsModule,
    IdsSegmentedControlDirective,
    IdsSegmentedControlItemComponent,
  ],
  template: `
    <ids-segmented-control ngModel="a">
      <ids-segmented-control-item value="a" label="A" />
      <ids-segmented-control-item value="b" label="B" />
    </ids-segmented-control>
  `,
})
class TestHostComponent {}

describe('IdsSegmentedControlItemComponent', () => {
  let component: IdsSegmentedControlItemComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const itemElement = fixture.debugElement.query(By.directive(IdsSegmentedControlItemComponent));
    component = itemElement.componentInstance as IdsSegmentedControlItemComponent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
