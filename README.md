# IDS Angular UI Kit

IDS Angular is an open source component collection for Angular applications implementing the i-Cell Design System. The styling is token based (CSS variables) and is separated from this package (see [@i-cell/ids-styles](https://github.com/i-Cell-Mobilsoft-Open-Source/ids-styles)).


## Local design tokens

The demo loads local CSS tokens using the Core/DÁP control:

- Core (default): `projects/demo/src/assets/ids_css/tokens.css`.
- DÁP: `projects/demo/src/assets/ids_css_dap/tokens.css`.

The switch loads the selected stylesheet before removing the previous one, as on `main`.
Storybook and the Tailwind token parser use the default `ids_css` folder.
The default generated `base`, `smc`, and `component` files were imported from
`icell-internal-demo-frontend` commit `0054017`.
The DÁP CSS files were copied from this repository's `main` branch
(commit `05c85743`, `projects/demo/src/assets/ids_css`).
The light/dark control switches theme classes independently of the CSS source.
The theme classes also set `color-scheme` for the DÁP export's `light-dark()` colors.
Component styling continues to come from the current `@i-cell/ids-styles` dependency.

The default folder's `compatibility.css` contains the token names missing from its export, copied from
`@i-cell/ids-tokens` 0.0.46 so newer components retain their existing defaults.
It is imported first, allowing the generated files to override these defaults.
When updating the default folder's generated CSS, preserve its `compatibility.css` file
and its import in `tokens.css`.
Run `pnpm parse-tokens` after updating `smc/smc-reference.css` to regenerate Tailwind mappings,
Run `node scripts/check-local-tokens.cjs` to check local imports and token references in both folders,
then `pnpm ng build demo --configuration=development` to check the demo.

The `@i-cell/ids-tokens` dependency is retained for existing Cypress reference test data;
application CSS and the Tailwind token parser do not load tokens from that package.
