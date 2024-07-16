import { FormElement } from '../types/form-element';

import { InjectionToken } from '@angular/core';

export const IDS_FORM_ELEMENT = new InjectionToken<FormElement<unknown>>('IdsFormElement');
