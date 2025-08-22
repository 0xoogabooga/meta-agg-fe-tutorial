import { ConnectButton } from '@rainbow-me/rainbowkit'

const ConnectWalletScreen = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 max-w-md mx-auto flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-400 mb-6">
            Connect your wallet to view transaction examples and interact with
            the Meta Aggregator
          </p>
          <ConnectButton />
        </div>
      </div>
    </div>
  )
}

export default ConnectWalletScreen
