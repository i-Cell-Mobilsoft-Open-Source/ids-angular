import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'badgeLimit',
  standalone: true,
  pure: false,
})
export class BadgeLimitPipe implements PipeTransform {
  public transform(value: string, max: number | string | null): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const num = Number(value);
    const maxNum = Number(max);

    if (!isNaN(num) && !isNaN(maxNum)) {
      return num > maxNum ? `${maxNum}+` : `${num}`;
    }

    return String(value);
  }
}
