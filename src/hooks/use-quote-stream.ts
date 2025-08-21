/** biome-ignore-all lint/correctness/useExhaustiveDependencies: Dependencies intentionally excluded to prevent infinite re-renders */
import { useEffect, useRef, useState } from 'react'
import {
  createQuoteStream,
  type QuoteStreamEvent,
  type QuoteStreamParams,
} from '@/api/meta-stream-api'

/**
 * Properties for configuring the quote stream hook
 */
interface UseQuoteStreamProps {
  /** The blockchain network chain ID to connect to */
  chainId: number
  /** Parameters for the quote stream including tokens, amounts, and aggregators */
  params: QuoteStreamParams
  /** Whether the stream should be active. Defaults to true */
  enabled?: boolean
}

/**
 * Custom React hook for managing real-time cryptocurrency quote streaming
 *
 * This hook establishes and manages a Server-Sent Events (SSE) connection to receive
 * live price quotes for cryptocurrency trading pairs. It handles connection state,
 * error management, and automatic cleanup.
 *
 * @param props - Configuration object for the quote stream
 * @param props.chainId - The blockchain network chain ID to connect to
 * @param props.params - Quote stream parameters including token addresses, amounts, and aggregators
 * @param props.enabled - Optional flag to enable/disable the stream (default: true)
 *
 * @returns Object containing stream state and data
 * @returns returns.isConnected - Boolean indicating if the stream is currently connected
 * @returns returns.latestQuote - The most recent quote data received from the stream
 * @returns returns.error - Any error that occurred during streaming (null if no error)
 *
 **/
export const useQuoteStream = ({
  chainId,
  params,
  enabled = true,
}: UseQuoteStreamProps) => {
  const [isConnected, setIsConnected] = useState(false)
  const [latestQuote, setLatestQuote] = useState<any>(null)
  const [error, setError] = useState<Error | null>(null)
  const eventSourceRef = useRef<EventSource | null>(null)

  useEffect(() => {
    if (!enabled) return

    if (eventSourceRef.current) {
      eventSourceRef.current.close()
      eventSourceRef.current = null
      setIsConnected(false)
    }

    const handleEvent = (event: QuoteStreamEvent) => {
      switch (event.event) {
        case 'connected':
          setIsConnected(true)
          setError(null)
          break
        case 'quote':
          setLatestQuote(event.data)
          break
        case 'error':
          setError(new Error(event.data?.message || 'Quote stream error'))
          break
        case 'heartbeat':
          break
      }
    }

    const handleError = (error: Error) => {
      setError(error)
      setIsConnected(false)
    }

    const handleConnected = () => {
      setIsConnected(true)
      setError(null)
    }

    eventSourceRef.current = createQuoteStream(
      chainId as any,
      params,
      handleEvent,
      handleError,
      handleConnected,
    )

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
        eventSourceRef.current = null
      }
      setIsConnected(false)
    }
  }, [
    chainId,
    params.to,
    params.amount,
    params.aggregators,
    params.tokenIn,
    params.tokenOut,
    params.maxSlippage,
    enabled,
  ])

  return { isConnected, latestQuote, error }
}
