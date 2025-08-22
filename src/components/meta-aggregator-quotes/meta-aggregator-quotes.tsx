'use client'

import { useAggregatorsQuote } from '@/hooks/use-aggregators-quote'
import { formatCalldata, formatNumber, formatTokenAmount } from '@/lib/utils'

const MetaAggregatorQuotes = () => {
  const { latestQuote, isConnected } = useAggregatorsQuote()

  const toTokenSymbol = 'HYPE'

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">
              Meta Aggregator Quotes
            </h1>
            <div className="flex items-center space-x-3">
              <div
                className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}
              />
              <span
                className={`text-sm font-medium ${isConnected ? 'text-green-400' : 'text-red-400'}`}
              >
                {isConnected ? 'Live Stream Connected' : 'Disconnected'}
              </span>
            </div>
          </div>

          {/* Trade Info */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <span className="text-gray-400 text-sm">From:</span>
                <div className="text-lg font-mono text-white mt-1">10 USDT</div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">To:</span>
                <div className="text-lg font-mono text-white mt-1">
                  {latestQuote
                    ? `${formatTokenAmount(latestQuote.quote.amountOut, 'HYPE')} HYPE`
                    : 'HYPE'}
                </div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Amount:</span>
                <div className="text-lg font-mono text-white mt-1">
                  {formatTokenAmount('10000000', 'USDT')} USDT
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Display */}
        {!latestQuote ? (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <p className="text-gray-400 text-lg">
              {isConnected
                ? 'Waiting for quotes...'
                : 'Connecting to quote stream...'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Latest Quote Card */}
            {latestQuote && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-600">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Latest Quote
                  </h2>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-gray-700 text-gray-200 rounded text-sm font-medium border border-gray-600">
                      {latestQuote.aggregator}
                    </span>
                    <span
                      className={`px-3 py-1 rounded text-sm font-medium border ${
                        latestQuote.quote.status === 'Success'
                          ? 'bg-gray-700 text-gray-200 border-gray-600'
                          : 'bg-gray-700 text-gray-300 border-gray-500'
                      }`}
                    >
                      {latestQuote.quote.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Amounts */}
                  <div className="bg-gray-750 rounded-lg p-4 border border-gray-600">
                    <h3 className="text-gray-300 text-sm mb-3 font-medium">
                      Token Amounts
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wide">
                          Amount In
                        </p>
                        <p className="text-lg font-mono text-white">
                          {formatTokenAmount(
                            latestQuote.quote.amountIn,
                            'USDT',
                          )}{' '}
                          USDT
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wide">
                          Amount Out
                        </p>
                        <p className="text-lg font-mono text-white">
                          {formatTokenAmount(
                            latestQuote.quote.amountOut,
                            toTokenSymbol,
                          )}{' '}
                          {toTokenSymbol}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wide">
                          Simulated Out
                        </p>
                        <p className="text-lg font-mono text-gray-200">
                          {formatTokenAmount(
                            latestQuote.quote.simulationAmountOut,
                            toTokenSymbol,
                          )}{' '}
                          {toTokenSymbol}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Costs & Impact */}
                  <div className="bg-gray-750 rounded-lg p-4 border border-gray-600">
                    <h3 className="text-gray-300 text-sm mb-3 font-medium">
                      Costs & Impact
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wide">
                          Fee
                        </p>
                        <p className="text-lg font-mono text-white">
                          {formatTokenAmount(
                            latestQuote.quote.fee,
                            toTokenSymbol,
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wide">
                          Gas Estimate
                        </p>
                        <p className="text-lg font-mono text-white">
                          {formatNumber(latestQuote.quote.gas)} gas
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wide">
                          Price Impact
                        </p>
                        <p className="text-lg font-mono text-white">
                          {latestQuote.quote.priceImpact.toFixed(4)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div className="bg-gray-750 rounded-lg p-4 border border-gray-600">
                    <h3 className="text-gray-300 text-sm mb-3 font-medium">
                      Technical
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wide">
                          Calldata
                        </p>
                        <p className="text-xs font-mono text-gray-300 break-all">
                          {formatCalldata(latestQuote.quote.calldata)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wide">
                          Timestamp
                        </p>
                        <p className="text-sm text-gray-300 font-mono">
                          {new Date(
                            latestQuote.timestamp * 1000,
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Raw Data Section */}
            <details
              className="bg-gray-800 rounded-lg border border-gray-700"
              open
            >
              <summary className="px-6 py-4 cursor-pointer text-gray-300 hover:text-white">
                🔍 Raw Quote Data (Click to expand)
              </summary>
              <div className="px-6 pb-6">
                <pre className="bg-gray-900 p-4 rounded text-xs text-gray-300 overflow-auto max-h-96">
                  {JSON.stringify(latestQuote, null, 2)}
                </pre>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  )
}

export default MetaAggregatorQuotes
