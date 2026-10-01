# IDS Angular UI Kit

IDS Angular is an open source component collection for Angular applications implementing the i-Cell Design System. The styling is token based (CSS variables) and is separated from this package (see [@i-cell/ids-styles](https://github.com/i-Cell-Mobilsoft-Open-Source/ids-styles)).


## Local design tokens

The demo and Storybook load CSS tokens from `projects/demo/src/assets/ids_css/tokens.css`.
The generated `base`, `smc`, and `component` files were imported from
`icell-internal-demo-frontend` commit `0054017`.
The demo uses this single token set; the light/dark control still switches theme classes.
Component styling continues to come from the current `@i-cell/ids-styles` dependency.

`compatibility.css` contains the token names missing from that export, copied from
`@i-cell/ids-tokens` 0.0.46 so newer components retain their existing defaults.
It is imported first, allowing the generated files to override these defaults.
When updating the generated CSS, preserve this file and its import in `tokens.css`.
Run `pnpm parse-tokens` after updating `smc/smc-reference.css` to regenerate Tailwind mappings,
Run `node scripts/check-local-tokens.cjs` to check local imports and token references,
then `pnpm ng build demo --configuration=development` to check the demo.

The `@i-cell/ids-tokens` dependency is retained for existing Cypress reference test data;
application CSS and the Tailwind token parser do not load tokens from that package.
