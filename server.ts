import nextI18next from "./common/helpers/Localizer";
import express from "express";
import next from "next";
import nextI18NextMiddleware from "next-i18next/middleware";
import { IncomingMessage, ServerResponse } from "http";
const defaultPort = 3000;
const port = process.env.PORT || defaultPort;
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  await nextI18next.initPromise;
  server.use(nextI18NextMiddleware(nextI18next));

  server.get("*", (req: IncomingMessage, res: ServerResponse) =>
    handler(req, res)
  );

  server.listen(port);
  console.log(`> Ready on http://localhost:${port}`); //NOSONAR
})();
