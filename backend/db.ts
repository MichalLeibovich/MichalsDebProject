import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "my_app_db",
  password: "YOUR_PASSWORD",
  port: 5432,
});
