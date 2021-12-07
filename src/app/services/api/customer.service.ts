import { Injectable } from '@angular/core';
import {gql} from '@apollo/client/core';
import {Apollo} from 'apollo-angular';

const GQL_GET_ALL_CUSTOMERS = gql`
  query GetCustomers {
    customers{
      name
      address
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private apollo: Apollo) { }

  getAllCustomers() {
    return this.apollo.watchQuery<any>(
      {
        query: GQL_GET_ALL_CUSTOMERS
      }
    ).valueChanges
  }

}
