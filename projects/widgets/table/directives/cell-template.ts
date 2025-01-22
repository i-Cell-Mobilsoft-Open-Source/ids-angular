import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[idsCellTemplate]',
  standalone: true,
})
export class IdsTableCellTemplateDirective {
  public templateName = input.required<string>({ alias: 'idsCellTemplate' });
  public templateRef = inject(TemplateRef);
}
