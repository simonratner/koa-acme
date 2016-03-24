'use strict'

const acme = require('.')
const koa = require('koa')
const expect = require('unexpected')
const supertest = require('co-supertest')

describe('koa-acme', function () {
  beforeEach(function () {
    this.app = koa()
    this.request = supertest(this.app.callback())
  })

  it('responds to valid challenge', function * () {
    this.app.use(acme({
      challenge: {'test': 'test.1'}
    }))
    yield this.request.get('/.well-known/acme-challenge/test')
        .expect(200, 'test.1')
        .end()
  })

  it('responds to invalid challenge', function * () {
    yield this.request.get('/.well-known/acme-challenge/invalid')
        .expect(404)
        .end()
  })

  it('redirects http requests', function * () {
    this.app.use(letsencrypt({
      forceSecure: true
    }))
    let res = yield this.request.get('/test')
        .expect(301)
        .end()
    expect(res.headers.location, 'to begin with', 'https://')
  })

  it('does not redirect challenge requests', function * () {
    this.app.use(letsencrypt({
      forceSecure: true
    }))
    yield this.request.get('/.well-known/acme-challenge/invalid')
        .expect(404)
        .end()
  })
})

