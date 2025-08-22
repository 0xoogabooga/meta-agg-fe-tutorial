'use client'

import { useState } from 'react'
import { formatCalldata, formatNumber, formatTokenAmount } from '@/lib/utils'

const TransactionExampleComponent = () => {
  const [selectedExample, setSelectedExample] = useState(0)

  const transactionExamples = [
    {
      title: 'USDT → HYPE Swap',
      description: 'Swap 10 USDT for HYPE tokens through 1inch aggregator',
      details: {
        from: '0x8c2d66577E7CC4CF06c65f14724ee27afB6f7376',
        to: '0x1111111254eeb25477b68fb85ed929f73a960582',
        value: '0',
        data: '0x12aa3caf000000000000000000000000b8ce59fc3717ada4c02eadf9682a9e934f625ebb00000000000000000000000000000000000000000000000000000000009896800000000000000000000000000000000000000000000000000000000000000000',
        gasLimit: '180000',
        gasPrice: '20000000000',
        aggregator: '1inch',
        tokenIn: {
          address: '0xB8CE59FC3717ada4c02eaDF9682A9e934F625ebb',
          symbol: 'USDT',
          decimals: 6,
          amount: '10000000',
        },
        tokenOut: {
          address: '0x0000000000000000000000000000000000000000',
          symbol: 'HYPE',
          decimals: 18,
          expectedAmount: '12345678901234567890',
        },
      },
    },
    {
      title: 'Multi-hop ETH → DAI',
      description: 'Complex routing through multiple DEXs for optimal pricing',
      details: {
        from: '0x8c2d66577E7CC4CF06c65f14724ee27afB6f7376',
        to: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
        value: '1000000000000000000',
        data: '0x5ae401dc00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000018a7a6c15a0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000e404e45aaf000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000006b175474e89094c44da98b954eedeac495271d0f0000000000000000000000000000000000000000000000000000000000000bb80000000000000000000000008c2d66577e7cc4cf06c65f14724ee27afb6f73760000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        gasLimit: '250000',
        gasPrice: '25000000000',
        aggregator: 'Uniswap V3',
        tokenIn: {
          address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          amount: '1000000000000000000',
        },
        tokenOut: {
          address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          symbol: 'DAI',
          decimals: 18,
          expectedAmount: '3250000000000000000000',
        },
      },
    },
    {
      title: 'Cross-chain Bridge',
      description:
        'Bridge tokens from Ethereum to Polygon using aggregated routing',
      details: {
        from: '0x8c2d66577E7CC4CF06c65f14724ee27afB6f7376',
        to: '0x8f5bbb2bb8c2ee94639e55d5f41de9b4839c1280',
        value: '0',
        data: '0xa9059cbb0000000000000000000000001111111254eeb25477b68fb85ed929f73a960582000000000000000000000000000000000000000000000000000000174876e800',
        gasLimit: '300000',
        gasPrice: '30000000000',
        aggregator: 'Hop Protocol',
        tokenIn: {
          address: '0xA0b86a33E6441b80db07E0FFEA5d3b7B0B6bF7B3',
          symbol: 'USDC',
          decimals: 6,
          amount: '100000000',
        },
        tokenOut: {
          address: '0x2791Bca1f2de4661ED88A30c99A7a9449Aa84174',
          symbol: 'USDC',
          decimals: 6,
          expectedAmount: '99500000',
        },
      },
    },
  ]

  const currentTx = transactionExamples[selectedExample]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Transaction Examples
          </h1>
          <p className="text-gray-400 text-lg">
            Real-world examples of aggregated DEX transactions
          </p>
        </div>

        {/* Example Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {transactionExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => setSelectedExample(index)}
                className={`px-6 py-3 rounded-lg border transition-colors ${
                  selectedExample === index
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
              >
                <div className="text-left">
                  <div className="font-medium">{example.title}</div>
                  <div className="text-sm opacity-80">
                    {example.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Transaction Details */}
        <div className="space-y-6">
          {/* Overview */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Transaction Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <span className="text-gray-400 text-sm">From Token</span>
                <div className="text-lg font-mono text-white mt-1">
                  {formatTokenAmount(
                    currentTx.details.tokenIn.amount,
                    currentTx.details.tokenIn.symbol,
                  )}{' '}
                  {currentTx.details.tokenIn.symbol}
                </div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">To Token</span>
                <div className="text-lg font-mono text-white mt-1">
                  {formatTokenAmount(
                    currentTx.details.tokenOut.expectedAmount,
                    currentTx.details.tokenOut.symbol,
                  )}{' '}
                  {currentTx.details.tokenOut.symbol}
                </div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Aggregator</span>
                <div className="text-lg font-mono text-white mt-1">
                  {currentTx.details.aggregator}
                </div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Gas Estimate</span>
                <div className="text-lg font-mono text-white mt-1">
                  {formatNumber(currentTx.details.gasLimit)} gas
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Data */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Transaction Data
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">From Address</label>
                  <div className="bg-gray-900 p-3 rounded border border-gray-600 font-mono text-sm text-gray-200">
                    {currentTx.details.from}
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">To Address</label>
                  <div className="bg-gray-900 p-3 rounded border border-gray-600 font-mono text-sm text-gray-200">
                    {currentTx.details.to}
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Value (ETH)</label>
                  <div className="bg-gray-900 p-3 rounded border border-gray-600 font-mono text-sm text-gray-200">
                    {currentTx.details.value}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Gas Limit</label>
                  <div className="bg-gray-900 p-3 rounded border border-gray-600 font-mono text-sm text-gray-200">
                    {formatNumber(currentTx.details.gasLimit)}
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">
                    Gas Price (wei)
                  </label>
                  <div className="bg-gray-900 p-3 rounded border border-gray-600 font-mono text-sm text-gray-200">
                    {currentTx.details.gasPrice}
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">
                    Total Gas Cost
                  </label>
                  <div className="bg-gray-900 p-3 rounded border border-gray-600 font-mono text-sm text-gray-200">
                    {formatNumber(
                      (
                        (Number.parseInt(currentTx.details.gasLimit) *
                          Number.parseInt(currentTx.details.gasPrice)) /
                        1e18
                      ).toFixed(6),
                    )}{' '}
                    ETH
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call Data */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Contract Call Data
            </h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <div className="text-gray-400 text-sm mb-2">Data Payload:</div>
              <div className="bg-black p-3 rounded font-mono text-xs text-green-400 break-all leading-relaxed">
                {formatCalldata(currentTx.details.data)}
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              This calldata contains the encoded function call and parameters
              needed to execute the swap through the aggregator contract.
            </div>
          </div>

          {/* Token Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                Input Token
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Symbol</span>
                  <span className="text-white font-mono">
                    {currentTx.details.tokenIn.symbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Address</span>
                  <span className="text-white font-mono text-sm">
                    {currentTx.details.tokenIn.address.slice(0, 10)}...
                    {currentTx.details.tokenIn.address.slice(-8)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Decimals</span>
                  <span className="text-white font-mono">
                    {currentTx.details.tokenIn.decimals}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount</span>
                  <span className="text-white font-mono">
                    {formatTokenAmount(
                      currentTx.details.tokenIn.amount,
                      currentTx.details.tokenIn.symbol,
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                Output Token
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Symbol</span>
                  <span className="text-white font-mono">
                    {currentTx.details.tokenOut.symbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Address</span>
                  <span className="text-white font-mono text-sm">
                    {currentTx.details.tokenOut.address.slice(0, 10)}...
                    {currentTx.details.tokenOut.address.slice(-8)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Decimals</span>
                  <span className="text-white font-mono">
                    {currentTx.details.tokenOut.decimals}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Expected Amount</span>
                  <span className="text-white font-mono">
                    {formatTokenAmount(
                      currentTx.details.tokenOut.expectedAmount,
                      currentTx.details.tokenOut.symbol,
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionExampleComponent
