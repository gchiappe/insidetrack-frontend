import { Injectable } from '@angular/core';
import {gql} from '@apollo/client/core';
import {Apollo} from 'apollo-angular';

const GQL_GET_INVOICE = gql`
  query GetInvoice($invoiceNumber: String) {
    invoice(invoiceNumber: $invoiceNumber){
      number
      purchaseDate
      details {
        quantity
        weight
        measureUnit
        unitPrice
        product {
          code
          name
          manufacturer {
            name
            address
          }
        }
        total
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
const GQL_GET_INVOICES_BY_DISTRIBUTOR_NAME = gql`
  query GetInvoicesByDistName($distributorName: String) {
    invoicesByDistributor(distributorName: $distributorName){
      number
      purchaseDate
      details {
        quantity
        weight
        measureUnit
        unitPrice
        product {
          code
          name
          manufacturer {
            name
            address
          }
        }
        total
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
const GQL_GET_INVOICES_BY_CUSTOMER_LOCATION = gql `
  query GetInvoicesByCustomerLocation ($customerAddress: String){
    invoicesByCustomerLocation(customerAddress: $customerAddress){
      number
      purchaseDate
      details {
        quantity
        weight
        measureUnit
        unitPrice
        product {
          code
          name
          manufacturer {
            name
            address
          }
        }
        total
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
export class InvoiceService {

  constructor(private apollo: Apollo) { }

  getInvoiceByNumber(invoiceNumber: string) {
    return this.apollo.watchQuery<any>(
      {
        query: GQL_GET_INVOICE,
        variables: {
          invoiceNumber
        }
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

  getInvoicesByDistributorName(distributorName: string) {
    return this.apollo.watchQuery<any>(
      {
        query: GQL_GET_INVOICES_BY_DISTRIBUTOR_NAME,
        variables: {
          distributorName
        }
      }
    ).valueChanges
  }

  getInvoicesByCustomerLocation(customerAddress: string) {
    return this.apollo.watchQuery<any>(
      {
        query: GQL_GET_INVOICES_BY_CUSTOMER_LOCATION,
        variables: {
          customerAddress
        }
      }
    ).valueChanges
  }
}
