/*!
 * Copyright (c) 2020-2023 Digital Bazaar, Inc. All rights reserved.
 */
import * as bedrock from '@bedrock/core';
import * as didMethodKey from '@digitalbazaar/did-method-key';
import * as didVeresOne from 'did-veres-one';
import * as EcdsaMultikey from '@digitalbazaar/ecdsa-multikey';
import {CachedResolver} from '@digitalbazaar/did-io';
import {
  Ed25519VerificationKey2020
} from '@digitalbazaar/ed25519-verification-key-2020';
import {LruCache} from '@digitalbazaar/lru-memoize';

import './config.js';

// create default cached resolver; to be updated w/bedrock cache config on
// bedrock init
export const didIo = new CachedResolver();

const SUPPORTED_KEY_TYPES = new Map([
  ['Ed25519', Ed25519VerificationKey2020],
  ['P-256', EcdsaMultikey]
]);

const SUPPORTED_BASE58_MULTIKEY_HEADERS = new Map([
  ['Ed25519', 'z6Mk'],
  ['P-256', 'zDna']
]);

bedrock.events.on('bedrock.init', () => {
  const {config: {'did-io': cfg}} = bedrock;
  // update cache w/ bedrock configured value
  didIo._cache = new LruCache(cfg.cache);
});

bedrock.events.on('bedrock.start', () => {
  const {config: {'did-io': cfg}} = bedrock;
  const didKeyDriver = didMethodKey.driver(cfg.methods.key);
  const {keyTypes} = cfg.methods.key;
  for(const keyType in keyTypes) {
    const verificationSuite = SUPPORTED_KEY_TYPES.get(keyType);
    const multibaseMultikeyHeader =
      SUPPORTED_BASE58_MULTIKEY_HEADERS.get(keyType);
    didKeyDriver.use({
      multibaseMultikeyHeader, fromMultibase: verificationSuite.from
    });
  }
  // support did:key
  didIo.use(didKeyDriver);
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
