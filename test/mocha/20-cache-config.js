/*!
 * Copyright (c) 2024 Digital Bazaar, Inc. All rights reserved.
 */
import {_coerceCacheConfig} from '@bedrock/did-io';

describe('cache config coercions', () => {
  it('should coerce maxAge to ttl', () => {
    const result = _coerceCacheConfig({max: 1000, maxAge: 30000});
    result.ttl.should.equal(30000);
    should.not.exist(result.maxAge);
  });

  it('should coerce maxSize without sizeCalculation to max', () => {
    const result = _coerceCacheConfig({max: 1000, ttl: 300000, maxSize: 500});
    result.max.should.equal(500);
    should.not.exist(result.maxSize);
  });

  it('should NOT coerce maxSize when sizeCalculation is set', () => {
    const sizeCalculation = () => 1;
    const result = _coerceCacheConfig(
      {max: 1000, ttl: 300000, maxSize: 500, sizeCalculation});
    result.max.should.equal(1000);
    result.maxSize.should.equal(500);
  });

  it('should coerce both maxAge and maxSize together', () => {
    const result = _coerceCacheConfig(
      {max: 1000, ttl: 300000, maxAge: 60000, maxSize: 200});
    result.ttl.should.equal(60000);
    result.max.should.equal(200);
    should.not.exist(result.maxAge);
    should.not.exist(result.maxSize);
  });

  it('should be a no-op when neither maxAge nor maxSize are set', () => {
    const result = _coerceCacheConfig({max: 1000, ttl: 300000});
    result.max.should.equal(1000);
    result.ttl.should.equal(300000);
  });

  it('should not mutate the input', () => {
    const input = {max: 1000, maxAge: 30000};
    _coerceCacheConfig(input);
    input.maxAge.should.equal(30000);
    should.not.exist(input.ttl);
  });
});
