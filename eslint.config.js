import { defineConfig } from '@vue/eslint-config-prettier'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/node_modules/**'],
  },

  {
    name: 'app/language-options',
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node, // Tambahkan node globals untuk process dll
        console: 'readonly',
        process: 'readonly',
      },
    },
  },

  js.configs.recommended,

  ...pluginVue.configs['flat/essential'],

  {
    name: 'app/vue-rules',
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser', // jika menggunakan TypeScript
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // Aturan Vue yang lebih fleksibel
      'vue/multi-word-component-names': 'off', // Matikan rule nama komponen multi-word
      'vue/no-unused-vars': 'warn', // Ubah ke warning
    },
  },

  {
    name: 'app/javascript-rules',
    files: ['**/*.{js,mjs,jsx}'],
    rules: {
      // Aturan JavaScript yang lebih fleksibel
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-undef': 'error',
      'no-prototype-builtins': 'warn',
    },
  },

  skipFormatting,
]
