import { IdsOverlayPanelComponent } from './overlay-panel.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsOverlayPanelComponent', () => {
  let component: IdsOverlayPanelComponent;
  let fixture: ComponentFixture<IdsOverlayPanelComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsOverlayPanelComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsOverlayPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
