const db = require("../db/db");

// ─── POST /api/contact ────────────────────────────────────────────────────────
exports.sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validasi input
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "name, email, dan message wajib diisi" });
    }

    // Validasi format email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: "Format email tidak valid" });
    }

    const [result] = await db.query(
      "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name.trim(), email.trim().toLowerCase(), subject ? subject.trim() : "Tidak ada subjek", message.trim()]
    );

    console.log(`📨 Pesan baru berhasil disimpan ke DB. Pengirim: ${name} <${email}>`);

    res.status(201).json({
      success: true,
      message: "Pesan berhasil dikirim! Kami akan segera menghubungi Anda.",
      data: { id: result.insertId },
    });
  } catch (err) {
    console.error("Error sendMessage:", err);
    res.status(500).json({ success: false, error: "Gagal mengirim pesan" });
  }
};

// ─── GET /api/contact (daftar pesan masuk) ────────────────────────────────────
exports.getAllMessages = async (_req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM messages ORDER BY created_at DESC");
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error("Error getAllMessages:", err);
    res.status(500).json({ success: false, error: "Gagal mengambil pesan masuk" });
  }
};

// ─── PATCH /api/contact/:id/read ─────────────────────────────────────────────
exports.markAsRead = async (req, res) => {
  try {
    const [result] = await db.query("UPDATE messages SET is_read = 1 WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Pesan tidak ditemukan" });
    }
    res.json({ success: true, message: "Pesan telah ditandai sebagai dibaca" });
  } catch (err) {
    console.error("Error markAsRead:", err);
    res.status(500).json({ success: false, error: "Gagal memperbarui status pesan" });
  }
};

// ─── DELETE /api/contact/:id ──────────────────────────────────────────────────
exports.deleteMessage = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM messages WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Pesan tidak ditemukan" });
    }
    res.json({ success: true, message: "Pesan berhasil dihapus" });
  } catch (err) {
    console.error("Error deleteMessage:", err);
    res.status(500).json({ success: false, error: "Gagal menghapus pesan" });
  }
};
