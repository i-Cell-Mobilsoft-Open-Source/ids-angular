import { HeroData } from '../../model/heroData';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

import { Location } from '@angular/common';
import { Component, effect, input, OnDestroy, OnInit, inject as angularInject } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [SafeHtmlPipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnDestroy, OnInit {
  public heroData = input.required<HeroData>();
  public currentImageUrl = '';
  private _observer: MutationObserver | undefined;
  private readonly _location: Location;

  constructor() {
    this._location = angularInject(Location);

    effect(() => {
      const data = this.heroData();
      if (data.imageUrl || data.imageUrlLight || data.imageUrlDark) {
        this._updateImageBasedOnTheme();
      }
    });
  }

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

    // If heroData is empty, skip update
    if (!data.imageUrlLight && !data.imageUrlDark && !data.imageUrl) {
      return;
    }

    // Always use imageUrlLight and imageUrlDark for theme switching, fallback to imageUrl
    let imgSrc: string;
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

  public goBack(): void {
    this._location.back();
  }
}
