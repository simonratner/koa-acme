'use strict'

module.exports = function (options) {
  options = options || {}
  options.challenge = options.challenge || {}
  return function * (next) {
    // Respond to acme http-01 challenge requests.
    let match = this.path.match(/^\/\.well-known\/acme-challenge\/(.+)$/)
    if (match) {
      let response = options.challenge[match[1]]
      if (response) {
        this.status = 200
        this.body = response
      }
    } else if (options.forceSecure && !this.secure) {
      this.status = 301
      this.redirect(`https://${this.host}${this.url}`)
    } else {
      yield next
    }
  }
}
