import { IdsActionPanelComponent } from './action-panel.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsActionPanelComponent', () => {
  let component: IdsActionPanelComponent;
  let fixture: ComponentFixture<IdsActionPanelComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsActionPanelComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsActionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
