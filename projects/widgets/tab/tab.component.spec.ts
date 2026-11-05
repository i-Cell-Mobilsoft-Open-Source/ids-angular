import { IdsTabGroupComponent } from './tab-group.component';
import { IdsTabComponent } from './tab.component';

import { Component, viewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  imports: [
    IdsTabGroupComponent,
    IdsTabComponent,
  ],
  template: `
    <ids-tab-group [disabled]="groupDisabled">
      <ids-tab label="First" leadingIcon="home" trailingIcon="close">First content</ids-tab>
      <ids-tab label="Second" id="custom-id" [disabled]="secondDisabled">Second content</ids-tab>
      <ids-tab label="Third">
        <span prefixContent>Prefix</span>
        <span suffixContent>Suffix</span>
      </ids-tab>
    </ids-tab-group>
  `,
})
class TestHostComponent {
  public tabs = viewChildren(IdsTabComponent);
  public groupDisabled = false;
  public secondDisabled = false;
}

const tabCount = 3;

let fixture: ComponentFixture<TestHostComponent>;
let host: TestHostComponent;

async function render(): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

function tab(index: number): IdsTabComponent {
  return host.tabs()[index];
}

beforeEach(async() => {
  await TestBed.configureTestingModule({
    imports: [TestHostComponent],
  }).compileComponents();

  fixture = TestBed.createComponent(TestHostComponent);
  host = fixture.componentInstance;
  await render();
});

describe('IdsTabComponent', () => {
  it('should create', () => {
    expect(host.tabs()).toHaveLength(tabCount);
    expect(tab(0)).toBeTruthy();
  });

  it('should expose the label and the icons', () => {
    expect(tab(0).label()).toBe('First');
    expect(tab(0).leadingIcon()).toBe('home');
    expect(tab(0).trailingIcon()).toBe('close');
  });

  it('should have empty icons by default', () => {
    expect(tab(1).leadingIcon()).toBe('');
    expect(tab(1).trailingIcon()).toBe('');
  });

  it('should have a generated id and a matching panel id', () => {
    expect(tab(0).id()).toMatch(/^ids-tab-\d+$/);
    expect(tab(0).panelId()).toBe(`${tab(0).id()}-panel`);
  });

  it('should use a custom id', () => {
    expect(tab(1).id()).toBe('custom-id');
    expect(tab(1).panelId()).toBe('custom-id-panel');
  });

  it('should not be disabled by default', () => {
    expect(tab(0).disabled()).toBe(false);
    expect(tab(0).parentOrSelfDisabled()).toBe(false);
    expect(tab(0).hostTabClasses()).toBe('ids-tab');
  });

  it('should be disabled by its own input', async() => {
    host.secondDisabled = true;
    await render();

    expect(tab(1).parentOrSelfDisabled()).toBe(true);
    expect(tab(0).parentOrSelfDisabled()).toBe(false);
    expect(tab(1).hostTabClasses()).toBe('ids-tab ids-tab-disabled');
  });

  it('should be disabled by the tab group', async() => {
    host.groupDisabled = true;
    await render();

    expect(host.tabs().every((item) => item.parentOrSelfDisabled())).toBe(true);
    expect(tab(0).hostTabClasses()).toBe('ids-tab ids-tab-disabled');
  });

  it('should keep the host class on the tab element', () => {
    const element = (fixture.nativeElement as HTMLElement);

    expect(element.querySelectorAll('li.ids-tab')).toHaveLength(tabCount);
  });

  it('should render the content of the selected tab in a tabpanel', () => {
    const panel = (fixture.nativeElement as HTMLElement).querySelector('.ids-tab-body-content')!;

    expect(panel.getAttribute('role')).toBe('tabpanel');
    expect(panel.id).toBe(tab(0).panelId());
    expect(panel.textContent).toContain('First content');
  });

  it('should provide the content templates', () => {
    expect(tab(0).content()).toBeTruthy();
    expect(tab(0).prefixContent()).toBeTruthy();
    expect(tab(0).suffixContent()).toBeTruthy();
  });
});
