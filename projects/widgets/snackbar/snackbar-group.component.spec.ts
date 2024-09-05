import { IdsSnackbarGroupComponent } from './snackbar-group.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('SnackbarGroupComponent', () => {
  let component: IdsSnackbarGroupComponent;
  let fixture: ComponentFixture<IdsSnackbarGroupComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsSnackbarGroupComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsSnackbarGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
