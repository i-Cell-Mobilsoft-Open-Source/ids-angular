import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[idsTableSortAscIcon]',
  standalone: true,
})
export class IdsTableSortAscIconDirective {
  public templateRef = inject(TemplateRef<unknown>);
}

@Directive({
  selector: 'ng-template[idsTableSortDescIcon]',
  standalone: true,
})
export class IdsTableSortDescIconDirective {
  public templateRef = inject(TemplateRef<unknown>);
}

@Directive({
  selector: 'ng-template[idsTableSortNoneIcon]',
  standalone: true,
})
export class IdsTableSortNoneIconDirective {
  public templateRef = inject(TemplateRef<unknown>);
}
