'use client'

import { Suspense } from 'react'
import AggregatorsListComponent from '@/components/aggregators-list-example/aggregators-list'
import MetaAggregatorQuotes from '@/components/fetch-quotes-example/meta-aggregator-quotes'
import Tabs, { type TabItem } from '@/components/tabs/tabs'
import TransactionExampleComponent from '@/components/transaction-example/transaction-example'

const TabbedLayout = () => {
  const tabs: TabItem[] = [
    {
      id: 'quotes',
      label: 'Fetch Quotes',
      component: MetaAggregatorQuotes,
    },
    {
      id: 'aggregators',
      label: 'Aggregators List',
      component: AggregatorsListComponent,
    },
    {
      id: 'transactions',
      label: 'Transaction Example',
      component: TransactionExampleComponent,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <Suspense
        fallback={
          <div className="bg-gray-800 border-b border-gray-700 h-16 animate-pulse" />
        }
      >
        <Tabs tabs={tabs} defaultTab="quotes" />
      </Suspense>
    </div>
  )
}

export default TabbedLayout
