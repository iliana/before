# syntax=docker/dockerfile:1.2

FROM rust:1.52-buster as builder
WORKDIR /usr/src/before
COPY . .
RUN --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=/usr/local/cargo/git \
    --mount=type=cache,target=/usr/src/before/target \
    cargo build --release && cargo install --path .
RUN objcopy --compress-debug-sections /usr/local/cargo/bin/before

FROM debian:buster-slim
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/local/cargo/bin/before /usr/local/bin/before
CMD ["before"]
