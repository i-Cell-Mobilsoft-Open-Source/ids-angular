import { IdsSegmentedControlToggleItemComponent } from './segmented-control-toggle-item.component';
import { IdsSegmentedControlToggleDirective } from './segmented-control-toggle.directive';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  imports: [IdsSegmentedControlToggleItemComponent],
  providers: [
    {
      provide: IdsSegmentedControlToggleDirective,
      useValue: {
        buttonVariant: (): undefined => undefined,
        disabled: (): boolean => false,
        isItemPreSelectedByValue: (): boolean => false,
        name: (): undefined => undefined,
        showActiveIcon: (): boolean => true,
      },
    },
  ],
  template: `
    <ids-segmented-control-toggle-item value="first" label="First" />
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
    component = fixture.debugElement.query(By.directive(IdsSegmentedControlToggleItemComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
