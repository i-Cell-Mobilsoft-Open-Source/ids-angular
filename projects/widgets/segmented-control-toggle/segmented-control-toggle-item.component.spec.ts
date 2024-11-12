import { IdsSegmentedControlToggleItemComponent } from './segmented-control-toggle-item.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsSegmentedControlToggleItemComponent', () => {
  let component: IdsSegmentedControlToggleItemComponent;
  let fixture: ComponentFixture<IdsSegmentedControlToggleItemComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsSegmentedControlToggleItemComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsSegmentedControlToggleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
