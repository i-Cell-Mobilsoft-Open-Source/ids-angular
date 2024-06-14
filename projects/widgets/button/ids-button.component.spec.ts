import { IdsButtonComponent } from './ids-button.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsButtonComponent', () => {
  let component: IdsButtonComponent;
  let fixture: ComponentFixture<IdsButtonComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsButtonComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
