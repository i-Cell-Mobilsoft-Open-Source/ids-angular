import { IdsTagGroupComponent } from './tag-group.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsTagGroupComponent', () => {
  let component: IdsTagGroupComponent;
  let fixture: ComponentFixture<IdsTagGroupComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsTagGroupComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsTagGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
