import { HeroData } from '../../model/heroData';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

import { Location } from '@angular/common';
import { Component, input, OnDestroy, OnInit, inject as angularInject } from '@angular/core';

const SIGNAL_UPDATE_DELAY_MS = 50;

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

  private readonly _location: Location;

  constructor() {
    this._location = angularInject(Location);
  }

  public goBack(): void {
    this._location.back();
  }
}

