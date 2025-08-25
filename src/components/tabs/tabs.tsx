'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export interface TabItem {
  id: string
  label: string
  component: React.ComponentType
}

interface TabsProps {
  tabs: TabItem[]
  defaultTab?: string
}

const Tabs = ({ tabs, defaultTab }: TabsProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(0)

  const memoizedTabs = useMemo(() => tabs, [tabs])

  // Initialize active tab from URL on component mount
  useEffect(() => {
    const tabParam = searchParams.get('tab') || defaultTab
    if (tabParam) {
      const tabIndex = memoizedTabs.findIndex((tab) => tab.id === tabParam)
      if (tabIndex !== -1) {
        setActiveTab(tabIndex)
      }
    }
  }, [searchParams, memoizedTabs, defaultTab])

  // Handle tab change with URL update
  const handleTabChange = (index: number) => {
    setActiveTab(index)
    const tabId = memoizedTabs[index].id
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', tabId)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const ActiveComponent = memoizedTabs[activeTab].component

  return (
    <>
      {/* Tab Navigation */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-8 px-6">
            {memoizedTabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(index)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === index
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full">
        <ActiveComponent />
      </div>
    </>
  )
}

export default Tabs
