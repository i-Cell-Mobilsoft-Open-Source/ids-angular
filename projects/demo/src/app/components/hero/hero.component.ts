import { HeroData } from '../../model/heroData';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

import { Location } from '@angular/common';
import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    IdsIconComponent,
    IdsIconButtonComponent,
    SafeHtmlPipe,
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
    const data = this.heroData(); // if you're using signal

    if (data.localImageUrl) {
      this.currentImageUrl = data.localImageUrl;
    } else {
      const light = data.imageUrlLight || '';
      const dark = data.imageUrlDark || '';
      this.currentImageUrl = htmlClassList.contains('ids-theme-dark') ? dark : light;
    }
  }

  constructor(private _location: Location) { }

  public goBack(): void {
    this._location.back();
  }
}
