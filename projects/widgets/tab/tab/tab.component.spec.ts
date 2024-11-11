import { IdsTabComponent } from './tab.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsTabComponent', () => {
  let component: IdsTabComponent;
  let fixture: ComponentFixture<IdsTabComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsTabComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
