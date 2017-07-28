# koa-acme

[![travis](http://img.shields.io/travis/simonratner/koa-acme/v1.svg?style=flat-square)](https://travis-ci.org/simonratner/koa-acme/branches) &nbsp;
[![npm](http://img.shields.io/npm/v/koa-acme.svg?style=flat-square)](https://www.npmjs.org/package/koa-acme)

[Koa](http://koajs.com) legacy (v1.x) middleware for handling
[ACME](https://github.com/ietf-wg-acme/acme) challenge requests.

# Migrating to koa v2.x

See [koa-acme/master](https://github.com/simonratner/koa-acme/tree/master) for koa v2.x and async/await support.
See [koa migration guide](https://github.com/koajs/koa/blob/7294eae/docs/migration.md) for more information.

# Install

```
npm install koa-acme@1
```

# Use

```javascript
let acme = require('koa-acme')
let app = require('koa')()

app.use(acme({
    challenge: {
        'test': 'test.1'
    },
    forceSecure: true
}))
```

Configure your challenge responses any way you see fit (config file,
environment variable, external vault, etc.)

# License

[MIT](LICENSE)
