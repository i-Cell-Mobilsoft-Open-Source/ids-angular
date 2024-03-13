import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  viewChild,
  input,
  ViewEncapsulation,
  inject,
  computed,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Menu } from '../menu.interface';

@Component({
  standalone: true,
  selector: 'ids-subnav',
  imports: [RouterModule, TranslateModule],
  templateUrl: './ids-subnav.component.html',
  styleUrls: ['./ids-subnav.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
