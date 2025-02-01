import { Pool } from "pg";
import { env } from "./config/env";
import { db } from "./db";
import { logger } from "./utils/logger";
import { buildServer } from "./utils/server"
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Server } from "http";

async function gracefulShutdown({
    server, db
}: {
    server: Server,
    db: NodePgDatabase<Record<string, never>> & {
        $client: Pool;
    }
}) {
    server.close(() => {
        logger.info("HTTP server closed.");
        process.exit(0);
    });

    try {
        await db.$client.end();
        logger.info("Database connection closed.");
    } catch (error) {
        logger.error("Error closing database connection:", error);
    }
}

async function main() {

    const app = await buildServer()  

    const server = app.listen(
        env.PORT,
        env.HOST,
        () => logger.info(`Server is running at http://${env.HOST}:${env.PORT}`)
    );

    await migrate(db, {
        migrationsFolder: './migrations',
    });

    logger.debug(env);

    const signals = ['SIGINT', 'SIGTERM']

    for(const signal of signals) {
        process.on(signal, async () => {
            logger.info(`Received ${signal}. Shutting down gracefully...`);
            await gracefulShutdown({ server, db });
        });
    }
}

main().catch((error) => {
<<<<<<< Updated upstream
    logger.error("Failed to start application:");
    logger.error(error)
=======
    logger.error("Failed to start application:", error);
    logger.error(error);
>>>>>>> Stashed changes
    process.exit(1);
});