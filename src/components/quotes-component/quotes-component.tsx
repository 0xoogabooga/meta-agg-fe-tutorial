'use client'

import { useAggregatorsQuote } from '@/hooks/use-aggregators-quote'

const QuotesComponent = () => {
  const { latestQuote } = useAggregatorsQuote()

  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.log({ latestQuote })

  return <div>Look at console. Quotes are logging rn</div>
}

export default QuotesComponent
