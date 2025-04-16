import { Component } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  products: any;

  constructor(
    private productService: ProductService
  ){}

  ngOnInit(){
    this.productService.getList().subscribe({
      next: (data) =>{
        // console.log(data);
        this.products = data;
      },
      error: (err) =>{
        alert("Lỗi")
      }
    })
  }

  handleDelete(id: string){
    // console.log(id);
    if(window.confirm('Bạn có chắc chắn muốn xóa không?')){
      this.productService.remove(id).subscribe({
        next: () =>{
          this.products = this.products.filter((item: any)=> item.id != id)
          alert("Xóa thành công")
        },
        error: (err) =>{
          alert("Xóa thất bại")
        }
      })
    }
  }

}
