FROM php:8.3-cli-alpine

WORKDIR /app

# Install system dependencies & PHP extensions
RUN apk add --no-cache \
    postgresql-dev \
    sqlite-dev \
    libzip-dev \
    zip \
    unzip \
    curl \
    git \
    && docker-php-ext-install pdo pdo_pgsql pdo_sqlite zip pcntl \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction

EXPOSE 8000

HEALTHCHECK --interval=15s --timeout=5s --retries=3 \
  CMD curl -f http://localhost:8000/api/ping || exit 1

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
