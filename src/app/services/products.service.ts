import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { Product } from "../model/product.model";

@Injectable({providedIn:"root"}) // pour que le service soit disponible dans tout el'application 
export class ProductsService {
    constructor(private http:HttpClient){   
    }

    getAllProducts():Observable<Product[]>{
        //let host = (Math.random()<0.2 ? environment.host1 : environment.host);
        let host = environment.host;
        return this.http.get<Product[]>(host+"/products");
    }

    getSelectedProducts():Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(host+"/products?selected=true");
    }

    getAvailaleProducts():Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(host+"/products?available=true");
    }


    searchProducts(keyword:string):Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(host+"/products?name_like="+keyword);
    }

    selectProducts(product:Product):Observable<Product>{
        let host = environment.host;
        product.selected = !product.selected;
        return this.http.put<Product>(host+"/products/"+product.id,product);
    }

    deleteProduct(product:Product):Observable<void>{
        let host = environment.host;
        return this.http.delete<void>(host+"/products/"+product.id);
    }

    saveProduct(product:Product):Observable<void>{
        let host = environment.host;
        return this.http.post<void>(host+"/products",product);
    }

    getProducts(id:number):Observable<Product>{
        let host = environment.host;
        return this.http.get<Product>(host+"/products/"+id);
    }

    

}