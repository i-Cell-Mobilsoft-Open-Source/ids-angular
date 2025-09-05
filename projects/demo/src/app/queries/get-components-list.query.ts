import { gql } from '@apollo/client/core';

export const GET_COMPONENTS_LIST = gql`
{
  entry(collection: "pages", slug: "components") {
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
      navs_field {
        title
        tree {
          children {
            children {
              page {
                title
                ... on NavEntryPage_SideNav_Components_Component {
                  id
                  comp_description
                  comp_img_dark_mode {
                    url
                  }
                  comp_img_light_mode {
                    url
                  }
                  slug
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
