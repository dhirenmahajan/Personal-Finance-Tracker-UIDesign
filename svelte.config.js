import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-vercel';

export default {
  // SvelteKit config
  kit: {
    // Configure Vercel adapter
    adapter: adapter({
      // Options for Vercel adapter, if any
    }),
  },

  // Preprocess config
  preprocess: vitePreprocess(),
};
