import { join }  from 'path';
import path from 'path';1
import express from 'express';
import { readFileSync , writeFileSync} from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.static('myFiles'));
app.use(express.static('imgs'));

// homepage
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, "myFiles", "index.html"));
});

// update cart of the user
app.get("/update", (req,res) => {
    let data = readFileSync(path.join(__dirname, "data", "user.json"), "utf8");
    let jsonData = JSON.parse(data);
    jsonData[req.query.name][2] = req.query.cart;
    writeFileSync(path.join(__dirname, "data", "user.json"), JSON.stringify(jsonData, null, 2), "utf8");
    res.json({"success":"✅ JSON file updated successfully!"});
})

// checkUserExists
app.get("/exists", (req,res) => {
    let data = readFileSync(join(__dirname, "data", "user.json"), "utf8");
    let jsonData = JSON.parse(data);
    if(req.query.name in jsonData){
        // user already exists so sign up cannot happen
        res.json({"status":"true","password":jsonData[req.query.name][1]});
    }else{
        // user does not exists needed to be signed up first
        res.json({"status":"false"});
    }
})
// sign up the user
app.get("/signup", (req,res) => {
    let data = readFileSync(path.join(__dirname, "data", "user.json"), "utf8");
    let jsonData = JSON.parse(data);
    jsonData[req.query.name] = [req.query.age,req.query.password,req.query.cart];
    writeFileSync(path.join(__dirname, "data", "user.json"), JSON.stringify(jsonData, null, 2), "utf8");
    res.json({"success":"✅ JSON file updated successfully!"});
})

// get the cart value
app.get("/cart", (req,res) => {
    let data = readFileSync(path.join(__dirname, "data", "user.json"), "utf8");
    let jsonData = JSON.parse(data);
    res.json({"value":jsonData[req.query.name][2]});
})

// get the order value
app.get("/order", (req,res) => {
    let data = readFileSync(path.join(__dirname, "data", "order.json"), "utf8");
    let jsonData = JSON.parse(data);
    if(req.query.name in jsonData){
        jsonData[req.query.name].push([req.query.items,req.query.address])
    }else{
        jsonData[req.query.name] = [[req.query.items,req.query.address]];
    }
    writeFileSync(path.join(__dirname, "data", "order.json"), JSON.stringify(jsonData, null, 2), "utf8");
    res.json({"value":"done"});
})





app.listen(3000, () => {
  console.log(`Server running at http://localhost:${3000}`);
});