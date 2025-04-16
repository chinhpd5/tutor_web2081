import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getList(){
    return this.http.get(`http://localhost:3000/products`);
  }

  getById(id: string){
    return this.http.get(`http://localhost:3000/products/${id}`);
  }

  insert(data: any){
    return this.http.post(`http://localhost:3000/products`,data);
  }

  remove(id: string){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  update(id: string, data: any){
    return this.http.put(`http://localhost:3000/products/${id}`,data);
  }
}
