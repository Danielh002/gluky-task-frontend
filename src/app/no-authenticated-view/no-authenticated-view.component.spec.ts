import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAuthenticatedViewComponent } from './no-authenticated-view.component';

describe('NoAuthenticatedViewComponent', () => {
  let component: NoAuthenticatedViewComponent;
  let fixture: ComponentFixture<NoAuthenticatedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoAuthenticatedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAuthenticatedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
