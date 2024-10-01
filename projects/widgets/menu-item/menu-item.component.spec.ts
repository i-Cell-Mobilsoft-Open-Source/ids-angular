import { IdsMenuItemComponent } from './menu-item.component';

import { CdkMenuItem } from '@angular/cdk/menu';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockDirective } from 'ng-mocks';

describe('IdsMenuItemComponent', () => {
  let component: IdsMenuItemComponent;
  let fixture: ComponentFixture<IdsMenuItemComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        IdsMenuItemComponent,
        MockDirective(CdkMenuItem),
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsMenuItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
