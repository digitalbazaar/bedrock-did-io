/*
 * Copyright (c) 2020-2021 Digital Bazaar, Inc. All rights reserved.
 */
const {didIo} = require('bedrock-did-io');

describe('bedrock-did-io API', () => {
  it('should have proper exports', async () => {
    should.exist(didIo);
    didIo.get.should.be.a('function');
  });
});
