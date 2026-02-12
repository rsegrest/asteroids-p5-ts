import { defineConfig, globalIgnores } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["tsc-out/", "dist/"]), {
    languageOptions: {
        globals: {},
    },
}, {
    files: ["src/**/*.ts", "**/rollup.config.js"],
    extends: compat.extends("eslint:recommended", "prettier"),

    languageOptions: {
        ecmaVersion: 5,
        sourceType: "module",
    },
}, {
    files: ["src/**/*.ts"],
    extends: compat.extends("plugin:@typescript-eslint/recommended", "prettier/@typescript-eslint"),

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
    },

    rules: {
        "no-fallthrough": "off",
        "@typescript-eslint/no-explicit-any": "off",
    },
}, {
    files: ["**/rollup.config.js"],

    languageOptions: {
        globals: {
            ...globals.node,
        },

        ecmaVersion: 2019,
        sourceType: "commonjs",
    },
}, {
    files: ["**/*.js"],

    rules: {
        "lines-around-comment": ["error", {
            beforeBlockComment: true,
            beforeLineComment: true,
            allowBlockStart: true,
            allowObjectStart: true,
            allowArrayStart: true,
            allowClassStart: true,
        }],
    },
}]);