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
  protected override get _componentName(): string {
    return 'accordion-item';
  }

  private _accordion = inject(IdsAccordionComponent, { skipSelf: true });
  private _accordionItem = inject(CdkAccordionItem);
  private _accordionHeader = viewChild.required<ElementRef<HTMLElement>>('header');
  protected _summaryClass = `${this._componentClass}-summary`;
  protected _titleClass = `${this._componentClass}-title`;
  protected _contentClass = `${this._componentClass}-content`;
  protected _headerId = `${this.id()}-header`;
  protected _contentId = `${this.id()}-content`;
  
  public summary = input<string | null>();
  public disabled = input<boolean>(false);
  public hasLeadingIcon = input(false, { transform: coerceBooleanAttribute });
  public hasTrailingIcon = input(this._accordion.hasTrailingIcon(), { transform: coerceBooleanAttribute });

  protected _safeHasLeadingIcon = computed(() => this._accordion.hasLeadingIcon() ?? this.hasLeadingIcon());
  protected _safeHasTrailingIcon = computed(() => this._accordion.hasTrailingIcon() ?? this.hasTrailingIcon());
  
  protected _hostClasses = computed(() => this._getHostClasses(
    [this.disabled() || this._accordion.disabled() ? 'disabled' : null],
  ));

  public open(): void {
    this._accordionItem.open();
  }

  public close(): void {
    this._accordionItem.close();
  }

  public toggle(): void {
    this._accordionItem.toggle();
  }

  public getIcon(): string {
    return this.isExpanded ? 'chevron-up' : 'chevron-down';
  }

  get isExpanded(): boolean {
    return this._accordionItem.expanded;
  }

  public focus(options?: FocusOptions): void {
    this._accordionHeader().nativeElement.focus(options);
  }
}
