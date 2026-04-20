import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    ignores: ['dist/**', 'dist_electron/**', 'node_modules/**', 'BUILDS/**'],
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        global: 'readonly',
        Buffer: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        MutationObserver: 'readonly',
        queueMicrotask: 'readonly',
        ShadowRoot: 'readonly',
        Element: 'readonly',
        CustomEvent: 'readonly',
        requestAnimationFrame: 'readonly',
        getComputedStyle: 'readonly',
        localStorage: 'readonly',
        Audio: 'readonly',
        btoa: 'readonly',
        atob: 'readonly',
        error: 'readonly',
        // Alpine.js
        Alpine: 'readonly',
      },
    },
    rules: {
      // Add custom rules if needed
    },
  },
];