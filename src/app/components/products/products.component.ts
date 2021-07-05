import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from '../../services/products.service';
import { Observable, of } from 'rxjs';
import {map, catchError,startWith} from 'rxjs/operators';
import { AppDataState, DataStateEnum } from '../../state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.products = this.productService.getAllProducts().pipe(
      map(data => ({dataState:DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onGetSelectedProducts() {
    this.products = this.productService.getSelectedProducts().pipe(
      map(data => ({dataState:DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onGetAvailableProducts() {
    this.products = this.productService.getAvailaleProducts().pipe(
      map(data => ({dataState:DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSearch(keyword:any) {

    console.log(keyword);
    
    
    this.products = this.productService.searchProducts("http://localhost:5000/products?name_like="+keyword).pipe(
      map(data => {
        console.log(data);
        return ({dataState:DataStateEnum.LOADED, data:data});
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
    
  }
  

}
