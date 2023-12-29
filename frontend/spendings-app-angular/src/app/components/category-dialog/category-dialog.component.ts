import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/common/category';
import { MatDialogRef } from '@angular/material/dialog';
import { Validator } from 'src/app/validators/validator';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {

  category: Category = new Category(-1, '', '', 0);

  categoryFormGroup!: FormGroup;

  n: number = 0;

  errorMessage: string | undefined;

  categoriesIconList: string[] = ["bi bi-umbrella", "bi bi-joystick", "bi bi-cart", "bi bi-piggy-bank", "bi bi-building",
    "bi bi-basket", "bi bi-house", "bi bi-bicycle", "bi bi-book", "bi bi-bus-front", "bi bi-airplane", "bi bi-activity",
    "bi bi-bag-heart", "bi bi-bell", "bi bi-binoculars", "bi bi-boombox", "bi bi-briefcase", "bi bi-brightness-high",
    "bi bi-cash"];

  icon: string = this.categoriesIconList[0];

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<CategoryDialogComponent>) {}

  ngOnInit(): void {
    this.categoryFormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(30), Validator.notOnlyWhitespace])
    });
  }

  public onSaveClick() {
    if (this.categoryFormGroup.valid) {
      this.category.name = this.categoryFormGroup.get('name')?.value;
      this.category.image = this.icon;
      this.categoryService.addCategory(this.category).subscribe(
        () => {
          console.log('Category added successfully');
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error adding category:', error);
          console.log(error.message);
          this.errorMessage = error.message;
        }
      );
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

  get name() {
    return this.categoryFormGroup.get('name');
  }

}

