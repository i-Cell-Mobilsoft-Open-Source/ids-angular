import { IdsIconButtonComponent } from './icon-button.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsIconButtonComponent', () => {
  let component: IdsIconButtonComponent;
  let fixture: ComponentFixture<IdsIconButtonComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsIconButtonComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
