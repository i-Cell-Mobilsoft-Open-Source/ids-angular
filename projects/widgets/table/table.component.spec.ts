import { IdsTableCellTemplateDirective } from './directives/cell-template';
import { IdsTableDetailTriggerDirective } from './directives/detail-trigger';
import { IdsTableComponent } from './table.component';
import { IdsTableColumnDef } from './types/table-column-def';
import { IdsTableDetailTogglePositionType } from './types/table-detail-toggle-position.type';
import { IdsTableDetailTriggerModeType } from './types/table-detail-trigger-mode.type';

import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

interface TestRow {
  name: string;
  permissions: string;
  detail: boolean;
  showTrigger?: boolean;
}

@Component({
  imports: [
    IdsTableComponent,
    IdsTableCellTemplateDirective,
    IdsTableDetailTriggerDirective,
  ],
  template: `
    <ids-table [columnDefs]="columns" [dataSource]="rows" [masterDetail]="masterDetail"
      [masterDetailToggleColumnId]="target" [hasDetailRow]="hasDetail"
      [masterDetailTogglePosition]="position" [masterDetailTriggerMode]="mode"
      [masterDetailTriggerTemplateName]="triggerTemplate"
      [detailStickyColumns]="detailStickyColumns" [enableRowSelection]="rowSelection"
      (cellClick)="cellClicks = cellClicks + 1"
      (rowClick)="rowClicks = rowClicks + 1" (rowKeydown)="rowKeydowns = rowKeydowns + 1">
      <ng-template let-row idsCellTemplate="detail">Details for {{ row.name }}</ng-template>
      <ng-template let-value="cellValue" idsCellTemplate="permissions"><strong>{{ value }}</strong></ng-template>
      <ng-template let-row let-detail="detail" let-index="index" let-column="colDef"
        let-value="cellValue" idsCellTemplate="customTrigger">
        @if (!emptyTemplate) {
          <span class="custom-content">{{ row.name }}:{{ index }}:{{ column?.id }}:{{ value }}</span>
          @if (row.showTrigger !== false) {
            <button type="button" class="custom-trigger" [idsTableDetailTrigger]="detail">{{ detail.expanded ? 'Close' : 'Open' }}</button>
          }
          @if (directToggle) {
            <button type="button" class="direct-toggle" (click)="detail.toggle()">Direct toggle</button>
          }
        }
      </ng-template>
    </ids-table>
  `,
})
class TestHostComponent {
  public table = viewChild.required(IdsTableComponent<TestRow>);
  public target: string | null = null;
  public masterDetail = true;
  public position: IdsTableDetailTogglePositionType = 'before';
  public mode: IdsTableDetailTriggerModeType = 'default';
  public triggerTemplate = 'customTrigger';
  public emptyTemplate = false;
  public directToggle = false;
  public cellClicks = 0;
  public rowClicks = 0;
  public rowKeydowns = 0;
  public detailStickyColumns = true;
  public rowSelection = false;
  public columns: IdsTableColumnDef<TestRow>[] = [
    { id: 'name', field: 'name', label: 'Name', identifier: true },
    { id: 'permissions', field: 'permissions', label: 'Permissions', stickyEnd: true, cellRenderer: 'permissions' },
  ];

  public rows: TestRow[] = [
    { name: 'First', permissions: 'Read', detail: true },
    { name: 'Second', permissions: 'Write', detail: false },
  ];

  public hasDetail = (index: number, row: TestRow): boolean => index === 0 && row.detail;
}

let fixture: ComponentFixture<TestHostComponent>;
let host: TestHostComponent;
let element: HTMLElement;

beforeEach(async() => {
  await TestBed.configureTestingModule({
    imports: [TestHostComponent],
    providers: [provideNoopAnimations()],
  }).compileComponents();
  fixture = TestBed.createComponent(TestHostComponent);
  host = fixture.componentInstance;
  element = fixture.nativeElement as HTMLElement;
});

async function render(): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

function toggleButton(): HTMLButtonElement {
  return element.querySelector<HTMLButtonElement>('.ids-table__button--master-detail')!;
}

it('uses the trailing detail column when the new input is entirely omitted', async() => {
  const tableFixture = TestBed.createComponent(IdsTableComponent<TestRow>);
  tableFixture.componentRef.setInput('columnDefs', host.columns);
  tableFixture.componentRef.setInput('dataSource', host.rows);
  tableFixture.componentRef.setInput('masterDetail', true);
  tableFixture.componentRef.setInput('hasDetailRow', host.hasDetail);
  tableFixture.detectChanges();
  await tableFixture.whenStable();
  const tableElement = tableFixture.nativeElement as HTMLElement;
  const lastCell = tableElement.querySelector('.ids-table__row')?.lastElementChild;
  expect(lastCell?.classList.contains('ids-table__cell--master-detail-toggle')).toBe(true);
  const button = tableElement.querySelector<HTMLButtonElement>('.ids-table__button--master-detail')!;
  button.click();
  tableFixture.detectChanges();
  await tableFixture.whenStable();
  expect(button.getAttribute('aria-expanded')).toBe('true');
  tableFixture.destroy();
});

it('keeps the default toggle in the last sticky-end column and opens and closes the detail', async() => {
  await render();
  const row = element.querySelector('.ids-table__row')!;
  expect(row.lastElementChild?.classList.contains('ids-table__cell--master-detail-toggle')).toBe(true);
  expect(row.lastElementChild?.classList.contains('cdk-table-sticky')).toBe(true);
  expect(element.querySelectorAll('.ids-table__button--master-detail')).toHaveLength(1);
  expect(toggleButton().getAttribute('aria-label')).toBe('Expand row details');
  expect(toggleButton().getAttribute('aria-expanded')).toBe('false');
  toggleButton().click();
  await render();
  expect(toggleButton().getAttribute('aria-expanded')).toBe('true');
  expect(toggleButton().querySelector('ids-icon')?.getAttribute('fonticon')).toBe('chevron-up');
  expect(element.querySelector('.ids-table__detail-row--expanded')?.textContent).toContain('Details for First');
  toggleButton().click();
  await render();
  expect(toggleButton().getAttribute('aria-expanded')).toBe('false');
  expect(toggleButton().querySelector('ids-icon')?.getAttribute('fonticon')).toBe('chevron-down');
  expect(element.querySelector('.ids-table__detail-row--expanded')).toBeNull();
});

it.each([
  'permissions',
  'name',
])('embeds in %s while retaining cell content and conditional toggles', async(target) => {
  host.target = target;
  await render();
  expect(element.querySelector('.ids-table__cell--master-detail-toggle')).toBeNull();
  // CdkCell only matches td[cdk-cell], so identifier cells (th) have no cdk-column-* class
  const targetCellClass = target === 'name' ? 'ids-table__cell--identifier' : `cdk-column-${target}`;
  expect(toggleButton().closest('td, th')?.classList.contains(targetCellClass)).toBe(true);
  expect(element.querySelector('.cdk-column-permissions strong')?.textContent).toBe('Read');
  expect(element.querySelectorAll('.ids-table__button--master-detail')).toHaveLength(1);
  toggleButton().click();
  await render();
  expect(toggleButton().getAttribute('aria-expanded')).toBe('true');
  expect(element.querySelector('.ids-table__detail-row--expanded')).not.toBeNull();
  host.table().collapseAll();
  await render();
  expect(toggleButton().getAttribute('aria-expanded')).toBe('false');
  host.table().expandAll();
  await render();
  expect(toggleButton().getAttribute('aria-expanded')).toBe('true');
});

it.each([
  'unknown',
  'permissions',
])('falls back for invalid or hidden target %s', async(target) => {
  const warning = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  try {
    host.target = target;
    host.columns = host.columns.map((column) => ({ ...column, visible: column.id !== 'permissions' }));
    await render();
    const lastCell = element.querySelector('.ids-table__row')?.lastElementChild;
    expect(lastCell?.classList.contains('ids-table__cell--master-detail-toggle')).toBe(true);
    expect(warning).toHaveBeenCalled();
    toggleButton().click();
    await render();
    expect(element.querySelector('.ids-table__detail-row--expanded')).not.toBeNull();
  } finally {
    warning.mockRestore();
  }
});

it.each([
  'sticky',
  'stickyEnd',
] as const)('keeps detail cells aligned for a %s target', async(stickySide) => {
  host.target = 'permissions';
  host.rowSelection = true;
  host.columns = host.columns.map((column) => ({ ...column, stickyEnd: false, [stickySide]: column.id === 'permissions' }));
  await render();
  const detailRow = element.querySelector('.ids-table__detail-row')!;
  const expectedCellCount = host.columns.length + 1;
  expect(detailRow.children).toHaveLength(expectedCellCount);
  expect(detailRow.querySelector('.ids-table__detail-cell')?.getAttribute('colspan')).toBe('1');
  host.detailStickyColumns = false;
  await render();
  expect(element.querySelector('.ids-table__detail-row')?.children).toHaveLength(1);
  expect(element.querySelector('.ids-table__detail-cell')?.getAttribute('colspan')).toBe('3');
});

it('restores the trailing column when the target is cleared and handles replacement rows', async() => {
  host.target = 'permissions';
  await render();
  host.target = null;
  host.rows = [{ name: 'New page', permissions: 'Admin', detail: true }];
  await render();
  expect(element.querySelector('.ids-table__row')?.lastElementChild?.contains(toggleButton())).toBe(true);
  toggleButton().click();
  await render();
  expect(element.querySelector('.ids-table__detail-row--expanded')?.textContent).toContain('New page');
  host.masterDetail = false;
  await render();
  expect(element.querySelector('.ids-table__button--master-detail')).toBeNull();
});

it('uses a full-width detail when all visible columns are sticky', async() => {
  host.target = 'permissions';
  host.columns = host.columns.map((column) => ({ ...column, sticky: true, stickyEnd: false }));
  await render();
  const detailRow = element.querySelector('.ids-table__detail-row')!;
  expect(detailRow.children).toHaveLength(1);
  expect(detailRow.querySelector('.ids-table__detail-cell')?.getAttribute('colspan')).toBe(String(host.columns.length));
});

it.each([
  'before',
  'after',
] as const)('renders the default toggle %s the original content', async(position) => {
  host.target = 'permissions';
  host.position = position;
  await render();
  const wrapper = toggleButton().parentElement!;
  expect(wrapper.classList.contains('ids-table__cell-content--with-detail-toggle')).toBe(true);
  expect(position === 'before' ? wrapper.firstElementChild : wrapper.lastElementChild).toBe(toggleButton());
  expect(wrapper.querySelector('strong')?.textContent).toBe('Read');
});

it.each([
  null,
  'name',
  'permissions',
])('renders a custom full cell in %s and synchronizes state', async(target) => {
  host.target = target;
  host.mode = 'custom';
  await render();
  const button = element.querySelector<HTMLButtonElement>('.custom-trigger')!;
  expect(toggleButton()).toBeNull();
  expect(element.querySelector('.custom-content')?.textContent).toContain(`First:0:${target ?? ''}:`);
  expect(button.getAttribute('aria-expanded')).toBe('false');
  button.click();
  await render();
  expect(button.getAttribute('aria-expanded')).toBe('true');
  expect(button.textContent).toBe('Close');
  expect(host.rowClicks).toBe(1);
  expect(host.cellClicks).toBe(target ? 1 : 0);
  host.table().collapseAll();
  await render();
  expect(button.getAttribute('aria-expanded')).toBe('false');
  host.table().expandAll();
  await render();
  expect(button.getAttribute('aria-expanded')).toBe('true');
});

it('does not open a row rejected by hasDetailRow even with a custom trigger', async() => {
  host.target = 'name';
  host.mode = 'custom';
  await render();
  const button = element.querySelectorAll<HTMLButtonElement>('.custom-trigger')[1];
  expect(button.getAttribute('aria-disabled')).toBe('true');
  button.click();
  await render();
  expect(button.getAttribute('aria-expanded')).toBe('false');
  expect(element.querySelectorAll('.ids-table__detail-row--expanded')).toHaveLength(0);
  expect(button.closest('th')?.textContent).toContain('Second');
  host.table().expandAll();
  await render();
  expect(element.querySelectorAll('.ids-table__detail-row--expanded')).toHaveLength(1);
  expect(button.getAttribute('aria-expanded')).toBe('false');
});

it('guards the exported toggle callback as well as the directive', async() => {
  host.mode = 'custom';
  host.directToggle = true;
  await render();
  element.querySelectorAll<HTMLButtonElement>('.direct-toggle')[1].click();
  await render();
  expect(element.querySelector('.ids-table__detail-row--expanded')).toBeNull();
});

it('does not replace intentionally omitted custom triggers or empty templates', async() => {
  const warning = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  try {
    host.mode = 'custom';
    host.rows = [{ ...host.rows[0], showTrigger: false }];
    await render();
    expect(element.querySelector('button')).toBeNull();
    host.table().expandAll();
    await render();
    expect(element.querySelector('.ids-table__detail-row--expanded')).not.toBeNull();
    host.emptyTemplate = true;
    await render();
    expect(element.querySelector('.ids-table__cell--master-detail-toggle')?.textContent?.trim()).toBe('');
    expect(warning).not.toHaveBeenCalled();
  } finally {
    warning.mockRestore();
  }
});

it.each([
  null,
  'permissions',
])('warns for missing custom templates in %s without a chevron fallback', async(target) => {
  const warning = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  try {
    host.mode = 'custom';
    host.target = target;
    host.triggerTemplate = 'missing';
    await render();
    expect(toggleButton()).toBeNull();
    expect(element.querySelector('.cdk-column-permissions strong')?.textContent).toBe('Read');
    expect(element.querySelector('.ids-table__cell--master-detail-toggle')?.textContent?.trim() ?? '').toBe('');
    expect(warning).toHaveBeenCalledWith(expect.stringContaining('"missing"'));
  } finally {
    warning.mockRestore();
  }
});

it('leaves native keyboard activation to the button without swallowing row keydown', async() => {
  host.mode = 'custom';
  await render();
  const button = element.querySelector<HTMLButtonElement>('.custom-trigger')!;
  expect(button.getAttribute('type')).toBe('button');
  button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  await render();
  expect(button.getAttribute('aria-expanded')).toBe('false');
  expect(host.rowKeydowns).toBe(1);
  button.click();
  await render();
  expect(button.getAttribute('aria-expanded')).toBe('true');
});

it('updates custom contexts after page replacement, sorting and mode changes', async() => {
  host.mode = 'custom';
  host.target = 'name';
  host.hasDetail = (_index, row): boolean => row.detail;
  await render();
  host.rows = [...host.rows].reverse();
  await render();
  expect(element.querySelector('.custom-content')?.textContent).toBe('Second:0:name:Second');
  host.rows = [{ name: 'Next page', permissions: 'Admin', detail: true }];
  await render();
  element.querySelector<HTMLButtonElement>('.custom-trigger')!.click();
  await render();
  expect(element.querySelector('.ids-table__detail-row--expanded')?.textContent).toContain('Next page');
  host.mode = 'default';
  await render();
  expect(element.querySelector('.custom-trigger')).toBeNull();
  expect(toggleButton().getAttribute('aria-expanded')).toBe('true');
});

it.each([
  'sticky',
  'stickyEnd',
] as const)('keeps custom %s cells aligned with either detail span setting', async(stickySide) => {
  host.mode = 'custom';
  host.target = 'permissions';
  host.columns = host.columns.map((column) => ({ ...column, stickyEnd: false, [stickySide]: column.id === 'permissions' }));
  await render();
  const cell = element.querySelector('.custom-trigger')!.closest('td')!;
  expect(cell.classList.contains('cdk-table-sticky')).toBe(true);
  expect(element.querySelector('.ids-table__row')?.children).toHaveLength(host.columns.length);
  expect(element.querySelector('.ids-table__detail-row')?.children).toHaveLength(host.columns.length);
  host.detailStickyColumns = false;
  await render();
  expect(element.querySelector('.ids-table__detail-row')?.children).toHaveLength(1);
  expect(element.querySelector('.ids-table__detail-cell')?.getAttribute('colspan')).toBe(String(host.columns.length));
});
