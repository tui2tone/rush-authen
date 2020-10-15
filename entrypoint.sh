#!/bin/sh -l

./node_modules/.bin/typeorm schema:sync
./node_modules/.bin/ts-node ./node_modules/typeorm-seeding/dist/cli.js seed
node dist/main.js