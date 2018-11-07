'use strict'

const acme = require('..')
const koa = require('koa')
const expect = require('unexpected')
const supertest = require('supertest')

describe('acme', function () {
  beforeEach(function () {
    this.app = new koa() // eslint-disable-line new-cap
    this.request = supertest(this.app.callback())
  })

  it('responds to valid challenge', async function () {
    this.app.use(acme({
      challenge: {'test': 'test.1'}
    }))
    return this.request.get('/.well-known/acme-challenge/test').expect(200, 'test.1')
  })

  it('responds to invalid challenge', async function () {
    this.app.use(acme())
    return this.request.get('/.well-known/acme-challenge/invalid').expect(404)
  })

  it('redirects http requests', async function () {
    this.app.use(acme({
      forceSecure: true
    }))
    let res = await this.request.get('/test').expect(301)
    expect(res.headers.location, 'to begin with', 'https://')
  })

  it('does not redirect challenge requests', async function () {
    this.app.use(acme({
      forceSecure: true
    }))
    return this.request.get('/.well-known/acme-challenge/invalid').expect(404)
  })
})
