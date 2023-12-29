import { Component, Inject } from '@angular/core';
import { ConfirmDeletionComponent } from '../confirm-deletion/confirm-deletion.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/common/category';
import { CategoryService } from 'src/app/services/category.service';
import { Validator } from 'src/app/validators/validator';

@Component({
  selector: 'app-edit-category-name',
  templateUrl: './edit-category-name.component.html',
  styleUrls: ['./edit-category-name.component.css']
})
export class EditCategoryNameComponent {

  categoryFormGroup!: FormGroup;

  category: Category = new Category(-1, '', '', 0);

  icon: string = this.data.category.image;

  categoriesIconList: string[] = ["bi bi-umbrella", "bi bi-joystick", "bi bi-cart", "bi bi-piggy-bank", "bi bi-building",
    "bi bi-basket", "bi bi-house", "bi bi-bicycle", "bi bi-book", "bi bi-bus-front", "bi bi-airplane", "bi bi-activity",
    "bi bi-bag-heart", "bi bi-bell", "bi bi-binoculars", "bi bi-boombox", "bi bi-briefcase", "bi bi-brightness-high",
    "bi bi-cash"];

  n: number = 0;

  errorMessage: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { category: Category }, private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EditCategoryNameComponent>) { }

  ngOnInit(): void {
    this.categoryFormGroup = this.formBuilder.group({
      name: new FormControl(this.data.category.name, [Validators.required, Validator.notOnlyWhitespace, Validators.maxLength(30)])
    });

    let i = 0;

    for (let cat of this.categoriesIconList) {
      if (cat == this.icon) {
        this.n = i;
        break;
      }
      i++;
    }
  }

  public changeIconRight() {
    if (this.n < this.categoriesIconList.length - 1) {
      this.icon = this.categoriesIconList[this.n + 1];
      this.n++;
    } else {
      this.icon = this.categoriesIconList[0];
      this.n = 0;
    }
  }

  public changeIconLeft() {
    if (this.n == 0) {
      this.n = this.categoriesIconList.length - 1;
      this.icon = this.categoriesIconList[this.n];
    } else {
      this.n--;
      this.icon = this.categoriesIconList[this.n];
    }
  }

  onSaveClick() {
    if (this.categoryFormGroup.valid) {
      this.category.name = this.categoryFormGroup.get('name')?.value;
      this.category.image = this.icon;
      this.category.id = this.data.category.id;
      this.categoryService.updateCategory(this.category).subscribe(
        () => {
          console.log('Category updated successfully');
          this.data.category.name = this.category.name;
          this.data.category.image = this.category.image;
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error updating category:', error);
          console.log(error.message);
          this.errorMessage = error.message;
        }
      );
    }
  }

  onSaveNameClick() {
    if (this.categoryFormGroup.valid) {
      this.data.category.name = this.categoryFormGroup.get('name')?.value;
      this.categoryService.updateCategory(this.data.category).subscribe(
        () => {
          console.log('Category updated successfully');
        },
        (error) => {
          console.error('Error updating category:', error);
        }
      );
    }
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.data.category).subscribe(
      () => {
        console.log('Category deleted successfully');
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDeletionComponent, {
      width: '300px',
      data: { category: this.data.category }
    });
    dialogRef.afterClosed()
      .subscribe((data) => {
        if (data) {
          this.deleteCategory();
          this.dialogRef.close(true);
        } else {
          return;
        }
      })
  }

  get name() {
    return this.categoryFormGroup.get('name');
  }

}
