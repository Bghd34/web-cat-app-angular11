import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from '../../services/products.service';
import { Observable, of } from 'rxjs';
import {map, catchError,startWith} from 'rxjs/operators';
import { AppDataState, DataStateEnum } from '../../state/product.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productService:ProductsService, private router:Router) { }

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

  onSearch(dataForm:any) {
    
    this.products = this.productService.searchProducts(dataForm.keyword).pipe(
      map(data => {
        //console.log(data);
        return ({dataState:DataStateEnum.LOADED, data:data});
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
    
  }

  onSelect(p:Product) {
    console.log(p.selected);
    this.productService.selectProducts(p)
    .subscribe(data => {
      p.selected=data.selected;
    });
    
  }

  onDelete(p:Product) {
    console.log(p);
    let v = confirm("Etes vous sure ?")
    if(v==true) {
      this.productService.deleteProduct(p)
    .subscribe(data => {
      this.onGetAllProducts();
    }, err =>  {
      console.log(err);
    })
  }
    }

    /*
    onNewProduct() {
      this.router.navigateByUrl("newProduct");
    }
    */

    onEditProduct(p:any) {

    }
    
  

}
