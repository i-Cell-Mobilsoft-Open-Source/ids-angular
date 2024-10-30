import { IdsTabItemComponent } from './tab-item.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsTabItemComponent', () => {
  let component: IdsTabItemComponent;
  let fixture: ComponentFixture<IdsTabItemComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsTabItemComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsTabItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
