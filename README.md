# portuguese-ai-app

Portuguese Learning AI web application

## Requirements

## Setup

Install dependencies using `npm install`.

## Database Schema

After updating either the `server/db/schema/app.ts` or `server/db/schema/auth.ts`, a new migration file needs to be generated and then applied to both the local database and remote database.

1. Generate the migration by running the command `npm run db:generate`.
2. Apply the migration to the local database with the command `npm run db:apply:local`.
3. Apply the migration to the remote D1 database with the command `npm run db:apply:remote`.
