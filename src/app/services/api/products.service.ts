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

}
