# Next.js Project with React Query and React 18

This repository contains a Next.js project that utilizes React Query for data fetching and caching, and is built with React 18.

## Prerequisites

Before getting started, ensure that you have the following dependencies installed:

- Node.js (version v18.16.0 or higher)
- NPM (version 9.5.1)

## Project Setup

To set up the project, follow these steps:

1. Clone the repository:

```bash
  git clone https://github.com/WilferCiro/arins-frontend
  cd frontend
```

2. Install the dependencies:

```bash
  yarn install
```

## Development

.env file:

```bash
# APP
API_BACKEND_URL=http://localhost:3001 # URL of nestjs backend
ADMIN_ACCOUNTS=

# AUTH
NEXTAUTH_URL=http://localhost:3000 # URL of this front
NEXTAUTH_SECRET=
SECRET_JWT=
API_KEY_LOGIN=
APP_DOMAIN=arins.co

# SCAN
ETHERSCAN_URL=https://sepolia.etherscan.io/tx
```

https://generate-secret.vercel.app/32

To start the development server, use the following command:

```bash
yarn dev
```

The project will be accessible at http://localhost:3000.


## Features

This Next.js project includes the following features:

- React Query for efficient data fetching and caching.
- React 18 for leveraging the latest capabilities of React.
- Custom API routes for server-side logic and handling API requests.
- CSS modules for scoped styling.
