#!/bin/bash
docker compose down
docker image rm dreamziarahcom-dreamziarahtest
docker builder prune -f  # This removes build cache
docker image prune -f    # Remove dangling images
docker compose up -d






#!/bin/bash
set -e

APP_NAME=dreamtourismit
COMPOSE_FILE=docker-compose.yml

echo "🚀 Starting deployment..."

# Pull latest code

# Build new Docker image
docker compose -f $COMPOSE_FILE build --no-cache

# Run containers with zero downtime
docker compose -f $COMPOSE_FILE up -d

# Cleanup unused stuff
docker system prune -f

echo "✅ Deployment finished successfully!"
