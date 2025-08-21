/** biome-ignore-all lint/correctness/useExhaustiveDependencies: Dependencies intentionally excluded to prevent infinite re-renders */
import { useEffect, useRef, useState } from 'react'
import {
  createQuoteStream,
  type QuoteStreamEvent,
  type QuoteStreamParams,
} from '@/api/meta-stream-api'

interface UseQuoteStreamProps {
  chainId: number
  params: QuoteStreamParams
  enabled?: boolean
}

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
