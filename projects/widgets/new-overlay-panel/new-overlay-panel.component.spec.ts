import { NewOverlayPanelComponent } from './new-overlay-panel.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('NewOverlayPanelComponent', () => {
  let component: NewOverlayPanelComponent;
  let fixture: ComponentFixture<NewOverlayPanelComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [NewOverlayPanelComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(NewOverlayPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
