import { ComponentsComponent } from './components.component';

import { GraphqlService, StatamicNavTreeBranch } from '../../services/graphql.service';

import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

function componentNode(id: string, title: string, slug: string, children: StatamicNavTreeBranch[] = []): StatamicNavTreeBranch {
  return { page: { __typename: 'NavEntryPage_SideNav_Components_Component', id, title, slug }, children };
}

describe('ComponentsComponent navigation cards', () => {
  let english: Subject<unknown>;
  let hungarian: Subject<unknown>;
  let language: Subject<{ lang: string }>;
  let service: { getComponentsList: jest.Mock };

  beforeEach(() => {
    sessionStorage.setItem('ids_lang', 'en');
    english = new Subject();
    hungarian = new Subject();
    language = new Subject();
    service = { getComponentsList: jest.fn((site: string) => (site === 'hu' ? hungarian : english)) };
    TestBed.configureTestingModule({
      providers: [
        { provide: GraphqlService, useValue: service },
        { provide: TranslateService, useValue: { onLangChange: language, instant: (key: string): string => key } },
      ],
    });
    TestBed.overrideComponent(ComponentsComponent, { set: { template: '', imports: [] } });
  });

  afterEach(() => sessionStorage.removeItem('ids_lang'));

  it('includes parents and descendants, skips wrapper pages and keeps the first occurrence of duplicate IDs', () => {
    const fixture = TestBed.createComponent(ComponentsComponent);
    fixture.detectChanges();
    const input = componentNode('input-uuid', 'Input', 'input');
    const formField = componentNode('form-uuid', 'Form Field', 'form-field', [{ children: [input] }]);
    const tree = [
      { children: [
        { children: [
          formField,
          componentNode('button-uuid', 'Button', 'button'),
          { page: { __typename: 'OtherPage', id: 'other', title: 'Other', slug: 'other' } },
          input,
        ] },
      ] },
    ];
    const before = JSON.stringify(tree);
    english.next({ data: { entry: { navs_field: [{ tree }] } } });
    const cards = fixture.componentInstance.componentDatas();
    expect(cards.map((item) => item.title)).toEqual([
      'Button',
      'Form Field',
      'Input',
    ]);
    const child = cards.find((item) => item.slug === 'input')!;
    expect(child.id).toBe('input-uuid');
    expect(child.parentTitle).toBe('Form Field');
    expect(child.imageLink).toBe('/en/components/input');
    expect(fixture.componentInstance.transformToCardData(child).overTitle).toBe('Form Field');
    expect(cards.find((item) => item.slug === 'button')?.parentTitle).toBeUndefined();
    expect(JSON.stringify(tree)).toBe(before);
  });

  it('retains fallback cards and handles partial responses', () => {
    const fixture = TestBed.createComponent(ComponentsComponent);
    fixture.detectChanges();
    english.next({ data: { entries: { data: [
      { id: 'fallback', title: 'Input', slug: 'input' },
      { id: 'fallback', title: 'Input', slug: 'input' },
    ] } } });
    expect(fixture.componentInstance.componentDatas()).toHaveLength(1);
    expect(fixture.componentInstance.componentDatas()[0].parentTitle).toBeUndefined();
    expect(fixture.componentInstance.componentDatas()[0].imageUrl).toContain('No+Image');
    english.next({});
    expect(fixture.componentInstance.componentDatas()).toEqual([]);
  });

  it('ignores late responses from the previous language and stops requests on destroy', () => {
    const fixture = TestBed.createComponent(ComponentsComponent);
    fixture.detectChanges();
    language.next({ lang: 'hu' });
    const childNode = componentNode('input', 'Beviteli mező', 'input');
    const parent = componentNode('form', 'Űrlapmező', 'form-field', [childNode]);
    hungarian.next({ data: { entry: { navs_field: [{ tree: [parent] }] } } });
    english.next({ data: { entries: { data: [{ id: 'old', title: 'Old', slug: 'old' }] } } });
    const child = fixture.componentInstance.componentDatas().find((item) => item.slug === 'input')!;
    expect(child.parentTitle).toBe('Űrlapmező');
    expect(child.imageLink).toBe('/hu/components/input');
    fixture.destroy();
    expect(hungarian.observed).toBe(false);
  });
});
