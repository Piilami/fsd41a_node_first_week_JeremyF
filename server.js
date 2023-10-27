import dotenv from "dotenv";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { addUser, formatDate } from "./utils/utils.js";
import { URLSearchParams } from "node:url";
import pug from "pug";

dotenv.config();

const { APP_PORT } = process.env;

//temporaire le temps si je n'arrive pas jusqu'à la question facultative
const students = [
  { name: "Sonia", birth: "2019-14-05" },
  { name: "Antoine", birth: "2000-12-05" },
  { name: "Alice", birth: "1990-14-09" },
  { name: "Sophie", birth: "2001-10-02" },
  { name: "Bernard", birth: "1980-21-08" },
];

const server = createServer(async (req, res) => {
  if (req.url === "/favicon/x-icon") {
    res.writeHead(200, {
      "Content-type": "image/x-icon",
    });
    res.end();
    return;
  }

  // creation "Router" pour render les pages HTML

  // gestion css

  if (req.method === "GET" && req.url === "/user") {
    const css = readFileSync("./assets/css/user.css", "utf-8");
    res.writeHead(200, {
      "Content-type": "text/css",
    });
    res.end(css);
    return;
  } else if (req.method === "GET" && req.url === "/home") {
    const css = readFileSync("./assets/css/home.css", "utf-8");
    res.writeHead(200, {
      "Content-type": "text/css",
    });
    res.end(css);
    return;
  } else if (req.method === "GET" && req.url === "/404") {
    const css = readFileSync("./assets/css/404.css");
    res.writeHead(200, {
      "Content-type": "text/css",
    });
    res.end(css);
    return;
  }
  if (req.url === "/") {
    // page home

    if (req.method === "GET") {
      const home = readFileSync("./view/home.html", "utf8");

      res.writeHead(200, {
        "Content-type": "text/html",
      });
      res.end(home);
    } else if (req.method === "POST") {
      const home = readFileSync("./view/home.html", "utf8");
      let dataNewStudent = "";
      req.on("data", (chunk) => {
        dataNewStudent += chunk;
      });
      req.on("end", () => {
        const formData = new URLSearchParams(dataNewStudent);
        const name = formData.get("name");
        const birth = formData.get("birth");
        addUser(students, name, birth);
        res.writeHead(200);
        res.end(home);
      });
    }
    // page users
  } else if (req.url === "/users") {
    const copyStudent = [...students];
    formatDate(copyStudent);
    console.log(students);
    if (req.method === "GET") {
      const user = pug.renderFile("./view/pug/users.pug", { copyStudent });
      res.writeHead(200, {
        "Content-type": "text/html",
      });
      res.end(user);
    }
  } else {
    const wrongPage = pug.renderFile("./view/pug/404.pug");
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end(wrongPage);
  }
});

server.listen(APP_PORT);
