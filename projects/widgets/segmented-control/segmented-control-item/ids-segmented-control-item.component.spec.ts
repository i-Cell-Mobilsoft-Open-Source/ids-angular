import { IdsSegmentedControlItemComponent } from './ids-segmented-control-item.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsSegmentedControlItemComponent', () => {
  let component: IdsSegmentedControlItemComponent;
  let fixture: ComponentFixture<IdsSegmentedControlItemComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsSegmentedControlItemComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsSegmentedControlItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
