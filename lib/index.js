/*!
 * Copyright (c) 2020-2024 Digital Bazaar, Inc. All rights reserved.
 */
import * as bedrock from '@bedrock/core';
import * as Bls12381Multikey from '@digitalbazaar/bls12-381-multikey';
import * as didMethodKey from '@digitalbazaar/did-method-key';
import * as didMethodWeb from '@digitalbazaar/did-method-web';
import * as didVeresOne from 'did-veres-one';
import * as EcdsaMultikey from '@digitalbazaar/ecdsa-multikey';
import {CachedResolver} from '@digitalbazaar/did-io';
import {
  Ed25519VerificationKey2020
} from '@digitalbazaar/ed25519-verification-key-2020';
import {httpsAgent} from '@bedrock/https-agent';
import {LruCache} from '@digitalbazaar/lru-memoize';

import './config.js';

// create default cached resolver; to be updated w/bedrock cache config on
// bedrock init
export const didIo = new CachedResolver();

const SUPPORTED_KEY_TYPES = new Map([
  ['Bls12381G2', Bls12381Multikey],
  ['Ed25519', Ed25519VerificationKey2020],
  ['P-256', EcdsaMultikey],
  ['P-384', EcdsaMultikey],
  ['P-521', EcdsaMultikey],
  ['secp256k1', EcdsaMultikey],
]);

const SUPPORTED_BASE58_MULTIKEY_HEADERS = new Map([
  ['Bls12381G2', 'zUC7'],
  ['Ed25519', 'z6Mk'],
  ['P-256', 'zDna'],
  ['P-384', 'z82L'],
  ['P-521', 'z2J9'],
  ['secp256k1', 'zQ3s'],
]);

bedrock.events.on('bedrock.init', () => {
  const {config: {'did-io': cfg}} = bedrock;
  // update cache w/ bedrock configured value
  didIo._cache = new LruCache(cfg.cache);
});

bedrock.events.on('bedrock.start', () => {
  const {config: {'did-io': cfg}} = bedrock;

  // support did:key
  const didKeyDriver = didMethodKey.driver();
  for(const keyType in cfg.methods.key.keyTypes) {
    const handler = SUPPORTED_KEY_TYPES.get(keyType);
    if(!handler) {
      throw new Error(`Unsupported did:key "keyType", "${keyType}".`);
    }
    const multibaseMultikeyHeader =
      SUPPORTED_BASE58_MULTIKEY_HEADERS.get(keyType);
    didKeyDriver.use({
      multibaseMultikeyHeader, fromMultibase: handler.from
    });
  }
  didIo.use(didKeyDriver);

  // support did:web
  const didWebDriver = didMethodWeb.driver({
    ...cfg.methods.web.driver,
    fetchOptions: {
      ...cfg.methods.web.driver.fetchOptions,
      // always use bedrock agent
      agent: httpsAgent
    }
  });
  for(const keyType in cfg.methods.web.keyTypes) {
    const handler = SUPPORTED_KEY_TYPES.get(keyType);
    if(!handler) {
      throw new Error(`Unsupported did:web "keyType", "${keyType}".`);
    }
    const multibaseMultikeyHeader =
      SUPPORTED_BASE58_MULTIKEY_HEADERS.get(keyType);
    didWebDriver.use({
      multibaseMultikeyHeader, fromMultibase: handler.from
    });
  }
  didIo.use(didWebDriver);

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
