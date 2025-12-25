// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Health extends APIResource {
  /**
   * Check if the AMP ingestion service is healthy and can accept requests.
   *
   * @example
   * ```ts
   * const health = await client.v1.health.retrieve();
   * ```
   */
  retrieve(options?: RequestOptions): APIPromise<HealthRetrieveResponse> {
    return this._client.get('/api/v1/health', options);
  }
}

/**
 * Service health status (simple - no internal infrastructure details)
 */
export interface HealthRetrieveResponse {
  /**
   * Service health status
   */
  status: 'healthy' | 'unhealthy';

  /**
   * Response timestamp
   */
  timestamp: string;

  /**
   * Service version
   */
  version?: string;
}

export declare namespace Health {
  export { type HealthRetrieveResponse as HealthRetrieveResponse };
}
