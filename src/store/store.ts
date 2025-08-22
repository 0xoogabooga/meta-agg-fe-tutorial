import { create } from 'zustand'
import type { Aggregator } from '@/api/api'
import { createSelectors } from '@/store/create-selectors'

export type AggregatorQuote = {
  timestamp: number
  quote: any
}

export type StreamAggregatorQuote = {
  aggregator: string
  quote: any
  timestamp: number
}

// Updated to use the proper Aggregator type
export type AggregatorMeta = Record<string, Aggregator>

interface OBState {
  selectedAggregatorId: string | null
  aggregatorsQuote: {
    [aggregator: string]: AggregatorQuote
  } | null
  aggregatorsMeta: AggregatorMeta | null
}

type OBAction = {
  setSelectedAggregatorId: (aggregatorId: string | null) => void
  setAggregatorQuote: (data: StreamAggregatorQuote) => void
  removeAllAggregatorQuotes: () => void
  removeOldAggregatorQuotes: (timestamp: number) => void
  setAggregatorsMeta: (aggregators: Aggregator[]) => void
}

export const useStore = create<OBState & OBAction>((set) => ({
  selectedAggregatorId: null,
  aggregatorsQuote: null,
  aggregatorsMeta: null,

  // Action methods
  setAggregatorsMeta: (aggregators: Aggregator[]) => {
    // Convert array to object for easier lookup
    const metaMap = aggregators.reduce((acc, aggregator) => {
      acc[aggregator.id] = aggregator
      return acc
    }, {} as AggregatorMeta)

    set(() => ({ aggregatorsMeta: metaMap }))
  },
  setSelectedAggregatorId: (selectedAggregatorId: string | null) =>
    set(() => ({ selectedAggregatorId })),

  setAggregatorQuote: (data: StreamAggregatorQuote) => {
    set((state) => {
      const currentQuote = state.aggregatorsQuote?.[data.aggregator]

      if (!currentQuote || data.timestamp > currentQuote.timestamp) {
        return {
          aggregatorsQuote: {
            ...state.aggregatorsQuote,
            [data.aggregator]: {
              quote: data.quote,
              timestamp: data.timestamp,
            },
          },
        }
      }

      return state
    })
  },

  removeAllAggregatorQuotes: () => {
    set(() => ({ aggregatorsQuote: null }))
  },

  removeOldAggregatorQuotes: (timestamp: number) => {
    set((state) => {
      if (!state.aggregatorsQuote) {
        return state
      }

      const updatedQuotes: { [aggregator: string]: AggregatorQuote } = {}

      for (const [aggregator, quote] of Object.entries(
        state.aggregatorsQuote,
      )) {
        if (quote.timestamp >= timestamp) {
          updatedQuotes[aggregator] = quote
        }
      }

      return {
        aggregatorsQuote:
          Object.keys(updatedQuotes).length > 0 ? updatedQuotes : null,
      }
    })
  },
}))

export const useOBStore = createSelectors(useStore)
