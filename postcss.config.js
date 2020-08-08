/* see https://postcss.parts */
module.exports = {
  plugins: [
    // flexbox is not supported in IE(9) and only partly in IE (10,11); hopefully these fixes help tho.
    require('postcss-flexbugs-fixes'),
    // Warn if we're using CSS that won't be supported in our target browsers.
    // Note: We're not really targetting IE < 11 but it's good to know whether the ancient IEs will work.
    require('doiuse')({
      browsers:['ie >= 9', '> 1%'],
      ignore: ['rem', 'border-radius', 'flexbox'], 
    }),
    // Add browser prefixes
    require('autoprefixer'),
    // Remove any CSS that we're not using in our expected decoration
    require('uncss').postcssPlugin({
      html: 'src/instapage-decoration.html'
    }),
    // Cut whitespace / minify
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
