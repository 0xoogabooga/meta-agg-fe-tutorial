import { ConnectButton } from '@rainbow-me/rainbowkit'

interface HeaderProps {
  isQuoteConnected: boolean
}

const Header = ({ isQuoteConnected }: HeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Transaction Example</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isQuoteConnected ? 'bg-green-400' : 'bg-red-400'
              }`}
            />
            <span
              className={`text-sm font-medium ${
                isQuoteConnected ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {isQuoteConnected ? 'Quote Stream Connected' : 'Disconnected'}
            </span>
          </div>
          <ConnectButton />
        </div>
      </div>
    </div>
  )
}

export default Header
