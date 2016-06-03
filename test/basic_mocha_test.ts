/// <reference path="../typings/main/ambient/mocha/index.d.ts"/>
/// <reference path="../typings/main/ambient/chai/index.d.ts"/>
import * as Chai from 'chai'
const expect = Chai.expect

describe('My context', () => {
  describe('Some event', () => {
    it('should result in something', () => {
      expect(4+2).to.eq(6)
    })
  })
})