import { IdsClearValueComponent } from './clear-value.component';

import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'jest-axe';

@Component({
  imports: [IdsClearValueComponent],
  template: `
    <div (click)="parentClicks = parentClicks + 1">
      <ids-clear-value
        [label]="label()"
        [disabled]="disabled()"
        (clear)="clears = clears + 1"
      />
    </div>
  `,
})
class TestHostComponent {
  public label = signal('Clear');
  public disabled = signal(false);
  public clears = 0;
  public parentClicks = 0;
}

describe('IdsClearValueComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  const button = (): HTMLButtonElement => fixture.nativeElement.querySelector('ids-clear-value button');

  beforeEach(async() => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the host class and an accessible label', () => {
    expect(fixture.nativeElement.querySelector('ids-clear-value').classList).toContain('ids-clear-value');
    expect(button().getAttribute('aria-label')).toBe('Clear');
  });

  it('should emit clear on click without propagating the click to its ancestors', () => {
    button().click();

    expect(host.clears).toBe(1);
    expect(host.parentClicks).toBe(0);
  });

  it('should disable the button', () => {
    host.disabled.set(true);
    fixture.detectChanges();

    expect(button().disabled).toBe(true);
  });

  it('should have no axe violations', async() => {
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
