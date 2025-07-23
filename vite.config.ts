import { defineConfig } from 'vite';
import nestingCSS from 'postcss-nesting';
import checker from 'vite-plugin-checker';

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
    },
  };
});
