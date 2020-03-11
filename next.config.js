const withPlugins = require("next-compose-plugins");
const sass = require("@zeit/next-sass");
const offline = require("next-offline");
//const env = process.env.SETTINGENV || "development";
const appSettings = {
  ...require("./_configs/appsettings.json"),
  //...require(`./appsettings.${env}.json`)
};
const nextConfig = {
  excludeFile: str => /\*.{spec,test}.js/.test(str),
  publicRuntimeConfig: appSettings,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser";
    }

    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000
        }
      }
    });
    return config;
  }
};

const sourceMaps = require("@zeit/next-source-maps")();
module.exports = withPlugins(
  [
    sass,
    sourceMaps,
    [
      offline,
      {
        workboxOpts: {
          swDest: "static/service-worker.js"
        },
        experimental: {
          async rewrites() {
            return [
              {
                source: "/service-worker.js",
                destination: "/_next/static/service-worker.js"
              }
            ];
          }
        }
      }
    ]
  ],
  nextConfig
);
