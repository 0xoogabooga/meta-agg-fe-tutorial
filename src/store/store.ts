import { create } from 'zustand'
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

export type AggregatorMeta = Record<
  string,
  { id: string; displayName: string; logoUrl: string }
>

interface OBState {
  selectedAggregatorId: string | null
  aggregatorsQuote: {
    [aggregator: string]: AggregatorQuote
  } | null
  aggregatorsMeta: AggregatorMeta[]
}

type OBAction = {
  setSelectedAggregatorId: (aggregatorId: string | null) => void
  setAggregatorQuote: (data: StreamAggregatorQuote) => void
  removeAllAggregatorQuotes: () => void
  removeOldAggregatorQuotes: (timestamp: number) => void
  setAggregatorsMeta: (aggregatorsMeta: AggregatorMeta[]) => void
}

export const useStore = create<OBState & OBAction>((set) => ({
  selectedAggregatorId: null,
  aggregatorsQuote: null,
  aggregatorsMeta: [],

  // Action methods
  setAggregatorsMeta: (aggregatorsMeta: AggregatorMeta[]) =>
    set(() => ({ aggregatorsMeta })),
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
