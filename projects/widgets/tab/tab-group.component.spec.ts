import { IdsTabGroupComponent } from './tab-group.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsTabGroupComponent', () => {
  let component: IdsTabGroupComponent;
  let fixture: ComponentFixture<IdsTabGroupComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsTabGroupComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsTabGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
