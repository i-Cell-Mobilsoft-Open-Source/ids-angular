import { CdkMenuTrigger } from '@angular/cdk/menu';
import { Directive, inject } from '@angular/core';

@Directive({
  selector: 'button[idsOverlayPanelTriggerFor]',
  standalone: true,
  hostDirectives: [
    {
      directive: CdkMenuTrigger,
      inputs: ['cdkMenuTriggerFor: idsOverlayPanelTriggerFor'],
    },
  ],
  exportAs: 'idsOverlayPanelTrigger',
})
export class IdsOverlayPanelTriggerDirective {
  public overlayTrigger = inject(CdkMenuTrigger);

  get isOpen(): boolean {
    return !!this.overlayTrigger.isOpen();
  }

  public open(): void {
    this.overlayTrigger.open();
  }

  public close(): void {
    this.overlayTrigger.close();
  }

  public toggle(): void {
    this.overlayTrigger.toggle();
  }
}
