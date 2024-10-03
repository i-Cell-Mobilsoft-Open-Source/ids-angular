import { IdsCheckboxComponent } from './checkbox.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsCheckboxComponent', () => {
  let component: IdsCheckboxComponent;
  let fixture: ComponentFixture<IdsCheckboxComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsCheckboxComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
