/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, transformWithEsbuild } from 'vite';
import pkg from '@douyinfe/vite-plugin-semi';
import path from 'path';
import { codeInspectorPlugin } from 'code-inspector-plugin';
const { vitePluginSemi } = pkg;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const fileEnv = loadEnv(mode, process.cwd(), 'VITE_');
  const viteProcess = process.env.VITE_REACT_APP_SERVER_URL;

  /** Same-origin SPA (scheme A): empty when Docker unset + no .env file value. */
  const bakedViteOrigin =
    typeof viteProcess !== 'undefined'
      ? String(viteProcess).trim().replace(/\/+$/, '')
      : (typeof fileEnv.VITE_REACT_APP_SERVER_URL === 'string'
          ? fileEnv.VITE_REACT_APP_SERVER_URL.trim().replace(/\/+$/, '')
          : '');

  const proxyTarget =
    (typeof viteProcess !== 'undefined' && String(viteProcess).trim()) ||
    (typeof fileEnv.VITE_REACT_APP_SERVER_URL === 'string'
      ? fileEnv.VITE_REACT_APP_SERVER_URL.trim()
      : '') ||
    'http://localhost:3000';

  const apiProxy = ['/api', '/mj', '/pg', '/v1'].reduce((acc, key) => {
    acc[key] = { target: proxyTarget, changeOrigin: true };
    return acc;
  }, /** @type {Record<string, import('vite').ProxyOptions>} */ ({}));

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
    codeInspectorPlugin({
      bundler: 'vite',
    }),
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!/src\/.*\.js$/.test(id)) {
          return null;
        }

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        });
      },
    },
    react(),
      vitePluginSemi({
        cssLayer: true,
      }),
    ],
    define: {
      'import.meta.env.VITE_REACT_APP_SERVER_URL':
        JSON.stringify(bakedViteOrigin),
    },
    optimizeDeps: {
      force: true,
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
          '.json': 'json',
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-core': ['react', 'react-dom', 'react-router-dom'],
            'semi-ui': ['@douyinfe/semi-icons', '@douyinfe/semi-ui'],
            tools: ['axios', 'history', 'marked'],
            'react-components': [
              'react-dropzone',
              'react-fireworks',
              'react-telegram-login',
              'react-toastify',
              'react-turnstile',
            ],
            i18n: [
              'i18next',
              'react-i18next',
              'i18next-browser-languagedetector',
            ],
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      proxy: apiProxy,
    },
  };
});
