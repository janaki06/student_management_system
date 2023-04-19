import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

// Creating an instance of the Express.js application
const app = express();

app.use(cors());
app.use(express.json());

// Creating a connection to the MySQL database
const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Janu@#12345",
  database: "studentdatabase",
});

// Handling GET requests to the root URL "/"
app.get("/", (req, res) => {
  const sql = "SELECT * FROM student"; // SQL query to select all data from "student" table
  db.query(sql, (err, result) => {
    // Executing the SQL query
    if (err) return res.json({ Message: "Error inside server" }); // Handling errors
    return res.json(result);
  });
});

// Handling POST requests to the "/student" URL
app.post("/student", (req, res) => {
  const sql =
    "INSERT INTO student (FirstName, LastName, Location, email, DOB, Education) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.location,
    req.body.email,
    req.body.dob,
    req.body.education,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json(err);
    }
    const newId = result.insertId; // Get the auto-generated ID value
    return res.json({
      id: newId, // Return the new ID value to the client
      message: "Successfully added new student",
    });
  });
});

// Handling GET requests to the "/get/:id" URL
app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  const sql = " SELECT * FROM student where ID = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Message: "Error inside server" });
    }
    res.json({ Result: result });
  });
});

// Handling PUT requests to the "/update/:id" URL
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE student SET FirstName=?, LastName=?, Location=?, email=?, DOB=?, Education=? WHERE ID=?";

  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.location,
    req.body.email,
    req.body.dob,
    req.body.education,
  ];
  db.query(sql, [...values, id], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// Handling DELETE requests to the "/delete/:id" URL
app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE ID=?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// Start the server
app.listen(8081, () => {
  console.log("Listening");
});
