import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  uri = 'http://localhost:4000/products';

  constructor(private http: HttpClient) { }

  addProduct(ProductName, ProductDescription, ProductPrice) {
    const obj = {
      ProductName,
      ProductDescription,
      ProductPrice
    };
    this.http.post('http://localhost:4000/products/add', obj)
        .subscribe(res => console.log('Done'));
  }

  getProducts() {
    return this
           .http
           .get('http://localhost:4000/products');
  }

  editProduct(id) {
	return this
            .http
            .get('http://localhost:4000/products/edit/'+id);
  }

  updateProduct(ProductName, ProductDescription, ProductPrice, id) {
    const obj = {
      ProductName,
      ProductDescription,
      ProductPrice
    };
    this
      .http
      .post('http://localhost:4000/products/update/'+id, obj)
      .subscribe(res => console.log('Update Complete'));
  }

  deleteProduct(id) {
    return this
              .http
              .get('http://localhost:4000/products/delete/'+id);
  }
}
