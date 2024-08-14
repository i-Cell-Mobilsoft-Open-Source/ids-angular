import { Menu } from '../menu.interface';

import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  viewChild,
  input, OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
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
})
export class SubnavComponent implements OnInit {
  public menuItem = input.required<Menu>();
  public trigger = input.required<HTMLElement>();
  public details = viewChild<ElementRef<HTMLDetailsElement>>('details');
  private _open = false;
  set open(value: boolean) {
    this._open = value;
    this.details()!.nativeElement.open = value;
    this.opened.emit(value);
  }

  @Output() public opened: EventEmitter<boolean> = new EventEmitter();

  public ngOnInit(): void {
    this.trigger().addEventListener('click', () => {
      this.open = !this._open;
    });
  }
}
