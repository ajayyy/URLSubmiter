#!/bin/bash
set -e
echo 'Entrypoint script'
cd /usr/src/app
cp /etc/urlSubmit/config.json . || cat <<EOF > config.json
{
    "port": 8080,
    "behindProxy": "X-Forwarded-For",
    "mode": "development",
    "db": "./databases/list.db",
    "createDatabaseIfNotExist": true,
    "schemaFolder": "./databases",
    "dbSchema": "./databases/_list.db.sql",
    "readOnly": false
}
EOF
node dist/index.js
