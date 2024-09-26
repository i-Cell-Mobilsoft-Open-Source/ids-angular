import { IdsFieldsetComponent } from './fieldset.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsFieldsetComponent', () => {
  let component: IdsFieldsetComponent;
  let fixture: ComponentFixture<IdsFieldsetComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsFieldsetComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsFieldsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
