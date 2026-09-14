import { TranslateService } from '@ngx-translate/core';

export function getDemoApiTitle(translate: TranslateService, component: string, property: string): string {
  return translate.instant('API.PROPERTY_TABLE_TITLE', {
    component: translate.instant(component),
    property: translate.instant(property),
  });
}
