import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  viewChild,
  input,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Menu } from '../menu.interface';

@Component({
  standalone: true,
  selector: 'app-subnav',
  imports: [RouterModule, TranslateModule],
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.scss'],
})
export class SubnavComponent {
  public menuItem = input.required<Menu>();
  public trigger = input.required<HTMLElement>();
  public details = viewChild<ElementRef<HTMLDetailsElement>>('details');
  private _open = false;
  set open(value: boolean) {
    this._open = value;
    this.details()!.nativeElement.open = value;
    this.onOpen.emit(value);
  }
  @Output() public onOpen: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {
    this.trigger().addEventListener('click', () => {
      this.open = !this._open;
    });
  }
}
