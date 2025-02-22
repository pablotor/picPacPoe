import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "airbnb",
      "airbnb-typescript",
      "next/core-web-vitals",
      "next/typescript",
      "plugin:import/recommended",
      "plugin:import/typescript",
      "plugin:tailwindcss/recommended",
    ],
    plugins: [
      "tailwindcss",
      "import"
    ],
    rules: {
      // From https://github.com/iamturns/create-exposed-app/blob/master/.eslintrc.js
      // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
      "no-prototype-builtins": "off",
      // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
      "import/prefer-default-export": "off",
      // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
      "react/destructuring-assignment": "off",
  
      "class-methods-use-this": ["error", { "exceptMethods": ["render"] }],
      "react/jsx-filename-extension": "off",
      "react/jsx-props-no-spreading": "off",
      "react/function-component-definition": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/require-default-props": "off",
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-arbitrary-value": "off",
      "tailwindcss/no-custom-classname": "warn",
      "tailwindcss/no-contradicting-classname": "error"
    },
    parserOptions: {
      project: "./tsconfig.json"
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"]
      },
      "import/resolver": {
        "typescript": {
          "alwaysTryTypes": true,
          "project": "./tsconfig.json"
        }
      }
    }
  })
];

export default eslintConfig;
