# Meta Aggregator Quote Streaming Tutorial

This Next.js tutorial shows how to connect to and stream data from the Ooga Booga Meta Dex Aggregator API using Server-Sent Events (SSE).

---

## 🛠️ Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd meta-agg-fe-tutorial

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application running.

---

## 🏗️ Architecture Overview & Core Components

![img.png](img.png)

**0. Ooga Booga Meta Dex Aggregator Backend**
- Ooga Booga Aggregator service providing real-time swap quotes
- Server-sent events streaming infrastructure

**1. API** (`src/api/meta-stream-api.ts`)
- Manages SSE connections to the aggregator API
- Handles quote stream parameters and events

**2. Connection Management - useQuoteStream** (`src/hooks/use-quote-stream.ts`)
- React hook for managing quote streams
- Event subscription and cleanup lifecycle

**3. Logic Layer - useAggregatorsQuote** (`src/hooks/use-aggregators-quote.ts`)
- Preconfigured hook for USDT/HYPE quotes
- Uses `useQuoteStream` under the hood

**4. Presentation Layer Components** (`src/components/`)
- React components for displaying quote data

> **That's Everything you need to get started with streaming quotes.**

---

## 📚 Key Concepts

### 1. Quote Stream API

The application connects to a streaming API that provides real-time swap quotes:

```typescript
const AGGREGATOR_BASE_URL = 'https://internal-gateway-hyperevm-dev.up.railway.app'
```

**Supported Parameters:**
- `tokenIn`: Input token address
- `tokenOut`: Output token address  
- `amount`: Amount to swap (in token units)
- `maxSlippage`: Maximum acceptable slippage (default: 0.01)
- `to`: Recipient address (optional)
- `aggregators`: List of specific aggregators to query (optional)

### 2. Event Types

The SSE stream emits several event types:

- `connected`: Initial connection established
- `quote`: New quote data received
- `error`: Error occurred during streaming
- `heartbeat`: Keep-alive signal

### 3. Quote Data Structure

Each quote contains information about the swap including:

```typescript
type QuoteResponse = {
  aggregator: string;
  quote: {
    status: string;
    amountIn: string;
    amountOut: string;
    fee: string;
    value: string;
    aggregator: string;
    routerAddr: string;
    calldata: string;
    gas: string;
    simulationAmountOut: string;
    priceImpact: number;
  };
  timestamp: number;
};
```

---

## 🔧 Usage Examples

### Basic Quote Stream

```typescript
import { useQuoteStream } from '@/hooks/use-quote-stream'

const MyComponent = () => {
  const { isConnected, latestQuote, error } = useQuoteStream({
    chainId: 999, // HyperEVM chain ID
    params: {
      tokenIn: '0xB8CE59FC3717ada4C02eaDF9682A9e934F625ebb', // USDT
      tokenOut: '0x0000000000000000000000000000000000000000', // HYPE
      amount: '10000000', // 10 USDT
      maxSlippage: '0.5',
    },
    enabled: true
  })

  if (!isConnected) return <div>Connecting...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <h3>Latest Quote:</h3>
      <pre>{JSON.stringify(latestQuote, null, 2)}</pre>
    </div>
  )
}
```

---

## 🔍 Code Structure

```
src/
├── api/
│   └── meta-stream-api.ts     # SSE connection management
├── hooks/
│   ├── use-quote-stream.ts    # Generic quote streaming hook
│   └── use-aggregators-quote.ts # Preconfigured USDT/HYPE hook
├── components/
│   └── quotes-component/      # Quote display components
└── app/
    ├── page.tsx              # Main page
    ├── layout.tsx            # App layout
    └── globals.css           # Global styles
```

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
