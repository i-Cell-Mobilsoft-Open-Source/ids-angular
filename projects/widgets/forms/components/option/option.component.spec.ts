import { IdsOptionComponent } from './option.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsOptionComponent', () => {
  let component: IdsOptionComponent;
  let fixture: ComponentFixture<IdsOptionComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsOptionComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
