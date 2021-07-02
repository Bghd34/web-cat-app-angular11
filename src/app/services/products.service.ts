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

}