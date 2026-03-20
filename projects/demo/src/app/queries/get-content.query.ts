import { gql } from 'apollo-angular';

export const GET_CONTENT = gql`
  query GetArticle($slug: String!) {
    entry(collection: "news_and_releases", slug: $slug) {
      id
      title
      slug
      ... on Entry_NewsAndReleases_NewsAndRelease {
        hero_description
        date
        author {
          avatar {
            url
          }
          name
          id
        }
        hero_image_dark {
          url
        }
        hero_image_light {
          url
        }
        tags {
          title
          id
        }
      }
    }
  }
`;
