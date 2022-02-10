/*!
 * Copyright (c) 2020-2022 Digital Bazaar, Inc. All rights reserved.
 */
import bedrock from 'bedrock';
const {config} = bedrock;

const namespace = 'did-io';
const cfg = config[namespace] = {};

cfg.methods = {
  key: {},
  v1: {
    // modes: live, test, dev
    mode: 'test',
  }
};

cfg.cache = {
  // store up to 1k DID docs in memory by default
  max: 1000,
  // 5 minute cache by default
  maxAge: 1000 * 60 * 5
};
