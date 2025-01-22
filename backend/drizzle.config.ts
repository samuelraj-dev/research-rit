import { defineConfig } from "drizzle-kit";
import { env } from "./src/config/env";

export default defineConfig({
    out: "./migrations",
    dialect: "postgresql",
    schema: "./src/db/schema.ts",

    dbCredentials: {
        url: env.DB_DSN,
    },
    
    breakpoints: false
});