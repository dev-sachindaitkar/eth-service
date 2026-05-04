# ETH Service

Ethereum microservice built with Node.js and TypeScript.  
Provides RPC connectivity, health checks, and ecosystem routes for the API Gateway.

## Features
- Connects to Ethereum node via RPC (Alchemy or Infura)
- Health check endpoint (`/rpc/health`)
- Balance lookup (`/balance/:address`)
- Transaction broadcast (`/tx/send`)
- Interactive API documentation via Swagger UI (`/docs`)


## Requirements
- Node.js 20+
- npm or yarn
- Alchemy account (for Ethereum RPC API key)

## Env variables
- SERVICE_PORT=4001
- ETH_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/<API_KEY>

## Setup
```bash
git clone https://github.com/<your-username>/eth-service.git
cd eth-service
npm install
