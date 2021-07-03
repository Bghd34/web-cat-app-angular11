import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Observable<Product[]> | null = null;

  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.products = this.productService.getAllProducts();
  }

}
