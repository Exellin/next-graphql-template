# Compile to Javascript
FROM node:16 AS node-build

WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

# Production
FROM node:16 AS node-prod

WORKDIR /usr/src/app

# Setup pscale CLI
RUN wget https://github.com/planetscale/cli/releases/download/v0.60.0/pscale_0.60.0_linux_amd64.tar.gz
RUN tar -xf pscale_0.60.0_linux_amd64.tar.gz -C /usr/bin/
RUN rm pscale_0.60.0_linux_amd64.tar.gz

# Install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy compiled javascript files to dist working directory
COPY --from=node-build ./usr/src/app/dist ./dist
WORKDIR ./dist

EXPOSE 4000

CMD ["pscale", "connect", "next-graphql-template", "main", "--execute", "node index.js"]