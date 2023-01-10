# Check foreign keys missing index

![node-current](https://img.shields.io/node/v/check-fk-missing-index)
![GitHub package.json version](https://img.shields.io/github/package-json/v/adlacruzes/check-fk-missing-index)
![GitHub Workflow Status (with branch)](https://img.shields.io/github/actions/workflow/status/adlacruzes/check-fk-missing-index/ci.yml)

Check foreign keys missing index in Postgres

## Why?

PostgreSQL automatically creates indexes on primary keys and unique constraints, but not on foreign keys.

So I created a command to find the columns that maybe are in need of an index. It's up to you.

## Usage

```bash
npx check-fk-missing-index
```

```bash
Usage: check-fk-missing-index [options]

Options:
  -V, --version          output the version number
  --format <format>      Output format (choices: "table", "json", "minimal", default: "table")
  --host <host>          database server host or socket directory (default: "localhost")
  --port <port>          database server port (default: "5432")
  --username <username>  database user name (default: "postgres")
  --database <dbname>    database name to connect to (default: "postgres")
  --password <password>  database password (default: "")
  --no-fail              return code 0 on exit
  -h, --help             display help for command

```
