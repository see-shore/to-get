module.exports = function (api) {
  api.cache(true);
  return {
    plugins: ['macros'],
    presets: [
      require("@babel/preset-env"),
      [require("@babel/preset-react"), {"runtime": "automatic"}]
    ]
  };
};
