import { IdsFieldsetRowComponent } from './fieldset-row.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsFieldsetRowComponent', () => {
  let component: IdsFieldsetRowComponent;
  let fixture: ComponentFixture<IdsFieldsetRowComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsFieldsetRowComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsFieldsetRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
