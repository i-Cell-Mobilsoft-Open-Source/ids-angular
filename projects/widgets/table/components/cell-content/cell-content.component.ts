import { IdsTableCellRenderer } from '../../directives/cell-renderer';
import { IdsTableIntl } from '../../table-intl';

import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { Component, computed, ElementRef, inject, input, signal, TemplateRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { isString } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { map, startWith } from 'rxjs';

/**
 * This component handles the rendering of a table cell based on the column definition and row data using internal or external cell renderer
 * templates or components.
 */
@Component({
  selector: 'th[idsCellContent],td[idsCellContent],th[idsHeaderCellContent],td[idsHeaderCellContent]',
  templateUrl: './cell-content.component.html',
  imports: [
    IdsIconComponent,
    NgComponentOutlet,
    NgTemplateOutlet,
  ],
})
export class IdsCellContentComponent<D> extends IdsTableCellRenderer<D> {
  private _elementRef = inject(ElementRef);
  private _intl = inject(IdsTableIntl);
  private _isHeader = (this._elementRef.nativeElement as Element).hasAttribute('idsHeaderCellContent');
  private _numberFormat = toSignal(this._intl.changes.pipe(map(() => this._intl.numberFormat), startWith(this._intl.numberFormat)));

  public externalCellTemplates = input<Map<string, TemplateRef<unknown>>>();

  private _cellRendererDef = computed(() => (this._isHeader ? this.colDef().headerCellRenderer : this.colDef().cellRenderer));
  private _updateCellContent = signal(true);

  protected _cellValue = computed(() => {
    // Forces recalculation of this computed signal
    this._updateCellContent();

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
    const stringValue = this._stringCellValue();
    return this._numberFormat()?.format(parseFloat(stringValue)) ?? stringValue;
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

  public updateValue(): void {
    this._updateCellContent.set(!this._updateCellContent());
  }
}
