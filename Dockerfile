# ====== DEPENDENCIES ======
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy package manager lock files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install pnpm explicitly before using it
RUN npm install -g pnpm && \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then pnpm install; \
    else echo "Lockfile not found." && exit 1; \
    fi

# ====== BUILDER ======
FROM node:20-alpine AS builder
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLIENTVAR

WORKDIR /app

# Copy dependencies from previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the app
RUN npm install -g pnpm && \
    if [ -f yarn.lock ]; then SKIP_ENV_VALIDATION=1 yarn build; \
    elif [ -f package-lock.json ]; then SKIP_ENV_VALIDATION=1 npm run build; \
    elif [ -f pnpm-lock.yaml ]; then SKIP_ENV_VALIDATION=1 pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi

# ====== RUNNER ======
FROM node:20-alpine AS runner
WORKDIR /app

# Set environment
ENV NODE_ENV production

# Copy built files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 3241
ENV PORT 3241

# Start the application using pnpm
CMD ["pnpm", "start", "--host", "0.0.0.0", "--port", "3241"]
