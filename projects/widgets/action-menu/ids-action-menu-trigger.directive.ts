import { CdkMenuTrigger } from '@angular/cdk/menu';
import { Directive, inject } from '@angular/core';

@Directive({
  selector: 'button[idsActionMenuTriggerFor]',
  standalone: true,
  hostDirectives: [
    {
      directive: CdkMenuTrigger,
      inputs: ['cdkMenuTriggerFor: idsActionMenuTriggerFor'],
    },
  ],
  exportAs: 'idsActionMenuTrigger',
})
export class IdsActionMenuTriggerDirective {
  public menuTrigger = inject(CdkMenuTrigger);

  get isOpen(): boolean {
    return !!this.menuTrigger.isOpen();
  }

  open() {
    this.menuTrigger.open();
  }

  close() {
    this.menuTrigger.close();
  }

  toggle() {
    this.menuTrigger.toggle();
  }
}
