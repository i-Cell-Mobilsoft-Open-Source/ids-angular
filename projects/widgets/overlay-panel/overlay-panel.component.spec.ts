import { IdsOverlayPanelComponent } from './overlay-panel.component';

import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('NewOverlayPanelComponent', () => {
  let component: IdsOverlayPanelComponent;
  let fixture: ComponentFixture<IdsOverlayPanelComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsOverlayPanelComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsOverlayPanelComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('origin', new ElementRef(document.body));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
