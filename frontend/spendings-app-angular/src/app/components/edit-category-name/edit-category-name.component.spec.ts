import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryNameComponent } from './edit-category-name.component';

describe('EditCategoryNameComponent', () => {
  let component: EditCategoryNameComponent;
  let fixture: ComponentFixture<EditCategoryNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCategoryNameComponent]
    });
    fixture = TestBed.createComponent(EditCategoryNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
