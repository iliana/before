FROM rust:1.57-buster as builder
ENV STATIC_DIR=/var/www/before
WORKDIR /usr/src/before
COPY . .
RUN cargo test && cargo install --path .
RUN objcopy --compress-debug-sections /usr/local/cargo/bin/before

FROM node:16-buster as js-builder
WORKDIR /usr/src/before
COPY . .
RUN npm ci && npx postcss --env production src/styles.css -o static/styles.css

FROM debian:buster-slim
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/local/cargo/bin/before /usr/local/bin/before
COPY --from=builder /usr/src/before/static /var/www/before
COPY --from=js-builder /usr/src/before/static/styles.css /var/www/before/styles.css
CMD ["before"]
