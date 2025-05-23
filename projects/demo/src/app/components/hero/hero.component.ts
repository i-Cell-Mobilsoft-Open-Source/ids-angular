import { HeroData } from '../../model/heroData';

import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    IdsIconComponent,
    IdsIconButtonComponent,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnDestroy, OnInit {
  public heroData = input.required<HeroData>();
  public currentImageUrl = '';
  private _observer: MutationObserver | undefined;

  public ngOnInit(): void {
    this._updateImageBasedOnTheme();

    this._observer = new MutationObserver(() => {
      this._updateImageBasedOnTheme();
    });

    this._observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  public ngOnDestroy(): void {
    this._observer?.disconnect();
  }

  private _updateImageBasedOnTheme(): void {
    const htmlClassList = document.documentElement.classList;
    if (htmlClassList.contains('ids-theme-dark')) {
      this.currentImageUrl = this.heroData().imageUrlDark || this.heroData().imageUrlLight || '';
    } else {
      this.currentImageUrl = this.heroData().imageUrlLight || this.heroData().imageUrlDark || '';
    }
  }
}
