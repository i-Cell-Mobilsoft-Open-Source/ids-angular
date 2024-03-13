import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { IdsIconComponent } from '@i-cell/widgets/icon';
import { mdiCheck } from '@mdi/js';

@Component({
  standalone: true,
  imports: [IdsIconComponent],
  selector: 'label[idsSwitch]',
  templateUrl: './ids-switch.component.html',
  styleUrls: ['./ids-switch.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IdsSwitchComponent {
  private readonly componentClass = 'ids-switch';
  private elem = inject(ElementRef<HTMLLabelElement>);
  private cdr = inject(ChangeDetectorRef);
  public onIcon = input<string>(mdiCheck);

  checked = signal(
    (
      (this.elem.nativeElement as HTMLLabelElement).querySelector(
        'input'
      ) as HTMLInputElement
    )?.checked
  );

  private hostClasses = computed(() =>
    [this.componentClass, this.checked() ? `on` : `off`]
      .filter(Boolean)
      .join(' ')
  );

  @HostBinding('class') get classes(): string {
    return this.hostClasses();
  }

  constructor() {
    this.elem.nativeElement.addEventListener('change', () => {
      this.checked.set(
        (
          (this.elem.nativeElement as HTMLLabelElement).querySelector(
            'input'
          ) as HTMLInputElement
        )?.checked
      );
      this.cdr.markForCheck();
    });
  }
}
