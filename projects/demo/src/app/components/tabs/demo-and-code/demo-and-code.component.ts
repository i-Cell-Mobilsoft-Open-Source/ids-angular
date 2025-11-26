import { NgComponentOutlet } from '@angular/common';
import { Component, inject, OnInit, signal, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsChipComponent } from '@i-cell/ids-angular/chip';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

interface ResettableService {
  reset(): void;
}

@Component({
  selector: 'app-demo-and-code',
  standalone: true,
  imports: [
    IdsChipComponent,
    IdsCardComponent,
    IdsIconComponent,
    IdsIconButtonComponent,
    IdsButtonComponent,
    NgComponentOutlet,

  ],
  templateUrl: './demo-and-code.component.html',
})
export class DemoAndCodeComponent implements OnInit {
  private _route = inject(ActivatedRoute);

  private _currentDemoInstance: Record<string, unknown> | null = null;
  private _currentControlInstance: Record<string, unknown> | null = null;

  public demoComponentClass?: Type<unknown>;
  public controlComponentClass?: Type<unknown>;

  public isOpen = signal(false);
  public isDark = signal(false);

  public ngOnInit(): void {
    const data = this._route.snapshot.data;
    this.demoComponentClass = data['demoComponent'] as Type<unknown>;
    this.controlComponentClass = data['controlComponent'] as Type<unknown>;
  }

  public toggleFooter(): void {
    this.isOpen.update((open) => !open);
  }

  public toggleDark(): void {
    this.isDark.update((dark) => !dark);
  }

  // public resetDemoControls(): void {
  //   let demoService: any;

  //   if (this._currentDemoInstance) {
  //     const serviceKey = Object.keys(this._currentDemoInstance).find((key) =>
  //       key.endsWith('DemoService'),
  //     );
  //     if (serviceKey) {
  //       demoService = (this._currentDemoInstance as any)[serviceKey];
  //     }
  //   }

  //   if (!demoService && this._currentControlInstance) {
  //     const serviceKey = Object.keys(this._currentControlInstance).find((key) =>
  //       key.endsWith('DemoService'),
  //     );
  //     if (serviceKey) {
  //       demoService = (this._currentControlInstance as any)[serviceKey];
  //     }
  //   }

  //   if (demoService && typeof demoService.reset === 'function') {
  //     demoService.reset();
  //   } else {
  //     console.warn('Nem található a DemoService, vagy nincs reset() metódusa.');
  //   }
  // }

  // public onDemoActivate(instance: any): void {
  //   this._currentDemoInstance = instance;
  // }

  // public onControlActivate(instance: any): void {
  //   this._currentControlInstance = instance;
  // }
  public resetDemoControls(): void {
    const service = this._findDemoService(this._currentDemoInstance)
                 || this._findDemoService(this._currentControlInstance);

    if (service) {
      service.reset();
    } else {
      console.warn('Nem található a DemoService, vagy nincs reset() metódusa.');
    }
  }

  public onComponentActivate(instance: unknown, type: 'demo' | 'control'): void {
    // Biztonsági ellenőrzés: csak akkor tároljuk el, ha objektum
    if (instance && typeof instance === 'object') {
      const record = instance as Record<string, unknown>;
      if (type === 'demo') {
        this._currentDemoInstance = record;
      } else {
        this._currentControlInstance = record;
      }
    }
  }

  private _findDemoService(instance: Record<string, unknown> | null): ResettableService | null {
    if (!instance) {
      return null;
    }

    const serviceKey = Object.keys(instance).find((key) => key.endsWith('DemoService'));

    if (serviceKey) {
      const serviceCandidate = instance[serviceKey];
      // Type Guard hívása
      if (this._isResettableService(serviceCandidate)) {
        return serviceCandidate;
      }
    }

    return null;
  }

  private _isResettableService(obj: unknown): obj is ResettableService {
    return (
      !!obj &&
      typeof obj === 'object' &&
      'reset' in obj &&
      typeof (obj as Record<string, unknown>)['reset'] === 'function'
    );
  }
}
