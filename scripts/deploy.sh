#!/usr/bin/env bash

ssh-keyscan 206.189.19.182 >> ~/.ssh/known_hosts

ssh -tt circleci@206.189.19.182 << EOF
    rm -rf /var/www/$DOMAIN_NAME
    mkdir /var/www/$DOMAIN_NAME
    exit
EOF

gzip --best --keep --recursive --force ./dist/
rsync -av --del dist/ circleci@206.189.19.182:/var/www/$DOMAIN_NAME
