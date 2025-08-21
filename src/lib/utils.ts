export const formatCalldata = (calldata: string) => {
  if (!calldata) return ''
  return calldata.length > 100
    ? `${calldata.slice(0, 50)}...${calldata.slice(-20)}`
    : calldata
}

export const formatTokenAmount = (
  value: string | number | undefined,
  tokenSymbol: 'USDT' | 'HYPE' | 'ETH' = 'HYPE',
) => {
  if (!value) return '0.00'
  const num = typeof value === 'string' ? Number.parseFloat(value) : value

  let decimals: number
  let divisor: number

  switch (tokenSymbol) {
    case 'USDT':
      decimals = 6
      divisor = 10 ** 6
      break
    case 'HYPE':
      decimals = 18
      divisor = 10 ** 18
      break
    case 'ETH':
      decimals = 18
      divisor = 10 ** 18
      break
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
