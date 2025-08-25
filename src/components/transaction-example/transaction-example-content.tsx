'use client'

import { useEffect, useState } from 'react'
import { erc20Abi, parseUnits } from 'viem'
import {
  useAccount,
  useReadContract,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import { useAggregatorsQuote } from '@/hooks/use-aggregators-quote'
import type { Quote } from '@/lib/types'
import ApprovalStatus from './approval-status'
import ConnectWalletScreen from './connect-wallet-screen'
import Header from './header'
import QuoteDisplay from './quote-display'
import TokenDetails from './token-details'
import TradeInfo from './trade-info'
import TransactionStatus from './transaction-status'
import { USDT_ADDRESS, USDT_AMOUNT } from './types'

const TransactionExampleContent = () => {
  const { isConnected, address } = useAccount()
  const { latestQuote, isConnected: isQuoteConnected } =
    useAggregatorsQuote(address)
  const { sendTransaction, data: hash, isPending, error } = useSendTransaction()
  const {
    writeContract,
    data: approvalHash,
    isPending: isApprovalPending,
  } = useWriteContract()
  const [selectedQuote, setSelectedQuote] = useState<Quote | undefined>(
    undefined,
  )

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const { isLoading: isApprovalConfirming, isSuccess: isApprovalConfirmed } =
    useWaitForTransactionReceipt({
      hash: approvalHash,
    })

  // Check USDT allowance for the current quote's router
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: USDT_ADDRESS,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address!, latestQuote?.quote?.routerAddr!],
    query: {
      enabled: !!(address && latestQuote?.quote?.routerAddr),
    },
  })

  const handleApproveUSDT = async () => {
    if (!latestQuote?.quote?.routerAddr) return

    writeContract({
      address: USDT_ADDRESS,
      abi: erc20Abi,
      functionName: 'approve',
      args: [latestQuote.quote.routerAddr, parseUnits(USDT_AMOUNT, 6)],
    })
  }

  const handleExecuteTransaction = (quote: Quote) => {
    if (!quote?.quote?.calldata) {
      return
    }

    // Check if approval is needed first
    const requiredAmount = parseUnits(USDT_AMOUNT, 6)
    if (allowance && allowance < requiredAmount) {
      return
    }

    setSelectedQuote(quote)

    sendTransaction({
      to: quote.quote.routerAddr as `0x${string}`,
      data: quote.quote.calldata as `0x${string}`,
      value: BigInt(quote.quote?.value ?? BigInt(0)),
      gas: BigInt(quote.quote.gas ?? BigInt(5000000)),
    })
  }

  // Check if approval is sufficient
  const requiredAmount = parseUnits(USDT_AMOUNT, 6)
  const hasInsufficientAllowance =
    allowance !== undefined && allowance < requiredAmount

  // Refetch allowance after approval is confirmed
  useEffect(() => {
    if (isApprovalConfirmed) {
      refetchAllowance()
    }
  }, [isApprovalConfirmed, refetchAllowance])

  // Show connect wallet screen if not connected
  if (!isConnected) {
    return <ConnectWalletScreen />
  }

  // Show transaction examples if wallet is connected
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-6">
        <Header isQuoteConnected={isQuoteConnected} />

        <TradeInfo latestQuote={latestQuote} />

        <TransactionStatus
          hash={hash}
          isPending={isPending}
          isConfirming={isConfirming}
          isConfirmed={isConfirmed}
          error={error}
          selectedQuote={selectedQuote}
        />

        <ApprovalStatus
          approvalHash={approvalHash}
          isApprovalPending={isApprovalPending}
          isApprovalConfirming={isApprovalConfirming}
          isApprovalConfirmed={isApprovalConfirmed}
        />

        <QuoteDisplay
          latestQuote={latestQuote}
          hasInsufficientAllowance={hasInsufficientAllowance}
          isApprovalPending={isApprovalPending}
          isApprovalConfirming={isApprovalConfirming}
          isPending={isPending}
          isConfirming={isConfirming}
          onApproveUSDT={handleApproveUSDT}
          onExecuteTransaction={handleExecuteTransaction}
        />

        {latestQuote && (
          <TokenDetails
            latestQuote={latestQuote}
            allowance={allowance}
            hasInsufficientAllowance={hasInsufficientAllowance}
          />
        )}
      </div>
    </div>
  )
}

export default TransactionExampleContent
