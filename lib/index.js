/*!
 * Copyright (c) 2020-2022 Digital Bazaar, Inc. All rights reserved.
 */
import * as bedrock from '@bedrock/core';
import {createRequire} from 'node:module';
import * as didVeresOne from 'did-veres-one';
const require = createRequire(import.meta.url);
const {CachedResolver} = require('@digitalbazaar/did-io');
const didMethodKey = require('@digitalbazaar/did-method-key');
const {LruCache} = require('@digitalbazaar/lru-memoize');

import './config.js';

// create default cached resolver; to be updated w/bedrock cache config on
// bedrock init
export const didIo = new CachedResolver();

bedrock.events.on('bedrock.init', () => {
  const {config: {'did-io': cfg}} = bedrock;
  // update cache w/ bedrock configured value
  didIo._cache = new LruCache(cfg.cache);
});

bedrock.events.on('bedrock.start', () => {
  const {config: {'did-io': cfg}} = bedrock;

  // support did:key
  didIo.use(didMethodKey.driver(cfg.methods.key));
  // support did:v1
  const v1Driver = didVeresOne.driver(cfg.methods.v1);
  if(cfg.methodOverrides.v1.disableFetch) {
    v1Driver.client.get = async function() {
      const error = new Error('Veres one ledger check skipped.');
      error.name = 'NotFoundError';
      throw error;
    };
  }
  didIo.use(v1Driver);
});
