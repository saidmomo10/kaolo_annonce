import { defineConfig } from '@vue/cli-service';

export default defineConfig({
  outputDir: 'dist',
  pages: {
    index: {
      entry: 'src/main.ts', // Point d'entrée TypeScript
    },
  },
  configureWebpack: {
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'], // Extensions à résoudre
    },
  },
});
