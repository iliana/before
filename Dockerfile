FROM rust:1.58-buster as builder
COPY --from=node:16-buster-slim /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node:16-buster-slim /usr/local/include/node /usr/local/include/node
COPY --from=node:16-buster-slim /usr/local/bin /usr/local/bin
ENV STATIC_DIR=/var/www/before
WORKDIR /usr/src/before
COPY . .
RUN npm ci && npm run build
RUN cargo test --release
RUN cargo install --path .
RUN objcopy --compress-debug-sections /usr/local/cargo/bin/before

FROM debian:buster-slim
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/local/cargo/bin/before /usr/local/bin/before
COPY --from=builder /usr/src/before/out /var/www/before
CMD ["before"]
