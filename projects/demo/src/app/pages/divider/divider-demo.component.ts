import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import {
  IdsSize,
  IdsSizeType,
  IdsOrientationType, 
  IdsOrientation } from '@i-cell/ids-angular/core';
import { IdsDividerComponent, IdsDividerVariant, IdsDividerVariantType } from '@i-cell/ids-angular/divider';
import { TranslateModule } from '@ngx-translate/core';

type DividerPublicApi = {
  orientation: IdsOrientationType,
  size: IdsSizeType,
  variant: IdsDividerVariantType,
  width: string,
  height: string,
};

@Component({
  selector: 'app-divider-demo',
  standalone: true,
  imports: [
    IdsDividerComponent,
    TranslateModule,
    FormsModule,
    IdsButtonComponent,
  ],
  templateUrl: './divider-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './divider-demo.component.scss',
  ],
})
export class DividerDemoComponent {
  public defaults: DividerPublicApi = {
    orientation: IdsOrientation.HORIZONTAL,
    size: IdsSize.COMFORTABLE,
    variant: IdsDividerVariant.PRIMARY,
    width: '100%',
    height: '100%',
  };

  public model: DividerPublicApi = { ...this.defaults  };
  public orientations = Object.values<IdsOrientationType>(IdsOrientation);
  public sizes = Object.values<IdsSizeType>(IdsSize);
  public variants = Object.values<IdsDividerVariantType>(IdsDividerVariant);

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
