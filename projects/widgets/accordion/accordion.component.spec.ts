import { IdsAccordionComponent } from './accordion.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsAccordionComponent', () => {
  let component: IdsAccordionComponent;
  let fixture: ComponentFixture<IdsAccordionComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsAccordionComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
