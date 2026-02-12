# SQL basics

## pgsql

> Run psql from docker container, var are defined in .database.env (you should cp .database.example.env to .database.env and fill it with your own values)

```bash
docker exec -it gamerChallenges_db sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
```

### cmd psql

```sql
-- list databases
\l
-- connect to a database
\c <database_name>
-- list tables
\dt
-- describe a table (columns, types, PK, FK, etc.)
\d <table_name>
-- describe table with size
\d+ <table_name>
-- list indexes
\di
-- list users
\du
-- list extensions
\dx
-- run a sql file
\i <file_path>
-- run SQL command. !important with Sequelize table names must be wrapped in '"'.
SELECT * FROM "<table_name>";
-- quit psql
\q
```