import { IdsErrorMessageComponent } from './ids-error-message.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsErrorMessageComponent', () => {
  let component: IdsErrorMessageComponent;
  let fixture: ComponentFixture<IdsErrorMessageComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsErrorMessageComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
