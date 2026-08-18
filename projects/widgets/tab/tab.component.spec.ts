import { IdsTabGroupComponent } from './tab-group.component';
import { IdsTabComponent } from './tab.component';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

const tabGroupMock = {
  disabled: (): boolean => false,
};

@Component({
  imports: [IdsTabComponent],
  providers: [
    {
      provide: IdsTabGroupComponent,
      useValue: tabGroupMock,
    },
  ],
  template: `
    <ids-tab label="Test">
      Content
    </ids-tab>
  `,
})
class TestHostComponent {}

describe('IdsTabComponent', () => {
  let component: IdsTabComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(IdsTabComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
