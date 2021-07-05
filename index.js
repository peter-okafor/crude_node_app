const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // if (req.url === "/") {
  //   fs.readFile(path.join(__dirname, "views", "index.html"), (err, content) => {
  //     if (err) throw err;
  //     res.writeHead(200, { "Content-Type": "text/html" });
  //     res.end(content);
  //   });
  // }

  // if (req.url === "/api/users") {
  //   res.writeHead(200, { "Content-Type": "application/json" });

  //   const users = [
  //     {name: 'Peter', age: 30},
  //     {name: 'Joy', age: 23}
  //   ]

  //   res.end(JSON.stringify(users))
  // }

  let filePath = path.join(
    __dirname,
    "views",
    req.url === "/" ? "index.html" : req.url
  );

  // Extension of loaded file
  let extName = path.extname(filePath);

  // Initial content type
  let contentType = "text/html";

  // Check ext and set content type
  switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    default:
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // Page not found
        fs.readFile(
          path.join(__dirname, "views", "404.html"),
          (err, content) => {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf-8");
          }
        );
      } else {
        res.writeHead(500);
        res.end(`Server Error ${err.code}`);
      }
    } else {
      // success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
