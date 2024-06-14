import { IdsDialogComponent } from './ids-dialog.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

window.ResizeObserver =
    jest.fn().mockImplementation(() => ({
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
    }));

describe('IdsDialogComponent', () => {
  let component: IdsDialogComponent;
  let fixture: ComponentFixture<IdsDialogComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsDialogComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsDialogComponent);
    component = fixture.componentInstance;
    // fixture.componentRef.setInput('mainTitle', 'test title');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
