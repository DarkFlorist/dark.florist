# Cache the kubo image that provides the ipfs binary.
FROM ipfs/kubo:v0.25.0@sha256:0c17b91cab8ada485f253e204236b712d0965f3d463cb5b60639ddd2291e7c52 AS ipfs-kubo

# Runtime image used to calculate and publish the IPFS hash.
FROM debian:12.6-slim@sha256:39868a6f452462b70cf720a8daff250c63e7342970e749059c105bf7c1e8eeaf

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY --from=ipfs-kubo /usr/local/bin/ipfs /usr/local/bin/ipfs

# This repo ships a prebuilt static site in dist/.
COPY dist/ /export

RUN ipfs init \
  && ipfs add --cid-version 1 --quieter --only-hash --recursive /export > /ipfs_hash.txt \
  && cat /ipfs_hash.txt

WORKDIR /temp
COPY <<'EOF' /entrypoint.sh
#!/bin/sh
set -e

echo "Build Hash: $(cat /ipfs_hash.txt)"

IPFS_IP4_ADDRESS=$(getent ahostsv4 host.docker.internal | grep STREAM | head -n 1 | cut -d ' ' -f 1)

echo "Adding files to docker running IPFS at $IPFS_IP4_ADDRESS"
IPFS_HASH=$(ipfs add --api /ip4/$IPFS_IP4_ADDRESS/tcp/5001 --cid-version 1 --quieter -r /export)
echo "Uploaded Hash: $IPFS_HASH"
EOF

RUN chmod u+x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
