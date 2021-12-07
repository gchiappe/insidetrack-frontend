import { Injectable } from '@angular/core';
import {gql} from '@apollo/client/core';
import {Apollo} from 'apollo-angular';

const GQL_GET_ALL_DISTRIBUTORS = gql`
  query GetDistributors {
    distributors{
      name
      address
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  constructor(private apollo: Apollo) { }

  getAllDistributors() {
    return this.apollo.watchQuery<any>(
      {
        query: GQL_GET_ALL_DISTRIBUTORS
      }
    ).valueChanges
  }

}
