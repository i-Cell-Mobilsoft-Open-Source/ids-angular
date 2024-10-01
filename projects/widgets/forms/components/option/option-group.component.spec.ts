import { IdsOptionGroupComponent } from './option-group.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsOptionGroupComponent', () => {
  let component: IdsOptionGroupComponent;
  let fixture: ComponentFixture<IdsOptionGroupComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsOptionGroupComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsOptionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
