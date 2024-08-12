import { TooltipDemoComponent } from './tooltip-demo.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('TooltipDemoComponent', () => {
  let component: TooltipDemoComponent;
  let fixture: ComponentFixture<TooltipDemoComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TooltipDemoComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TooltipDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
