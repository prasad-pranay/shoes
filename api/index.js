import express from "express";
import path, { join } from "path";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// static folders (absolute paths)
app.use(express.static(join(__dirname, "..", "myFiles")));
app.use(express.static(join(__dirname, "..", "imgs")));

// homepage
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "..", "myFiles", "index.html"));
});

// update cart
app.get("/update", (req, res) => {
  const filePath = join(__dirname, "..", "data", "user.json");
  const jsonData = JSON.parse(readFileSync(filePath, "utf8"));

  jsonData[req.query.name][2] = req.query.cart;

  writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
  res.json({ success: "JSON updated" });
});

// check user exists
app.get("/exists", (req, res) => {
  const jsonData = JSON.parse(
    readFileSync(join(__dirname, "..", "data", "user.json"), "utf8")
  );

  if (req.query.name in jsonData) {
    res.json({ status: "true", password: jsonData[req.query.name][1] });
  } else {
    res.json({ status: "false" });
  }
});

// signup
app.get("/signup", (req, res) => {
  const filePath = join(__dirname, "..", "data", "user.json");
  const jsonData = JSON.parse(readFileSync(filePath, "utf8"));

  jsonData[req.query.name] = [
    req.query.age,
    req.query.password,
    req.query.cart,
  ];

  writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
  res.json({ success: "User registered" });
});

// cart value
app.get("/cart", (req, res) => {
  const jsonData = JSON.parse(
    readFileSync(join(__dirname, "..", "data", "user.json"), "utf8")
  );
  res.json({ value: jsonData[req.query.name][2] });
});

// order
app.get("/order", (req, res) => {
  const filePath = join(__dirname, "..", "data", "order.json");
  const jsonData = JSON.parse(readFileSync(filePath, "utf8"));

  if (req.query.name in jsonData) {
    jsonData[req.query.name].push([req.query.items, req.query.address]);
  } else {
    jsonData[req.query.name] = [[req.query.items, req.query.address]];
  }

  writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
  res.json({ value: "done" });
});

// ✅ Vercel needs default export
export default app;
