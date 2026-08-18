import { IdsOptionGroupComponent } from './option-group.component';
import { IDS_OPTION_PARENT_COMPONENT, IdsOptionParentComponent } from './tokens/option-parent';

import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

const optionParentComponent: IdsOptionParentComponent = {
  multiSelect: signal(false),
  parentSize: signal('comfortable'),
  parentVariant: signal('surface'),
  isOptionPreSelectedByValue: () => false,
};

describe('IdsOptionGroupComponent', () => {
  let component: IdsOptionGroupComponent;
  let fixture: ComponentFixture<IdsOptionGroupComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsOptionGroupComponent],
      providers: [
        {
          provide: IDS_OPTION_PARENT_COMPONENT,
          useValue: optionParentComponent,
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsOptionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
