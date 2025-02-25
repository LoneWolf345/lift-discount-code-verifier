
# Build stage
FROM node:20.11-alpine3.19 AS builder

WORKDIR /app

# Set npm cache directory to a location within /app
ENV npm_config_cache=/app/.npm

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20.11-alpine3.19 AS production

# Create app directory and npm cache directory
RUN mkdir -p /app/.npm

# Create non-root user and group with flexible UID/GID for OpenShift
RUN addgroup -g 1002 appgroup && \
    adduser -u 1002 -G appgroup -s /bin/sh -D appuser && \
    chown -R 1002:1002 /app

WORKDIR /app

# Set npm cache directory
ENV npm_config_cache=/app/.npm

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

# Copy Vite configuration (needed for preview command)
COPY vite.config.ts ./

# Install curl for healthcheck
RUN apk --no-cache add curl

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Change permissions to support arbitrary user IDs in OpenShift
RUN chown -R 1002:0 /app && \
    chmod -R g=u /app

# Switch to non-root user
USER 1002

# OpenShift-specific labels
LABEL io.openshift.expose-services="8080:http" \
      io.k8s.description="Vite React application" \
      io.openshift.tags="nodejs,vite,react"

# Expose port
EXPOSE 8080

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

# Start the application
CMD ["npm", "run", "preview"]
