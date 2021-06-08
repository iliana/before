FROM rust:1.52-buster as builder
WORKDIR /usr/src/before
COPY . .
RUN cargo install --path .
RUN objcopy --compress-debug-sections /usr/local/cargo/bin/before

FROM debian:buster-slim
RUN apt-get update && apt-get install -y libssl1.1 && rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/local/cargo/bin/before /usr/local/bin/before
CMD ["before"]
