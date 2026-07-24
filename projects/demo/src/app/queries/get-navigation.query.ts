import { gql } from '@apollo/client/core';

export const GET_NAVIGATION = gql`
  query GetNavigation($site: String!) {
    navs {
      handle
      max_depth
      title
      tree(site: $site) {
        depth
        page {
          title
          ... on EntryInterface {
            id
            slug
          }
          ... on NavEntryPage_SideNav_Pages_Page {
            generated
          }
        }
        children {
          depth
          page {
            title
            ... on EntryInterface {
              id
              slug
            }
            ... on NavEntryPage_SideNav_Pages_Page {
              generated
            }
          }
          children {
            depth
            page {
              __typename
              title
              ... on EntryInterface {
                id
                slug
              }
              ... on NavEntryPage_SideNav_Pages_Page {
                generated
              }
            }
            children {
              depth
              page {
                title
              }
            }
          }
        }
      }
    }
  }
`;
