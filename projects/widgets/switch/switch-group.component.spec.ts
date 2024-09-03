import { IdsSwitchGroupComponent } from './switch-group.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsSwitchGroupComponent', () => {
  let component: IdsSwitchGroupComponent;
  let fixture: ComponentFixture<IdsSwitchGroupComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsSwitchGroupComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsSwitchGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
