const express = require("express");
const cors = require("cors");
const db = require("./db/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Request Logger ───────────────────────────────────────────────────────────
app.use((req, _res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/profile", require("./routes/profile"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/skills", require("./routes/skills"));
app.use("/api/experience", require("./routes/experience"));
app.use("/api/contact", require("./routes/contact"));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    message: "Backend Portofolio API berjalan terintegrasi MySQL XAMPP",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: "Route tidak ditemukan" });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Terjadi kesalahan pada server",
  });
});

// ─── Initialize DB & Start Server ─────────────────────────────────────────────
async function startServer() {
  try {
    await db.initDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Gagal menjalankan server karena kendala database:", error.message);
    process.exit(1);
  }
}

startServer();