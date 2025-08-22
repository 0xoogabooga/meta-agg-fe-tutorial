'use client'

import TransactionExampleContent from './transaction-example-content'
import { WalletProvider } from './wallet-provider'

const TransactionExampleComponent = () => {
  return (
    <WalletProvider>
      <TransactionExampleContent />
    </WalletProvider>
  )
}

export default TransactionExampleComponent
