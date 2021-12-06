import { Injectable } from '@angular/core';
import {gql} from '@apollo/client/core';
import {Apollo} from 'apollo-angular';
import {query} from '@angular/animations';

const GQL_GET_ALL_PRODUCTS = gql`
  query GetProducts {
    products {
      code
      name
    }
  }
`;

const GQL_GET_INVOICES_BY_PRODUCT = gql`
  query GetInvoicesByProduct($productCode: String) {
    invoicesByProduct(productCode: $productCode){
      number
      purchaseDate
      details {
        quantity
        weight
        measureUnit
        unitPrice
        total
        product {
          code
          name
          manufacturer {
            name
            address
          }
        }
      }
      totalPurchases
      totalPayment
      customer {
        name
        address
      }
      distributor {
        name
        address
      }
    }
  }
  `

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apollo: Apollo) { }

  getAllProducts() {
    return this.apollo.watchQuery<any>(
      {
        query: GQL_GET_ALL_PRODUCTS
      }
    ).valueChanges
  }

  getInvoicesByProductCode(productCode: string) {
    return this.apollo.watchQuery<any>(
      {
        query: GQL_GET_INVOICES_BY_PRODUCT,
        variables: {
          productCode
        }
      }
    ).valueChanges
  }

}
