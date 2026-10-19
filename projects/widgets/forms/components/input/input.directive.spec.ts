import { IdsInputDirective } from './input.directive';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

@Component({
  imports: [
    FormsModule,
    IdsInputDirective,
  ],
  template: '<input idsInput ngModel="value" />',
})
class TestHostComponent {}

describe('IdsInputDirective', () => {
  it('should create an instance', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const directive = fixture.debugElement.query(By.directive(IdsInputDirective)).injector.get(IdsInputDirective);
    expect(directive).toBeTruthy();
  });
});
