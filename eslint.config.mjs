import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      globals: {
        console: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        fetch: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        React: "readonly",
        Alert: "readonly",
        btoa: "readonly"
      }
    },
    rules: {
      "no-undef": "warn",
      "no-unused-vars": ["warn", { 
        "varsIgnorePattern": "^(React|Alert|_.*)$", 
        "argsIgnorePattern": "^_", 
        "caughtErrorsIgnorePattern": "^_" 
      }],
      "no-dupe-keys": "error"
    }
  }
];
