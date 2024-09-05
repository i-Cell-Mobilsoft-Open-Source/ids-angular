import { IdsSnackbarComponent } from './snackbar.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('SnackbarComponent', () => {
  let component: IdsSnackbarComponent;
  let fixture: ComponentFixture<IdsSnackbarComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsSnackbarComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
