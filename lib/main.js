/*!
 * Copyright (c) 2020-2022 Digital Bazaar, Inc. All rights reserved.
 */
import bedrock from 'bedrock';
import {CachedResolver} from '@digitalbazaar/did-io';
import * as didMethodKey from '@digitalbazaar/did-method-key';
import * as didVeresOne from 'did-veres-one';

import './config.js';

export let didIo;

bedrock.events.on('bedrock.init', () => {
  const {config: {'did-io': cfg}} = bedrock;
  didIo = new CachedResolver(cfg.cache);
});

bedrock.events.on('bedrock.start', () => {
  const {config: {'did-io': cfg}} = bedrock;

  // support did:key
  didIo.use(didMethodKey.driver(cfg.methods.key));
  // support did:v1
  didIo.use(didVeresOne.driver(cfg.methods.v1));
});
