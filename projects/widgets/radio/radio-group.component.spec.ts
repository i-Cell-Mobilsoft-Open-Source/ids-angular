import { IdsRadioGroupComponent } from './radio-group.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsRadioGroupComponent', () => {
  let component: IdsRadioGroupComponent;
  let fixture: ComponentFixture<IdsRadioGroupComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsRadioGroupComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'test-radio-group');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
