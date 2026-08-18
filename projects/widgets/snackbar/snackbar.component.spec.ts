import { IdsSnackbarComponent } from './snackbar.component';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  imports: [IdsSnackbarComponent],
  template: '<ids-snackbar message="Test message" />',
})
class TestHostComponent {}

describe('IdsSnackbarComponent', () => {
  let component: IdsSnackbarComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(IdsSnackbarComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
