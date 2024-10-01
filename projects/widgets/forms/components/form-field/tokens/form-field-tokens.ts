import { IdsFormFieldControl } from '../form-field-control';
import { IdsFormFieldComponent } from '../form-field.component';

import { InjectionToken } from '@angular/core';

export const IDS_FORM_FIELD = new InjectionToken<IdsFormFieldComponent>('IDS_FORM_FIELD');

export const IDS_FORM_FIELD_CONTROL = new InjectionToken<IdsFormFieldControl>('IDS_FORM_FIELD_CONTROL');
