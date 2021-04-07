/*!
 * Copyright (c) 2020-2021 Digital Bazaar, Inc. All rights reserved.
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
