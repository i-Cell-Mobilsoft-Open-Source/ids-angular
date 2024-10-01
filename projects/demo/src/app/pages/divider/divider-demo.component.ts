import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import {
  AllVariants,
  AllVariantsType,
  Size,
  SizeType,
  OrientationType, 
  Orientation } from '@i-cell/ids-angular/core';
import { IdsDividerComponent } from '@i-cell/ids-angular/divider';
import { TranslateModule } from '@ngx-translate/core';

type DividerPublicApi = {
  orientation: OrientationType,
  size: SizeType,
  variant: AllVariantsType,
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
    orientation: Orientation.HORIZONTAL,
    size: Size.COMFORTABLE,
    variant: AllVariants.PRIMARY,
    width: '100%',
    height: '100%',
  };

  public model: DividerPublicApi = { ...this.defaults  };
  public orientations = Object.values(Orientation) as OrientationType[];
  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(AllVariants) as AllVariantsType[];

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
