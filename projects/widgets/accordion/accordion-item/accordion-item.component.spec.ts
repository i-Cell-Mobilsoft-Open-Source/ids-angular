import { IdsAccordionItemComponent } from './accordion-item.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsAccordionItemComponent', () => {
  let component: IdsAccordionItemComponent;
  let fixture: ComponentFixture<IdsAccordionItemComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsAccordionItemComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsAccordionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
