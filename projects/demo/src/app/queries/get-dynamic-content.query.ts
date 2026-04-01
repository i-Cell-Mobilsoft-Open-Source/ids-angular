import { gql } from 'apollo-angular';
import { DocumentNode } from 'graphql';

export const GET_DYNAMIC_CONTENT = (collection: string, typeName: string): DocumentNode => gql`

query GetDynamicDetail($slug: String!) {
    entry(collection: "${collection}", slug: $slug) {
      id
      title
      slug

        ... on ${typeName} {
          hero_description
        hero_image_light {
          url
        }
        hero_image_dark {
          url
        }
        date
        author {
          avatar {
            url
          }
          name
          id
        }
        tags {
          id
          title
        }
        content {
            ... on Set_Content_Card {
              id
              content {
                content_over_title
                content_title
                content_description
              }
              is_button
              button {
                button {
                  button_url
                  button_label
                }
              }
              card_properties {
                appearance {
                  value
                }
                card_bg_transparent
                card_orientation {
                  value
                }
                card_variant {
                  value
                }
              }
              is_image
              group_image {
                filled_in_container
                img_caption
                img_dark_mode {
                  url
                }
                img_light_mode {
                  url
                }
                img_aspect_ratio {
                  value
                }
                img_bg_color {
                  value
                }
                bg_transparent
                state {
                  value
                }
              }
            }
            ... on Set_Content_Heading {
              heading
            }
          }
        }
      }
  }
`;
