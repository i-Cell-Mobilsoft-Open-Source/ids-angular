import { IdsAvatarComponent } from './avatar.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsAvatarComponent', () => {
  let component: IdsAvatarComponent;
  let fixture: ComponentFixture<IdsAvatarComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsAvatarComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
