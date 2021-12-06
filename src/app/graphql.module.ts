import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, gql} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';

import backend from '../backend.json';

console.log('url api', backend.api)



const GQL_GET_ALL_DISTRIBUTORS = gql`
  {
    distributors{
      name
      address
    }
  }`;

const GQL_GET_ALL_CUSTOMERS = gql`
  {
    customers{
      name
      address
    }
  }`;

const GQL_GET_ALL_INVOICES = gql`
  {
    invoices{
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
  }`;



export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create( {uri: backend.api} ),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
