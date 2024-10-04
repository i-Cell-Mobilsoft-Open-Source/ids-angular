import { IdsIconComponent } from './icon.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsIconComponent', () => {
  let component: IdsIconComponent;
  let fixture: ComponentFixture<IdsIconComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsIconComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
