import { IdsNotificationComponent } from './notification.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsNotificationComponent', () => {
  let component: IdsNotificationComponent;
  let fixture: ComponentFixture<IdsNotificationComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsNotificationComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
