import type { Quote } from '@/lib/types'
import { formatTokenAmount } from '@/lib/utils'

interface QuoteDisplayProps {
  latestQuote: Quote | undefined
  hasInsufficientAllowance: boolean
  isApprovalPending: boolean
  isApprovalConfirming: boolean
  isPending: boolean
  isConfirming: boolean
  onApproveUSDT: () => void
  onExecuteTransaction: (quote: Quote) => void
}

const QuoteDisplay = ({
  latestQuote,
  hasInsufficientAllowance,
  isApprovalPending,
  isApprovalConfirming,
  isPending,
  isConfirming,
  onApproveUSDT,
  onExecuteTransaction,
}: QuoteDisplayProps) => {
  if (!latestQuote) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4" />
        <p className="text-gray-400">Fetching quotes...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Current Quote</h2>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {latestQuote.aggregator}
            </h3>
            <div className="text-2xl font-mono text-green-400 mt-1">
              {formatTokenAmount(latestQuote.quote.amountOut, 'HYPE')} HYPE
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            {hasInsufficientAllowance && (
              <button
                onClick={onApproveUSDT}
                disabled={isApprovalPending || isApprovalConfirming}
                className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {isApprovalPending || isApprovalConfirming
                  ? 'Approving...'
                  : 'Approve USDT First'}
              </button>
            )}

            <button
              onClick={() => onExecuteTransaction(latestQuote)}
              disabled={
                !latestQuote.quote.calldata ||
                isPending ||
                isConfirming ||
                hasInsufficientAllowance ||
                isApprovalPending ||
                isApprovalConfirming
              }
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {isPending || isConfirming ? 'Processing...' : 'Execute Swap'}
            </button>
          </div>
        </div>

        {hasInsufficientAllowance && (
          <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-700 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="text-yellow-400">⚠️</div>
              <div className="text-yellow-300 text-sm">
                Insufficient USDT allowance. Please approve the router to spend
                your USDT tokens first.
              </div>
            </div>
          </div>
        )}

        <details open>
          <summary className="py-4 cursor-pointer text-gray-300 hover:text-white">
            🔍 Raw Quote Data (Click to expand)
          </summary>
          <div className="pb-6">
            <pre className="bg-gray-900 p-4 rounded text-xs text-gray-300 overflow-auto max-h-96">
              {JSON.stringify(latestQuote, null, 2)}
            </pre>
          </div>
        </details>
      </div>
    </div>
  )
}

export default QuoteDisplay
