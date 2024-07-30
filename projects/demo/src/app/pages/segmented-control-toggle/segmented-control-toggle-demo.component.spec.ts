import { SegmentedControlToggleDemoComponent } from './segmented-control-toggle-demo.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('SegmentedControlToggleDemoComponent', () => {
  let component: SegmentedControlToggleDemoComponent;
  let fixture: ComponentFixture<SegmentedControlToggleDemoComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [SegmentedControlToggleDemoComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SegmentedControlToggleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
