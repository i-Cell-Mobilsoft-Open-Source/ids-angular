import { IdsCardBodyDirective } from './card-body.directive';
import { IDS_CARD_DEFAULT_CONFIG, IDS_CARD_DEFAULT_CONFIG_FACTORY } from './card-defaults';
import { IdsCardFooterDirective } from './card-footer.directive';
import { IdsCardHeaderComponent } from './card-header.component';
import { IdsCardMediaDirective } from './card-media.directive';
import { IdsCardSubtitleDirective } from './card-subtitle.directive';
import { IdsCardTitleDirective } from './card-title.directive';
import { IdsCardComponent } from './card.component';
import { IdsCardAppearance, IdsCardAppearanceType } from './types/card-appearances.type';
import { IdsCardVariant, IdsCardVariantType } from './types/card-variant.type';

import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdsOrientation, IdsOrientationType, IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { axe } from 'jest-axe';

@Component({
  imports: [
    IdsCardComponent,
    IdsCardHeaderComponent,
    IdsCardTitleDirective,
    IdsCardSubtitleDirective,
    IdsCardMediaDirective,
    IdsCardBodyDirective,
    IdsCardFooterDirective,
  ],
  template: `
    <ids-card [appearance]="appearance" [size]="size" [variant]="variant" [orientation]="orientation" [disabled]="disabled" [id]="cardId">
      <ids-card-header [stretch]="headerStretch">
        <h3 idsCardTitle>Title</h3>
        <p idsCardSubtitle>Subtitle</p>
      </ids-card-header>
      <div idsCardMedia><img src="" alt="Decorative sample" /></div>
      <ids-card-body>Body content</ids-card-body>
      <ids-card-footer>Footer content</ids-card-footer>
    </ids-card>
  `,
})
class TestHostComponent {
  public card = viewChild.required(IdsCardComponent);
  public appearance: IdsCardAppearanceType = IdsCardAppearance.FILLED;
  public size: IdsSizeType = IdsSize.COMPACT;
  public variant: IdsCardVariantType = IdsCardVariant.SURFACE;
  public orientation: IdsOrientationType = IdsOrientation.VERTICAL;
  public disabled: boolean | string = false;
  public cardId: string | undefined = undefined;
  public headerStretch = false;
}

@Component({
  imports: [IdsCardComponent],
  template: ' <ids-card [disabled]="disabled" (click)="onClick()">Clickable card</ids-card> ',
})
class ClickableHostComponent {
  public card = viewChild.required(IdsCardComponent);
  public disabled = false;
  public onClick = jest.fn();
}

@Component({
  imports: [IdsCardComponent],
  template: `
    <div idsCard id="div-card">Div</div>
    <article idsCard id="article-card">Article</article>
    <aside idsCard id="aside-card">Aside</aside>
    <section idsCard id="section-card">Section</section>
  `,
})
class SelectorsHostComponent {}

@Component({
  imports: [
    IdsCardComponent,
    IdsCardMediaDirective,
    IdsCardBodyDirective,
  ],
  template: `
    <ids-card disabled>Disabled via attribute</ids-card>
    <ids-card id="">Empty id</ids-card>
    <div idsCardMedia id="media-padded" [stretch]="false"></div>
    <ids-card-body id="body-stretched" [stretch]="true" />
  `,
})
class AttributesHostComponent {}

let element: HTMLElement;

async function render<T>(fixture: ComponentFixture<T>): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

async function createCardHost(): Promise<{
  fixture: ComponentFixture<TestHostComponent>,
  host: TestHostComponent,
  cardElement: HTMLElement,
}> {
  await TestBed.configureTestingModule({
    imports: [TestHostComponent],
  }).compileComponents();

  const fixture = TestBed.createComponent(TestHostComponent);
  element = fixture.nativeElement as HTMLElement;
  await render(fixture);

  return { fixture, host: fixture.componentInstance, cardElement: element.querySelector('ids-card')! };
}

describe('IdsCardComponent rendering', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let cardElement: HTMLElement;

  beforeEach(async() => {
    ({ fixture, host, cardElement } = await createCardHost());
  });

  it('should create with the default configuration', () => {
    expect(host.card()).toBeTruthy();
    expect(cardElement.classList.contains('ids-card')).toBe(true);
    expect(cardElement.classList.contains('ids-card-filled')).toBe(true);
    expect(cardElement.classList.contains('ids-card-compact')).toBe(true);
    expect(cardElement.classList.contains('ids-card-surface')).toBe(true);
    expect(cardElement.classList.contains('ids-card-vertical')).toBe(true);
    expect(cardElement.classList.contains('ids-card-disabled')).toBe(false);
    expect(cardElement.classList.contains('ids-card-clickable')).toBe(false);
  });

  it('should generate a unique id when none is provided', () => {
    expect(cardElement.id).toMatch(/^ids-card-\d+$/);
    expect(cardElement.id).toBe(host.card().id());
  });

  it('should use the provided id', async() => {
    host.cardId = 'custom-card';
    await render(fixture);

    expect(cardElement.id).toBe('custom-card');
  });

  it.each(Object.values(IdsCardAppearance))('should apply the %s appearance class', async(appearance) => {
    host.appearance = appearance;
    await render(fixture);

    expect(cardElement.classList.contains(`ids-card-${appearance}`)).toBe(true);
  });

  it.each(Object.values(IdsCardVariant))('should apply the %s variant class', async(variant) => {
    host.variant = variant;
    await render(fixture);

    expect(cardElement.classList.contains(`ids-card-${variant}`)).toBe(true);
  });

  it.each([
    IdsSize.COMPACT,
    IdsSize.COMFORTABLE,
  ])('should apply the %s size class', async(size) => {
    host.size = size;
    await render(fixture);

    expect(cardElement.classList.contains(`ids-card-${size}`)).toBe(true);
  });

  it.each(Object.values(IdsOrientation))('should apply the %s orientation class', async(orientation) => {
    host.orientation = orientation;
    await render(fixture);

    expect(cardElement.classList.contains(`ids-card-${orientation}`)).toBe(true);
  });

  it('should not add the disabled class when disabled but not clickable', async() => {
    host.disabled = true;
    await render(fixture);

    expect(cardElement.classList.contains('ids-card-disabled')).toBe(false);
  });

  it('should project the footer after the other content', () => {
    const footer = cardElement.querySelector('ids-card-footer')!;

    expect(cardElement.lastElementChild).toBe(footer);
  });
});

describe('IdsCardComponent sections', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let cardElement: HTMLElement;

  beforeEach(async() => {
    ({ fixture, host, cardElement } = await createCardHost());
  });

  it('should render the header with a headline wrapper containing the title and subtitle', () => {
    const header = cardElement.querySelector('ids-card-header')!;
    const headline = header.querySelector('.ids-card-header-headline')!;

    expect(header.classList.contains('ids-card-header')).toBe(true);
    expect(headline.querySelector('.ids-card-title')?.textContent).toBe('Title');
    expect(headline.querySelector('.ids-card-subtitle')?.textContent).toBe('Subtitle');
  });

  it('should render the header padded by default and stretched when requested', async() => {
    const header = cardElement.querySelector('ids-card-header')!;

    expect(header.classList.contains('ids-card-section')).toBe(true);
    expect(header.classList.contains('ids-card-section-padded')).toBe(true);
    expect(header.classList.contains('ids-card-section-stretched')).toBe(false);

    host.headerStretch = true;
    await render(fixture);

    expect(header.classList.contains('ids-card-section-stretched')).toBe(true);
    expect(header.classList.contains('ids-card-section-padded')).toBe(false);
  });

  it('should render the media stretched by default', () => {
    const media = cardElement.querySelector('.ids-card-media')!;

    expect(media.classList.contains('ids-card-section-stretched')).toBe(true);
    expect(media.classList.contains('ids-card-section-padded')).toBe(false);
  });

  it('should render the body padded by default', () => {
    const body = cardElement.querySelector('ids-card-body')!;

    expect(body.classList.contains('ids-card-body')).toBe(true);
    expect(body.classList.contains('ids-card-section-padded')).toBe(true);
    expect(body.textContent).toContain('Body content');
  });

  it('should render the footer padded by default', () => {
    const footer = cardElement.querySelector('ids-card-footer')!;

    expect(footer.classList.contains('ids-card-footer')).toBe(true);
    expect(footer.classList.contains('ids-card-section-padded')).toBe(true);
    expect(footer.textContent).toContain('Footer content');
  });
});

describe('IdsCardComponent accessibility', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let cardElement: HTMLElement;

  beforeEach(async() => {
    ({ fixture, host, cardElement } = await createCardHost());
  });

  it('should have no axe violations by default', async() => {
    expect(await axe(element)).toHaveNoViolations();
  });

  it.each(Object.values(IdsCardVariant))('should have no axe violations with the %s variant', async(variant) => {
    host.variant = variant;
    await render(fixture);

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations when disabled', async() => {
    host.disabled = true;
    await render(fixture);

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should not be focusable when it has no click handler', () => {
    expect(cardElement.hasAttribute('tabindex')).toBe(false);
  });

  it('should not expose aria-disabled when enabled', () => {
    expect(cardElement.hasAttribute('aria-disabled')).toBe(false);
  });

  it('should expose aria-disabled when disabled', async() => {
    host.disabled = true;
    await render(fixture);

    expect(cardElement.hasAttribute('aria-disabled')).toBe(true);
  });

  it('should keep the title projected as a heading', () => {
    expect(cardElement.querySelector('h3.ids-card-title')).not.toBeNull();
  });

  it('should keep the media image accessible with an alternative text', () => {
    expect(cardElement.querySelector('img')?.getAttribute('alt')).toBe('Decorative sample');
  });
});

describe('IdsCardComponent with a click handler', () => {
  let fixture: ComponentFixture<ClickableHostComponent>;
  let host: ClickableHostComponent;
  let cardElement: HTMLElement;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ClickableHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClickableHostComponent);
    host = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    cardElement = element.querySelector('ids-card')!;
    await render(fixture);
  });

  it('should add the clickable class', () => {
    expect(cardElement.classList.contains('ids-card-clickable')).toBe(true);
    expect(cardElement.classList.contains('ids-card-disabled')).toBe(false);
  });

  it('should be reachable with the tab key', () => {
    expect(cardElement.getAttribute('tabindex')).toBe('0');
  });

  it('should call the click handler when clicked', () => {
    cardElement.click();

    expect(host.onClick).toHaveBeenCalled();
  });

  it('should call the click handler when the output emits', () => {
    host.card().click.emit();

    expect(host.onClick).toHaveBeenCalled();
  });

  it('should add the disabled class when disabled and clickable', async() => {
    host.disabled = true;
    await render(fixture);

    expect(cardElement.classList.contains('ids-card-disabled')).toBe(true);
    expect(cardElement.classList.contains('ids-card-clickable')).toBe(true);
  });

  it('should expose aria-disabled and stay focusable when disabled and clickable', async() => {
    host.disabled = true;
    await render(fixture);

    expect(cardElement.hasAttribute('aria-disabled')).toBe(true);
    expect(cardElement.getAttribute('tabindex')).toBe('0');
  });

  it('should remove aria-disabled when it is enabled again', async() => {
    host.disabled = true;
    await render(fixture);
    host.disabled = false;
    await render(fixture);

    expect(cardElement.hasAttribute('aria-disabled')).toBe(false);
    expect(cardElement.classList.contains('ids-card-disabled')).toBe(false);
  });

  it('should have no axe violations when clickable', async() => {
    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations when clickable and disabled', async() => {
    host.disabled = true;
    await render(fixture);

    expect(await axe(element)).toHaveNoViolations();
  });
});

describe('IdsCardComponent selectors', () => {
  let fixture: ComponentFixture<SelectorsHostComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [SelectorsHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectorsHostComponent);
    element = fixture.nativeElement as HTMLElement;
    await render(fixture);
  });

  it.each([
    'div-card',
    'article-card',
    'aside-card',
    'section-card',
  ])('should apply the card host classes on #%s', (id) => {
    const cardElement = element.querySelector(`#${id}`)!;

    expect(cardElement.classList.contains('ids-card')).toBe(true);
    expect(cardElement.classList.contains('ids-card-filled')).toBe(true);
  });

  it('should have no axe violations with semantic card elements', async() => {
    expect(await axe(element)).toHaveNoViolations();
  });
});

describe('IdsCardComponent attribute handling', () => {
  let fixture: ComponentFixture<AttributesHostComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [AttributesHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AttributesHostComponent);
    element = fixture.nativeElement as HTMLElement;
    await render(fixture);
  });

  it('should coerce the disabled attribute without a value to true', () => {
    const [card] = Array.from(element.querySelectorAll('ids-card'));

    expect(card.hasAttribute('aria-disabled')).toBe(true);
  });

  it('should fall back to the generated id when the id is empty', () => {
    const card = element.querySelectorAll('ids-card')[1];

    expect(card.id).toMatch(/^ids-card-\d+$/);
  });

  it('should render a non stretched media section as padded', () => {
    const media = element.querySelector('#media-padded')!;

    expect(media.classList.contains('ids-card-section-padded')).toBe(true);
    expect(media.classList.contains('ids-card-section-stretched')).toBe(false);
  });

  it('should render a stretched body section as stretched', () => {
    const body = element.querySelector('#body-stretched')!;

    expect(body.classList.contains('ids-card-section-stretched')).toBe(true);
    expect(body.classList.contains('ids-card-section-padded')).toBe(false);
  });
});

describe('IdsCardComponent default configuration', () => {
  it('should use the factory defaults', () => {
    expect(IDS_CARD_DEFAULT_CONFIG_FACTORY()).toEqual({
      appearance: IdsCardAppearance.FILLED,
      size: IdsSize.COMPACT,
      variant: IdsCardVariant.SURFACE,
      orientation: IdsOrientation.VERTICAL,
    });
  });

  it('should provide the factory defaults through the injection token', () => {
    TestBed.configureTestingModule({});

    expect(TestBed.inject(IDS_CARD_DEFAULT_CONFIG)).toEqual(IDS_CARD_DEFAULT_CONFIG_FACTORY());
  });

  it('should apply a partial custom default configuration', async() => {
    await TestBed.configureTestingModule({
      imports: [IdsCardComponent],
      providers: [
        {
          provide: IDS_CARD_DEFAULT_CONFIG,
          useValue: {
            appearance: IdsCardAppearance.OUTLINED,
            orientation: IdsOrientation.HORIZONTAL,
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(IdsCardComponent);
    await render(fixture);
    const classes = (fixture.nativeElement as HTMLElement).classList;

    expect(classes.contains('ids-card-outlined')).toBe(true);
    expect(classes.contains('ids-card-horizontal')).toBe(true);
    expect(classes.contains('ids-card-compact')).toBe(true);
    expect(classes.contains('ids-card-surface')).toBe(true);
  });
});
