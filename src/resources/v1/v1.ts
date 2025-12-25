// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as HealthAPI from './health';
import { Health, HealthCheckStatusResponse } from './health';
import * as TelemetryAPI from './telemetry';
import { Telemetry, TelemetrySendParams, TelemetrySendResponse } from './telemetry';

export class V1 extends APIResource {
  telemetry: TelemetryAPI.Telemetry = new TelemetryAPI.Telemetry(this._client);
  health: HealthAPI.Health = new HealthAPI.Health(this._client);
}

V1.Telemetry = Telemetry;
V1.Health = Health;

export declare namespace V1 {
  export {
    Telemetry as Telemetry,
    type TelemetrySendResponse as TelemetrySendResponse,
    type TelemetrySendParams as TelemetrySendParams,
  };

  export { Health as Health, type HealthCheckStatusResponse as HealthCheckStatusResponse };
}
