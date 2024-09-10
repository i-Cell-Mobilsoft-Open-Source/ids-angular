import { IdsFormFieldControl } from '../ids-form-field-control';
import { IdsFormFieldComponent } from '../ids-form-field.component';

import { InjectionToken } from '@angular/core';

export const IDS_FORM_FIELD = new InjectionToken<IdsFormFieldComponent>('IDS_FORM_FIELD');

export const IDS_FORM_FIELD_CONTROL = new InjectionToken<IdsFormFieldControl>('IDS_FORM_FIELD_CONTROL');
