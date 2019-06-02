
module.exports = function(eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy("dist");
  eleventyConfig.setPugOptions({
    filters: {
      'dots': function(thisArray, options) {
        return thisArray.map((item, index, list) => {
          if(index === list.length + 1){
            return item;
          } else {
            return `${item} - `
          }
        })
      }
    }
  });

  eleventyConfig.addCollection("mainCharacters", (collection) => collection.getFilteredByTag("characters").filter((char) => char.data.main))

  eleventyConfig.addCollection("novelsSorted", function(collection) {
    return collection.getFilteredByTag("novels").sort((a, b) => a.data.year - b.data.year)
  })

  return {
    templateFormats: ["md","pug", "liquid", "jpg"],
    pathPrefix: "/",
    markdownTemplateEngine: "liquid",
    dataTemplateEngine: "njk, js",
    htmlTemplateEngine: "pug",
    passthroughFileCopy: true,

    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "public"
    }
  }
}
