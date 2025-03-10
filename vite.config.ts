import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';

export default {
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.5%')),
      minify: false,
      drafts: {
        customMedia: true
      }
    }
  },
  build: {
    minify: false,
    polyfillModulePreload: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
}
