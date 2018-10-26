const { rem, remUnit } = require("./project-config");
module.exports = ({ file, options, env }) => {
  if (rem) {
    return {
      plugins: {
        autoprefixer: { browsers: "last 2 version" },
        "postcss-px2rem": { remUnit: remUnit }
      }
    };
  }
  return {
    plugins: {
      autoprefixer: { browsers: "last 2 version" },
    }
  };
};
