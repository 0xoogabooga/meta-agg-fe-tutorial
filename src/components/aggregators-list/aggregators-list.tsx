'use client'

const AggregatorsListComponent = () => {
  const aggregators = [
    {
      name: '1inch',
      description: 'Leading DEX aggregator with smart routing',
      tvl: '$2.1B',
      protocols: 50,
      chains: 12,
      status: 'active',
    },
    {
      name: 'Paraswap',
      description: 'Multi-chain DEX aggregator with optimal pricing',
      tvl: '$1.8B',
      protocols: 45,
      chains: 10,
      status: 'active',
    },
    {
      name: '0x Protocol',
      description: 'Open protocol for decentralized exchange',
      tvl: '$1.2B',
      protocols: 38,
      chains: 8,
      status: 'active',
    },
    {
      name: 'Kyber',
      description: 'On-chain liquidity protocol',
      tvl: '$850M',
      protocols: 32,
      chains: 6,
      status: 'active',
    },
    {
      name: 'Matcha',
      description: 'DEX aggregator by 0x Labs',
      tvl: '$650M',
      protocols: 25,
      chains: 5,
      status: 'active',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Aggregators List
          </h1>
          <p className="text-gray-400 text-lg">
            Overview of major DEX aggregators and their metrics
          </p>
        </div>

        {/* Aggregators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aggregators.map((aggregator, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">
                  {aggregator.name}
                </h3>
                <span
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    aggregator.status === 'active'
                      ? 'bg-green-900 text-green-400 border border-green-700'
                      : 'bg-red-900 text-red-400 border border-red-700'
                  }`}
                >
                  {aggregator.status}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {aggregator.description}
              </p>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">TVL</span>
                  <span className="text-white font-mono font-medium">
                    {aggregator.tvl}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Protocols</span>
                  <span className="text-white font-mono font-medium">
                    {aggregator.protocols}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Chains</span>
                  <span className="text-white font-mono font-medium">
                    {aggregator.chains}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-6">
            Ecosystem Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {aggregators.length}
              </div>
              <div className="text-gray-400 text-sm">Total Aggregators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                $6.6B
              </div>
              <div className="text-gray-400 text-sm">Combined TVL</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">190</div>
              <div className="text-gray-400 text-sm">Total Protocols</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">41</div>
              <div className="text-gray-400 text-sm">Supported Chains</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AggregatorsListComponent
