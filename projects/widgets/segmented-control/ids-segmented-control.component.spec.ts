import { IdsSegmentedControlComponent } from './ids-segmented-control.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsSegmentedControlComponent', () => {
  let component: IdsSegmentedControlComponent;
  let fixture: ComponentFixture<IdsSegmentedControlComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsSegmentedControlComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsSegmentedControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
