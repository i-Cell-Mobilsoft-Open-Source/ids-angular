import { DocumentNode, gql } from '@apollo/client/core';

export const GET_PAGES_LIST = (typeName: string): DocumentNode => gql`
  query GetEntryBySlug($collection: String!, $slug: String!, $site: String!) {
    entry(collection: $collection, slug: $slug, site: $site) {
      title
      url
      ... on Entry_Pages_Page {
        id
        title
        slug
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
                ... on ${typeName} {
                  slug
                  id
                  hero_description
                  hero_image_dark {
                    url
                  }
                  hero_image_light {
                    url
                  }
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
