import { formatUnits } from 'viem'

export const formatCalldata = (calldata: string) => {
  if (!calldata) return ''
  return calldata.length > 100
    ? `${calldata.slice(0, 50)}...${calldata.slice(-20)}`
    : calldata
}

export const formatTokenAmount = (
  value: string | number | undefined,
  tokenSymbol = 'HYPE',
) => {
  if (!value) return '0.00'
  const num = typeof value === 'string' ? Number.parseFloat(value) : value

  let decimals: number
  let divisor: number

  switch (tokenSymbol) {
    case 'USDT':
    case 'USDC':
      decimals = 6
      divisor = 10 ** 6
      break
    case 'HYPE':
    case 'ETH':
    case 'DAI':
    default:
      decimals = 18
      divisor = 10 ** 18
  }

  const adjustedNum = num / divisor

  return adjustedNum.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: Math.min(8, decimals), // Cap display at 8 decimal places for readability
  })
}

export const formatNumber = (
  value: string | number | undefined,
  decimals = 6,
) => {
  if (!value) return '0.00'
  const num = typeof value === 'string' ? Number.parseFloat(value) : value
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
  })
}

export const roundAmount = (
  amount: number | string | undefined,
  decimals = 3,
  bigAmountDecimals?: number,
): number => {
  if (!amount) return 0

  const numAmount = Number(amount)

  if (Number.isInteger(numAmount)) return numAmount

  if (numAmount > -1 && numAmount < 1) {
    const multiplier =
      10 ** (decimals - Math.floor(Math.log10(Math.abs(numAmount))) - 1)

    return Math.round(numAmount * multiplier) / multiplier
  }

  return Number(numAmount.toFixed(bigAmountDecimals ?? decimals))
}

export const formatBigIntTokenAmount = (
  number?: bigint,
  tokenDecimals?: number,
  symbol?: string,
  roundDecimals = 6,
  bigAmountDecimals?: number,
): string => {
  let formattedNumber = String(
    roundAmount(
      formatUnits(number ?? BigInt(0), tokenDecimals ?? 18),
      roundDecimals,
      bigAmountDecimals,
    ),
  )

  if (symbol) formattedNumber += ` ${symbol.toUpperCase()}`

  return formattedNumber
}
