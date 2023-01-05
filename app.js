import express from "express";
import path from "path";
const __dirname = path.resolve();
const app = express();
const port = 4321;

app.use(express.static("."));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
