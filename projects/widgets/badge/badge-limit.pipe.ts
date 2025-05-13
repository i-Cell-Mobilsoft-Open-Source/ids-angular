import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'badgeLimit',
  standalone: true,
  pure: true,
})
export class BadgeLimitPipe implements PipeTransform {
  public transform(value: string, max: number | null): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const num = Number(value);

    // Ha szám, és a max is érvényes szám
    if (!isNaN(num) && typeof max === 'number') {
      return num > max ? `${max}+` : `${num}`;
    }

    // Nem szám → változatlanul visszaadjuk stringként
    return String(value);
  }
}
