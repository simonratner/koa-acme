# koa-acme

[![travis](http://img.shields.io/travis/simonratner/koa-acme/master.svg?style=flat-square)](https://travis-ci.org/simonratner/koa-acme) &nbsp;
[![npm](http://img.shields.io/npm/v/koa-acme.svg?style=flat-square)](https://www.npmjs.org/package/koa-acme)

[Koa](http://koajs.in) middleware for handling [ACME](https://github.com/ietf-wg-acme/acme) challenge requests.

# Install

```
npm install koa-acme
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

# Legacy koa v1.x support

See [koa-master/v1](https://github.com/simonratner/koa-acme/tree/v1) for koa v1.x middleware.
# License

[MIT](LICENSE)
