import { gql } from '@apollo/client/core';

export const GET_NAVIGATION = gql`
{
  navs {
    max_depth
    title
    tree {
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
