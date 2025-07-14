import { NgClass } from '@angular/common'; // <-- Import NgClass
import { Component, input, OnInit, OnDestroy, computed } from '@angular/core';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [NgClass],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent implements OnInit, OnDestroy {

  public orientation = input<'horizontal' | 'vertical' | undefined>('vertical');

  public state = input<'do' | 'dont' | 'no_state' | undefined>();

  public aspectRatio = input<'1/1' | '16/9' | '16/10' | undefined>('16/9');

  public imageBgColorVariant = input<'surface' | 'primary' | 'light' | undefined>('surface');

  public imageURL = input<string>();
  public imageUrlLight = input.required<string>();
  public imageUrlDark = input.required<string>();
  public filledInContainer = input<boolean>(false);

  public imageCaption = input<string>();

  public data = input.required<{
    transparent?: boolean;
  }>();

  public borderClass = computed<string>(() => {
    switch (this.state()) {
      case 'do':
        return '!border-solid !border-ids-container-border-success-default !border-2';
      case 'dont':
        return '!border-solid !border-ids-container-border-warning-default !border-2';
      default:
        return ''; // Default class
    }
  });

  public aspectRatioClass = computed<string>(() => {
    switch (this.aspectRatio()) {
      case '1/1':
        return 'aspect-1/1';
      case '16/9':
        return 'aspect-16/9';
      case '16/10':
        return 'aspect-16/10';
      default:
        return 'aspect-16/9'; // Default value
    }
  });

  public colorVariantClass = computed<string>(() => {
    switch (this.imageBgColorVariant()) {
      case 'primary':
        return 'bg-ids-container-bg-surface-darker-20';
      case 'surface':
        return 'bg-ids-container-bg-surface-darker-10';
      case 'light':
        return 'bg-ids-container-bg-surface-lighter-10';
      default:
        return 'surface'; // Default value
    }
  });

  public imgFilledClass = computed<string>(() =>
    (this.filledInContainer()
      ? 'object-cover lg:w-full lg:h-full'
      : 'object-contain lg:w-1/2 lg:h-auto'
    ),
  );

  public containerPaddingClass = computed<string>(() =>
    (this.filledInContainer()
      ? 'p-0' : 'p-4'),
  );

  public currentImageUrl = '';
  private _observer: MutationObserver | undefined;

  public ngOnInit(): void {
    this._updateImageBasedOnTheme();

    this._observer = new MutationObserver(() => {
      this._updateImageBasedOnTheme();
    });

    this._observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  public ngOnDestroy(): void {
    this._observer?.disconnect();
  }

  private _updateImageBasedOnTheme(): void {
    const htmlClassList = document.documentElement.classList;
    if (htmlClassList.contains('ids-theme-dark')) {
      this.currentImageUrl = this.imageUrlDark() || this.imageUrlLight() || '';
    } else {
      this.currentImageUrl = this.imageUrlLight() || this.imageUrlDark() || '';
    }
  }
}
