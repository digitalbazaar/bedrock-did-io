/*
 * Copyright (c) 2020-2021 Digital Bazaar, Inc. All rights reserved.
 */
const {didIo} = require('bedrock-did-io');

describe('bedrock-did-io API', () => {
  it('should have proper exports', async () => {
    should.exist(didIo);
    didIo.should.be.an('object');
    didIo.should.have.keys(['methods']);
    didIo.methods.should.be.an('object');
    didIo.methods.should.have.keys(['key', 'v1']);
    didIo.methods.key.should.be.an('object');
    didIo.methods.key.method.should.equal('key');
    didIo.methods.v1.should.be.an('object');
    didIo.methods.v1.method.should.equal('v1');
    didIo.methods.v1.mode.should.equal('test');
  });
});
