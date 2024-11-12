import { IdsButtonGroupComponent } from './button-group.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsButtonGroupComponent', () => {
  let component: IdsButtonGroupComponent;
  let fixture: ComponentFixture<IdsButtonGroupComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsButtonGroupComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
