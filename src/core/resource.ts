// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { AmpSDK } from '../client';

export abstract class APIResource {
  protected _client: AmpSDK;

  constructor(client: AmpSDK) {
    this._client = client;
  }
}
