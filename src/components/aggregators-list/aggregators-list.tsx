'use client'

import { useAggregatorsList } from '@/hooks/use-aggregators-list'
import { formatBigIntTokenAmount } from '@/lib/utils'

const AggregatorsListComponent = () => {
  const { isConnected, aggregatorsList } = useAggregatorsList()

  const formatPriceImpact = (impact: number) => {
    return `${(impact * 100).toFixed(4)}%`
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-white mb-2">
            Aggregators List
          </h1>
          <div className="flex items-center space-x-2 mb-3">
            <div
              className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
            />
            <span className="text-sm text-gray-300">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          {/* Trading pair info block */}
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              <span className="text-blue-300 font-medium text-sm">
                Trading Pair Information
              </span>
            </div>
            <div className="text-gray-300">
              <p className="text-xs">
                Quotes for{' '}
                <span className="font-semibold text-white">1 USDT → HYPE</span>{' '}
                routes on{' '}
                <span className="font-semibold text-blue-300">HyperEVM</span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Real-time quotes from multiple aggregators for optimal swap
                routing
              </p>
            </div>
          </div>
        </div>

        {aggregatorsList.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-gray-400 mb-2">
              {isConnected
                ? 'Waiting for quotes...'
                : 'No connection to quote stream'}
            </div>
            <div className="text-sm text-gray-500">
              Connect to start receiving real-time quotes from aggregators
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {aggregatorsList.map((aggregator) => (
              <div
                key={aggregator.id}
                className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar section - 80px minimum width */}
                  <div className="flex-shrink-0 w-20 h-12 bg-gray-700 flex items-center justify-center overflow-hidden">
                    {aggregator.logoUrl ? (
                      <img
                        src={aggregator.logoUrl}
                        alt={`${aggregator.displayName} logo`}
                        className="w-16 h-10 object-contain"
                        onError={(e) => {
                          // Fallback to initial if image fails to load
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.nextElementSibling?.classList.remove(
                            'hidden',
                          )
                        }}
                      />
                    ) : null}
                    <span
                      className={`text-lg font-bold ${aggregator.logoUrl ? 'hidden' : ''}`}
                    >
                      {aggregator.displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Aggregator info and data in horizontal layout */}
                  <div className="flex-1 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-white mb-0.5">
                        {aggregator.displayName}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {aggregator.lastUpdated}
                      </p>
                    </div>

                    {/* Data section - horizontal layout */}
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-xs text-gray-400">Amount Out</div>
                        <div className="text-green-400 font-semibold text-sm">
                          {formatBigIntTokenAmount(
                            aggregator.amountOut,
                            18,
                            'HYPE',
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-gray-400">Gas</div>
                        <div className="text-blue-400 text-sm">
                          {Number.parseInt(aggregator.gas).toLocaleString()}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-gray-400">
                          Price Impact
                        </div>
                        <div
                          className={`font-medium text-sm ${
                            aggregator.priceImpact > 0.01
                              ? 'text-red-400'
                              : 'text-green-400'
                          }`}
                        >
                          {formatPriceImpact(aggregator.priceImpact)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AggregatorsListComponent
