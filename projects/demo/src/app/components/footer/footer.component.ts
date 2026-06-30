import { environment } from '../../../environments/environment.development';
import { ComponentBlock } from '../../model/componentEntry';
import { GlobalEntry } from '../../model/pageEntry';
import { GraphqlService, StatamicNavNode } from '../../services/graphql.service';

import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { TranslateService } from '@ngx-translate/core';
import { switchMap } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  imports: [IdsIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  public footerData?: GlobalEntry;
  public componentBlocks: ComponentBlock[] = [];

  private _observer: MutationObserver | undefined;
  private _isDarkTheme = signal<boolean>(false);
  private _graphqlService = inject(GraphqlService);
  private _translate = inject(TranslateService);
  private _destroyRef = inject(DestroyRef);

  private _router = inject(Router);

  public footerNavTree = signal<StatamicNavNode[]>([]);
  public footerLinksNavTree = signal<StatamicNavNode[]>([]);

  public ngOnInit(): void {
    this._updateTheme();

    this._observer = new MutationObserver(() => {
      this._updateTheme();
    });

    this._observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    this._graphqlService.getGlobals().subscribe((result) => {
      const typedResult = result as { data?: { globalSet?: GlobalEntry } };

      if (!typedResult?.data?.globalSet) {
        return;
      }

      const globalData = typedResult.data.globalSet;

      this.footerData = {
        id: globalData.id,
        title: globalData.title,
        handle: globalData.handle,
        footer_copyright: globalData.footer_copyright,
        footer_logo: globalData.footer_logo?.[0]?.url ? [{ url: `${environment.cmsBaseUrl}${globalData.footer_logo[0].url}` }] : [],
        footer_certs: globalData.footer_certs
          ? globalData.footer_certs.map((cert) => ({
            url: `${environment.cmsBaseUrl}${cert.url}`,
            alt: cert.alt || '',
          }))
          : [],
        footer_contact_group: globalData.footer_contact_group,
      };
    });

    this._translate.onLangChange
      .pipe(
        startWith({ lang: this._translate.currentLang || 'en' }),
        switchMap(() => this._graphqlService.getNavigation()),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((result) => {
        const navResult = result as { data?: { navs?: Array<{ handle: string; tree: StatamicNavNode[] }> } };

        const footerNav = navResult.data?.navs?.find((nav) => nav.handle === 'footer');
        const footerLink = navResult.data?.navs?.find((nav) => nav.handle === 'footer_links');

        this.footerNavTree.set(footerNav?.tree || []);
        this.footerLinksNavTree.set(footerLink?.tree || []);
      });
  }

  public getLinkUrl(linkValue?: string): string {
    if (!linkValue) {
      return '';
    }
    // Ha már eleve külső/teljes link
    if (linkValue.startsWith('http://') || linkValue.startsWith('https://')) {
      return linkValue;
    }
    // Ha belső slug
    const lang = sessionStorage.getItem('ids_lang') || this._translate.currentLang || 'en';
    return `/${lang}/${linkValue}`;
  }

  public handleLinkClick(event: Event, linkValue?: string): void {
    event.preventDefault();

    if (!linkValue) {
      return;
    }

    if (linkValue.startsWith('http://') || linkValue.startsWith('https://')) {
      window.open(linkValue, '_blank', 'noopener');
      return;
    }

    const lang = sessionStorage.getItem('ids_lang') || this._translate.currentLang || 'en';
    const url = `/${lang}/${linkValue}`;

    this._router.navigateByUrl(url);
  }

  private _updateTheme(): void {
    const htmlClassList = document.documentElement.classList;
    this._isDarkTheme.set(htmlClassList.contains('ids-theme-dark'));
  }
}
