import type { Address, Hash } from 'viem'

export interface Quote {
  aggregator: string
  quote: {
    status: string
    amountIn: string
    amountOut: string
    fee: string
    value: string
    aggregator: string
    routerAddr: Address
    calldata: Hash
    gas: string
    simulationAmountOut: string
    priceImpact: number
  }
  timestamp: number
}
