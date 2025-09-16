import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import pkg from "pg";
import dotenv from "dotenv";
import cors from "cors";  // <-- ADD THIS

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(bodyParser.json());
app.use(cors()); // <-- ENABLE CORS FOR ALL ORIGINS (SAFE FOR DEV)

// DB Connection
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

// Simple login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE username=$1", [username]);
    if (result.rows.length === 0) return res.status(401).json({ message: "User not found" });

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    res.json({ message: "Login successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
