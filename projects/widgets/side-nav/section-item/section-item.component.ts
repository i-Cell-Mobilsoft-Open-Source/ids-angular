import { MenuItem } from '../menu.interface';

import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  input, // OnInit,
  // output,
  ChangeDetectionStrategy,
  // Input,
  // viewChild,
  // ElementRef,
  // ElementRef,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ids-section-item',
  imports: [
    RouterModule,
    TranslateModule,
    IdsIconComponent,
    IdsIconButtonComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './section-item.component.html',
  styleUrls: ['./section-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionItemComponent /*implements OnInit*/ {
  public itemConfig = input.required<MenuItem>();
  // TODO: remove unnecessary elements
  // public details = viewChild<ElementRef<HTMLDetailsElement>>('details');
  // public trigger = viewChild<HTMLElement>('trigger');
  // public isOpen = false;

  // @Input() set open(value: boolean) {
  //   this.isOpen = value;
  //   this.details()!.nativeElement.open = value;
  //   this.opened.emit(value);
  // }

  // public opened = output<boolean>();

  // public ngOnInit(): void {
  //   this.trigger()?.addEventListener('click', () => {
  //     this.open = !this.isOpen;
  //   });
  // }
}
