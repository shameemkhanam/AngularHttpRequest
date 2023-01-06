import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularHttpRequest';

  constructor(private http: HttpClient){}

  onProductCreate(products: {pName: string, desc: string, price: string}) {
    console.log(products);
    const headerProp = new HttpHeaders({ 'myHeader': 'procademy' });
    this.http
      .post(
        'https://angularproject-77e34-default-rtdb.firebaseio.com/products.json',
        products,
        { headers: headerProp } //passing our custom header ie. headerProp with the request
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
