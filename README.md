## Setup

### Server
- `npm install`
- Copy .env.example to .env and fill in everything without a default value.
- `npm run migrate`
- `npm seed`
- `npm start`

### Client
- `npm install`
- `npm run dev`

## Testing
For e2e tests, they are setup to pass after `npm seed` is run inside `/server`.