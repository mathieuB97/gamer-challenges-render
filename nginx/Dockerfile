# Multi-stage build: build frontend, then serve via nginx

# 1) Build frontend
FROM node:20-alpine AS build
WORKDIR /app/client/myapp
# Install dependencies
COPY client/myapp/package.json client/myapp/package-lock.json ./
RUN npm ci
# Copy source and build
COPY client/myapp .
RUN npm run build

# 2) Serve with nginx
FROM nginx:1.25-alpine
# Redirect logs to stdout/stderr
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log
# Copy nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# Copy built frontend
COPY --from=build /app/client/myapp/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
