# Package Manager Information

- I'm using `pnpm` as the package manager for this project.
- use `pnpm i` to install the dependencies in both frontend and backend.
- use `pnpm add <your_package_name>` to install packages.
- use `pnpm dev` to start the development server.

# Database Setup

- Create an account at `supabase`
- Create an `organization`
- In that organization, create a new `project`
- Click on the `connect` option in the top navbar.
- Under `Connection String` tab, copy the URI under `Transaction pooler`
- This String will be your `postgres_url` in the upcoming section.

# Email Setup

- Use your Gmail account. go to this url `https://myaccount.google.com/`
- In the `search bar`, search for `App Passwords` and go to that section.
- Create a new App Password, copy that and store it in a secure place, or write it down.
- (Note: you would be asked to enable 2 factor authorizatio for your account).
- This will be your `GOOGLE_APP_PASSWORD` in the upcoming section.

# Backend Setup

## .env File Format
Create a `.env` file in the root of the `backend` folder with the following variables:

```
DB_DSN=<your_postgres_url>
SECRET_KEY=<any_random_key>
ARGON_SECRET_KEY=<any_random_key>
ARGON_SALT=<numbers (recommended: 10)>

GOOGLE_EMAIL=<your_google_email>
GOOGLE_APP_PASSWORD=<your_google_app_password>
```

## drizzle.config.ts Format
Create a `drizzle.config.ts` file in the root of the `backend` folder with the following content:

```
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./migrations",
    dialect: "postgresql",
    schema: "./src/db/schema.ts",

    dbCredentials: {
        url: "<your-postgres-url>",
    },
    
    breakpoints: false
});

```

This configuration will define the migration output folder, the database dialect as PostgreSQL, and the location of your schema file.

## Applying Migrations to Your PostgreSQL Database
To apply migrations to your PostgreSQL database, follow these steps:
- Navigate to the `backend` folder.
- Run the following commands:

```
npm run db:generate
npm run db:migrate
```

- `npm run db:generate`: Generates the necessary migration files.
- `npm run db:migrate`: Applies the generated migrations to your PostgreSQL database.
