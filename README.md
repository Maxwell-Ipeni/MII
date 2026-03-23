# Elo Tech - SaaS Platform

A full-stack SaaS platform for modern businesses, built with Next.js, NestJS, and Convex.

## Project Structure

```
elo-tech/
├── apps/
│   └── web/              # Next.js frontend
├── services/
│   └── api/               # NestJS backend API
├── packages/
│   ├── ui/                # Shared UI components
│   └── utils/             # Shared utilities
├── src/                   # Root app (Vite + React)
└── public/                # Static assets
```

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: NestJS, TypeScript
- **Database**: Convex (serverless)
- **Authentication**: JWT with Passport
- **Integrations**: M-Pesa, WhatsApp, SMS (Africa's Talking)

## Prerequisites

- Node.js 20+
- npm 10+

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy the example files and configure:

```bash
# API service
cp services/api/.env.example services/api/.env

# Web app
cp apps/web/.env.example apps/web/.env.local
```

#### Required Environment Variables

**API (.env):**
```env
# Server
PORT=4000
FRONTEND_URL=http://localhost:3000

# JWT
JWT_SECRET=your-secret-key

# Convex (see below)
CONVEX_DEPLOYMENT_URL=your-deployment-url
CONVEX_ADMIN_KEY=your-admin-key

# M-Pesa (optional)
MPESA_API_KEY=
MPESA_CONSUMER_SECRET=
MPESA_SHORT_CODE=
MPESA_PASSKEY=

# SMS - Africa's Talking (optional)
AFRICASTALKING_API_KEY=
AFRICASTALKING_USERNAME=sandbox

# WhatsApp (optional)
WHATSAPP_API_KEY=
WHATSAPP_PHONE_NUMBER_ID=
```

**Web (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 3. Convex Setup

#### Getting Convex Credentials

1. Create a Convex project:
   ```bash
   npm create convex@latest
   ```

2. Get your deployment URL:
   - Run `npx convex dev` or go to [Convex Dashboard](https://dashboard.convex.dev)
   - Find your deployment URL (e.g., `https://your-project.convex.cloud`)

3. Get your admin key:
   - Go to Convex Dashboard → Settings → API Keys
   - Create or copy your admin key

4. Add to `.env`:
   ```env
   CONVEX_DEPLOYMENT_URL=https://your-project.convex.cloud
   CONVEX_ADMIN_KEY=your-admin-key-here
   ```

#### Verifying Convex Connection

Test your Convex connection:

```bash
cd services/api
npm run dev
# Check logs for: "Convex client initialized successfully"
```

Or add a health check endpoint that queries Convex.

### 4. Run Development Servers

```bash
# Run all services (web + api)
npm run dev

# Or run individually:
cd apps/web && npm run dev    # Frontend on http://localhost:3000
cd services/api && npm run dev  # API on http://localhost:4000
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run all services in development |
| `npm run build` | Build all packages |
| `npm run lint` | Lint all packages |

## Features

- Modern, responsive website with hero section, capabilities, projects, and case studies
- AI chatbot demo with workflow animations
- Product showcase with links to different platforms
- Contact form with validation
- Industry solutions and success stories

## License

MIT
