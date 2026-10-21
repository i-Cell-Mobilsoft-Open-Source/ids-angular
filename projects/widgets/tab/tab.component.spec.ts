import { IdsTabGroupComponent } from './tab-group.component';
import { IdsTabComponent } from './tab.component';

import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

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
class TestHostComponent {
  public tab = viewChild.required(IdsTabComponent);
}

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
    component = fixture.componentInstance.tab();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
