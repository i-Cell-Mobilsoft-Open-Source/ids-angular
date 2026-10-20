// The directive must load before the item because of their circular import.

import { IdsSegmentedControlToggleDirective } from './segmented-control-toggle.directive';
// eslint-disable-next-line import/order
import { IdsSegmentedControlToggleItemComponent } from './segmented-control-toggle-item.component';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

@Component({
  imports: [
    FormsModule,
    IdsSegmentedControlToggleDirective,
    IdsSegmentedControlToggleItemComponent,
  ],
  template: `
    <ids-segmented-control-toggle ngModel="a">
      <ids-segmented-control-toggle-item value="a" label="A" />
      <ids-segmented-control-toggle-item value="b" label="B" />
    </ids-segmented-control-toggle>
  `,
})
class TestHostComponent {}

describe('IdsSegmentedControlToggleItemComponent', () => {
  let component: IdsSegmentedControlToggleItemComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const itemElement = fixture.debugElement.query(By.directive(IdsSegmentedControlToggleItemComponent));
    component = itemElement.componentInstance as IdsSegmentedControlToggleItemComponent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
