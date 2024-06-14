import { IdsTagComponent } from './ids-tag.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsTagComponent', () => {
  let component: IdsTagComponent;
  let fixture: ComponentFixture<IdsTagComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsTagComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
