import { IdsSuccessMessageComponent } from './success-message.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsSuccessMessageComponent', () => {
  let component: IdsSuccessMessageComponent;
  let fixture: ComponentFixture<IdsSuccessMessageComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsSuccessMessageComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsSuccessMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
