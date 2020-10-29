FROM php:7.4-fpm

RUN apt-get update && apt-get install -y -q --no-install-recommends \
    curl \
    libmcrypt-dev \
    libpq-dev \
    libmagickwand-dev \
    build-essential locales acl wget zip \
    msmtp \
    git \
    unzip \
    && pecl install imagick \
    && docker-php-ext-enable imagick \
    && docker-php-ext-install pdo pdo_pgsql \
    && pecl install xdebug-2.9.8 \
    && docker-php-ext-enable xdebug \
    && apt-get clean \
    && rm -r /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer