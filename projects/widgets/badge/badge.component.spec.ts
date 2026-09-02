import { IdsBadgeComponent } from './badge.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsBadgeComponent', () => {
  let component: IdsBadgeComponent;
  let fixture: ComponentFixture<IdsBadgeComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsBadgeComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
