import { gql } from '@apollo/client/core';

export const GET_PAGES_LIST = gql`
query GetEntryBySlug($collection: String!, $slug: String!){
  entry(collection: $collection, slug: $slug) {
    title
    url
    ... on Entry_Pages_Page {
      id
      hero_description
      hero_image_dark {
        url
      }
      hero_image_light {
        url
      }
      collections_contents {
        title
        structure {
          handle
          tree {
            entry {
              title
              ... on Entry_NewsAndReleases_NewsAndRelease {
                slug
                id
                hero_description
                last_modified(format: "Y.m.d.")
                date(format: "Y.m.d.")
                tags {
                  ... on Term_Tags_Tag {
                    id
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
