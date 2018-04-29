#!/usr/bin/env bash

ssh-keyscan 206.189.19.182 >> ~/.ssh/known_hosts

ssh -tt circleci@206.189.19.182 << EOF
    if [ $( ls /var/www/$DOMAIN_NAME ) ]; then rm -R /var/www/$DOMAIN_NAME;fi
    mkdir /var/www/$DOMAIN_NAME
    exit
EOF

gzip --best --keep --recursive --force ./dist/
scp -r ./dist/. circleci@206.189.19.182:/var/www/$DOMAIN_NAME
