import { SegmentedControlDemoComponent } from './segmented-control-demo.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('SegmentedControlDemoComponent', () => {
  let component: SegmentedControlDemoComponent;
  let fixture: ComponentFixture<SegmentedControlDemoComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [SegmentedControlDemoComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SegmentedControlDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
