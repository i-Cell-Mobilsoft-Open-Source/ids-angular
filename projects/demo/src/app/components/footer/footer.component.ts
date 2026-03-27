import { environment } from '../../../environments/environment.development';
import { ComponentBlock } from '../../model/componentEntry';
import { GlobalEntry } from '../../model/pageEntry';
import { GraphqlService } from '../../services/graphql.service';

import { Component, inject, OnInit, signal } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

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
      const typedResult = result as { data: { globalSet: GlobalEntry } };
      const globalData = typedResult.data.globalSet;

      this.footerData = {
        id: globalData.id,
        title: globalData.title,
        handle: globalData.handle,
        footer_copyright: globalData.footer_copyright,
        footer_logo: globalData.footer_logo?.[0]?.url
          ? [{ url: `${environment.cmsBaseUrl}${globalData.footer_logo[0].url}` }]
          : [],
        footer_certs: globalData.footer_certs
          ? globalData.footer_certs.map((cert) => ({
            url: `${environment.cmsBaseUrl}${cert.url}`,
          }))
          : [],
        footer_contact_group: globalData.footer_contact_group,
      };

    });
  }

  private _updateTheme(): void {
    const htmlClassList = document.documentElement.classList;
    this._isDarkTheme.set(htmlClassList.contains('ids-theme-dark'));
  }

}

