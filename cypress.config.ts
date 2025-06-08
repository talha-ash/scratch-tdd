import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  // blockHosts: ['!*localhost*'],
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on) {
      const options = {
        ...browserify.defaultOptions,
        typescript: require.resolve("typescript"),
      };

      on("file:preprocessor", cucumber.default(options));
    },
    specPattern: "cypress/tests/**/*.{feature,features}",
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: "src/**/*.int.test.tsx",
    viewportWidth: 680,
    viewportHeight: 768,
  },
});
