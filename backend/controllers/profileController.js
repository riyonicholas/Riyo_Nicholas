const db = require("../db/db");

// ─── GET /api/profile ─────────────────────────────────────────────────────────
exports.getProfile = async (_req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM profile WHERE id = 1");
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: "Profil tidak ditemukan" });
    }

    const p = rows[0];
    const data = {
      name: p.name,
      title: p.title,
      bio: p.bio,
      email: p.email,
      phone: p.phone,
      location: p.location,
      avatar: p.avatar,
      socialLinks: {
        github: p.social_github || "https://github.com/username",
        linkedin: p.social_linkedin || "https://linkedin.com/in/username",
        instagram: p.social_instagram || "https://instagram.com/username",
        whatsapp: p.social_whatsapp || "https://wa.me/6281234567890",
      },
    };

    res.json({ success: true, data });
  } catch (err) {
    console.error("Error getProfile:", err);
    res.status(500).json({ success: false, error: "Gagal mengambil data profil" });
  }
};

// ─── PUT /api/profile ─────────────────────────────────────────────────────────
exports.updateProfile = async (req, res) => {
  try {
    const { name, title, bio, email, phone, location, avatar, socialLinks } = req.body;

    const updates = [];
    const values = [];

    if (name !== undefined) { updates.push("name = ?"); values.push(name); }
    if (title !== undefined) { updates.push("title = ?"); values.push(title); }
    if (bio !== undefined) { updates.push("bio = ?"); values.push(bio); }
    if (email !== undefined) { updates.push("email = ?"); values.push(email); }
    if (phone !== undefined) { updates.push("phone = ?"); values.push(phone); }
    if (location !== undefined) { updates.push("location = ?"); values.push(location); }
    if (avatar !== undefined) { updates.push("avatar = ?"); values.push(avatar); }

    if (socialLinks !== undefined) {
      if (socialLinks.github !== undefined) { updates.push("social_github = ?"); values.push(socialLinks.github); }
      if (socialLinks.linkedin !== undefined) { updates.push("social_linkedin = ?"); values.push(socialLinks.linkedin); }
      if (socialLinks.instagram !== undefined) { updates.push("social_instagram = ?"); values.push(socialLinks.instagram); }
      if (socialLinks.whatsapp !== undefined) { updates.push("social_whatsapp = ?"); values.push(socialLinks.whatsapp); }
    }

    if (updates.length > 0) {
      values.push(1); // ID = 1
      await db.query(`UPDATE profile SET ${updates.join(", ")} WHERE id = ?`, values);
    }

    // Ambil data terbaru untuk dikembalikan
    const [rows] = await db.query("SELECT * FROM profile WHERE id = 1");
    const p = rows[0];
    const updatedData = {
      name: p.name,
      title: p.title,
      bio: p.bio,
      email: p.email,
      phone: p.phone,
      location: p.location,
      avatar: p.avatar,
      socialLinks: {
        github: p.social_github || "",
        linkedin: p.social_linkedin || "",
        instagram: p.social_instagram || "",
        whatsapp: p.social_whatsapp || "",
      },
    };

    res.json({ success: true, data: updatedData });
  } catch (err) {
    console.error("Error updateProfile:", err);
    res.status(500).json({ success: false, error: "Gagal memperbarui profil" });
  }
};
