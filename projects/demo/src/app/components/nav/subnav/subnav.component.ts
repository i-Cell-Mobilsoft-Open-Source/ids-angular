import { Menu } from '../menu.interface';

import {
  Component,
  ElementRef,
  viewChild,
  input, OnInit,
  output,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ids-subnav',
  imports: [
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubnavComponent implements OnInit {
  public menuItem = input.required<Menu>();
  public trigger = input.required<HTMLElement>();
  public details = viewChild<ElementRef<HTMLDetailsElement>>('details');

  private _open = false;

  @Input() set open(value: boolean) {
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
}
