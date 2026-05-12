import { gql } from '@apollo/client/core';

export const GET_NAVIGATION = gql`

query GetNavigation($site: String!) {
  navs {
    max_depth
    title
    tree (site: $site) {
      depth
      page {
        title
        ... on EntryInterface {
          id
          slug
        }
        ... on NavEntryPage_SideNav_Pages_Page {
          slug
          generated
        }
        ... on NavEntryPage_SideNav_Components_Component {
          slug
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
            slug
          }
          ... on NavEntryPage_SideNav_Components_Component {
            slug
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
              slug
            }
            ... on NavEntryPage_SideNav_Components_Component {
              slug
            }
          }
        }
      }
    }
  }
}
`;
