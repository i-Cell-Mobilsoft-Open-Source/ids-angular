import { Badge } from '../../model/badge';
import { ContentCard } from '../../model/contentCard';
import { Image } from '../../model/image';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent implements Badge, ContentCard, Image  {
  @Input()
  public orientation: 'horizontal' | 'vertical' = 'vertical'; // Default is vertical

  @Input()
  public state?: 'do' | 'dont'; // ✅ Optional Input

  @Input()
  public aspectRatio?: '1/1' | '16/9' | '16/10' = '16/9';

  @Input()
  public imageBgColorVariant?: 'surface' | 'primary' | 'light' = 'surface';

  @Input() public imageURL?: string;  // Optional imageURL

  @Input() public imageCaption?: string;  // Optional imageCaption

  public getBorderClass(): string {
    switch (this.state) {
      case 'do':
        return 'border-solid border-ids-container-border-success-default border-2';
      case 'dont':
        return 'border-solid border-ids-container-border-warning-default border-2';
      default:
        return ''; // Default class
    }
  };

  public getAspectRatioClass(): string {
    switch (this.aspectRatio) {
      case '1/1':
        return 'aspect-1/1';
      case '16/9':
        return 'aspect-16/9';
      case '16/10':
        return 'aspect-16/10';
      default:
        return 'aspect-16/9'; // Default value
    }
  };

  public getColorVariantClass(): string {
    switch (this.imageBgColorVariant) {
      case 'primary':
        return 'bg-ids-container-bg-surface-darker-20';
      case 'surface':
        return 'bg-ids-container-bg-surface-darker-10';
      case 'light':
        return 'bg-ids-container-bg-surface-lighter-10';
      default:
        return 'surface'; // Default value
    }
  }

}
