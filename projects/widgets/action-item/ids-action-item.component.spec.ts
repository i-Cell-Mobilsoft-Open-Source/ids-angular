import { IdsActionItemComponent } from './ids-action-item.component';

import { CdkMenuItem } from '@angular/cdk/menu';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockDirective } from 'ng-mocks';

describe('IdsActionItemComponent', () => {
  let component: IdsActionItemComponent;
  let fixture: ComponentFixture<IdsActionItemComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        IdsActionItemComponent,
        MockDirective(CdkMenuItem),
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsActionItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
