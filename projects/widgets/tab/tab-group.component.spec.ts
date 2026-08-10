import { IdsTabGroupComponent } from './tab-group.component';
import { IdsTabComponent } from './tab.component';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  imports: [
    IdsTabGroupComponent,
    IdsTabComponent,
  ],
  template: `
    <ids-tab-group>
      <ids-tab label="First">First content</ids-tab>
      <ids-tab label="Second">Second content</ids-tab>
    </ids-tab-group>
  `,
})
class TestHostComponent {}

describe('IdsTabGroupComponent', () => {
  let component: IdsTabGroupComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(IdsTabGroupComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
