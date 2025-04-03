import { IDS_ICON_DEFAULT_CONFIG, IDS_ICON_DEFAULT_CONFIG_FACTORY, IdsIconDefaultConfig } from './icon-defaults';
import { IDS_ICON_PARENT } from './tokens/icon-parent';
import { IdsIconSource } from './types/icon-source.type';
import { IdsIconVariantType } from './types/icon-variant.type';

import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, input, OnInit, SecurityContext, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { coerceBooleanAttribute, coerceStringAttribute, ComponentBaseWithDefaults, IdsSizeCollectionType, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_ICON_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-icon',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.aria-hidden]': 'ariaHidden().toString()',
    '[attr.fontIcon]': 'this._safeFontIcon()',
    'role': 'img',
  },
})
export class IdsIconComponent extends ComponentBaseWithDefaults<IdsIconDefaultConfig> implements OnInit {
  protected override get _hostName(): string {
    return 'icon';
  }

  private readonly _parent = inject(IDS_ICON_PARENT, { optional: true });
  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_ICON_DEFAULT_CONFIG);

  private readonly _elementRef = inject(ElementRef<HTMLElement>);
  private readonly _document = inject(DOCUMENT);
  private readonly _httpClient = inject(HttpClient);
  private readonly _sanitizer = inject(DomSanitizer);

  public size = input<IdsSizeType>(this._defaultConfig.size);
  public sizeCollection = input<IdsSizeCollectionType>(this._defaultConfig.sizeCollection);
  public variant = input<IdsIconVariantType>(this._defaultConfig.variant);
  public fontIcon = input<string | null, string>(null, { transform: coerceStringAttribute });
  public svgIconName = input<string | null, string>(null, { alias: 'svgIcon', transform: coerceStringAttribute });
  public ariaHidden = input<boolean, unknown>(true, { alias: 'aria-hidden', transform: coerceBooleanAttribute });

  protected _svgIcon: SVGElement | null = null;

  protected _safeFontIcon = computed(() => {
    const iconName = this.fontIcon();
    if (!iconName) {
      return iconName;
    }
    const fontNameMappings = this._defaultConfig.fontNameMappings;
    const mappedIconName = fontNameMappings[iconName];
    return mappedIconName ?? iconName;
  });

  protected _iconSourceType = computed(() => (this.fontIcon() ? IdsIconSource.FONT : IdsIconSource.SVG));

  private _parentOrSelfVariant = computed(() => this._parent?.embeddedIconVariant() ?? this.variant());
  protected _hostClasses = computed(() => this._getHostClasses([
    [
      `${this.sizeCollection()}collection`,
      this.size(),
    ],
    this._parentOrSelfVariant(),
    this._iconSourceType(),
  ]));

  private _sanitizeSvgIconEffect = effect(() => {
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

  public ngOnInit(): void {
    if (this.fontIcon() && this.svgIconName()) {
      throw this._createHostError('Font icon and svg icon can not be used together!');
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
    const svg = div.querySelector('svg');

    if (!svg) {
      throw this._createHostError('Svg element creation failed!');
    }

    return svg;
  }
}
