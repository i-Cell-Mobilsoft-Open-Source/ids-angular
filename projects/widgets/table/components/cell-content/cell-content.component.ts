import { IdsTableCellRenderer } from '../../directives/cell-renderer';

import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { Component, computed, ElementRef, inject, input, TemplateRef } from '@angular/core';
import { isString } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

/**
 * This component handles the rendering of a table cell based on the column definition and row data using internal or external cell renderer
 * templates or components.
 */
@Component({
  selector: 'th[idsCellContent],td[idsCellContent],th[idsHeaderCellContent],td[idsHeaderCellContent]',
  standalone: true,
  templateUrl: './cell-content.component.html',
  imports: [
    IdsIconComponent,
    NgComponentOutlet,
    NgTemplateOutlet,
  ],
})
export class IdsCellContentComponent<D> extends IdsTableCellRenderer<D> {
  private _elementRef = inject(ElementRef);
  private _isHeader = (this._elementRef.nativeElement as Element).hasAttribute('idsHeaderCellContent');

  public externalCellTemplates = input<Map<string, TemplateRef<unknown>>>();

  private _cellRendererDef = computed(() => (this._isHeader ? this.colDef().headerCellRenderer : this.colDef().cellRenderer));

  protected _cellValue = computed(() => {
    if (this._isHeader) {
      return this.colDef().label ?? '';
    }

    const rowData = this.rowData();

    if (!rowData) {
      return '';
    }

    const field = this.colDef().field ?? '';
    const valueFn = this.colDef().value ?? ((): string => '');

    const rawResult = field && Object.hasOwn(rowData, field) ? (rowData as Record<string, unknown>)[field] : valueFn(rowData);
    return isString(rawResult) ? this._preSanitize(rawResult) : rawResult;
  });

  protected _stringCellValue = computed(() => String(this._cellValue() ?? ''));

  protected _numericCellValue = computed(() => {
    // TODO: get current language!
    const currentLang = 'hu';
    return Intl.NumberFormat(currentLang).format(parseFloat(this._stringCellValue()));
  });

  protected _cellRendererComp = computed(() => {
    const renderer = this._cellRendererDef();
    if (this._isComponentCellRenderer(renderer)) {
      return renderer;
    }

    return null;
  });

  protected _cellTemplateName = computed(() => {
    if (isString(this._cellRendererDef())) {
      return this._cellRendererDef() as string;
    }

    return undefined;
  });

  protected _cellTemplate = computed(() => {
    const templateName = this._cellTemplateName();
    const templates = this.externalCellTemplates();
    return isString(templateName) && templates?.has(templateName) ? templates.get(templateName) ?? null : null;
  });
}
