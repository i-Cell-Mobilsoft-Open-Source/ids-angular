import { HeroData } from '../../model/heroData';

import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IdsAvatarComponent } from '@i-cell/ids-angular/avatar';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsChipGroupComponent, IdsChipComponent } from '@i-cell/ids-angular/chip';
import { IdsDividerComponent } from '@i-cell/ids-angular/divider';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

const SIGNAL_UPDATE_DELAY_MS = 50;

@Component({
  selector: 'app-content-hero',
  imports: [
    IdsIconComponent,
    RouterLink,
    IdsButtonComponent,
    IdsChipGroupComponent,
    IdsChipComponent,
    IdsDividerComponent,
    IdsAvatarComponent,
  ],
  templateUrl: './content-hero.component.html',
  styleUrl: './content-hero.component.scss',
})
export class ContentHeroComponent implements OnInit, OnDestroy {
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
    // If using signals, call as a function
    const data = typeof this.heroData === 'function' ? this.heroData() : this.heroData;

    // If heroData is empty, wait for signal update before setting image
    if (!data.imageUrlLight && !data.imageUrlDark && !data.imageUrl) {
      // Try again after a short delay (wait for signal update)
      setTimeout(() => this._updateImageBasedOnTheme(), SIGNAL_UPDATE_DELAY_MS);
      return;
    }
    // Always use imageUrlLight and imageUrlDark for theme switching, fallback to imageUrl
    let imgSrc = '';
    if (data.imageUrlLight && data.imageUrlDark) {
      imgSrc = htmlClassList.contains('ids-theme-dark') ? data.imageUrlDark : data.imageUrlLight;
    } else if (data.imageUrlLight) {
      imgSrc = data.imageUrlLight;
    } else if (data.imageUrlDark) {
      imgSrc = data.imageUrlDark;
    } else if (data.imageUrl) {
      imgSrc = data.imageUrl;
    } else {
      imgSrc = 'https://via.placeholder.com/600x400?text=No+Image';
    }

    this.currentImageUrl = imgSrc;
  }
}
