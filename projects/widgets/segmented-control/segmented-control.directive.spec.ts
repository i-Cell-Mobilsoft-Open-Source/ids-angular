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
    <ids-segmented-control [(ngModel)]="value">
      <ids-segmented-control-item value="first" label="First" />
      <ids-segmented-control-item value="second" label="Second" />
    </ids-segmented-control>
  `,
})
class TestHostComponent {
  public value = 'first';
}

describe('IdsSegmentedControlDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: IdsSegmentedControlDirective;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    directive = fixture.debugElement.query(By.directive(IdsSegmentedControlDirective)).injector.get(IdsSegmentedControlDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
