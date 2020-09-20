# kennea
An art portfolio website utilising express.js, mongodb and vue.js

To setup pre-push testing, run the following in the root project directory:
```bash
ln -s "$(pwd)/scripts/tests.sh" .git/hooks/pre-push
```

## Setup / Build

```bash
# Install dependencies
$ npm install

# Run express.js server with nodemon
$ npm run exp-dev

# Run express.js server with node
$ npm run exp-start

# Serve Nuxt App with hot reload at localhost:3000
$ npm run nuxt-dev

# Build Nuxt App for production and launch server
$ npm run nuxt-build
$ npm run nuxt-start

# Generate static Nuxt App
$ npm run nuxt-gen
```