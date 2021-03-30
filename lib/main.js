/*!
 * Copyright (c) 2020-2021 Digital Bazaar, Inc. All rights reserved.
 */
import bedrock from 'bedrock';
import {CachedResolver} from '@digitalbazaar/did-io';
import * as didMethodKey from '@digitalbazaar/did-method-key';
import * as didVeresOne from 'did-veres-one';

// defaults to 100
const didIo = new CachedResolver({max: 100});

import './config.js';
const {config: {'did-io': cfg}} = bedrock;

export {didIo};

bedrock.events.on('bedrock.start', () => {
  // support did:key
  didIo.use(didMethodKey.driver(cfg.methods.key));
  // support did:v1
  didIo.use(didVeresOne.driver(cfg.methods.v1));
});
