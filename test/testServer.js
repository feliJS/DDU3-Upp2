import { serveFile, serveDir } from "jsr:@std/http";

async function handler(request) {
  const url  = new URL(request.url);
  const path = url.pathname;

  if (path === "/" || path === "/home") {
    return serveFile(request, "index.html");
  }

  return serveDir(request, {
    fsRoot: ".",
    urlRoot: "",
  });
}

Deno.serve({ port: 3000 }, handler);
