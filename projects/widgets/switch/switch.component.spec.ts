import { IdsSwitchComponent } from './switch.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('IdsSwitchComponent', () => {
  let component: IdsSwitchComponent;
  let fixture: ComponentFixture<IdsSwitchComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsSwitchComponent],
      providers: [provideNoopAnimations()],
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
