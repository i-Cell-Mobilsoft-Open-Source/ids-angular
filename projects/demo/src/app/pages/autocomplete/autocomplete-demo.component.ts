import { AutocompleteDemoService } from './autocomplete-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject, ResourceLoaderParams } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IDS_AUTOCOMPLETE_LOADER, IdsAutocompleteComponent, IdsErrorDefinitionDirective, IdsErrorMessageComponent, IdsFormFieldComponent, IdsLabelDirective } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { delay, Observable, of } from 'rxjs';

@Component({
  selector: 'app-accordion-demo',
  imports: [
    IdsAutocompleteComponent,
    ControlTableComponent,
    DemoAndCodeComponent,
    FormsModule,
    IdsErrorMessageComponent,
    IdsErrorDefinitionDirective,
    IdsFormFieldComponent,
    IdsLabelDirective,
    TranslateModule,
    TryoutComponent,
    TryoutControlComponent,
  ],
  templateUrl: './autocomplete-demo.component.html',
  styleUrls: ['../demo-page.scss'],
  providers: [
    {
      provide: IDS_AUTOCOMPLETE_LOADER,
      useFactory:
        () =>
          ({ params }: ResourceLoaderParams<{ search: string | null }>): Observable<string[]> => {
            const search = params.search ?? '';
            const options = [
              'Accordion',
              'Autocomplete',
              'Avatar',
              'Badge',
              'Breadcrumb',
              'Button',
              'Card',
              'Chip',
              'Checkbox',
              'Date Picker',
              'Dialog',
              'Divider',
              'Fieldset',
              'Form Field',
              'Icon',
              'Icon button',
              'Menu Item',
              'Message',
              'Notification',
              'Option',
              'Overlay panel',
              'Paginator',
              'Radio',
              'Scrollbar',
              'Segmented Control',
              'Segmented Control Toggle',
              'Select',
              'Side nav',
              'Side Sheet',
              'Snackbar',
              'Spinner',
              'Switch',
              'Tab',
              'Table',
              'Tag',
              'Tooltip',
            ];
            if (search?.length < 1) {
              return of([]);
            }

            const newOptions = options.filter((item) => item.toLowerCase().includes(search.toLowerCase()));
            const delayTimeMs = 500;
            return of(newOptions).pipe(delay(delayTimeMs));
          },
    },
  ],
})
export class AutocompleteDemoComponent {
  protected _autocompleteDemoService = inject(AutocompleteDemoService);
  public input = '';
}
