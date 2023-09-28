/* eslint-disable no-param-reassign */
const path = require("path");
const { getPaths, edit } = require("@rescripts/utilities");

module.exports = (config) => {
  config.resolve.alias["components"] = path.join(__dirname, "./src/components");
  config.resolve.alias["hooks"] = path.join(__dirname, "./src/hooks");
  config.resolve.alias["layouts"] = path.join(__dirname, "./src/layouts");
  config.resolve.alias["providers"] = path.join(__dirname, "./src/providers");
  config.resolve.alias["utils"] = path.join(__dirname, "./src/utils");

  const styleLoaders = getPaths(
    // Styleloaders are in config.module.rules inside an object only containing the "oneOf" prop
    (inQuestion) => inQuestion && !!inQuestion.oneOf,
    config,
  );

  edit(
    (section) => {
      const loaders = section.oneOf;
      // New style loaders should be added near the end of loaders, but before file-loader
      const fileLoaderIndex = loaders.findIndex(
        ({ loader }) => loader && loader.includes("file-loader"),
      );
      const lessLoader = {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                  "primary-color": "#C52790",
                  "secondary-color": "#13192D",
                  "link-color": "#b138b5",
                  "processing-color": "##b138b5",
                  "border-radius-base": "5px",
                  "font-family": "Poppins",
                },
              },
            },
          },
        ],
      };
      loaders.splice(fileLoaderIndex, 0, lessLoader);
      return section;
    },
    styleLoaders,
    config,
  );

  return config;
};
