# IDS Angular UI Kit

IDS Angular is an open source component collection for Angular applications implementing the i-Cell Design System. The styling is token based (CSS variables) and is separated from this package (see [@i-cell/ids-styles](https://github.com/i-Cell-Mobilsoft-Open-Source/ids-styles)).


## Local design tokens

The demo loads local CSS tokens using the Core/DÁP control:

- Core (default): `projects/demo/src/assets/ids_css/tokens.css`.
- DÁP: `projects/demo/src/assets/ids_css_dap/tokens.css`.

The switch loads the selected stylesheet before removing the previous one, as on `main`.
Storybook and the Tailwind token parser use the default `ids_css` folder.
The default `ids_css` folder is a complete copy of `projects/demo/src/assets/ids_css`
from this repository's `IDS_CSS` branch.
The token store exports to the same path, so the source and destination paths match.
The DÁP CSS files are the previous contents of `projects/demo/src/assets/ids_css`
from this repository's `main` branch.
The light/dark control switches theme classes independently of the CSS source.
The theme classes also set `color-scheme` for the DÁP export's `light-dark()` colors.
Component styling continues to come from the current `@i-cell/ids-styles` dependency.

Refreshing the default folder replaces its entire contents with the selected export,
including removal of files absent from the source. There is no separate
`compatibility.css` layer.

The `@i-cell/ids-tokens` dependency is retained for existing Cypress reference test data;
application CSS and the Tailwind token parser do not load tokens from that package.
