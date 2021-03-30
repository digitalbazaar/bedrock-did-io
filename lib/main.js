/*!
 * Copyright (c) 2020-2021 Digital Bazaar, Inc. All rights reserved.
 */
import bedrock from 'bedrock';
import didIo from 'did-io';
import * as didMethodKey from '@digitalbazaar/did-method-key';
import * as didVeresOne from 'did-veres-one';

import './config.js';
const {config: {'did-io': cfg}} = bedrock;

export {didIo};

bedrock.events.on('bedrock.start', () => {
  // support did:key
  didIo.use('key', didMethodKey.driver(cfg.methods.key));
  // support did:v1
  didIo.use('v1', didVeresOne.driver(cfg.methods.v1));
});
