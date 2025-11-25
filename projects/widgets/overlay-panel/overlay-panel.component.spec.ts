import { OverlayPanelComponent } from './overlay-panel.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('NewOverlayPanelComponent', () => {
  let component: OverlayPanelComponent;
  let fixture: ComponentFixture<OverlayPanelComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [OverlayPanelComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(OverlayPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
