import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { AlertService } from '../alert';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private ps: ProductsService,private alertService: AlertService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      ProductName: ['', Validators.required ],
      ProductDescription: ['', Validators.required ],
      ProductPrice: ['', Validators.required ]
    });
  }
  addProduct(ProductName, ProductDescription, ProductPrice) {
	this.ps.addProduct(ProductName, ProductDescription, ProductPrice);
  }
  success(message: string) {
    this.alertService.success(message);
  }
  error(message: string) {
    this.alertService.error(message);
  }
  info(message: string) {
    this.alertService.info(message);
  }
  warn(message: string) {
    this.alertService.warn(message);
  }
  clear() {
    this.alertService.clear();
  }
  ngOnInit() {
  }
}
