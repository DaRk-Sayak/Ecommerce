import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { map } from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl='http://localhost:8080/api/products';
  private categoryUrl='http://localhost:8080/api/product-category';

  constructor(private httpClient:HttpClient) { }

  getProductList(CategoryId:number):Observable<Product[]>{
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${CategoryId}`;
    return this.getProduct(searchUrl);
  }

  getProductCategories():Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response=>response._embedded.productCategory)
    );
  }

  searchProduct(key: string | null):Observable<Product[]> {
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${key}`;
    return this.getProduct(searchUrl);
  }

  private getProduct(searchUrl:string):Observable<Product[]>{
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response=>response._embedded.products)
    );
  }

  getProducts(productId: number):Observable<Product> {
    const productDetailsUrl=`${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productDetailsUrl);
  }

  getProductListPage(pageNo:number,pageSize:number,CategoryId:number):Observable<GetResponseProduct>{
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${CategoryId}`
                     +`&page=${pageNo}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

}
interface GetResponseProduct{
  _embedded:{
    products:Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPage:number,
    number:number
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }
}
