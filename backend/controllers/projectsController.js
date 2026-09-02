const db = require("../db/db");

// ─── GET /api/projects ────────────────────────────────────────────────────────
exports.getAllProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;
    let queryStr = "SELECT * FROM projects";
    const params = [];

    const conditions = [];
    if (category) {
      conditions.push("category = ?");
      params.push(category);
    }
    if (featured !== undefined) {
      conditions.push("featured = ?");
      params.push(featured === "true" ? 1 : 0);
    }

    if (conditions.length > 0) {
      queryStr += " WHERE " + conditions.join(" AND ");
    }

    queryStr += " ORDER BY created_at DESC";

    const [rows] = await db.query(queryStr, params);

    // Map data for compatibility (e.g. parse JSON if it comes as string, though mysql2 parses JSON automatically)
    const formatted = rows.map((p) => {
      let tech = p.technologies;
      if (typeof tech === "string") {
        try {
          tech = JSON.parse(tech);
        } catch (e) {
          tech = [];
        }
      }
      return {
        id: p.id,
        title: p.title,
        description: p.description,
        detail: p.detail,
        technologies: tech || [],
        imageUrl: p.image_url,
        githubUrl: p.github_url,
        liveUrl: p.live_url,
        category: p.category,
        featured: p.featured === 1 || p.featured === true,
        emoji: p.emoji || "📁",
        createdAt: p.created_at,
      };
    });

    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (err) {
    console.error("Error getAllProjects:", err);
    res.status(500).json({ success: false, error: "Gagal mengambil data proyek" });
  }
};

// ─── GET /api/projects/:id ────────────────────────────────────────────────────
exports.getProjectById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM projects WHERE id = ?", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: "Proyek tidak ditemukan" });
    }

    const p = rows[0];
    let tech = p.technologies;
    if (typeof tech === "string") {
      try {
        tech = JSON.parse(tech);
      } catch (e) {
        tech = [];
      }
    }

    const data = {
      id: p.id,
      title: p.title,
      description: p.description,
      detail: p.detail,
      technologies: tech || [],
      imageUrl: p.image_url,
      githubUrl: p.github_url,
      liveUrl: p.live_url,
      category: p.category,
      featured: p.featured === 1 || p.featured === true,
      emoji: p.emoji || "📁",
      createdAt: p.created_at,
    };

    res.json({ success: true, data });
  } catch (err) {
    console.error("Error getProjectById:", err);
    res.status(500).json({ success: false, error: "Gagal mengambil data proyek" });
  }
};

// ─── POST /api/projects ───────────────────────────────────────────────────────
exports.createProject = async (req, res) => {
  try {
    const { title, description, detail, technologies, imageUrl, githubUrl, liveUrl, category, featured, emoji } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, error: "Title dan description wajib diisi" });
    }

    const techJson = JSON.stringify(technologies || []);
    const isFeatured = featured ? 1 : 0;
    const projectEmoji = emoji || "📁";

    const [result] = await db.query(
      `INSERT INTO projects (title, description, detail, technologies, image_url, github_url, live_url, category, featured, emoji)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, detail || "", techJson, imageUrl || null, githubUrl || null, liveUrl || null, category || "uiux", isFeatured, projectEmoji]
    );

    res.status(201).json({
      success: true,
      data: {
        id: result.insertId,
        title,
        description,
        detail,
        technologies: technologies || [],
        imageUrl,
        githubUrl,
        liveUrl,
        category,
        featured,
        emoji: projectEmoji,
      },
    });
  } catch (err) {
    console.error("Error createProject:", err);
    res.status(500).json({ success: false, error: "Gagal membuat proyek baru" });
  }
};

// ─── PUT /api/projects/:id ────────────────────────────────────────────────────
exports.updateProject = async (req, res) => {
  try {
    const { title, description, detail, technologies, imageUrl, githubUrl, liveUrl, category, featured, emoji } = req.body;

    const updates = [];
    const values = [];

    if (title !== undefined) { updates.push("title = ?"); values.push(title); }
    if (description !== undefined) { updates.push("description = ?"); values.push(description); }
    if (detail !== undefined) { updates.push("detail = ?"); values.push(detail); }
    if (technologies !== undefined) { updates.push("technologies = ?"); values.push(JSON.stringify(technologies)); }
    if (imageUrl !== undefined) { updates.push("image_url = ?"); values.push(imageUrl); }
    if (githubUrl !== undefined) { updates.push("github_url = ?"); values.push(githubUrl); }
    if (liveUrl !== undefined) { updates.push("live_url = ?"); values.push(liveUrl); }
    if (category !== undefined) { updates.push("category = ?"); values.push(category); }
    if (featured !== undefined) { updates.push("featured = ?"); values.push(featured ? 1 : 0); }
    if (emoji !== undefined) { updates.push("emoji = ?"); values.push(emoji); }

    if (updates.length === 0) {
      return res.status(400).json({ success: false, error: "Tidak ada data yang diperbarui" });
    }

    values.push(req.params.id);
    const [result] = await db.query(`UPDATE projects SET ${updates.join(", ")} WHERE id = ?`, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Proyek tidak ditemukan" });
    }

    res.json({ success: true, message: "Proyek berhasil diperbarui" });
  } catch (err) {
    console.error("Error updateProject:", err);
    res.status(500).json({ success: false, error: "Gagal memperbarui proyek" });
  }
};

// ─── DELETE /api/projects/:id ─────────────────────────────────────────────────
exports.deleteProject = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM projects WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Proyek tidak ditemukan" });
    }
    res.json({ success: true, message: "Proyek berhasil dihapus" });
  } catch (err) {
    console.error("Error deleteProject:", err);
    res.status(500).json({ success: false, error: "Gagal menghapus proyek" });
  }
};
