import { IdsOptionGroupComponent } from './option-group.component';
import { IDS_OPTION_PARENT_COMPONENT } from './tokens/option-parent';

import { IdsFormFieldVariant } from '../form-field/types/form-field-variant.type';

import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdsSize } from '@i-cell/ids-angular/core';

describe('IdsOptionGroupComponent', () => {
  let component: IdsOptionGroupComponent;
  let fixture: ComponentFixture<IdsOptionGroupComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsOptionGroupComponent],
      providers: [
        {
          provide: IDS_OPTION_PARENT_COMPONENT,
          useValue: {
            multiSelect: signal(false),
            parentSize: signal(IdsSize.COMFORTABLE),
            parentVariant: signal(IdsFormFieldVariant.SURFACE),
            isOptionPreSelectedByValue: (): boolean => false,
          },
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
