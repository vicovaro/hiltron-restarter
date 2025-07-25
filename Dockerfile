FROM mcr.microsoft.com/playwright:v1.54.1-noble-amd64

# Enable Corepack and set Yarn Modern
RUN corepack enable && \
    corepack prepare yarn@stable --activate

WORKDIR /app

# Install Xvfb
RUN apt-get update && apt-get install -y xvfb

# Copy application files (exclude node_modules in .dockerignore)
COPY . .

RUN yarn install

# Start command using Yarn
ENTRYPOINT ["xvfb-run", "--auto-servernum", "--server-args='-screen 0 1920x1080x24'"]
CMD ["yarn", "prod"]