import { IdsPaginatorComponent } from './paginator.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsPaginatorComponent', () => {
  let component: IdsPaginatorComponent;
  let fixture: ComponentFixture<IdsPaginatorComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsPaginatorComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsPaginatorComponent);
    component = fixture.componentInstance;
    const length = 100;
    fixture.componentRef.setInput('length', length);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
