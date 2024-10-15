import { IdsCheckboxGroupComponent } from './checkbox-group.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsCheckboxGroupComponent', () => {
  let component: IdsCheckboxGroupComponent;
  let fixture: ComponentFixture<IdsCheckboxGroupComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsCheckboxGroupComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsCheckboxGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
