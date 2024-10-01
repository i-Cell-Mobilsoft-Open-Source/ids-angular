import { IdsCardComponent } from './card.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsCardComponent', () => {
  let component: IdsCardComponent;
  let fixture: ComponentFixture<IdsCardComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsCardComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
