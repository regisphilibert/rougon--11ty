var fs = require('fs')
module.exports =  function(eleventyConfig) {
  return {
    slugify: function(text) {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    },
    sortByName: function(values) {
      return values.sort((a, b) => {
        const nameA = a.data.main_name.toUpperCase();
        const nameB = b.data.main_name.toUpperCase();
        if(nameA < nameB){
          return -1
        }
        if(nameA > nameB){
          return 1
        }
        return 0
      })
    },
    header: {
      url: function(inputPath) {
        const files = fs.readdirSync(inputPath.replace('/index.md', ''))
        const headers = files.filter(name => name.includes('header'))
        if(headers.length){
          return headers[0]
        }
        return false;
      },
      copyright: function(resources) {
        if(resources.length) {
          if(resources[0].params.copy !== ""){
            return resources[0].params.copy
          }
        }
        return false;
      } 
    }
    
  }
}
