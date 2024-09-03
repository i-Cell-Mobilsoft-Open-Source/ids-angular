import { FormElement } from '../types/form-element.type';
import { IdsFormField } from '../types/form-field.type';

import { InjectionToken } from '@angular/core';

export const IDS_FORM_ELEMENT = new InjectionToken<FormElement<unknown>>('IdsFormElement');

export const IDS_FORM_FIELD = new InjectionToken<IdsFormField>('IdsFormField');
