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
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
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
  private readonly _componentClass = 'ids-switch';
  private _elem = inject(ElementRef<HTMLLabelElement>);
  private _cdr = inject(ChangeDetectorRef);
  public onIcon = input<string>(mdiCheck);

  public checked = signal(
    (
      (this._elem.nativeElement as HTMLLabelElement).querySelector(
        'input',
      ) as HTMLInputElement
    )?.checked,
  );

  private _hostClasses = computed(() =>
    [
      this._componentClass,
      this.checked() ? 'on' : 'off',
    ]
      .filter(Boolean)
      .join(' '),
  );

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  constructor() {
    this._elem.nativeElement.addEventListener('change', () => {
      this.checked.set(
        (
          (this._elem.nativeElement as HTMLLabelElement).querySelector(
            'input',
          ) as HTMLInputElement
        )?.checked,
      );
      this._cdr.markForCheck();
    });
  }
}
