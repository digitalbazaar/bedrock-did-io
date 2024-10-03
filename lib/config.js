/*!
 * Copyright (c) 2020-2024 Digital Bazaar, Inc. All rights reserved.
 */
import {config} from '@bedrock/core';

const namespace = 'did-io';
const cfg = config[namespace] = {};

cfg.methods = {
  jwk: {
    keyTypes: {
      Bls12381G2: {},
      Ed25519: {},
      'P-256': {},
      'P-384': {}
    }
  },
  key: {
    keyTypes: {
      Bls12381G2: {},
      Ed25519: {},
      'P-256': {},
      'P-384': {}
    }
  },
  v1: {
    // modes: live, test, dev
    mode: 'test',
  },
  web: {
    // supported key types
    keyTypes: {
      Bls12381G2: {},
      Ed25519: {},
      'P-256': {},
      'P-384': {}
    },
    // driver-specific options
    driver: {
      // no allow list by default
      allowList: [],
      // params for fetching DID documents
      fetchOptions: {
        // max size for DID doc responses (in bytes, ~16 KiB)
        size: 16384,
        // timeout in ms for fetching a DID doc
        timeout: 5000
      }
    }
  }
};

cfg.methodOverrides = {
  v1: {
    disableFetch: false
  }
};

cfg.cache = {
  // store up to 1k DID docs in memory by default
  max: 1000,
  // 5 minute cache by default
  maxAge: 1000 * 60 * 5
};
