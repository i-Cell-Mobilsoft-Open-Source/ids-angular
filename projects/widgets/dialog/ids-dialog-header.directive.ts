import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[idsDialogHeader]',
  standalone: true,
})
export class IdsDialogHeaderDirective {
  public template = inject(TemplateRef);
}
