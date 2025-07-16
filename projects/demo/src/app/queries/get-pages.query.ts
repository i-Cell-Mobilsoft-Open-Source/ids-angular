import { gql } from '@apollo/client/core';

export const GET_PAGES = gql`
{
  entries(collection: "pages") {
    data {
      title
      ... on Entry_Pages_Page {
        id
        slug
        hero_description
        hero_image_dark {
          url
        }
        hero_image_light {
          url
        }
        content {
          ... on Set_Content_Card {
            id
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
            content {
              content_title
              content_over_title
              content_description
            }
            group_image {
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
              filled_in_container
            }
          }
          ... on Set_Content_Heading {
            heading
          }
        }
      }
    }
  }
  }
`;
