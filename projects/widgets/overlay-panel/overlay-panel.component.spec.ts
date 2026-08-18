import { IdsOverlayPanelComponent } from './overlay-panel.component';

import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  imports: [
    CdkOverlayOrigin,
    IdsOverlayPanelComponent,
  ],
  template: `
    <button
      #origin="cdkOverlayOrigin"
      type="button"
      cdkOverlayOrigin
    >
      Origin
    </button>
    <ids-overlay-panel [origin]="origin">
      Content
    </ids-overlay-panel>
  `,
})
class TestHostComponent {}

describe('NewOverlayPanelComponent', () => {
  let component: IdsOverlayPanelComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(IdsOverlayPanelComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
