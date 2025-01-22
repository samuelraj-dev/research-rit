# Package Manager Information

- I'm using `pnpm` as the package manager for this project.
- use `npm i -g pnpm` to install it.
- use `pnpm i` to install the dependencies from `package.json` in both frontend and backend. This will install all dependencies of the project to the `node_modules` folder
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

# The services using the variables down below aren't ready yet btw.
# But these are required by the application.
# So it's better defining as empty string for now.
AWS_S3_ENDPOINT_URL=""
AWS_REGION=""
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
```

## Generating functions and triggers for our database
- Navigate to the `backend` folder.
- Run the following commands:

```
pnpm db:generate
pnpm db:generate --custom
```

- In the `./backend/migrations` folder, open the `sql` file starting with the name `0001_`.
- Copy paste the following code into that sql file.

```
CREATE OR REPLACE FUNCTION set_default_indexing_values()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.indexing IS NULL THEN
        NEW.indexing := '{}'::jsonb;
    END IF;
    
    NEW.indexing := jsonb_set(
        NEW.indexing,
        '{scopus}',
        COALESCE((NEW.indexing -> 'scopus')::jsonb, 'false'::jsonb)
    );
    NEW.indexing := jsonb_set(
        NEW.indexing,
        '{sci}',
        COALESCE((NEW.indexing -> 'sci')::jsonb, 'false'::jsonb)
    );
    NEW.indexing := jsonb_set(
        NEW.indexing,
        '{esc}',
        COALESCE((NEW.indexing -> 'esc')::jsonb, 'false'::jsonb)
    );
    NEW.indexing := jsonb_set(
        NEW.indexing,
        '{other,indexed}',
        COALESCE((NEW.indexing #> '{other,indexed}')::jsonb, 'false'::jsonb)
    );
    NEW.indexing := jsonb_set(
        NEW.indexing,
        '{other,name}',
        COALESCE((NEW.indexing #> '{other,name}')::jsonb, '""'::jsonb)
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_default_indexing_values_book
BEFORE INSERT OR UPDATE ON book
FOR EACH ROW
EXECUTE FUNCTION set_default_indexing_values();

CREATE TRIGGER trigger_set_default_indexing_values_book_chapter
BEFORE INSERT OR UPDATE ON book_chapter
FOR EACH ROW
EXECUTE FUNCTION set_default_indexing_values();

CREATE TRIGGER trigger_set_default_indexing_values_conference
BEFORE INSERT OR UPDATE ON conference
FOR EACH ROW
EXECUTE FUNCTION set_default_indexing_values();

CREATE TRIGGER trigger_set_default_indexing_values_journal
BEFORE INSERT OR UPDATE ON journal
FOR EACH ROW
EXECUTE FUNCTION set_default_indexing_values();
```

## Applying Migrations to Your PostgreSQL Database
To apply migrations to your PostgreSQL database, follow these steps:
- Navigate to the `backend` folder.
- Run the following command:

```
pnpm db:migrate
```

- `pnpm db:generate`: Generates the necessary migration files.
- `pnpm db:migrate`: Applies the generated migrations to your PostgreSQL database.

## Seeding the database with an organization
As our application is **multi-tenant**, organizations **can't signup**.
So, we are manually going to insert an organization into the database.
I will be using `Postman` to the the api request.
Follow the instructions below:

- Navigate to `./backend/src/modules/applications/applications.routes.ts`.
- Uncomment `line 11`, the line with this code -> `router.post("/", createApplicationHandler);`.
- Open Postman.
- Set URL as `http://localhost:5000/api/applications` and method as `POST`.
- Select `Body` tab under the URL bar. Then choose the option `raw`. Make sure the type to be `JSON`.
- we are going to set the JSON object with two fields, `name` and `workEmail` respectively. An example is down below:
- ```
  {
      "name": "app1",
      "workEmail": <your_email>
  }
  ```
- Click the `Send` button to create a new organization.
- Congrats if the response status is `201`.

## OTP Troubleshooting
### Instructions to see the OTP through Supabase
- Navigate to `Table Editor` section of your project in Supabase.
- Choose the `user` table.
- Scroll **horizontally** to view the `verification_code` column. You can see the OTPs now.
- You can copy it and use it as your OTP.

### Instructions to see the OTP through Email
If you can't see the OTP in your email, Please check the `spam` folder.
