// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//     plugins: [
//       // [
//       //   "module:react-native-dotenv",
//       //   {
//       //     moduleName: "@env",
//       //     path: ".env",
//       //     allowUndefined: false,
//       //   },
//       // ],
//       "react-native-reanimated/plugin", // this must be last
//     ],
//   };
// };


// babel.config.js
module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module:resolver",
      {
        alias: {
          "@env": "./.env",
        },
      },
    ],
    ["module:react-native-dotenv"],
      "react-native-reanimated/plugin", // this must be last

  ],
};