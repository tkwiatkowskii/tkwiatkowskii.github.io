import { defineConfig } from 'vite';
import nestingCSS from 'postcss-nesting';

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      base: '/',
      server: {
        open: true,
        port: 8000,
        watch: {
          usePolling: true,
          interval: 500,
        }
      },
      css: {
        postcss: {
          plugins: [nestingCSS()]
        },
      }
    };

  } else {
    return {
      base: '/',
      build: {
        outDir: 'dist',
        sourcemap: true,
        minify: true,
        emptyOutDir: true,
      },
      css: {
        postcss: {
          plugins: [nestingCSS()]
        },
      }
    };
  }
});