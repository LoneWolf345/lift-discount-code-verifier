
# Build stage
FROM node:20.11-alpine3.19 AS builder

# Create app directory structure
WORKDIR /opt/app-root/src

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies) with cache disabled
RUN npm ci --no-cache

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20.11-alpine3.19 AS production

# Create OpenShift-compatible directory structure
RUN mkdir -p /opt/app-root/src \
    /opt/app-root/home && \
    chmod -R 775 /opt/app-root

WORKDIR /opt/app-root/src

# Set environment variables
ENV HOME=/opt/app-root/home \
    NODE_ENV=production \
    PORT=8080

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev --no-cache

# Copy built assets from builder stage
COPY --from=builder /opt/app-root/src/dist ./dist

# Copy Vite configuration (needed for preview command)
COPY vite.config.ts ./

# Install curl for healthcheck
RUN apk --no-cache add curl

# Set permissions for OpenShift arbitrary user ID support
# Any UID in the OpenShift specified range (1002290000-1002300000) needs write access
RUN chown -R 1002290000:0 /opt/app-root && \
    chmod -R g=u /opt/app-root

# Drop capabilities to comply with OpenShift security requirements
# Annotations for OpenShift to configure MCS labels and supplemental groups
# are handled at the deployment level

# Switch to unprivileged user (OpenShift will assign the appropriate UID)
USER 1002290000

# OpenShift-specific labels
LABEL io.openshift.expose-services="8080:http" \
      io.k8s.description="Vite React application for discount code verification" \
      io.openshift.tags="nodejs,vite,react" \
      io.openshift.non-scalable="false" \
      io.k8s.display-name="discount-code-verifier-uat"

# Expose port
EXPOSE 8080

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

# Start the application
CMD ["npm", "run", "preview"]
