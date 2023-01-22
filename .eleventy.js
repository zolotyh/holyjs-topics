const htmlmin = require("html-minifier");
const cleanCSS = require("clean-css");
const { cache } = require('eleventy-plugin-workbox');
const { compress } = require("eleventy-plugin-compress");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("cssmin", function(code) {
    return new cleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addPassthroughCopy({
    "./node_modules/alpinejs/dist/cdn.min.js": "./assets/js/alpine.js",
    "./src/assets/fonts/*": "./assets/fonts",
    "./src/assets/img/*": "./assets/img",
  });

  eleventyConfig.addPlugin(compress, { enabled: true });
  eleventyConfig.addPlugin(cache);

  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true,
      });
    }

    return content;
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
