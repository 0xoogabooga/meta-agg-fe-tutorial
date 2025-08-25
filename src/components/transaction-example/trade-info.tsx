import type { Quote } from '@/lib/types'
import { formatTokenAmount } from '@/lib/utils'

interface TradeInfoProps {
  latestQuote?: Quote
}

const TradeInfo = ({ latestQuote }: TradeInfoProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <span className="text-gray-400 text-sm">From:</span>
          <div className="text-lg font-mono text-white mt-1">1 USDT</div>
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
          <span className="text-gray-400 text-sm">Max Slippage:</span>
          <div className="text-lg font-mono text-white mt-1">0.5%</div>
        </div>
      </div>
    </div>
  )
}

export default TradeInfo
