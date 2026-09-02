const db = require("../db/db");

// ─── GET /api/skills ──────────────────────────────────────────────────────────
exports.getAllSkills = async (req, res) => {
  try {
    const { category } = req.query;
    let queryStr = "SELECT * FROM skills";
    const params = [];

    if (category) {
      queryStr += " WHERE category = ?";
      params.push(category);
    }

    const [rows] = await db.query(queryStr, params);
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error("Error getAllSkills:", err);
    res.status(500).json({ success: false, error: "Gagal mengambil data keahlian" });
  }
};

// ─── POST /api/skills ─────────────────────────────────────────────────────────
exports.createSkill = async (req, res) => {
  try {
    const { name, category, description, iconClass } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, error: "Nama keahlian wajib diisi" });
    }

    const [result] = await db.query(
      "INSERT INTO skills (name, category, description, icon_class) VALUES (?, ?, ?, ?)",
      [name, category || "tool", description || null, iconClass || null]
    );

    res.status(201).json({
      success: true,
      data: {
        id: result.insertId,
        name,
        category: category || "tool",
        description: description || null,
        iconClass: iconClass || null,
      },
    });
  } catch (err) {
    console.error("Error createSkill:", err);
    res.status(500).json({ success: false, error: "Gagal membuat keahlian baru" });
  }
};

// ─── PUT /api/skills/:id ──────────────────────────────────────────────────────
exports.updateSkill = async (req, res) => {
  try {
    const { name, category, description, iconClass } = req.body;

    const updates = [];
    const values = [];

    if (name !== undefined) { updates.push("name = ?"); values.push(name); }
    if (category !== undefined) { updates.push("category = ?"); values.push(category); }
    if (description !== undefined) { updates.push("description = ?"); values.push(description); }
    if (iconClass !== undefined) { updates.push("icon_class = ?"); values.push(iconClass); }

    if (updates.length === 0) {
      return res.status(400).json({ success: false, error: "Tidak ada data yang diperbarui" });
    }

    values.push(req.params.id);
    const [result] = await db.query(`UPDATE skills SET ${updates.join(", ")} WHERE id = ?`, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Keahlian tidak ditemukan" });
    }

    res.json({ success: true, message: "Keahlian berhasil diperbarui" });
  } catch (err) {
    console.error("Error updateSkill:", err);
    res.status(500).json({ success: false, error: "Gagal memperbarui keahlian" });
  }
};

// ─── DELETE /api/skills/:id ───────────────────────────────────────────────────
exports.deleteSkill = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM skills WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Keahlian tidak ditemukan" });
    }
    res.json({ success: true, message: "Keahlian berhasil dihapus" });
  } catch (err) {
    console.error("Error deleteSkill:", err);
    res.status(500).json({ success: false, error: "Gagal menghapus keahlian" });
  }
};
