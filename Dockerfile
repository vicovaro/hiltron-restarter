# Use official Node.js 22 image with Alpine (smaller footprint)
FROM node:22-alpine

# Enable corepack for Yarn
RUN corepack enable && \
    corepack prepare yarn@stable --activate

# Set working directory
WORKDIR /usr/src/app

# Install dependencies first (cached layer)
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile && \
    yarn cache clean

# Copy application files (exclude node_modules in .dockerignore)
COPY . .

# Copy .env file (use separate COPY to preserve layer caching)
COPY .env ./

# Environment validation
RUN if [ ! -f .env ]; then echo "ERROR: .env file missing!" && exit 1; fi

# Set non-root user for security
RUN chown -R node:node .
USER node

# Runtime configuration
ENV NODE_ENV=production
EXPOSE 3000

# Start command using Yarn
CMD ["yarn", "test:e2e", "ci"]