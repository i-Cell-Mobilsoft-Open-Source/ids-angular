import { Badge } from '../../model/badge';
import { ContentCard } from '../../model/contentCard';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent implements Badge, ContentCard  {
  @Input()
  public orientation: 'horizontal' | 'vertical' = 'vertical'; // Default is vertical

  @Input()
  public state?: 'do' | 'dont'; // ✅ Optional Input
}
