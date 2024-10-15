import { IDS_ICON_DEFAULT_CONFIG, IDS_ICON_DEFAULT_CONFIG_FACTORY } from './icon-defaults';
import { IconSource } from './types/icon-source.type';
import { IconVariantType } from './types/icon-variant.type';

import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, ElementRef, inject, input, OnInit, SecurityContext, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { coerceBooleanAttribute, coerceStringAttribute, createClassList, createComponentError, fallbackValue, SizeCollectionType, SizeType } from '@i-cell/ids-angular/core';

let nextUniqueId = 0;

const defaultConfig = IDS_ICON_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-icon',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[id]': 'id()',
    '[class]': '_hostClasses()',
    '[attr.aria-hidden]': 'ariaHidden().toString()',
    '[attr.fontIcon]': 'this.fontIcon()',
    'role': 'img',
  },
})
export class IdsIconComponent implements OnInit {
  private readonly _componentClass = 'ids-icon';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private readonly _defaultConfig = {
    ...defaultConfig,
    ...inject(IDS_ICON_DEFAULT_CONFIG, { optional: true }),
  };

  private readonly _elementRef = inject(ElementRef<HTMLElement>);
  private readonly _document = inject(DOCUMENT);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _httpClient = inject(HttpClient);
  private readonly _sanitizer = inject(DomSanitizer);
  
  public id = input<string, string | undefined>(this._uniqueId, { transform: (val) => fallbackValue(val, this._uniqueId) });
  public size = input<SizeType>(this._defaultConfig.size);
  public sizeCollection = input<SizeCollectionType>(this._defaultConfig.sizeCollection);
  public variant = input<IconVariantType>(this._defaultConfig.variant);
  public fontIcon = input<string | null, string>(null, { transform: coerceStringAttribute });
  public svgIconName = input<string | null, string>(null, { alias: 'svgIcon', transform: coerceStringAttribute });
  public ariaHidden = input<boolean, unknown>(true, { alias: 'aria-hidden', transform: coerceBooleanAttribute });

  protected _svgIcon: SVGElement | null = null;

  protected _iconSourceType = computed(() => (this.fontIcon() ? IconSource.FONT : IconSource.SVG));

  private _hostClasses = computed(() =>
    createClassList(this._componentClass, [
      [
        `${this.sizeCollection()}collection`,
        this.size(),
      ],
      this.variant(),
      this._iconSourceType(),
    ]),
  );

  constructor() {
    effect(() => {
      const svgIconName = this.svgIconName();
      if (!svgIconName) {
        this._svgIcon = null;
        return;
      }
      
      const svgIconSafeUrl = this._sanitizer.sanitize(
        SecurityContext.RESOURCE_URL, 
        this._sanitizer.bypassSecurityTrustResourceUrl(`${this._defaultConfig.iconAssetsPath}/${svgIconName}.svg`),
      );

      if (!svgIconSafeUrl) {
        this._svgIcon = null;
        return;
      }

      this._getSvgElementSource(svgIconSafeUrl);
    });
  }

  public ngOnInit(): void {
    if (this.fontIcon() && this.svgIconName()) {
      throw new Error(createComponentError(this._componentClass, 'Font icon and svg icon can not be used together!'));
    }
  }

  private _getSvgElementSource(url: string): void {
    this._httpClient
      .get(url, { responseType: 'text' })
      .pipe(
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((svg) => {
        this._svgIcon = this._getSvgElement(this._sanitizer.bypassSecurityTrustHtml(svg));
        this._setSvgElement(this._svgIcon);
      });
  } 
  
  private _setSvgElement(svg: SVGElement): void {
    this._clearSvgElement();

    this._elementRef.nativeElement.appendChild(svg);
  }
  
  private _clearSvgElement(): void {
    const layoutElement: HTMLElement = this._elementRef.nativeElement;
    let childCount = layoutElement.childNodes.length;

    while (childCount--) {
      const child = layoutElement.childNodes[childCount];

      if (child.nodeType !== 1 || child.nodeName.toLowerCase() === 'svg') {
        child.remove();
      }
    }
  }
  
  private _getSvgElement(safeHtml: SafeHtml): SVGElement {
    const div = this._document.createElement('div');
    div.innerHTML = safeHtml as unknown as string;
    const svg = div.querySelector('svg') as SVGElement;

    if (!svg) {
      throw new Error(createComponentError(this._componentClass, 'Svg element creation failed!'));
    }

    return svg;
  }
}
