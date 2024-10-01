import { Directive, InjectionToken } from '@angular/core';

export const IDS_SELECT_TRIGGER = new InjectionToken<IdsSelectTriggerDirective>('IDS_SELECT_TRIGGER');

@Directive({
  selector: 'ids-select-trigger',
  providers: [{ provide: IDS_SELECT_TRIGGER, useExisting: IdsSelectTriggerDirective }],
  standalone: true,
})
export class IdsSelectTriggerDirective {
}
