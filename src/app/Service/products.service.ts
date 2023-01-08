import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Subject, throwError } from 'rxjs';
import { Product } from '../model/products';

@Injectable({ providedIn: 'root' }) //same as including this service in providers array of appmodule
export class ProductService {
  error = new Subject<string>();


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
      }, (err) => {
        this.error.next(err.message); //here error.next will also emit an Obsvl..v subs in our compclass, in ngOnInit()
      });
  }

  //fetch products from database
  fetchProduct() {
    //here , v r sending get request
    const header = new HttpHeaders()
      .set('content-type', 'application/json')//v r chaining 2 headers
      .set('Access-Control-Allow-Origin', '*');
    
    const params = new HttpParams().set('print', 'pretty').set('pgNo','1');
    return this.http.get<{ [key: string]: Product }>
      // ('https://angularproject-77e34-default-rtdb.firebaseio.com/products.json?print=pretty', {'headers': header}) or
      ('https://angularproject-77e34-default-rtdb.firebaseio.com/products.json', {'headers': header, params: params})
      .pipe(
        map((res) => {
          const products = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              products.push({ ...res[key], id: key });
            }
          }
          return products;
        }), catchError((err) => {
          //logic for loggin error messages in database or file
          return throwError(err);
        })
      );      
  }

  //delete a product from database
  deleteProduct(id: string) {
    let header = new HttpHeaders();
    header = header.append('myHeader1', 'value1');
    header = header.append('myHeader2', 'value2');
    this.http.delete
      ('https://angularproject-77e34-default-rtdb.firebaseio.com/products/' +id +'.json',{'headers' : header})
      .subscribe();
  }

  //delete all products from database
  deleteAllProduct() {
    this.http
      .delete(
        'https://angularproject-77e34-default-rtdb.firebaseio.com/products.json'
      )
      .subscribe((data) => {
        console.log("successfully deleted "+ data);        
      }, (err) => {
        console.log("unable to delete..");        
      });
  }

  //update
  updateProduct(id: string, value: Product) {
    this.http.put('https://angularproject-77e34-default-rtdb.firebaseio.com/products/' + id + '.json', value)
      .subscribe();
  }
}