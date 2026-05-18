/*!
 * Copyright (c) 2024 Digital Bazaar, Inc. All rights reserved.
 */
import {_coerceCacheConfig} from '@bedrock/did-io';

describe('cache config coercions', () => {
  it('should coerce top-level maxAge to cache.ttl', () => {
    const cfg = {maxAge: 30000, cache: {max: 1000, ttl: 300000}};
    _coerceCacheConfig(cfg);
    cfg.cache.ttl.should.equal(30000);
    should.not.exist(cfg.maxAge);
  });

  it('should coerce top-level maxSize (no sizeCalculation) to cache.max', () => {
    const cfg = {maxSize: 500, cache: {max: 1000, ttl: 300000}};
    _coerceCacheConfig(cfg);
    cfg.cache.max.should.equal(500);
    should.not.exist(cfg.maxSize);
  });

  it('should NOT coerce maxSize when sizeCalculation is set', () => {
    const sizeCalculation = () => 1;
    const cfg = {
      maxSize: 500,
      sizeCalculation,
      cache: {max: 1000, ttl: 300000}
    };
    _coerceCacheConfig(cfg);
    cfg.cache.max.should.equal(1000);
    cfg.maxSize.should.equal(500);
  });

  it('should coerce both maxAge and maxSize together', () => {
    const cfg = {maxAge: 60000, maxSize: 200, cache: {max: 1000, ttl: 300000}};
    _coerceCacheConfig(cfg);
    cfg.cache.ttl.should.equal(60000);
    cfg.cache.max.should.equal(200);
    should.not.exist(cfg.maxAge);
    should.not.exist(cfg.maxSize);
  });

  it('should be a no-op when neither maxAge nor maxSize are set', () => {
    const cfg = {cache: {max: 1000, ttl: 300000}};
    _coerceCacheConfig(cfg);
    cfg.cache.max.should.equal(1000);
    cfg.cache.ttl.should.equal(300000);
  });
});
