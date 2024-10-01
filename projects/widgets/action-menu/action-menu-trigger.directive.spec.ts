import { IdsActionMenuTriggerDirective } from './action-menu-trigger.directive';

import { IdsActionPanelComponent } from '../action-panel';
import { IdsButtonComponent } from '../button';
import { IdsMenuItemComponent } from '../menu-item';

import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    <ids-action-panel
      size="compact"
      appearance="outlined"
    >
      <button type="button" idsMenuItem appearance="filled" size="compact" [label]="'Menu Item Label 1'">
        Anything
      </button>
    </ids-action-panel>
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
        IdsActionPanelComponent,
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

