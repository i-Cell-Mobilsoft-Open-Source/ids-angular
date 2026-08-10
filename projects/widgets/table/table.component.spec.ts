import { IdsTableComponent } from './table.component';
import { IdsTableColumnDef } from './types/table-column-def';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

type TestTableRow = {
  name: string;
};

@Component({
  imports: [IdsTableComponent],
  template: `
    <ids-table
      [dataSource]="dataSource"
      [columnDefs]="columnDefs"
    />
  `,
})
class TestHostComponent {
  public dataSource: TestTableRow[] = [{ name: 'Test' }];
  public columnDefs: IdsTableColumnDef<TestTableRow>[] = [
    {
      id: 'name',
      label: 'Name',
      field: 'name',
    },
  ];
}

describe('IdsTableComponent', () => {
  let component: IdsTableComponent<TestTableRow>;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(IdsTableComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
