import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'hritik123!@#';
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hritik123!@#",
  database: "tests",
});

//http://localhost:5500
app.get("/", (req, res) => {
  res.send("Hii there");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO `tests`.`books` (`title`, `desc`,`price`,`cover`) VALUES (?);";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Books created succefully");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Books Deleted  succefully");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(5500, (req, res) => {
  console.log("Server is running great");
});
