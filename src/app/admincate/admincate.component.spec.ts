import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincateComponent } from './admincate.component';

describe('AdmincateComponent', () => {
  let component: AdmincateComponent;
  let fixture: ComponentFixture<AdmincateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmincateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
