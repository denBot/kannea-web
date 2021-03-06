export default {
  srcDir: "src/frontend/",
  generate: {
    dir: "src/server/dist",
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "kannea",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/static/favicon.png",
      },
      {
        rel: "stylesheet",
        href:
          "https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css",
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxtjs/fontawesome",
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/bulma"],

  fontawesome: {
    component: "Fa",
    suffix: true,
    icons: {
      solid: ["faEnvelope", "faUser"],
      brands: [
        "faFacebook",
        "faTwitter",
        "faDiscord",
        "faGooglePlus",
        "faInstagram",
        "faSnapchat",
        "faTumblr",
        "faPinterest",
      ],
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
  },
}
