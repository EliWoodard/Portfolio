const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = "127.0.0.1";
const port = process.env.PORT || 3001;

const contentTypes = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

function resolveRequestPath(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, `http://${hostname}:${port}`).pathname);
  const requestedPath = pathname === "/" ? "index.html" : pathname.slice(1);
  const filePath = path.join(__dirname, requestedPath);

  if (!filePath.startsWith(__dirname)) {
    return null;
  }

  return filePath;
}

const server = http.createServer((req, res) => {
  const filePath = resolveRequestPath(req.url);

  if (!filePath) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      const status = error.code === "ENOENT" ? 404 : 500;
      const message = status === 404 ? "Not found" : `Server error: ${error.code}`;
      res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(message);
      return;
    }

    const extname = path.extname(filePath).toLowerCase();
    const headers = {
      "Content-Type": contentTypes[extname] || "application/octet-stream",
      "Cache-Control": extname === ".html" ? "no-cache" : "public, max-age=3600"
    };

    res.writeHead(200, headers);
    res.end(content);
  });
});

server.listen(port, hostname, () => {
  console.log(`Portfolio running at http://${hostname}:${port}/`);
});
