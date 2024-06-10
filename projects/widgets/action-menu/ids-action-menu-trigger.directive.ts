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

  public open(): void {
    this.menuTrigger.open();
  }

  public close(): void {
    this.menuTrigger.close();
  }

  public toggle(): void {
    this.menuTrigger.toggle();
  }
}
