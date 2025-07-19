import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      base: './',
      server: {
        open: true,
        port: 7000,
        watch: {
          usePolling: true,
          interval: 1000,
        }
      },
    };
  } else {
    return {
      base: './',
      build: {
        outDir: 'dist',
        sourcemap: true,
        minify: true,
        emptyOutDir: true,
      },
    };
  }
});