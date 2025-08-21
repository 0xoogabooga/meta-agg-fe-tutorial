import type { Address } from 'viem'

const AGGREGATOR_BASE_URL =
  'https://internal-gateway-hyperevm-dev.up.railway.app'

export type QuoteStreamParams = {
  tokenIn: Address
  tokenOut: Address
  amount: string
  to?: Address
  maxSlippage?: string
  aggregators?: string[]
}

export type QuoteStreamEvent = {
  event: 'connected' | 'quote' | 'error' | 'heartbeat'
  data: any
}

export const createQuoteStream = (
  chainId: number,
  params: QuoteStreamParams,
  onEvent: (event: QuoteStreamEvent) => void,
  onError?: (error: Error) => void,
  onConnected?: () => void,
) => {
  const queryParams = new URLSearchParams({
    chainId: chainId.toString(),
    tokenIn: params.tokenIn,
    tokenOut: params.tokenOut,
    amount: params.amount,
    maxSlippage: (params.maxSlippage || 0.01).toString(),
  })

  if (params.to) {
    queryParams.append('to', params.to)
  }

  if (params.aggregators) {
    for (const agg of params.aggregators) {
      queryParams.append('aggregators', agg)
    }
  }

  const url = `${AGGREGATOR_BASE_URL}/aggregator/stream/swap?${queryParams.toString()}`

  const eventSource = new EventSource(url)

  eventSource.onopen = () => {
    onConnected?.()
  }

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

  eventSource.addEventListener('error', (_event) => {
    //just pass the errors
  })

  eventSource.onerror = (_error) => {
    //just pass the errors
  }

  return eventSource
}
