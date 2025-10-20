
import config from '.';

export default {
  plugins: {
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    /**
     * Add CSS prefixes (vendor prefixes) such as -webkit-, -moz- 
     * to ensure compatibility with multiple browsers (for example: display: flex → -webkit-flex).
     */ 
    autoprefixer: {},
    /**
     * Fix style conflicts between TailwindCSS and UI libraries such as Element Plus (el prefix) and Ant Design Vue (ant prefix).
     */
    'postcss-antd-fixes': { prefixes: ['ant', 'el'] },
    /**
     * Allows importing CSS from other files (e.g., @import 'styles/global.css';) during the build process. Automatically resolves and merges into a single CSS file.
     */
    'postcss-import': {},
    'postcss-preset-env': {},
    tailwindcss: { config },
    // 'tailwindcss/nesting': {},
  }
}