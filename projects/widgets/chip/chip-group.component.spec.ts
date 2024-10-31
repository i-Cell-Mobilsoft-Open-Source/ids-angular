import { IdsChipGroupComponent } from './chip-group.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsChipGroupComponent', () => {
  let component: IdsChipGroupComponent;
  let fixture: ComponentFixture<IdsChipGroupComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsChipGroupComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsChipGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
