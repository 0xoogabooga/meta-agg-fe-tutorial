import type { Quote } from '@/lib/types'
import { formatTokenAmount } from '@/lib/utils'
import { USDT_ADDRESS, USDT_AMOUNT } from './types'

interface TokenDetailsProps {
  latestQuote: Quote
  allowance?: bigint
  hasInsufficientAllowance: boolean
}

const TokenDetails = ({
  latestQuote,
  allowance,
  hasInsufficientAllowance,
}: TokenDetailsProps) => {
  return (
    <div className="mt-8">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4">USDT Token Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-400 mb-2">Token Contract:</div>
            <div className="font-mono text-xs text-white bg-gray-900 p-2 rounded">
              {USDT_ADDRESS}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-400 mb-2">Router Address:</div>
            <div className="font-mono text-xs text-white bg-gray-900 p-2 rounded">
              {latestQuote.quote.routerAddr || 'Loading...'}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">Current Allowance:</div>
              <div className="text-lg font-mono text-white">
                {allowance !== undefined
                  ? `${formatTokenAmount(allowance.toString(), 'USDT')} USDT`
                  : 'Loading...'}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-400">Required Amount:</div>
              <div className="text-lg font-mono text-white">
                {USDT_AMOUNT} USDT
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div
              className={`flex items-center space-x-2 ${
                hasInsufficientAllowance ? 'text-red-400' : 'text-green-400'
              }`}
            >
              <div>{hasInsufficientAllowance ? '❌' : '✅'}</div>
              <span className="text-sm">
                {hasInsufficientAllowance
                  ? 'Approval required before swap'
                  : 'Sufficient allowance - ready to swap'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenDetails
