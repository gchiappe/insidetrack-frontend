import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/api/products.service';
import {cloneDeep} from '@apollo/client/utilities';
import {InvoiceService} from '../../services/api/invoice.service';
import {DistributorService} from '../../services/api/distributor.service';
import {CustomerService} from '../../services/api/customer.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  invoices: any[] = []
  // Load Invoice By Number
  loadInvoiceByNumber(invoiceNumber: string) {
    let thiz = this;
    thiz.invoices = []
    this.invoiceService.getInvoiceByNumber(invoiceNumber).subscribe(
      invoice => {
        if (invoice.data.invoice != null)
          thiz.invoices.push(cloneDeep(invoice.data.invoice))
      }
    )
  }
  // Load Invoice By Product
  selectedProduct = {
    name: '',
    code: ''
  };
  products: any[] = []
  filteredProducts: any[] = []
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
  loadProducts() {
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
  }
  loadInvoicesByProduct(value: any) {
    let thiz = this
    this.invoiceService.getInvoicesByProductCode(value.code).subscribe(
      invoices => {
        thiz.invoices = cloneDeep(invoices.data.invoicesByProduct)
      }
    )
  }
  // Load Invoice By Distributor
  selectedDistributor = {
    name: ''
  };
  distributors: any[] = []
  filteredDistributors: any[] = []
  searchDistributor(event: any) {
    let filtered : any[] = []
    let query = event.query;
    for (let i = 0; i < this.distributors.length; i++) {
      let distributor = this.distributors[i];
      if (distributor.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(distributor)
      }
    }
    this.filteredDistributors = filtered
  }
  loadDistributors() {
    let thiz = this;
    this.distributorService.getAllDistributors().subscribe(
      value => {
        console.log('load distributors', value)
        value.data.distributors.forEach(
          (val: any) => {
            thiz.distributors.push(val);
          }
        )
      }
    )
  }
  loadInvoicesByDistributorName(value: any) {
    let thiz = this
    this.invoiceService.getInvoicesByDistributorName(value.name).subscribe(
      invoices => {
        thiz.invoices = cloneDeep(invoices.data.invoicesByDistributor)
      }
    )
  }
  // Load Invoice By Customer Location
  selectedCustomer = {
    name: '',
    address: ''
  };
  customers: any[] = []
  filteredCustomers: any[] = []
  searchCustomer(event: any) {
    let filtered : any[] = []
    let query = event.query;
    for (let i = 0; i < this.customers.length; i++) {
      let customer = this.customers[i];
      if (customer.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(customer)
      }
    }
    this.filteredCustomers = filtered
  }
  loadCustomers() {
    let thiz = this;
    this.customerService.getAllCustomers().subscribe(
      value => {
        console.log('load customers', value)
        value.data.customers.forEach(
          (val: any) => {
            thiz.customers.push(val);
          }
        )
      }
    )
  }
  loadInvoicesByCustomerLocation(value: any) {
    let thiz = this
    this.invoiceService.getInvoicesByCustomerLocation(value.address).subscribe(
      invoices => {
        thiz.invoices = cloneDeep(invoices.data.invoicesByCustomerLocation)
      }
    )
  }

  constructor(
    private productsService: ProductsService,
    private distributorService: DistributorService,
    private customerService: CustomerService,

    private invoiceService: InvoiceService,
  ) { }

  ngOnInit(): void {
    this.loadProducts()
    this.loadDistributors()
    this.loadCustomers()
  }

}
