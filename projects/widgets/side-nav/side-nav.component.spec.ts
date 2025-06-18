import { IdsSideNavComponent } from './side-nav.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('SideNavComponent', () => {
  let component: IdsSideNavComponent;
  let fixture: ComponentFixture<IdsSideNavComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsSideNavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IdsSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
