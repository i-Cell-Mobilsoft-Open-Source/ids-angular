import { IdsRadioComponent } from './radio.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsRadioComponent', () => {
  let component: IdsRadioComponent;
  let fixture: ComponentFixture<IdsRadioComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsRadioComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
