function getConfig(context, property, defaultValue) {
  var config = context.config
    ? /* 3.x */ context.config
    : /* 2.x */ context.book.config;
  return config.get(property, defaultValue);
}

function getAssets() {
  return {
    assets: './book',
    js: getConfig(this, 'pluginsConfig.insert-js.js', []),
  };
}

module.exports = {
  website: getAssets,
};
