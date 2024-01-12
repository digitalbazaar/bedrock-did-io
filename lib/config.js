/*!
 * Copyright (c) 2020-2024 Digital Bazaar, Inc. All rights reserved.
 */
import {config} from '@bedrock/core';

const namespace = 'did-io';
const cfg = config[namespace] = {};

cfg.methods = {
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
