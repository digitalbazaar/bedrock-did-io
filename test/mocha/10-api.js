/*!
 * Copyright (c) 2020-2023 Digital Bazaar, Inc. All rights reserved.
 */
import {didIo} from '@bedrock/did-io';

describe('bedrock-did-io API', () => {
  it('should have proper exports', async () => {
    should.exist(didIo);
    didIo.get.should.be.a('function');
  });
});
