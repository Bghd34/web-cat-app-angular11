import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId:number;
  productFormGroup?:FormGroup;
  constructor(private activatedRoute:ActivatedRoute, private productsService:ProductsService, private fb:FormBuilder) { 
    this.productId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productsService.getProducts(this.productId)
    .subscribe(product => {
      this.fb.group({
        name:[product.name, Validators.required],
        price:[product.price, Validators.required],
        quantity:[product.quantity, Validators.required],
        selected:[product.selected, Validators.required],
        available:[product.available, Validators.required]

      })
    })
  }

}
