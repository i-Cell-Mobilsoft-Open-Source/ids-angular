import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import angular from "angular-eslint";
import stylisticJs from "@stylistic/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import rxjs from "eslint-plugin-rxjs";
import unusedImports from "eslint-plugin-unused-imports";
import { fixupPluginRules } from "@eslint/compat";

export default tseslint.config(
  {
    name: "ts",
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
      importPlugin.flatConfigs?.recommended,
      importPlugin.flatConfigs?.typescript,
    ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
        sourceType: "module",
      },
    },
    plugins: {
      "@stylistic/js": stylisticJs,
      "unused-imports": unusedImports,
      rxjs: fixupPluginRules(rxjs),
    },
    settings: {
      "import/ignore": ["node_modules"],
    },
    rules: {
      "no-self-compare": "error",
      "no-template-curly-in-string": "error",
      "no-unreachable": "warn",
      "no-unused-private-class-members": "warn",
      "arrow-body-style": ["warn", "as-needed"],
      "block-scoped-var": "error",
      curly: "error",
      "default-case-last": "error",
      eqeqeq: ["error", "smart"],
      "func-name-matching": ["error", "always"],
      "id-length": ["error", { min: 2, max: 50, exceptions: ["x", "a", "b", "i"] }],
      "max-lines-per-function": [
        "error",
        {
          max: 100,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      "no-bitwise": "error",
      "no-console": [
        "error",
        {
          allow: [
            "clear",
            "group",
            "groupCollapsed",
            "groupEnd",
            "info",
            "table",
            "time",
            "timeEnd",
            "timeLog",
            "timeStamp",
            "trace",
            "warn",
          ],
        },
      ],
      "no-extend-native": "error",
      "no-extra-label": "error",
      "no-magic-numbers": [
        "error",
        {
          ignore: [0, 1, 2, -1],
        },
      ],
      "no-multi-assign": "error",
      "no-multi-str": "error",
      "no-nested-ternary": "error",
      "no-new-wrappers": "error",
      "no-param-reassign": [
        "error",
        {
          props: false,
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["src/*"],
              message: "Use @ prefixed or relative path imports instead",
            },
          ],
        },
      ],
      "no-sequences": "error",
      "no-unneeded-ternary": "error",
      "no-useless-concat": "error",
      "prefer-arrow-callback": "error",
      "prefer-exponentiation-operator": "error",
      "prefer-object-spread": "error",
      "prefer-template": "warn",
      radix: "warn",
      "require-await": "error",
      yoda: "error",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          accessibility: "explicit",
          overrides: {
            accessors: "off",
            constructors: "no-public",
          },
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE"],
          modifiers: ["const"],
        },
        {
          selector: ["classProperty", "classMethod", "parameterProperty", "accessor"],
          modifiers: ["private"],
          format: ["camelCase"],
          leadingUnderscore: "require",
        },
        {
          selector: ["classProperty", "classMethod", "parameterProperty", "accessor"],
          modifiers: ["protected"],
          format: ["camelCase"],
          leadingUnderscore: "require",
        },
        {
          selector: ["classProperty"],
          modifiers: ["public"],
          format: ["camelCase", "PascalCase"],
          leadingUnderscore: "forbid",
        },
        {
          selector: ["classMethod", "parameterProperty", "accessor"],
          modifiers: ["public"],
          format: ["camelCase"],
          leadingUnderscore: "forbid",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      "@typescript-eslint/no-unused-expressions": ["error", { allowTernary: true }],
      "@typescript-eslint/prefer-reduce-type-parameter": "error",
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/require-array-sort-compare": "error",
      "@typescript-eslint/return-await": "error",
      "@angular-eslint/directive-selector": "off",
      "@angular-eslint/component-selector": "off",
      "@angular-eslint/sort-lifecycle-methods": ["warn"],
      "@angular-eslint/no-lifecycle-call": ["error"],
      "@angular-eslint/relative-url-prefix": ["error"],
      "@angular-eslint/no-host-metadata-property": "off",
      "@angular-eslint/no-input-rename": "off",
      "@stylistic/js/array-bracket-spacing": ["error", "never"],
      "@stylistic/js/array-bracket-newline": [
        "error",
        {
          multiline: true,
          minItems: 2,
        },
      ],
      "@stylistic/js/array-element-newline": [
        "error",
        {
          multiline: true,
          minItems: 2,
        },
      ],
      "@stylistic/js/arrow-parens": ["error", "always"],
      "@stylistic/js/arrow-spacing": "error",
      "@stylistic/js/block-spacing": "error",
      "@stylistic/js/brace-style": ["error", "1tbs", { allowSingleLine: false }],
      "@stylistic/js/comma-dangle": ["error", "always-multiline"],
      "@stylistic/js/comma-spacing": [
        "error",
        {
          before: false,
          after: true,
        },
      ],
      "@stylistic/js/comma-style": ["error", "last"],
      "@stylistic/js/computed-property-spacing": ["error", "never"],
      "@stylistic/js/dot-location": ["error", "property"],
      "@stylistic/js/eol-last": ["error", "always"],
      "@stylistic/js/function-call-spacing": ["error", "never"],
      "@stylistic/js/indent": [
        "error",
        2,
        {
          SwitchCase: 1,
        },
      ],
      "@stylistic/js/key-spacing": [
        "error",
        {
          beforeColon: false,
        },
      ],
      "@stylistic/js/keyword-spacing": [
        "error",
        {
          before: true,
        },
      ],
      "@stylistic/js/lines-between-class-members": [
        "error",
        "always",
        {
          exceptAfterSingleLine: true,
        },
      ],
      "@stylistic/js/max-len": [
        "error",
        {
          code: 140,
          ignorePattern: "^import .*",
          ignoreComments: true,
        },
      ],
      "@stylistic/js/new-parens": "error",
      "@stylistic/js/no-confusing-arrow": "error",
      "@stylistic/js/no-multiple-empty-lines": [
        "error",
        {
          max: 1,
          maxEOF: 1,
          maxBOF: 0,
        },
      ],
      "@stylistic/js/no-floating-decimal": "error",
      "@stylistic/js/object-curly-spacing": ["error", "always"],
      "@stylistic/js/quotes": ["error", "single"],
      "@stylistic/js/rest-spread-spacing": ["error", "never"],
      "@stylistic/js/semi": ["warn", "always"],
      "@stylistic/js/semi-spacing": "error",
      "@stylistic/js/space-before-blocks": "error",
      "@stylistic/js/space-before-function-paren": ["error", "never"],
      "@stylistic/js/space-in-parens": ["error", "never"],
      "@stylistic/js/switch-colon-spacing": "error",
      "@stylistic/js/template-curly-spacing": "error",
      "@stylistic/js/type-generic-spacing": ["error"],
      "@stylistic/js/type-named-tuple-spacing": ["error"],
      ...rxjs.configs["recommended"].rules,
      "rxjs/no-implicit-any-catch": "off",
      "rxjs/no-topromise": "error",
      "rxjs/no-unsafe-catch": "error",
      "import/no-unresolved": "off",
      "import/order": [
        "error",
        {
          groups: ["index", "sibling", "parent", "internal", "external", "builtin", "object", "type"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "unused-imports/no-unused-imports": "error",
    },
  },
  {
    name: "types",
    files: ["**/types/*.ts"],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["PascalCase"],
          modifiers: ["const"],
        },
      ],
    },
  },
  {
    name: "spec",
    files: ["**/*.spec.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/dot-notation": "off",
    },
  },
  {
    name: "html",
    files: ["**/*.html"],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
        sourceType: "module",
      },
    },
    rules: {
      "@angular-eslint/template/no-duplicate-attributes": [
        "error",
        {
          allowStylePrecedenceDuplicates: true,
        },
      ],
      "@angular-eslint/template/button-has-type": "error",
      "@angular-eslint/template/no-any": "error",
      "@angular-eslint/template/no-interpolation-in-attributes": "error",
      "@angular-eslint/template/prefer-control-flow": "error",
      "@angular-eslint/template/attributes-order": "error",
      "@angular-eslint/template/prefer-self-closing-tags": "error",
      "@angular-eslint/template/click-events-have-key-events": "off",
      "@angular-eslint/template/interactive-supports-focus": "off",
    },
  },
  {
    ignores: [
      "dist/",
      "coverage/",
      "src/main.ts",
      "api/modules/**",
      "tailwind.config.js",
      "setup-jest.ts",
      "**/index.ts",
      "**/public-api.ts",
      "cypress/",
      "cypress.config.ts",
      "projects/widgets/.storybook",
    ],
  },
);
