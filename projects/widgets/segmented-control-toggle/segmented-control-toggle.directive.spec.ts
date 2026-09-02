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
    <ids-segmented-control-toggle [(ngModel)]="value">
      <ids-segmented-control-toggle-item value="first" label="First" />
      <ids-segmented-control-toggle-item value="second" label="Second" />
    </ids-segmented-control-toggle>
  `,
})
class TestHostComponent {
  public value = 'first';
}

describe('IdsSegmentedControlToggleDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: IdsSegmentedControlToggleDirective;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    directive = fixture.debugElement.query(By.directive(IdsSegmentedControlToggleDirective))
      .injector.get(IdsSegmentedControlToggleDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
