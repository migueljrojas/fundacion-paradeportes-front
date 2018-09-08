const express = require("express");
const next = require("next");
const cors = require("cors");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = express();
        server.use(cors());

        server.get("/post/:slug", (req, res) => {
            const actualPage = "/post";
            const queryParams = { slug: req.params.slug, apiRoute: "post" };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("/:slug", (req, res) => {
            const actualPage = "/post";
            const queryParams = { slug: req.params.slug, apiRoute: "page" };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("/nota/:slug", (req, res) => {
            const actualPage = "/custom";
            const queryParams = { slug: req.params.slug, apiRoute: "news" };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("/programa/:slug", (req, res) => {
            const actualPage = "/custom";
            const queryParams = { slug: req.params.slug, apiRoute: "programas" };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("/category/:slug", (req, res) => {
            const actualPage = "/category";
            const queryParams = { slug: req.params.slug };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("/_preview/:id/:wpnonce", (req, res) => {
            const actualPage = "/preview";
            const queryParams = { id: req.params.id, wpnonce: req.params.wpnonce };
            app.render(req, res, actualPage, queryParams);
        });

        server.get("*", (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, err => {
            if (err) throw err;
            console.log("> Ready on http://localhost:3000");
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
