import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Product } from '../model/products';

@Injectable({ providedIn: 'root' }) //same as including this service in providers array of appmodule
export class ProductService {
  constructor(private http: HttpClient) {}

  //create product in database
  createProduct(products: { pName: string; desc: string; price: string }) {
    console.log(products);
    const headerProp = new HttpHeaders({ myHeader: 'procademy' });
    this.http
      .post<{ name: string }>(
        'https://angularproject-77e34-default-rtdb.firebaseio.com/products.json',
        products,
        { headers: headerProp } //passing our custom header ie. headerProp with the request
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  //fetch products from database
  fetchProduct() {
    //here , v r sending get request
    return this.http
      .get<{ [key: string]: Product }>(
        'https://angularproject-77e34-default-rtdb.firebaseio.com/products.json'
      )
      .pipe(
        map((res) => {
          const products = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              products.push({ ...res[key], id: key });
            }
          }
          return products;
        })
      );      
  }

  //delete a product from database
  deleteProduct(id: string) {
    this.http
      .delete(
        'https://angularproject-77e34-default-rtdb.firebaseio.com/products/' +
          id +
          '.json'
      )
      .subscribe();
  }

  //delete all products from database
  deleteAllProduct() {
    this.http
      .delete(
        'https://angularproject-77e34-default-rtdb.firebaseio.com/products.json'
      )
      .subscribe();
  }

  //update
  updateProduct(id: string, value: Product) {
    this.http.put('https://angularproject-77e34-default-rtdb.firebaseio.com/products/' + id + '.json', value)
      .subscribe();
  }
}