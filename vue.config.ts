import { defineConfig } from '@vue/cli-service';

const publicPath = process.env.NODE_ENV === 'production' ? '/portfolio/' : '/';

export default defineConfig({
  publicPath: publicPath,
});