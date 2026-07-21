import { inject, Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

const APP_TITLE_SUFFIX = 'i-Cell Design System';

@Injectable({ providedIn: 'root' })
export class CustomTitleStrategy extends TitleStrategy {
  private readonly _translate = inject(TranslateService);
  private _lastRouterState?: RouterStateSnapshot;

  constructor() {
    super();
    this._translate.onLangChange.subscribe(() => {
      if (this._lastRouterState) {
        this.updateTitle(this._lastRouterState);
      }
    });
  }

  public override updateTitle(routerState: RouterStateSnapshot): void {
    this._lastRouterState = routerState;

    let finalTitle: string | undefined = this.buildTitle(routerState);

    if (finalTitle && this._isTranslationKey(finalTitle)) {
      finalTitle = this._translate.instant(finalTitle);
    }

    if (finalTitle) {
      document.title = `${finalTitle} | ${APP_TITLE_SUFFIX}`;
    } else {
      document.title = APP_TITLE_SUFFIX;
    }
  }

  private _isTranslationKey(str: string): boolean {
    return /^[A-Z_]+(\.[A-Z_]+)*$/.test(str);
  }
}
