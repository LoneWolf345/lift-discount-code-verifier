
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

# Copy Vite configuration (needed for preview command)
COPY vite.config.ts ./

# Install curl for healthcheck
RUN apk --no-cache add curl

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose port
EXPOSE 8080

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

# Start the application
CMD ["npm", "run", "preview"]
