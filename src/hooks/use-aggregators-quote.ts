import { useQuoteStream } from '@/hooks/use-quote-stream'

export const useAggregatorsQuote = () => {
  const { isConnected, latestQuote } = useQuoteStream({
    chainId: 999,
    params: {
      tokenIn: '0xB8CE59FC3717ada4C02eaDF9682A9e934F625ebb', // HyperEvm USDT
      tokenOut: '0x0000000000000000000000000000000000000000', //HyperEvm HYPE
      amount: '10000000', //10 USDT
      maxSlippage: '0.5',
      to: '0x8c2d66577E7CC4CF06c65f14724ee27afB6f7376', // if wallet disconnected it can be undefined. In this case we're getting non-simulated quotes
    },
    enabled: true,
  })

  return {
    isConnected,
    latestQuote,
  }
}
