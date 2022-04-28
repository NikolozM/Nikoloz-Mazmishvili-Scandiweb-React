import {gql} from '@apollo/client'

export const LOAD_PRODUCTS = gql `

query {
  category {
    products {
      id
      name
      inStock
      category
      gallery
      prices{
        currency{
          label
          symbol
        }
        amount
      }
    }
  },
  categories{
    name
  },
  currencies{
    label
    symbol
  }
}
`