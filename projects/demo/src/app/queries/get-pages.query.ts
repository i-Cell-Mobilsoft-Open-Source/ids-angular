import { gql } from '@apollo/client/core';

export const GET_PAGES = gql`
{
  entries(collection: "pages") {
    data {
     title

    }}
  }
`;
