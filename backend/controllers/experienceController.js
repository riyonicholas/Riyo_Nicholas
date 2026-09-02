const db = require("../db/db");

// ─── GET /api/experience ──────────────────────────────────────────────────────
exports.getAllExperience = async (_req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM experiences ORDER BY start_date DESC");

    const formatted = rows.map((e) => ({
      id: e.id,
      company: e.company,
      position: e.position,
      description: e.description,
      startDate: e.start_date ? e.start_date.toISOString().split("T")[0] : null,
      endDate: e.end_date ? e.end_date.toISOString().split("T")[0] : null,
      isCurrent: e.is_current === 1 || e.is_current === true,
      location: e.location,
      type: e.type,
    }));

    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (err) {
    console.error("Error getAllExperience:", err);
    res.status(500).json({ success: false, error: "Gagal mengambil data pengalaman" });
  }
};

// ─── POST /api/experience ─────────────────────────────────────────────────────
exports.createExperience = async (req, res) => {
  try {
    const { company, position, description, startDate, endDate, isCurrent, location, type } = req.body;

    if (!company || !position || !startDate) {
      return res.status(400).json({ success: false, error: "company, position, dan startDate wajib diisi" });
    }

    const currentFlag = isCurrent ? 1 : 0;

    const [result] = await db.query(
      `INSERT INTO experiences (company, position, description, start_date, end_date, is_current, location, type)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [company, position, description || "", startDate, endDate || null, currentFlag, location || "", type || "full-time"]
    );

    res.status(201).json({
      success: true,
      data: {
        id: result.insertId,
        company,
        position,
        description,
        startDate,
        endDate: endDate || null,
        isCurrent: !!isCurrent,
        location,
        type,
      },
    });
  } catch (err) {
    console.error("Error createExperience:", err);
    res.status(500).json({ success: false, error: "Gagal membuat riwayat pengalaman baru" });
  }
};

// ─── PUT /api/experience/:id ──────────────────────────────────────────────────
exports.updateExperience = async (req, res) => {
  try {
    const { company, position, description, startDate, endDate, isCurrent, location, type } = req.body;

    const updates = [];
    const values = [];

    if (company !== undefined) { updates.push("company = ?"); values.push(company); }
    if (position !== undefined) { updates.push("position = ?"); values.push(position); }
    if (description !== undefined) { updates.push("description = ?"); values.push(description); }
    if (startDate !== undefined) { updates.push("start_date = ?"); values.push(startDate); }
    if (endDate !== undefined) { updates.push("end_date = ?"); values.push(endDate); }
    if (isCurrent !== undefined) { updates.push("is_current = ?"); values.push(isCurrent ? 1 : 0); }
    if (location !== undefined) { updates.push("location = ?"); values.push(location); }
    if (type !== undefined) { updates.push("type = ?"); values.push(type); }

    if (updates.length === 0) {
      return res.status(400).json({ success: false, error: "Tidak ada data yang diperbarui" });
    }

    values.push(req.params.id);
    const [result] = await db.query(`UPDATE experiences SET ${updates.join(", ")} WHERE id = ?`, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Pengalaman tidak ditemukan" });
    }

    res.json({ success: true, message: "Pengalaman berhasil diperbarui" });
  } catch (err) {
    console.error("Error updateExperience:", err);
    res.status(500).json({ success: false, error: "Gagal memperbarui pengalaman" });
  }
};

// ─── DELETE /api/experience/:id ───────────────────────────────────────────────
exports.deleteExperience = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM experiences WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Pengalaman tidak ditemukan" });
    }
    res.json({ success: true, message: "Pengalaman berhasil dihapus" });
  } catch (err) {
    console.error("Error deleteExperience:", err);
    res.status(500).json({ success: false, error: "Gagal menghapus pengalaman" });
  }
};
