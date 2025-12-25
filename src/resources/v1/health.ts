// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Health extends APIResource {
  /**
   * Check if the ingestion service is healthy and can accept traffic.
   *
   * @example
   * ```ts
   * const response = await client.v1.health.checkStatus();
   * ```
   */
  checkStatus(options?: RequestOptions): APIPromise<HealthCheckStatusResponse> {
    return this._client.get('/api/v1/health', options);
  }
}

/**
 * Service health status
 */
export interface HealthCheckStatusResponse {
  /**
   * Individual component health
   */
  checks?: HealthCheckStatusResponse.Checks;

  status?: 'healthy' | 'degraded' | 'unhealthy';

  timestamp?: string;
}

export namespace HealthCheckStatusResponse {
  /**
   * Individual component health
   */
  export interface Checks {
    clickhouse?: 'healthy' | 'unhealthy';

    kafka?: 'healthy' | 'unhealthy';

    mongodb?: 'healthy' | 'unhealthy';
  }
}

export declare namespace Health {
  export { type HealthCheckStatusResponse as HealthCheckStatusResponse };
}
