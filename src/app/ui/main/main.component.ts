import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/api/products.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  selectedProduct = {
    name: '',
    code: ''
  };
  products: any[] = []
  filteredProducts: any[] = []
  invoices: any[] = []
  search(event: any) {
    let filtered : any[] = []
    let query = event.query;
    for (let i = 0; i < this.products.length; i++) {
      let product = this.products[i];
      if (product.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(product)
      }
    }
    this.filteredProducts = filtered
  }
  loadProductsInMemory() {
    let thiz = this;
    this.productsService.getAllProducts().subscribe(
      value => {
        value.data.products.forEach(
          (val: any) => {
            thiz.products.push(val);
          }
        )
      }
    )
    console.log('products', this.products);
  }
  loadInvoicesByProduct(value: any) {
    console.log('selected', value.code)
    let thiz = this
    this.productsService.getInvoicesByProductCode(value.code).subscribe(
      invoices => {
        console.log('invoices by product code', invoices.data)
        thiz.invoices = invoices.data.invoicesByProduct
      }
    )
  }

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.loadProductsInMemory()
  }

}
