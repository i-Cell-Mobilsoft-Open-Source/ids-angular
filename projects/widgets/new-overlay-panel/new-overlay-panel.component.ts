import { OverlayModule, CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input, output,
} from '@angular/core';

@Component({
  selector: 'ids-new-overlay-panel',
  imports: [OverlayModule],
  templateUrl: './new-overlay-panel.component.html',
  styleUrl: './new-overlay-panel.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NewOverlayPanelComponent {
  public open = input<boolean>(false);
  public origin = input<CdkOverlayOrigin>();
  public closed = output<void>();

  protected _handleDetach(): void {
    this.closed.emit();
  }
}
