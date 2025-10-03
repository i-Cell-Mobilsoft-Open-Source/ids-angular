import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

interface IconData {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private readonly _http = inject(HttpClient);

  public loadIcons(): Observable<string[]> {
    return this._http.get<IconData[]>('assets/fonts/I-DS-font-icon-material.json').pipe(
      map((data) => data.map((item) => item.name)),
      catchError(() => of([])),
    );
  }
}
