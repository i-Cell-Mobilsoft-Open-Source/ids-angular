import { accordionAnimations } from '../accordion-animations';
import { IdsAccordionComponent } from '../accordion.component';

import { CdkAccordionItem } from '@angular/cdk/accordion';
import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, viewChild, ViewEncapsulation } from '@angular/core';
import { coerceBooleanAttribute, ComponentBase } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'ids-accordion-item',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './accordion-item.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [accordionAnimations],
  hostDirectives: [
    {
      directive: CdkAccordionItem,
      inputs: [
        'expanded',
        'disabled',
      ],
      outputs: [
        'closed',
        'destroyed',
        'opened',
      ],
    },
  ],
})
export class IdsAccordionItemComponent extends ComponentBase {
  protected override get _hostName(): string {
    return 'accordion-item';
  }

  private _accordion = inject(IdsAccordionComponent, { skipSelf: true });
  private _accordionItem = inject(CdkAccordionItem);
  private _accordionHeader = viewChild.required<ElementRef<HTMLElement>>('header');
  protected _summaryClass = `${this._hostClassName}-summary`;
  protected _titleClass = `${this._hostClassName}-title`;
  protected _contentClass = `${this._hostClassName}-content`;
  protected _headerId = `${this.id()}-header`;
  protected _contentId = `${this.id()}-content`;

  public summary = input<string | null>();
  public disabled = input<boolean>(false);
  public hasLeadingIcon = input(false, { transform: coerceBooleanAttribute });
  public hasTrailingIcon = input(this._accordion.hasTrailingIcon(), { transform: coerceBooleanAttribute });

  protected _parentOrSelfHasLeadingIcon = computed(() => this._accordion.hasLeadingIcon() ?? this.hasLeadingIcon());
  protected _parentOrSelfHasTrailingIcon = computed(() => this._accordion.hasTrailingIcon() ?? this.hasTrailingIcon());
  protected _parentOrSelfDisabled = computed(() => this._accordion.disabled() || this.disabled());

  protected _hostClasses = computed(() => this._getHostClasses(
    [this._parentOrSelfDisabled() ? 'disabled' : null],
  ));

  protected get _icon(): string {
    return this.isExpanded ? 'chevron-up' : 'chevron-down';
  }

  public get isExpanded(): boolean {
    return this._accordionItem.expanded;
  }

  public open(): void {
    if (!this._parentOrSelfDisabled()) {
      this._accordionItem.open();
    }
  }

  public close(): void {
    if (!this._parentOrSelfDisabled()) {
      this._accordionItem.close();
    }
  }

  public toggle(): void {
    if (!this._parentOrSelfDisabled()) {
      this._accordionItem.toggle();
    }
  }

  public focus(options?: FocusOptions): void {
    this._accordionHeader().nativeElement.focus(options);
  }
}
