import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from './model/products';
import { ProductService } from './Service/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'AngularHttpRequest';
  allProducts: Product[] = [];
  editMode: boolean = false;
  isFetching: boolean = false; //for loading... indicator
  currentProductId: string;

  @ViewChild('productsForm') form: NgForm;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchProducts(); //becoz,whenever the pg loads v want to display all products in the db
  }

  onProductsFetch() {
    this.fetchProducts();
  }

  onProductCreate(products: { pName: string; desc: string; price: string }) {
    // console.log(products);
    // const headerProp = new HttpHeaders({ myHeader: 'procademy' });
    // this.http
    //   .post<{ name: string }>(
    //     'https://angularproject-77e34-default-rtdb.firebaseio.com/products.json',
    //     products,
    //     { headers: headerProp } //passing our custom header ie. headerProp with the request
    //   )
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
    if (!this.editMode) {
      this.productService.createProduct(products);
    }
    else {
      this.productService.updateProduct(this.currentProductId, products);
    }
  }

  private fetchProducts() {
    // this.isFetching = true; //for loading... indicator
    // //here , v r sending get request
    // this.http
    //   .get<{ [key: string]: Product }>(
    //     'https://angularproject-77e34-default-rtdb.firebaseio.com/products.json'
    //   )
    //   .pipe(
    //     map((res) => {
    //       const products = [];
    //       for (const key in res) {
    //         if (res.hasOwnProperty(key)) {
    //           products.push({ ...res[key], id: key });
    //         }
    //       }
    //       return products;
    //     })
    //   )
    //   .subscribe((products) => {
    //     console.log(products);
    //     this.allProducts = products;
    //     this.isFetching = false; //for loading... indicator
    //   });

    this.isFetching = true;
    this.productService.fetchProduct().subscribe((products) => {
      this.allProducts = products;
      this.isFetching = false;
    });
  }

  onDeleteProduct(id: string) {
    // this.http
    //   .delete(
    //     'https://angularproject-77e34-default-rtdb.firebaseio.com/products/' +
    //       id +
    //       '.json'
    //   )
    //   .subscribe();

    this.productService.deleteProduct(id);
  }

  onDeleteAllProduct() {
    // this.http
    //   .delete(
    //     'https://angularproject-77e34-default-rtdb.firebaseio.com/products.json'
    //   )
    //   .subscribe();
    this.productService.deleteAllProduct();
  }

  onEditClicked(id: string) {
    this.currentProductId = id;
    //get the product based on the id
    let currentProduct = this.allProducts.find((p) => {
      return p.id === id;
    });
    // console.log(currentProduct);

    //populate the form with product details
    this.form.setValue({
      pName: currentProduct.pName,
      desc: currentProduct.desc,
      price: currentProduct.price
    });

    //change button value to update product
    this.editMode = true;
  }
}
