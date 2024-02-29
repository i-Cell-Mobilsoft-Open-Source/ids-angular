import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  HostBinding,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'input[type=checkbox][idsSwitch]',
  template: '',
  styleUrls: ['./ids-switch.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IdsSwitchComponent {
  private readonly componentClass = 'ids-switch';
  private elem = inject(ElementRef<HTMLInputElement>);
  private cdr = inject(ChangeDetectorRef);

  checked = signal(this.elem.nativeElement.checked);

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
      this.checked.set(this.elem.nativeElement.checked);
      this.cdr.markForCheck();
    });
  }
}
