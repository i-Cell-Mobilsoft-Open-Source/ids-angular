import { IdsHintMessageComponent } from './hint-message.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsHintMessageComponent', () => {
  let component: IdsHintMessageComponent;
  let fixture: ComponentFixture<IdsHintMessageComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsHintMessageComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsHintMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
