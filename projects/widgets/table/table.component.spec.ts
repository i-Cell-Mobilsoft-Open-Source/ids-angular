import { TableComponent } from './table.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
