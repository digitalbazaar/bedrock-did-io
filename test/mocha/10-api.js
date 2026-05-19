/*!
 * Copyright (c) 2020-2026 Digital Bazaar, Inc.
 */
import {didIo} from '@bedrock/did-io';

describe('bedrock-did-io API', () => {
  it('should have proper exports', async () => {
    should.exist(didIo);
    didIo.get.should.be.a('function');
  });
});
