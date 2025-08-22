import { useEffect } from 'react'
import { fetchAggregators } from '@/api/api'
import { useOBStore } from '@/store/store'
import { useAggregatorsQuote } from './use-aggregators-quote'

// Constants
const QUOTE_EXPIRY_TIME_MS = 15000 // 15 seconds in milliseconds

export const useAggregatorsList = () => {
  const { isConnected, latestQuote } = useAggregatorsQuote()

  const setAggregatorQuote = useOBStore.use.setAggregatorQuote()
  const setAggregatorsMeta = useOBStore.use.setAggregatorsMeta()
  const removeOldAggregatorQuotes = useOBStore.use.removeOldAggregatorQuotes()
  const aggregatorsQuote = useOBStore.use.aggregatorsQuote()
  const aggregatorsMeta = useOBStore.use.aggregatorsMeta()

  // Update store when new quote arrives
  useEffect(() => {
    if (latestQuote) {
      setAggregatorQuote({
        aggregator: latestQuote.aggregator,
        quote: latestQuote.quote,
        timestamp: latestQuote.timestamp,
      })
    }
  }, [latestQuote, setAggregatorQuote])

  // Remove old quotes every 15 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      const expiryTime = Date.now() - QUOTE_EXPIRY_TIME_MS
      removeOldAggregatorQuotes(expiryTime)
    }, QUOTE_EXPIRY_TIME_MS)

    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }, [removeOldAggregatorQuotes])

  // Fetch real aggregator metadata from API
  useEffect(() => {
    const loadAggregators = async () => {
      try {
        const aggregators = await fetchAggregators()
        setAggregatorsMeta(aggregators)
      } catch {
        // Fallback to empty array if API fails
        setAggregatorsMeta([])
      }
    }

    loadAggregators()
  }, [setAggregatorsMeta])

  // Transform aggregator quotes into display format
  const aggregatorsList = aggregatorsQuote
    ? Object.entries(aggregatorsQuote)
        .map(([aggregatorId, data]) => {
          const meta = aggregatorsMeta?.[aggregatorId]

          return {
            id: aggregatorId,
            displayName: meta?.displayName || aggregatorId,
            logoUrl: meta?.logoUrl || '',
            amountIn: data.quote?.amountIn || '0',
            amountOut: data.quote?.amountOut || '0',
            value: data.quote?.value || '0',
            fee: data.quote?.fee || '0',
            gas: data.quote?.gas || '0',
            priceImpact: data.quote?.priceImpact || 0,
            status: data.quote?.status || 'Unknown',
            timestamp: data.timestamp,
            lastUpdated: new Date(data.timestamp).toLocaleTimeString(),
          }
        })
        .sort((a, b) => {
          // Sort by amount out (best price first)
          const aAmount = BigInt(a.amountOut || '0')
          const bAmount = BigInt(b.amountOut || '0')
          return bAmount > aAmount ? 1 : -1
        })
    : []

  return {
    isConnected,
    aggregatorsList,
    latestQuote,
  }
}
