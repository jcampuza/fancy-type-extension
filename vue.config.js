module.exports = {
  pages: {
    "popup/popup": {
      entry: "src/popup/popup.js",
      title: "Popup"
    }
  },
  pluginOptions: {
    browserExtension: {
      registry: undefined,
      components: {
        popup: true
      },
      api: "browser",
      usePolyfill: true,
      autoImportPolyfill: true,
      componentOptions: {
        background: {
          entry: "src/background.js"
        }
      }
    }
  }
};
