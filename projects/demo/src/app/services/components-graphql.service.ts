// import { Injectable } from '@angular/core';
// import { Apollo, gql } from 'apollo-angular';
// import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs';

// const COMPONENTS_QUERY = gql`
//   query {
//     entry(id: "cf089216-06cf-44fc-b025-41d13bb27b77") {
//       title
//       hero_description
//       hero_image_dark { url }
//       hero_image_light { url }
//       navs_field {
//         tree {
//           children {
//             children {
//               page {
//                 title
//                 id
//                 comp_description
//                 comp_img_dark_mode { url }
//                 comp_img_light_mode { url }
//                 slug
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// @Injectable({ providedIn: 'root' })
// export class ComponentsGraphqlService {
//   constructor(private apollo: Apollo) {}

//   getComponentsData(): Observable<StatamicComponentsPage> {
//     return this.apollo.query<{ entry: StatamicComponentsPage }>({
//       query: COMPONENTS_QUERY,
//     }).pipe(
//       map(result => result.data.entry)
//     );
//   }
// }

// export interface StatamicComponentsPage {
//   title: string;
//   hero_description: string;
//   hero_image_dark: { url: string };
//   hero_image_light: { url: string };
//   navs_field: Array<{
//     tree: Array<{
//       children?: Array<{
//         children?: Array<{
//           page?: StatamicComponent;
//         }>;
//       }>;
//     }>;
//   }>;
// }

// export interface StatamicComponent {
//   title: string;
//   id: string;
//   comp_description: string | null;
//   comp_img_dark_mode: Array<{ url: string }>;
//   comp_img_light_mode: Array<{ url: string }>;
//   slug: string;
// }
