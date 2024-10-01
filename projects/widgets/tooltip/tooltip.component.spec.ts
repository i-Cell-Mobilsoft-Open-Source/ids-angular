import { IdsTooltipComponent } from './tooltip.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsTooltipComponent', () => {
  let component: IdsTooltipComponent;
  let fixture: ComponentFixture<IdsTooltipComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsTooltipComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
