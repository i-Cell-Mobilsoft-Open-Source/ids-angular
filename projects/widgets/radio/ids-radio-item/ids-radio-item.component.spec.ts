import { IdsRadioItemComponent } from './ids-radio-item.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsRadioItemComponent', () => {
  let component: IdsRadioItemComponent;
  let fixture: ComponentFixture<IdsRadioItemComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsRadioItemComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsRadioItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
