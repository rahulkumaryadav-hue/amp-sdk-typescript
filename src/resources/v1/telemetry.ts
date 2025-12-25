// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Telemetry extends APIResource {
  /**
   * Send OTEL-formatted telemetry traces or conversation transcripts.
   *
   * ## OTEL Format
   *
   * Use `format=otel` (default) for OpenTelemetry traces with GenAI semantic
   * conventions. Each trace contains spans representing LLM calls, tool executions,
   * RAG operations, etc.
   *
   * ## Transcript Format
   *
   * Use `format=transcript` for conversation transcripts with message history.
   *
   * @example
   * ```ts
   * const response = await client.v1.telemetry.send({
   *   traces: [
   *     {
   *       trace_id: 'trace-abc-001',
   *       session_id: 'session-xyz-001',
   *       start_time: '2025-12-25T10:00:00.000Z',
   *       end_time: '2025-12-25T10:00:05.000Z',
   *       status: 'ok',
   *       spans: [
   *         {
   *           span_id: 'span-llm-001',
   *           trace_id: 'trace-abc-001',
   *           name: 'llm.completion',
   *           start_time: '2025-12-25T10:00:00.000Z',
   *           end_time: '2025-12-25T10:00:05.000Z',
   *           status: 'ok',
   *           type: 'llm',
   *           attributes: {
   *             'gen_ai.system': 'openai',
   *             'gen_ai.request.model': 'gpt-4',
   *             'gen_ai.usage.input_tokens': 150,
   *             'gen_ai.usage.output_tokens': 75,
   *           },
   *         },
   *       ],
   *     },
   *   ],
   * });
   * ```
   */
  send(params: TelemetrySendParams, options?: RequestOptions): APIPromise<TelemetrySendResponse> {
    const { format, ...body } = params;
    return this._client.post('/api/v1/telemetry', { query: { format }, body, ...options });
  }
}

/**
 * Response after telemetry batch submission
 */
export interface TelemetrySendResponse {
  /**
   * Count of accepted items
   */
  accepted: TelemetrySendResponse.Accepted;

  /**
   * Processing duration in milliseconds
   */
  duration: number;

  /**
   * Count of rejected items
   */
  rejected: TelemetrySendResponse.Rejected;

  /**
   * Overall batch status
   */
  status: 'accepted' | 'partial' | 'failed';

  /**
   * Storage statistics
   */
  stored: TelemetrySendResponse.Stored;

  /**
   * Response timestamp
   */
  timestamp: string;

  /**
   * Batch ID for status tracking (optional)
   */
  batchId?: string;

  /**
   * Human-readable message
   */
  message?: string;
}

export namespace TelemetrySendResponse {
  /**
   * Count of accepted items
   */
  export interface Accepted {
    traces?: number;

    transcripts?: number;
  }

  /**
   * Count of rejected items
   */
  export interface Rejected {
    traces?: number;

    transcripts?: number;
  }

  /**
   * Storage statistics
   */
  export interface Stored {
    /**
     * Records stored in ClickHouse
     */
    clickhouse?: number;

    /**
     * Messages published to Kafka
     */
    kafka?: number;

    /**
     * Messages queued for retry
     */
    kafkaRetryQueued?: number;
  }
}

export interface TelemetrySendParams {
  /**
   * Query param: Telemetry format (defaults to otel)
   */
  format?: 'otel' | 'transcript';

  /**
   * Body param: Array of OTEL traces (max 100 per batch)
   */
  traces?: Array<TelemetrySendParams.Trace>;

  /**
   * Body param: Array of conversation transcripts (max 100 per batch)
   */
  transcripts?: Array<TelemetrySendParams.Transcript>;
}

export namespace TelemetrySendParams {
  /**
   * OTEL trace containing one or more spans
   */
  export interface Trace {
    /**
     * Session identifier for grouping related traces (multi-turn conversations)
     */
    session_id: string;

    /**
     * Array of spans (minimum 1 required)
     */
    spans: Array<Trace.Span>;

    /**
     * Unique trace identifier (32-char hex recommended)
     */
    trace_id: string;

    /**
     * Trace end time (ISO 8601)
     */
    end_time?: string;

    /**
     * Additional trace metadata
     */
    metadata?: { [key: string]: unknown };

    /**
     * Trace start time (ISO 8601)
     */
    start_time?: string;

    /**
     * Trace status
     */
    status?: 'ok' | 'error' | 'unset';
  }

  export namespace Trace {
    /**
     * OTEL span representing a single operation.
     *
     * ## Span Types
     *
     * - `llm` - LLM inference calls
     * - `tool` - Tool/function executions
     * - `rag` - Retrieval operations
     * - `agent` - Agent lifecycle events
     * - `orchestration` - Chain/workflow orchestration
     * - `custom` - Custom operations
     *
     * ## Token Attributes (OTEL GenAI v1.37+)
     *
     * - `gen_ai.usage.input_tokens` - Input/prompt tokens
     * - `gen_ai.usage.output_tokens` - Output/completion tokens
     */
    export interface Span {
      /**
       * Span name (e.g., llm.completion, tool.execute)
       */
      name: string;

      /**
       * Unique span identifier (16-char hex recommended)
       */
      span_id: string;

      /**
       * Parent trace identifier
       */
      trace_id: string;

      /**
       * OTEL span attributes following GenAI semantic conventions.
       *
       * Common attributes:
       *
       * - gen_ai.system: Provider (openai, anthropic, google, etc.)
       * - gen_ai.request.model: Model name (gpt-4, claude-3-opus, etc.)
       * - gen_ai.usage.input_tokens: Input token count
       * - gen_ai.usage.output_tokens: Output token count
       * - gen_ai.request.temperature: Sampling temperature
       */
      attributes?: { [key: string]: unknown };

      /**
       * Span end time (ISO 8601)
       */
      end_time?: string;

      /**
       * OTEL end time in nanoseconds (alternative to end_time)
       */
      endTimeUnixNano?: string;

      /**
       * OTEL span events (prompts, completions, errors)
       */
      events?: Array<Span.Event>;

      /**
       * Additional span metadata
       */
      metadata?: { [key: string]: unknown };

      /**
       * Parent span ID for nested operations
       */
      parent_span_id?: string | null;

      /**
       * Span start time (ISO 8601)
       */
      start_time?: string;

      /**
       * OTEL start time in nanoseconds (alternative to start_time)
       */
      startTimeUnixNano?: string;

      /**
       * Span status
       */
      status?: 'ok' | 'error' | 'unset';

      /**
       * Span type for categorization
       */
      type?: 'llm' | 'tool' | 'rag' | 'agent' | 'orchestration' | 'custom';
    }

    export namespace Span {
      /**
       * OTEL span event (e.g., gen_ai.content.prompt)
       */
      export interface Event {
        /**
         * Event attributes
         */
        attributes?: { [key: string]: unknown };

        /**
         * Event name
         */
        name?: string;

        /**
         * Event timestamp
         */
        timestamp?: string;
      }
    }
  }

  /**
   * Conversation transcript with message history
   */
  export interface Transcript {
    /**
     * Conversation identifier
     */
    conversation_id: string;

    /**
     * Array of messages (minimum 1)
     */
    messages: Array<Transcript.Message>;

    /**
     * Session identifier
     */
    session_id: string;

    /**
     * Turn number in multi-turn conversation
     */
    conversation_turn?: number;

    /**
     * Additional transcript metadata
     */
    metadata?: { [key: string]: unknown };
  }

  export namespace Transcript {
    /**
     * Conversation message
     */
    export interface Message {
      /**
       * Message content
       */
      content: string;

      /**
       * Message role
       */
      role: 'user' | 'assistant' | 'system' | 'tool';

      /**
       * Message timestamp
       */
      timestamp?: string;
    }
  }
}

export declare namespace Telemetry {
  export {
    type TelemetrySendResponse as TelemetrySendResponse,
    type TelemetrySendParams as TelemetrySendParams,
  };
}
