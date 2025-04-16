import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  productForm!: FormGroup;
  id: string|null = null;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.productForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(5)]],
      price: [null, [Validators.required, Validators.min(100)]],
      status: [null, [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });

    this.id = this.route.snapshot.params["id"];
    // console.log(this.id);
  }

  ngOnInit(){
    if(this.id)
      this.productService.getById(this.id).subscribe({
        next: (data) =>{
          // console.log(data);
          this.productForm.patchValue(data);
        },
        error: () =>{
          alert("Lỗi")
        }
      })
  }

  handleSubmit(){
    if(this.productForm.invalid){
      this.productForm.markAllAsTouched();
      return;
    }

    this.productService.update(this.id!,this.productForm.value).subscribe({
      next: () =>{
        alert("Cập nhật thành công");
        this.router.navigate(['/product']);
      },
      error: () =>{
        alert("Cập nhật thất bại")
      }
    })
  }
}
