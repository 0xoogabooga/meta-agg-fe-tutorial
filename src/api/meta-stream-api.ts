/**
 * Meta Stream API
 *
 * This module provides functionality for creating and managing real-time quote streams
 * from cryptocurrency aggregators using Server-Sent Events (SSE). It allows clients
 * to receive live swap quotes for token pairs across different blockchain networks.
 */

import type { Address } from 'viem'

/**
 * Base URL for the aggregator service API
 * Points to the internal gateway for the HyperEVM development environment
 */
const AGGREGATOR_BASE_URL =
  'https://internal-gateway-hyperevm-dev.up.railway.app'

/**
 * Parameters required to create a quote stream for token swaps
 */
export type QuoteStreamParams = {
  /** Address of the input token (token being sold) */
  tokenIn: Address
  /** Address of the output token (token being bought) */
  tokenOut: Address
  /** Amount of input token to swap (as string to handle large numbers) */
  amount: string
  /** Optional recipient address. If it's provided we're getting simulated ready to go call data result */
  to?: Address
  /** Maximum acceptable slippage percentage (defaults to 0.01 = 1%) */
  maxSlippage?: string
  /** Optional array of specific aggregator names to query */
  aggregators?: string[]
}

/**
 * Structure of events received from the quote stream
 */
export type QuoteStreamEvent = {
  event: 'connected' | 'quote' | 'error' | 'heartbeat'
  data: any
}

/**
 * Creates a Server-Sent Events connection to stream real-time swap quotes
 *
 * This function establishes a persistent connection to the aggregator service
 * to receive live quotes for token swaps. It handles connection management,
 * event parsing, and error handling automatically.
 *
 * @param chainId - The blockchain network ID (e.g., 1 for Ethereum mainnet)
 * @param params - Quote stream parameters including tokens, amount, and preferences
 * @param onEvent - Callback function called for each event received from the stream
 * @param onError - Optional callback for handling connection or parsing errors
 * @param onConnected - Optional callback triggered when the connection is established
 * @returns EventSource instance for managing the stream connection
 *
 **/
export const createQuoteStream = (
  chainId: number,
  params: QuoteStreamParams,
  onEvent: (event: QuoteStreamEvent) => void,
  onError?: (error: Error) => void,
  onConnected?: () => void,
) => {
  // Build query parameters for the SSE endpoint
  const queryParams = new URLSearchParams({
    chainId: chainId.toString(),
    tokenIn: params.tokenIn,
    tokenOut: params.tokenOut,
    amount: params.amount,
    // Default to 1% slippage if not specified
    maxSlippage: (params.maxSlippage || 0.01).toString(),
  })

  // Add optional recipient address if provided
  if (params.to) {
    queryParams.append('to', params.to)
  }

  // Add specific aggregators if requested
  if (params.aggregators) {
    for (const agg of params.aggregators) {
      queryParams.append('aggregators', agg)
    }
  }

  // Construct the full SSE endpoint URL
  const url = `${AGGREGATOR_BASE_URL}/aggregator/stream/swap?${queryParams.toString()}`

  // Create the EventSource connection
  const eventSource = new EventSource(url)

  /**
   * Handle connection establishment
   * Triggered when the SSE connection is successfully opened
   */
  eventSource.onopen = () => {
    onConnected?.()
  }

  /**
   * Handle generic messages from the stream
   * This catches any messages that don't have specific event listeners
   */
  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
      onEvent({
        event: event.type as any,
        data,
      })
    } catch (error) {
      if (onError) {
        onError(
          error instanceof Error ? error : new Error('Error parsing SSE data'),
        )
      }
    }
  }

  /**
   * Handle 'connected' events
   * Triggered when the server confirms the connection is established
   */
  eventSource.addEventListener('connected', (event) => {
    try {
      const data = JSON.parse(event.data)
      onEvent({ event: 'connected', data })
    } catch (error) {
      if (onError) {
        onError(
          error instanceof Error
            ? error
            : new Error('Error parsing connected event'),
        )
      }
    }
  })

  /**
   * Handle 'quote' events
   * These contain the actual swap quote data with prices and routing information
   */
  eventSource.addEventListener('quote', (event) => {
    try {
      const data = JSON.parse(event.data)
      onEvent({ event: 'quote', data })
    } catch (error) {
      if (onError) {
        onError(
          error instanceof Error
            ? error
            : new Error('Error parsing quote event'),
        )
      }
    }
  })

  /**
   * Handle 'error' events from the server
   */
  eventSource.addEventListener('error', (_event) => {
    //just pass the errors
  })

  /**
   * Handle connection-level errors
   */
  eventSource.onerror = (_error) => {
    //just pass the errors
  }

  // Return the EventSource instance for external management
  return eventSource
}
