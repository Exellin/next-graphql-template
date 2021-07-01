## Setup

### Server
- `npm install`
- Copy .env.example to .env and fill in everything without a default value.
- Create a MySql user with credentials `DATABASE_USERNAME` and `DATABASE_PASSWORD`
- Create a database with a `DATABASE_NAME`
- `npm run migrate`
- `npm seed`
- `npm start`

### Client
- `npm install`
- `npm run dev`

## Testing
### Server
- Copy .env.example to test/test.env and fill in everything without a default value.
- Create a MySql user with credentials `DATABASE_USERNAME` and `DATABASE_PASSWORD`
- Create a database with a DATABASE_NAME
- `npm run migrate-test`
- `npm test`

### E2E
- Ensure the server is running with `npm start` within `/server`
- Ensure the frontend is running with `npm run dev` within `/client`
- Ensure the database is seeded with `npm seed` within `/server`
- `npm test` within `/client`

## Docker
- Create docker image with `docker build -t next-graphql-template:latest .`
- Run the image with `docker run -p 4000:4000 --env-file prod.env next-graphql-template:latest`

## Planetscale Setup
 - Install the [PlanetScale CLI](https://github.com/planetscale/cli)
 - `pscale auth login`
 - `pscale database create <database>`
 - `pscale service-token create`, save result to PLANETSCALE_SERVICE_TOKEN_NAME and PLANETSCALE_SERVICE_TOKEN to prod.env
 - `pscale service-token add-access <service_token_name> connect_production_branch --database <database>`

## Planetscale Migrations
 - `pscale branch create <database> <branch>`
 - `pscale shell <database> <branch>`
 - Run sql from latest knex migration output to terminal (ex `create table` and `alter table`)
 - test changes manually with `pscale connect <database> <branch> --execute 'npm start'`
 - `pscale deploy-request create <database> <branch>`
 - verify changes with `pscale branch diff <database> <branch>`
 - `pscale deploy-request list <database>`
 - `pscale deploy-request deploy <database> <deploy-request-number>` (found with deploy-request list)
 - `pscale branch delete <database> <branch>`
