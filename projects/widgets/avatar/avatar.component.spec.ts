import { IDS_AVATAR_DEFAULT_CONFIG, IDS_AVATAR_DEFAULT_CONFIG_FACTORY } from './avatar-defaults';
import { IdsAvatarImageDirective } from './avatar-image.directive';
import { IdsAvatarComponent } from './avatar.component';
import { IDS_AVATAR_PARENT } from './tokens/avatar-parent';
import { IdsAvatarType } from './types/avatar-type.type';
import { IdsAvatarVariant, IdsAvatarVariantType } from './types/avatar-variant.type';

import { Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdsSize, IdsSizeCollection, IdsSizeCollectionType, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { axe } from 'jest-axe';

const imageSource = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';

@Component({
  imports: [
    IdsAvatarComponent,
    IdsAvatarImageDirective,
    IdsIconComponent,
  ],
  template: `
    <ids-avatar
      [initials]="initials"
      [size]="size"
      [sizeCollection]="sizeCollection"
      [variant]="variant"
    >
      @if (icon) {
        <ids-icon fontIcon="account" />
      }
      @if (image) {
        <img idsAvatarImage src="${imageSource}" alt="Jane Doe" />
      }
    </ids-avatar>
  `,
})
class TestHostComponent {
  public avatar = viewChild.required(IdsAvatarComponent);
  public initials: string | null = 'JD';
  public size: IdsSizeType = IdsSize.COMPACT;
  public sizeCollection: IdsSizeCollectionType = IdsSizeCollection.SMALL;
  public variant: IdsAvatarVariantType = IdsAvatarVariant.PRIMARY;
  public icon = false;
  public image = false;
}

const parentVariant = signal<IdsAvatarVariantType>(IdsAvatarVariant.DARK);

@Component({
  imports: [IdsAvatarComponent],
  template: '<ids-avatar initials="JD" variant="light" />',
  providers: [
    {
      provide: IDS_AVATAR_PARENT,
      useValue: { embeddedAvatarVariant: parentVariant },
    },
  ],
})
class ParentHostComponent {}

let fixture: ComponentFixture<TestHostComponent>;
let host: TestHostComponent;
let element: HTMLElement;

async function render(): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

async function create(overrides: Partial<TestHostComponent> = {}): Promise<void> {
  fixture = TestBed.createComponent(TestHostComponent);
  host = fixture.componentInstance;
  element = fixture.nativeElement as HTMLElement;
  Object.assign(host, overrides);
  await render();
}

function avatar(): HTMLElement {
  return element.querySelector<HTMLElement>('ids-avatar')!;
}

beforeEach(async() => {
  await TestBed.configureTestingModule({
    imports: [
      TestHostComponent,
      ParentHostComponent,
    ],
  }).compileComponents();
});

describe('avatar defaults', () => {
  it('should provide the default configuration through the injection token', () => {
    expect(TestBed.inject(IDS_AVATAR_DEFAULT_CONFIG)).toEqual(IDS_AVATAR_DEFAULT_CONFIG_FACTORY());
    expect(IDS_AVATAR_DEFAULT_CONFIG_FACTORY()).toEqual({
      type: 'initials',
      size: 'compact',
      sizeCollection: 'small',
      variant: 'primary',
    });
  });

  it('should use a provided configuration when no input is set', () => {
    TestBed.overrideProvider(IDS_AVATAR_DEFAULT_CONFIG, {
      useValue: {
        type: IdsAvatarType.INITIALS,
        size: IdsSize.COMFORTABLE,
        sizeCollection: IdsSizeCollection.BIG,
        variant: IdsAvatarVariant.DARK,
      },
    });
    const defaultsFixture = TestBed.createComponent(IdsAvatarComponent);
    defaultsFixture.detectChanges();
    const classes = (defaultsFixture.nativeElement as HTMLElement).classList;

    expect(classes.contains('ids-avatar-bigcollection-comfortable')).toBe(true);
    expect(classes.contains('ids-avatar-dark')).toBe(true);
  });

  it('should fall back to the default type when the type can not be resolved', () => {
    TestBed.overrideProvider(IDS_AVATAR_DEFAULT_CONFIG, {
      useValue: { ...IDS_AVATAR_DEFAULT_CONFIG_FACTORY(), type: IdsAvatarType.ICON },
    });
    const defaultsFixture = TestBed.createComponent(IdsAvatarComponent);
    Object.defineProperty(defaultsFixture.componentInstance, '_implicitAvatarType', { value: (): undefined => undefined });
    defaultsFixture.detectChanges();
    const nativeElement = defaultsFixture.nativeElement as HTMLElement;

    expect(nativeElement.classList.contains('ids-avatar-type-icon')).toBe(true);
    expect(nativeElement.querySelector('ids-icon')).not.toBeNull();
  });
});

describe('IdsAvatarComponent rendering', () => {
  it('should create with the default configuration', async() => {
    await create();
    const classes = avatar().classList;

    expect(host.avatar()).toBeTruthy();
    expect(classes.contains('ids-avatar')).toBe(true);
    expect(classes.contains('ids-avatar-type-initials')).toBe(true);
    expect(classes.contains('ids-avatar-smallcollection-compact')).toBe(true);
    expect(classes.contains('ids-avatar-primary')).toBe(true);
  });

  it('should render the initials', async() => {
    await create();

    expect(avatar().querySelector('span')?.textContent).toBe('JD');
  });

  it('should render nothing for missing initials', async() => {
    await create({ initials: null });

    expect(avatar().querySelector('span')?.textContent).toBe('');
  });

  it('should reflect the size, the size collection and the variant', async() => {
    await create({
      size: IdsSize.SPACIOUS,
      sizeCollection: IdsSizeCollection.BIG,
      variant: IdsAvatarVariant.SECONDARY,
    });
    const classes = avatar().classList;

    expect(classes.contains('ids-avatar-bigcollection-spacious')).toBe(true);
    expect(classes.contains('ids-avatar-secondary')).toBe(true);
  });

  it('should render the projected icon with the icon type', async() => {
    await create({ icon: true });

    expect(avatar().classList.contains('ids-avatar-type-icon')).toBe(true);
    expect(avatar().querySelectorAll('ids-icon')).toHaveLength(1);
    expect(avatar().querySelector('span')).toBeNull();
  });

  it('should render the projected image with the image type', async() => {
    await create({ image: true });

    expect(avatar().classList.contains('ids-avatar-type-image')).toBe(true);
    expect(avatar().querySelector('img')?.getAttribute('src')).toBe(imageSource);
    expect(avatar().querySelector('span')).toBeNull();
  });

  it('should fall back to the initials when both an icon and an image are projected', async() => {
    await create({ icon: true, image: true });

    expect(avatar().classList.contains('ids-avatar-type-initials')).toBe(true);
    expect(avatar().querySelector('span')?.textContent).toBe('JD');
    expect(avatar().querySelector('img')).toBeNull();
  });

  it('should switch the type when the projected content changes', async() => {
    await create({ icon: true });

    host.icon = false;
    host.image = true;
    await render();

    expect(avatar().classList.contains('ids-avatar-type-image')).toBe(true);
  });
});

describe('IdsAvatarComponent embedded icon variant', () => {
  it.each([
    [
      IdsAvatarVariant.PRIMARY,
      'light',
    ],
    [
      IdsAvatarVariant.SECONDARY,
      'light',
    ],
    [
      IdsAvatarVariant.DARK,
      'light',
    ],
    [
      IdsAvatarVariant.SURFACE,
      'surface',
    ],
    [
      IdsAvatarVariant.LIGHT,
      'surface',
    ],
  ] as const)('should use the %s avatar variant with the %s icon variant', async(variant, iconVariant) => {
    await create({ icon: true, variant });

    expect(host.avatar().embeddedIconVariant()).toBe(iconVariant);
    expect(avatar().querySelector('ids-icon')?.classList.contains(`ids-icon-${iconVariant}`)).toBe(true);
  });

  it('should prefer the variant of the parent', () => {
    const parentFixture = TestBed.createComponent(ParentHostComponent);
    parentFixture.detectChanges();
    const classes = (parentFixture.nativeElement as HTMLElement).querySelector('ids-avatar')!.classList;

    expect(classes.contains('ids-avatar-dark')).toBe(true);
    expect(classes.contains('ids-avatar-light')).toBe(false);
  });
});

describe('IdsAvatarComponent accessibility', () => {
  it('should expose the initials as text', async() => {
    await create();

    expect(avatar().textContent?.trim()).toBe('JD');
  });

  it('should hide the decorative icon from assistive technologies', async() => {
    await create({ icon: true });

    expect(avatar().querySelector('ids-icon')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should keep the alternative text of the image', async() => {
    await create({ image: true });

    expect(avatar().querySelector('img')?.getAttribute('alt')).toBe('Jane Doe');
  });

  it('should keep the accessibility attributes set on the host', async() => {
    await create({ icon: true });
    avatar().setAttribute('role', 'img');
    avatar().setAttribute('aria-label', 'Jane Doe');
    await render();

    expect(avatar().getAttribute('role')).toBe('img');
    expect(avatar().getAttribute('aria-label')).toBe('Jane Doe');
  });

  it('should have no axe violations with initials', async() => {
    await create();

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations with an icon', async() => {
    await create({ icon: true });
    avatar().setAttribute('role', 'img');
    avatar().setAttribute('aria-label', 'Jane Doe');

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations with an image', async() => {
    await create({ image: true });

    expect(await axe(element)).toHaveNoViolations();
  });
});
