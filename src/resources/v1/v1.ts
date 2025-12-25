// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as HealthAPI from './health';
import { Health, HealthRetrieveResponse } from './health';
import * as TelemetryAPI from './telemetry';
import { Telemetry, TelemetryCreateParams, TelemetryCreateResponse } from './telemetry';

export class V1 extends APIResource {
  telemetry: TelemetryAPI.Telemetry = new TelemetryAPI.Telemetry(this._client);
  health: HealthAPI.Health = new HealthAPI.Health(this._client);
}

V1.Telemetry = Telemetry;
V1.Health = Health;

export declare namespace V1 {
  export {
    Telemetry as Telemetry,
    type TelemetryCreateResponse as TelemetryCreateResponse,
    type TelemetryCreateParams as TelemetryCreateParams,
  };

  export { Health as Health, type HealthRetrieveResponse as HealthRetrieveResponse };
}
