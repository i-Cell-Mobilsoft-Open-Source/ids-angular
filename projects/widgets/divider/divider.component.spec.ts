import { IdsDividerComponent } from './divider.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsDividerComponent', () => {
  let component: IdsDividerComponent;
  let fixture: ComponentFixture<IdsDividerComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsDividerComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
