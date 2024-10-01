import { IdsSelectComponent } from './select.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsSelectComponent', () => {
  let component: IdsSelectComponent;
  let fixture: ComponentFixture<IdsSelectComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsSelectComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
