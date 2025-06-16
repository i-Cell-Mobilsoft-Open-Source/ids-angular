import { ISSUE_DATA } from '../../../utils/issueListData';
import { HeroComponent } from '../../components/hero/hero.component';
import { HeroData } from '../../model/heroData';

import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

@Component({
  selector: 'app-issue-report',
  imports: [
    IdsCardComponent,
    HeroComponent,
    IdsIconButtonComponent,
    IdsIconComponent,
  ],
  templateUrl: './issue-report.component.html',
  styleUrl: './issue-report.component.scss',
})
export class IssueReportComponent implements OnInit, OnDestroy {
  public indexDatas = ISSUE_DATA;

  public heroData = signal<HeroData>({
    title: 'Issue report',
    description:
      // eslint-disable-next-line @stylistic/js/max-len
      'Welcome to the Issue Report page! Here, you can  submit requests for improvements to the i-DS Design System or report specific design or development issues. However, before submitting a new request or bug report, please check the issue list to make sure it hasn’t already been reported by someone else.',
    id: 0,
    imageUrl: '',
    imageUrlLight: 'assets/images/heros/ids-issue-hero@2x.png',
    imageUrlDark: 'assets/images/heros/ids-issue-hero-dark@2x.png',
  });

  private _observer: MutationObserver | undefined;
  private _isDarkTheme = signal<boolean>(false);

  public ngOnInit(): void {
    this._updateTheme();

    this._observer = new MutationObserver(() => {
      this._updateTheme();
    });

    this._observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  public ngOnDestroy(): void {
    this._observer?.disconnect();
  }

  public getImageUrl(indexData: unknown): string {
    const data = indexData as { imageUrlDark: string; imageUrlLight: string };
    return this._isDarkTheme() ? data.imageUrlDark : data.imageUrlLight;
  }

  private _updateTheme(): void {
    const htmlClassList = document.documentElement.classList;
    this._isDarkTheme.set(htmlClassList.contains('ids-theme-dark'));
  }
}
