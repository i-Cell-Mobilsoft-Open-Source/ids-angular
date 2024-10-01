import { Component, inject, OnInit, ViewContainerRef } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSnackbarAction, IdsSnackbarService, SnackbarVariant, SnackbarVariantType } from '@i-cell/ids-angular/snackbar';
import { TranslateModule } from '@ngx-translate/core';

const snackbarTexts: string[] = [
  'Lorem, ipsum dolor.',
  'Lorem ipsum dolor sit amet, consectetur adipisicing.',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic assumenda architecto officia?',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nisi, quasi blanditiis enim consectetur quibusdam quos.',
  // eslint-disable-next-line @stylistic/js/max-len
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. A mollitia excepturi magnam repellendus iste, corrupti delectus, quasi voluptate aut dignissimos praesentium natus similique iusto.',
];

let snackbarTextIndex = 0;

@Component({
  selector: 'app-snackbar-demo',
  standalone: true,
  imports: [
    IdsButtonComponent,
    TranslateModule,
  ],
  templateUrl: './snackbar-demo.component.html',
  styleUrl: './snackbar-demo.component.scss',
})
export class SnackbarDemoComponent implements OnInit {
  private readonly _snackbarService = inject(IdsSnackbarService);
  private readonly _viewContainerRef = inject(ViewContainerRef);

  public snackbarVariant = SnackbarVariant;

  public ngOnInit(): void {
    this._snackbarService.setViewContainerRef(this._viewContainerRef);
  }

  public openSnackbar(
    variant: SnackbarVariantType,
    actions?: IdsSnackbarAction[],
    allowDismiss?: boolean,
    closeButtonLabel?: string,
    autoClose?: boolean,
  ): void {
    const message: string = snackbarTexts[snackbarTextIndex];
    snackbarTextIndex < snackbarTexts.length - 1 ? snackbarTextIndex++ : snackbarTextIndex = 0;
    this._snackbarService.add({
      message,
      variant,
      actions,
      allowDismiss,
      closeButtonLabel,
      autoClose,
    });
  }

  public action(): void {
    console.info('action was called');
  }
}
