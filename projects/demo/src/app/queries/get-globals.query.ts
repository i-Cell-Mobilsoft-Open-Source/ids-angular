import { gql } from 'apollo-angular';

export const GET_GLOBALS = gql`
{
  globalSet(handle: "footer") {
    title
    ... on GlobalSet_Footer {
      footer_copyright
      footer_certs {
        url
        ... on Asset_Assets {
          url
        }
      }
      footer_logo {
        ... on Asset_Assets {
          url
        }
        url
      }
      handle
      site {
        url
        short_locale
        name
        locale
        handle
      }
      title
      footer_contact_group {
        address_icon
        company_address
        company_email
        company_name
        company_phone_number
        email_icon
        phone_icon
      }
    }
    handle
  }
}
`;
