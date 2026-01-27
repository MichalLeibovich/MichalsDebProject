import express, { Request, Response } from "express";
import cors from "cors";
import { pool } from "./db"; // <-- correct import

const app = express();
app.use(cors());
app.use(express.json());

app.post("/debriefing", async (req: Request, res: Response) => {
  try {
    const { title }: { title: string } = req.body;

    const result = await pool.query(
      "INSERT INTO debriefing_project.debriefing (title) VALUES ($1) RETURNING id, created_at, updated_at",
      [title]
    );

    res.status(201).json({
      message: "Debriefing saved!",
      debriefing: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(3001, () =>
  console.log("Server running on http://localhost:3001")
);
