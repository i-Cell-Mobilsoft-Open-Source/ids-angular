import { IdsActionMenuTriggerDirective } from './action-menu-trigger.directive';

import { IdsMenuItemComponent } from '../menu-item/menu-item.component';

import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsOverlayPanelComponent } from '@i-cell/ids-angular/overlay-panel';

@Component({
  standalone: true,
  template: `
  <button
    type="button"
    idsButton
    appearance="filled"
    size="comfortable"
    variant="primary"
    [idsActionMenuTriggerFor]="actionMenu"
  >Action menu top-left</button>

  <ng-template #actionMenu>
    <ids-overlay-panel
      size="compact"
      appearance="outlined"
    >
      <button type="button" idsMenuItem appearance="filled" size="compact" [label]="'Menu Item Label 1'">
        Anything
      </button>
    </ids-overlay-panel>
  </ng-template>
  `,
  schemas: [NO_ERRORS_SCHEMA],
})
class TestComponent {}

describe('IdsActionMenuTriggerDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        TestComponent,
        IdsActionMenuTriggerDirective,
        IdsOverlayPanelComponent,
        IdsMenuItemComponent,
        IdsButtonComponent,
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

