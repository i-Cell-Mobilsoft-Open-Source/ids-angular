import { IDS_SIDE_NAV_PARENT } from './tokens/ids-side-nav-parent';
import { IDS_SIDE_NAV_ROUTER } from './tokens/ids-side-nav-router';

import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  Component,
  computed,
  contentChild,
  contentChildren,
  effect,
  ElementRef,
  inject,
  input,
  linkedSignal,
  TemplateRef,
  untracked,
} from '@angular/core';
import { coerceBooleanAttribute } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { IdsTooltipDirective } from '@i-cell/ids-angular/tooltip';

/**
 * Side navigation item
 * - it can be a single list element or an expandable list element, containing another list of elements
 * - it can be used with selectors like `ids-side-nav-item` or `li[idsSideNavItem]`
 * - children can be provided with content projection:
 *    - either project `ids-side-nav-item` elements
 *    - or list elements as `<li>` elements in an ng-template, marked with `idsSideNavItemChildren` variable
 */
@Component({
  selector: 'ids-side-nav-item, li[idsSideNavItem]',
  imports: [
    IdsIconComponent,
    IdsIconButtonComponent,
    IdsTooltipDirective,
    NgTemplateOutlet,
  ],
  template: `
    <a
      idsTooltipPosition="east"
      [idsTooltip]="label()"
      [idsTooltipDisabled]="!hasTooltip() || !label() || disabled()"
      [idsTooltipIgnoreClipped]="true"
      [class.ids-side-nav-item-single]="!_expandable()"
      [class.ids-side-nav-item-expandable-summary]="_expandable()"
      [attr.tabindex]="!disabled() ? 0 : null"
      [attr.disabled]="disabled() ? '' : null"
      [attr.is-active]="active() ? '' : null"
      [attr.is-active-indicator]="active() && _parent?.hasActiveIndicator() ? '' : null"
      [attr.aria-disabled]="disabled() ? '' : null"
      [attr.aria-current]="active()"
      [attr.aria-expanded]="!_expandable() ? null : _expanded() ? 'true' : 'false'"
      [attr.aria-label]="label()"
      (keydown)="_onKeyDown($event)"
      (click)="_onClick($event)"
    >
      @if (_iconLeading()) {
        <ng-content select="[icon-leading]" />
      }
      @if (_parent?.hasLabel()) {
        <span class="ids-side-nav-item-label">{{ label() }}</span>
      }
      @if (_iconTrailing()) {
        <ng-content select="[icon-trailing]" />
      }
      @if (_expandable()) {
        <button idsIconButton type="button" [disabled]="disabled()">
          <ids-icon aria-hidden="true" alt="" [fontIcon]="_expanded() ? 'chevron-up' : 'chevron-down'" />
        </button>
      }
    </a>
    @if (_expandable()) {
      <ul class="ids-side-nav-item-expandable-submenu" [class.expanded]="_expanded()">
        <ng-content select="ids-side-nav-item,[idsSideNavItem]" />
        <ng-container *ngTemplateOutlet="_contentTemplate()" />
      </ul>
    }
    <ng-content select="ng-template" />
  `,
  host: {
    class: 'ids-side-nav-item',
    '[class.ids-side-nav-item-expandable]': '_expandable()',
    '[role]': '_expandable() ? "group" : "treeitem"',
  },
})
export class IdsSideNavItemComponent {
  public disabled = input(false, { transform: (value: boolean | string) => coerceBooleanAttribute(value) });
  public label = input.required<string>();
  public hasTooltip = input<unknown, boolean>(false, { transform: booleanAttribute });
  public target = input<string>('');
  public templateChildren = input<TemplateRef<HTMLElement>>();
  public active = computed(() => {
    this._parent?.navigationChange();
    return this._router.isActive(this.target(), { paths: 'exact', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored' });
  });

  protected _expandable = computed(() => this._contentChildren().length > 0 || this._contentTemplate());
  protected _expanded = linkedSignal(() => {
    this._parent?.navigationChange();
    return this._contentChildren().some((child) => child.active());
  });

  protected _iconLeading = contentChildren<IdsIconComponent>('[icon-leading]');
  protected _iconTrailing = contentChildren<IdsIconComponent>('[icon-trailing]');
  protected readonly _parent = inject(IDS_SIDE_NAV_PARENT, { optional: true });
  protected readonly _contentTemplate = contentChild('idsSideNavItemChildren', { read: TemplateRef });
  private readonly _contentChildren = contentChildren(IdsSideNavItemComponent);
  private readonly _router = inject(IDS_SIDE_NAV_ROUTER, { skipSelf: true });
  private _elementRef = inject(ElementRef);

  constructor() {
    effect(() => {
      const contentLength = this._contentChildren().length;

      untracked(() => {
        if (this._expandable()) {
          this._elementRef.nativeElement.style.setProperty('--submenu-items-count', contentLength.toString());
        }
      });
    });
  }

  protected _onClick(event: MouseEvent): void {
    if (this.disabled()) {
      return;
    }
    const eventTarget = event.target as Element;

    if (!this.target()) {
      this._toggle();
    } else if (
      eventTarget.localName === 'button' ||
      (eventTarget.localName === 'ids-icon' && !eventTarget.hasAttribute('icon-leading') && !eventTarget.hasAttribute('icon-trailing'))
    ) {
      this._toggle();
    } else {
      this._navigate();
    }
  }

  protected _onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }
    if ([
      'Enter',
      'Space',
    ].includes(event.code)) {
      event.preventDefault();
      if ((event.target as Element).localName === 'button') {
        this._toggle();
      } else {
        this._navigate();
      }
    } else if ([
      'ArrowUp',
      'ArrowDown',
      'Escape',
    ].includes(event.code)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this._toggle();
    }
  }

  protected _toggle(): void {
    if (this._expandable()) {
      this._expanded.set(!this._expanded());
    }
  }

  protected _navigate(): void {
    const target = this.target();
    if (target) {
      this._router.navigateByUrl(target);
    }
  }
}
