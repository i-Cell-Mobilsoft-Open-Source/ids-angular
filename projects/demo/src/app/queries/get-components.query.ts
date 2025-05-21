import { gql } from '@apollo/client/core';

export const GET_COMPONENTS = gql`
{
  entries(collection: "components") {
    data {
      ... on Entry_Components_Component {
        id
        title
        slug
        comp_description
        comp_img_light_mode {
          url
        }
        comp_img_dark_mode {
          url
        }
        content {
          ... on Set_Content_Card {
            id
            content {
              content_over_title
              content_title
              content_description
            }
            button {
              button {
                button_url
                button_label
              }
            }
            card_properties {
              card_orientation {
                value
              }
              card_variant {
                value
              }
            }
            group_image {
              img_caption
              img_dark_mode {
                url
              }
              img_light_mode {
                url
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
}
`;
