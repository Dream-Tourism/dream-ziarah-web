# ---- Builder Stage ----
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies only when needed
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# If you use npm
# RUN npm ci
# If yarn
RUN yarn install --frozen-lockfile
# If pnpm
# RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy project files
COPY . .

# Build Next.js app
RUN yarn build


# ---- Runner Stage ----
FROM node:20-alpine AS runner

WORKDIR /app

# Don't run as root
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy only necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]