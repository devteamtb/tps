import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  addProduct(ProductName, ProductDescription, ProductPrice) {
    const obj = {
      ProductName,
      ProductDescription,
      ProductPrice
    };
    this.http.post(this.getHostURL() + 'products/add', obj)
        .subscribe(res => console.log('Done'));
  }

  getHostURL(): string {
	return environment.apiHost;
  }
  
  getProducts() {
    return this
           .http
           .get(this.getHostURL() + 'products');
  }

  editProduct(id) {
	return this
            .http
            .get(this.getHostURL() + 'products/edit/'+id);
  }

  updateProduct(ProductName, ProductDescription, ProductPrice, id) {
    const obj = {
      ProductName,
      ProductDescription,
      ProductPrice
    };
    this
      .http
      .post(this.getHostURL() + 'products/update/'+id, obj)
      .subscribe(res => console.log('Update Complete'));
  }

  deleteProduct(id) {
    return this
              .http
              .get(this.getHostURL() + 'products/delete/'+id);
  }
}
