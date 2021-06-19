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
- Copy .env.example to test.env and fill in everything without a default value.
- Create a MySql user with credentials `DATABASE_USERNAME` and `DATABASE_PASSWORD`
- Create a database with a DATABASE_NAME
- `npm run migrate-test`
- `npm test`

### E2E
- Ensure the server is running with `npm start` within `/server`
- Ensure the frontend is running with `npm run dev` within `/client`
- Ensure the database is seeded with `npm seed` within `/server`
- `npm test` within `/client`
