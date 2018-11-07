'use strict'

module.exports = function (options) {
  options = options || {}
  return function (ctx, next) {
    // Respond to acme http-01 challenge requests.
    let match = ctx.path.match(/^\/\.well-known\/acme-challenge\/(.+)$/)
    if (match) {
      let response = options.challenge && options.challenge[match[1]]
      if (response) {
        ctx.status = 200
        ctx.body = response
      }
    } else if (options.forceSecure && !ctx.secure) {
      ctx.status = 301
      ctx.redirect(`https://${ctx.host}${ctx.url}`)
    } else {
      return next()
    }
  }
}
