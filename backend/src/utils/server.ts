import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import session from "express-session"
import connectPgSimple from "connect-pg-simple";
import path from "path";

// import { loggerOptions } from "./logger";
import applicationRoutes from "../modules/applications/applications.routes";
import usersRoutes from "../modules/users/users.routes";
import researchPaperRoutes from "../modules/researchPapers/researchPapers.routes";
import { env } from "../config/env";
import { db } from "../db";
import { UserSession } from "../types/UserSession";

declare module 'express-session' {
    interface SessionData {
        user: UserSession | null;
    }
}

const PgSession = connectPgSimple(session);

export function buildServer() {
    const app = express();

    app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'uploads'))); 

    app.use(session({
        store: new PgSession({
            pool: db.$client,
            tableName: 'session',
        }),
        secret: env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        }
    }))

    app.use(cors({
        origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:4173', 'http://localhost:4174'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    }))
    app.use(cookieParser());
    app.use(express.json());

    // register routes
    app.use("/api/applications", applicationRoutes);
    app.use("/api/users", usersRoutes);
    app.use("/api/research-papers", researchPaperRoutes);

    return app;
}