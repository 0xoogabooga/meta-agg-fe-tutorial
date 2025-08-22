import type { Quote } from '@/lib/types'
import { formatTokenAmount } from '@/lib/utils'

interface TransactionStatusProps {
  hash?: string
  isPending: boolean
  isConfirming: boolean
  isConfirmed: boolean
  error?: Error | null
  selectedQuote?: Quote | null
}

const TransactionStatus = ({
  hash,
  isPending,
  isConfirming,
  isConfirmed,
  error,
  selectedQuote,
}: TransactionStatusProps) => {
  if (!hash && !isPending && !isConfirming && !isConfirmed && !error) {
    return null
  }

  return (
    <div className="mb-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Transaction Status</h3>

        {isPending && (
          <div className="flex items-center space-x-2 text-yellow-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400" />
            <span>Waiting for user confirmation...</span>
          </div>
        )}

        {hash && (
          <div className="space-y-3">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
              <div className="text-sm text-gray-400 mb-2">
                Transaction Hash:
              </div>
              <div className="flex items-center space-x-2">
                <code className="text-green-400 font-mono text-sm bg-gray-800 px-3 py-2 rounded flex-1 break-all">
                  {hash}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(hash)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm transition-colors"
                  title="Copy transaction hash"
                >
                  📋
                </button>
                <a
                  href={`https://hyperevmscan.io/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded text-sm transition-colors"
                  title="View on explorer"
                >
                  🔗
                </a>
              </div>
            </div>

            {isConfirming && (
              <div className="flex items-center space-x-2 text-blue-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400" />
                <span>Confirming transaction...</span>
              </div>
            )}

            {isConfirmed && (
              <div className="text-green-400">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span className="font-semibold">Transaction confirmed!</span>
                </div>
                {selectedQuote && (
                  <div className="mt-2 text-sm text-gray-300">
                    Executed via {selectedQuote.aggregator} - Received:{' '}
                    {formatTokenAmount(selectedQuote.quote.amountOut, 'HYPE')}{' '}
                    HYPE
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="text-red-400 bg-red-900/20 border border-red-700 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <span>❌</span>
              <span className="font-semibold">Transaction failed:</span>
            </div>
            <div className="mt-2 text-sm">{error.message}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionStatus
