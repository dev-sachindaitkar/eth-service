# -----------------------------
# 1. Builder Stage
# -----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build


# -----------------------------
# 2. Production Runner Stage
# -----------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy built JS from builder
COPY --from=builder /app/dist ./dist

# Copy env file (optional)
# COPY .env .env

EXPOSE 4001

CMD ["node", "dist/server/server.js"]