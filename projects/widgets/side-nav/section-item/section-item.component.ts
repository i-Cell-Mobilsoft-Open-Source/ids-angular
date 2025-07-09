import { MenuItem } from '../menu.interface';
import { SectionTitleComponent } from '../section-title/section-title.component';

import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  input, OnInit,
  output,
  ChangeDetectionStrategy,
  Input,
  viewChild,
  effect,
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
    SectionTitleComponent,
    NgTemplateOutlet,
    JsonPipe,
  ],
  templateUrl: './section-item.component.html',
  styleUrls: ['./section-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionItemComponent implements OnInit {
  public itemConfig = input.required<MenuItem>();
  // public details = viewChild<ElementRef<HTMLDetailsElement>>('details');
  public trigger = viewChild<HTMLElement>('trigger');

  public isOpen = false;

  @Input() set open(value: boolean) {
    this.isOpen = value;
    // this.details()!.nativeElement.open = value;
    this.opened.emit(value);
  }

  public opened = output<boolean>();

  constructor() {
    console.info('SectionItemComponent initialized');
    effect(() => {
      console.info('SectionItemComponent itemConfig changed:', this.itemConfig());
      // this.isOpen = this.itemConfig().open ?? false;
      // this.details()?.nativeElement.open = this.isOpen;
    });
  }

  public ngOnInit(): void {
    console.info('SectionItemComponent initialized with itemConfig:', this.itemConfig());
    this.trigger()?.addEventListener('click', () => {
      this.open = !this.isOpen;
    });
  }
}
