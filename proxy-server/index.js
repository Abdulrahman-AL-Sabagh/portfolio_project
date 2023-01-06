require("dotenv").config({ path: "./.env" });
const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
console.log(process.env.BLOG, process.env.AUTH);
const PORT = 8000;
const HOST = "localhost";
const blogService = process.env.BLOG;

const authService = process.env.AUTH;
console.log(blogService);
const app = express();

app.use("/api", (req, res, next) => {
  if (req.headers.cookie) {
    next();
  } else {
    res.sendStatus(403);
  }
});

app.use(morgan("dev"));
app.use(
  "/api/blog",
  createProxyMiddleware({
    target: blogService,
    changeOrigin: true,
  })
);

app.use(
  "/api/user",
  createProxyMiddleware({
    target: authService,
    changeOrigin: true,
    ["îd"]: "",
  })
);

app.use(
  "/auth",
  createProxyMiddleware({
    target: authService,
    changeOrigin: true,
    timeout: 20000,
    proxyTimeout: 20000,
    pathRewrite: {
      ["^login"]: "",
      ["^signup"]: "",
      ["^me"]: "",
    },
  })
);

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}  `);
  console.log(blogService);
  console.log(authService);
});
