import { Menu } from '../menu.interface';

import {
  Component,
  ElementRef,
  viewChild,
  input, OnInit,
  computed,
  viewChildren,
  AfterViewInit,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'ids-subnav',
  imports: [
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubnavComponent implements OnInit, AfterViewInit {
  public menuItem = input.required<Menu>();
  public trigger = input.required<HTMLElement>();
  public details = viewChild<ElementRef<HTMLDetailsElement>>('details');

  private _active = viewChildren<RouterLinkActive>('rla');
  public hasActiveSubmenuItem = computed(() => this._active().length);

  private _open = false;

  set open(value: boolean) {
    this._open = value;
    this.details()!.nativeElement.open = value;
    this.opened.emit(value);
  }

  public opened = output<boolean>();

  public ngOnInit(): void {
    this.trigger().addEventListener('click', () => {
      this.open = !this._open;
    });
  }

  public ngAfterViewInit(): void {
    if (this.hasActiveSubmenuItem()) {
      this.open = true;
    }
  }
}
