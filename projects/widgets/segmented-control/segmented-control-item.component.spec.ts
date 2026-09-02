import { IdsSegmentedControlItemComponent } from './segmented-control-item.component';
import { IdsSegmentedControlDirective } from './segmented-control.directive';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  imports: [IdsSegmentedControlItemComponent],
  providers: [
    {
      provide: IdsSegmentedControlDirective,
      useValue: {
        disabled: (): boolean => false,
        isItemPreSelectedByValue: (): boolean => false,
        multiSelect: (): boolean => false,
        name: (): undefined => undefined,
        showActiveIcon: (): boolean => true,
      },
    },
  ],
  template: `
    <ids-segmented-control-item value="first" label="First" />
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
    component = fixture.debugElement.query(By.directive(IdsSegmentedControlItemComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
