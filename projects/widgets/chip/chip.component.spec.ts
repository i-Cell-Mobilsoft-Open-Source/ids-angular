import { IdsChipComponent } from './chip.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsChipComponent', () => {
  let component: IdsChipComponent;
  let fixture: ComponentFixture<IdsChipComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsChipComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
