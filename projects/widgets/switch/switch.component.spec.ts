import { IdsSwitchComponent } from './switch.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsSwitchComponent', () => {
  let component: IdsSwitchComponent;
  let fixture: ComponentFixture<IdsSwitchComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsSwitchComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
