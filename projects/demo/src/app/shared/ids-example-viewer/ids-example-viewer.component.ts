import { IdsExampleDef } from './ids-example.model';

import { Clipboard } from '@angular/cdk/clipboard';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, signal, viewChild, ViewContainerRef } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { IdsSnackbarService } from '@i-cell/ids-angular/snackbar';
import { IdsTooltipDirective } from '@i-cell/ids-angular/tooltip';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import { of, switchMap } from 'rxjs';

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
  ],
})
export class IdsExampleViewerComponent implements OnInit {
  private _sanitizer = inject(DomSanitizer);
  private _clipboard = inject(Clipboard);
  private _snackbar = inject(IdsSnackbarService);
  private _http = inject(HttpClient);
  private _dynamicHost = viewChild.required('dynamicHost', { read: ViewContainerRef });
  private  _selectedFileIndex = signal(0);
  private _currentFile = computed(() => this.example().files[this._selectedFileIndex()]);

  protected _isCodeVisible = signal(false);

  public example = input.required<IdsExampleDef>();

  private readonly _rawCode = toSignal(
    toObservable(this._currentFile).pipe(
      switchMap((file) => {
        if (!file) {
          return of('');
        }

        if (file.HTMLpath) {
          return this._http.get(file.HTMLpath, { responseType: 'text' });
        }
        return of('');
      }),
    ),
    { initialValue: '' },
  );

  protected _highlightedCode = computed(() => {
    const code = this._rawCode();

    if (!code) {
      return '';
    }

    const htmlString = Prism.highlight(code, Prism.languages['markup'], 'markup');

    return this._sanitizer.bypassSecurityTrustHtml(htmlString);
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
    this._selectedFileIndex.set(0);
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
