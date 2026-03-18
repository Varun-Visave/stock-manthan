import express from "express";
import { createServer } from "http";
import serverless from "serverless-http";
import { registerRoutes } from "../../server/routes";

const app = express();

// Middleware setup to match server/index.ts
// We use a simplified version here as some things like rawBody might not be needed
// unless used by specific routes (which I didn't see using it).
// But for safety, let's include the basics.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create a dummy server object to satisfy registerRoutes signature
// Since we are in a lambda, we won't actually listen on it.
const server = createServer(app);

// Register routes
// We need to ensure this is done. registerRoutes is async.
// Since we can't await at top level in some CJS environments easily unless configured,
// we'll wrap the handler. But typically Netlify functions support top-level await if module is set to esnext.
// safer to do it inside or use a promise.

let apiHandler: any;

export const handler = async (event: any, context: any) => {
    if (!apiHandler) {
        await registerRoutes(server, app);
        apiHandler = serverless(app);
    }
    return apiHandler(event, context);
};
