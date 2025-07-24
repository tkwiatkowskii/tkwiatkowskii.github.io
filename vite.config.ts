import { defineConfig } from 'vite';
import nestingCSS from 'postcss-nesting';
import checker from 'vite-plugin-checker';
import * as path from 'path';

const cssConfig = {
  postcss: {
    plugins: [nestingCSS()],
  },
};

export default defineConfig(({ command }) => {
  const common = {
    base: '/',
    css: cssConfig,
    plugins: [
      checker({ typescript: true }),
    ],
  };

  if (command === 'serve') {
    return {
      ...common,
      server: {
        open: true,
        port: 8000,
        watch: {
          usePolling: true,
          interval: 500,
        },
      },
    };
  }

  return {
    ...common,
    build: {
      outDir: 'dist',
      sourcemap: true,
      minify: true,
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          en: path.resolve(__dirname, 'src/locales/index.en.html'),
          pl: path.resolve(__dirname, 'src/locales/index.pl.html'),
        },
      },
    },
  };
});
