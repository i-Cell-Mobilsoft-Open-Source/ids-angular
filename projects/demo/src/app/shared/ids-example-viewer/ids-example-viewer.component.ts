import { IdsExampleDef } from './ids-example.model';

import { IdsTabGroupExtensionDirective } from '../../pages/components/component-details/ids-tab-group-extension.directive';

import { Clipboard } from '@angular/cdk/clipboard';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, signal, viewChild, ViewContainerRef } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { IdsSnackbarService } from '@i-cell/ids-angular/snackbar';
import { IdsTabGroupComponent, IdsTabComponent } from '@i-cell/ids-angular/tab';
import { IdsTooltipDirective } from '@i-cell/ids-angular/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import { of, switchMap } from 'rxjs';

interface NormalizedTab {
  language: 'html' | 'ts';
  path: string;
}

@Component({
  selector: 'ids-example-viewer',
  templateUrl: './ids-example-viewer.component.html',
  styleUrl: './ids-example-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IdsCardComponent,
    IdsIconButtonComponent,
    IdsIconComponent,
    IdsTooltipDirective,
    IdsTabGroupComponent,
    IdsTabComponent,
    IdsTabGroupExtensionDirective,
    TranslateModule,
  ],
})
export class IdsExampleViewerComponent implements OnInit {
  private _sanitizer = inject(DomSanitizer);
  private _clipboard = inject(Clipboard);
  private _snackbar = inject(IdsSnackbarService);
  private _http = inject(HttpClient);
  private _dynamicHost = viewChild.required('dynamicHost', { read: ViewContainerRef });
  protected _selectedTabIndex = signal(0);

  public example = input.required<IdsExampleDef>();
  protected _isCodeVisible = signal(false);

  public readonly tabs = computed<NormalizedTab[]>(() => {
    const normalized: NormalizedTab[] = [];
    const filesArray = this.example().files;

    if (!filesArray) {
      return normalized;
    }

    for (const filePair of filesArray) {
      if (filePair.HTMLpath) {
        normalized.push({
          language: 'html',
          path: filePair.HTMLpath,
        });
      }
      if (filePair.TSpath) {
        normalized.push({
          language: 'ts',
          path: filePair.TSpath,
        });
      }
    }
    return normalized;
  });

  private readonly _currentTabPath = computed(() => this.tabs()[this._selectedTabIndex()]?.path ?? '');

  private readonly _rawCode = toSignal(
    toObservable(this._currentTabPath).pipe(
      switchMap((path) => {
        if (!path) {
          return of('');
        }
        return this._http.get(path, { responseType: 'text' });
      }),
    ),
    { initialValue: '' },
  );

  protected _highlightedCode = computed(() => {
    const code = this._rawCode();
    if (!code) {
      return '';
    }

    const currentTab = this.tabs()[this._selectedTabIndex()];
    if (!currentTab) {
      return '';
    }

    const prismLang = currentTab.language === 'ts' ? 'typescript' : 'markup';
    const highlighted = Prism.highlight(code, Prism.languages[prismLang], prismLang);
    return this._sanitizer.bypassSecurityTrustHtml(highlighted);
  });

  public ngOnInit(): void {
    const container = this._dynamicHost();
    const currentExample = this.example();

    if (container && currentExample?.component) {
      container.clear();
      container.createComponent(currentExample.component);
    }
  }

  public toggleCode(): void {
    this._isCodeVisible.update((visible) => !visible);
    this._selectedTabIndex.set(0);
  }

  public onTabChange(index: number): void {
    this._selectedTabIndex.set(index);
  }

  public copyCode(): void {
    const code = this._rawCode();

    if (code) {
      if (this._clipboard.copy(code)) {
        this._snackbar.add({
          message: 'Code copied to clipboard',
          autoClose: true,
          variant: 'info',
          icon: '',
        });
      }
    }
  }
}
