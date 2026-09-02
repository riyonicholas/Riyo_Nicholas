const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
};

const dbName = process.env.DB_NAME || "portfolio_db";

let pool = null;

async function initDB() {
  try {
    // 1. Koneksi pertama kali tanpa nama database untuk memastikan database terbuat
    const tempConnection = await mysql.createConnection(dbConfig);
    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await tempConnection.end();

    // 2. Buat Connection Pool ke database target
    pool = mysql.createPool({
      ...dbConfig,
      database: dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log(`✅ Terhubung ke MySQL Database: ${dbName}`);

    // 3. Buat Tabel-tabel jika belum ada
    await createTables();

  } catch (error) {
    console.error("❌ Gagal menginisialisasi database:", error.message);
    throw error;
  }
}

async function createTables() {
  // Tabel: profile
  await pool.query(`
    CREATE TABLE IF NOT EXISTS profile (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL DEFAULT 'Nama Anda',
      title VARCHAR(200) NOT NULL DEFAULT 'Praktisi Teknologi & Kreator Visual',
      bio TEXT,
      email VARCHAR(100) DEFAULT 'email@example.com',
      phone VARCHAR(20) DEFAULT NULL,
      location VARCHAR(100) DEFAULT 'Indonesia',
      avatar VARCHAR(500) DEFAULT NULL,
      social_github VARCHAR(255) DEFAULT NULL,
      social_linkedin VARCHAR(255) DEFAULT NULL,
      social_instagram VARCHAR(255) DEFAULT NULL,
      social_whatsapp VARCHAR(255) DEFAULT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  // Cek apakah data profil sudah ada
  const [profiles] = await pool.query("SELECT * FROM profile WHERE id = 1");
  if (profiles.length === 0) {
    await pool.query(`
      INSERT INTO profile (id, name, title, bio, email, location)
      VALUES (
        1,
        'gabrun',
        'Praktisi Teknologi & Kreator Visual',
        'Halo! Saya adalah seorang praktisi teknologi dan kreator visual yang bergerak aktif di tiga bidang utama: Front-End Development & UI/UX, Desain Grafis, dan Teknisi Perangkat Keras (Smartphone & PC). Saya menekuni ketiga pilar ini secara seimbang, karena bagi saya, kode, estetika visual, dan komponen fisik perangkat adalah satu kesatuan yang saling melengkapi dalam menghadirkan solusi teknologi yang utuh.',
        'email@example.com',
        'Indonesia'
      )
    `);
    console.log("🌱 Seeded: Profile data");
  }

  // Tabel: projects
  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(200) NOT NULL,
      description TEXT,
      detail TEXT,
      technologies JSON DEFAULT NULL,
      image_url VARCHAR(500) DEFAULT NULL,
      github_url VARCHAR(500) DEFAULT NULL,
      live_url VARCHAR(500) DEFAULT NULL,
      category ENUM('uiux', 'grafis', 'hardware') NOT NULL DEFAULT 'uiux',
      featured BOOLEAN NOT NULL DEFAULT FALSE,
      emoji VARCHAR(10) DEFAULT '📁',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  // Cek apakah data projects kosong
  const [projects] = await pool.query("SELECT id FROM projects LIMIT 1");
  if (projects.length === 0) {
    const seedProjects = [
      ["Portal Informasi Akademik", "Sistem dashboard untuk mengelola data CPL, CPMK, dan Mata Kuliah secara terpusat.", "Riset tampilan bertema profesional, skema warna biru bersih, navigasi sidebar berjenjang.", JSON.stringify(["Figma", "Next.js", "Dashboard"]), "uiux", true, "🖥️"],
      ["Mobile App Health Tracker", "Desain antarmuka aplikasi pelacakan kesehatan harian dengan visualisasi data.", "User flow 5 layar, komponen reusable, skema warna biru-teal yang menenangkan.", JSON.stringify(["Figma", "Mobile", "Data Viz"]), "uiux", false, "📱"],
      ["E-Commerce UI Kit", "Kit komponen UI lengkap untuk platform belanja online modern.", "Lebih dari 40 komponen siap pakai, token warna konsisten, dokumentasi penggunaan lengkap.", JSON.stringify(["Figma", "Design System", "E-Commerce"]), "uiux", false, "🛒"],
      ["Landing Page SaaS", "Halaman utama produk SaaS dengan fokus konversi dan storytelling visual.", "Hero animated, pricing section, testimonials, CTA A/B variant.", JSON.stringify(["Figma", "Landing Page", "SaaS"]), "uiux", true, "🚀"],
      ["Branding & Logo Design", "Identitas merek lengkap termasuk logo, palet warna, dan panduan tipografi.", "Konsep: kekuatan dan modernitas. Bentuk geometris minimalis dengan garis tegas.", JSON.stringify(["Illustrator", "Branding", "Logo"]), "grafis", true, "✏️"],
      ["Poster Event Teknologi", "Desain poster untuk acara seminar dan workshop teknologi dengan estetika modern.", "Komposisi diagonal, efek pencahayaan dinamis, hierarki tipografi yang jelas.", JSON.stringify(["Photoshop", "Poster", "Event"]), "grafis", false, "🎭"],
      ["Social Media Kit", "Paket aset visual untuk Instagram, Twitter, dan LinkedIn dalam satu branding.", "Template feed, story, highlight cover — konsisten dengan brand guideline.", JSON.stringify(["Canva", "Social Media", "Content"]), "grafis", false, "📸"],
      ["Infografis Statistik", "Visualisasi data statistik yang menarik dan mudah dipahami untuk laporan.", "Data kompleks disederhanakan dengan ikon, grafik, dan palet warna yang harmonis.", JSON.stringify(["Illustrator", "Infografis", "Data"]), "grafis", false, "📊"],
      ["Ganti LCD iPhone 13 Pro", "Penggantian modul OLED retak akibat benturan keras, termasuk kalibrasi True Tone.", "Masalah: layar retak + dead pixel bawah. Solusi: penggantian modul OEM + kalibrasi True Tone via penggabungan chip original.", JSON.stringify(["iPhone", "LCD", "Repair"]), "hardware", true, "📲"],
      ["Repair Motherboard Android", "Perbaikan IC power dan jalur pengisian daya pada Samsung Galaxy S21 mati total.", "Masalah: short circuit IC power. Solusi: reballing BGA IC, penggantian komponen SMD, pengujian kelistrikan.", JSON.stringify(["Android", "Motherboard", "IC Power"]), "hardware", false, "⚡"],
      ["Upgrade RAM & SSD Laptop", "Peningkatan performa laptop gaming dari HDD ke NVMe SSD + RAM 32GB.", "Masalah: booting lambat 90 detik. Solusi: migrasi OS ke NVMe PCIe 4.0, upgrade RAM DDR4. Booting <8 detik.", JSON.stringify(["Laptop", "Upgrade", "SSD"]), "hardware", false, "💻"],
      ["Custom PC Build", "Perakitan PC workstation untuk desainer grafis dengan GPU mid-high end.", "Spesifikasi: Ryzen 7 + RTX 3070 + 64GB RAM. Optimisasi cable management dan airflow untuk suhu stabil.", JSON.stringify(["PC", "Custom Build", "Workstation"]), "hardware", true, "🖥️"],
    ];

    for (const proj of seedProjects) {
      await pool.query(
        "INSERT INTO projects (title, description, detail, technologies, category, featured, emoji) VALUES (?, ?, ?, ?, ?, ?, ?)",
        proj
      );
    }
    console.log("🌱 Seeded: Projects data");
  }

  // Tabel: skills
  await pool.query(`
    CREATE TABLE IF NOT EXISTS skills (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      category ENUM('frontend', 'design', 'hardware', 'language', 'backend', 'database', 'tool') NOT NULL DEFAULT 'tool',
      description TEXT DEFAULT NULL,
      icon_class VARCHAR(100) DEFAULT NULL
    ) ENGINE=InnoDB;
  `);

  // Cek apakah data skills kosong
  const [skills] = await pool.query("SELECT id FROM skills LIMIT 1");
  if (skills.length === 0) {
    const seedSkills = [
      ["React & Next.js", "frontend", "Framework utama untuk pengembangan aplikasi web modern yang cepat dan SEO-friendly."],
      ["HTML5 & CSS3", "frontend", "Struktur semantik dan styling responsif menggunakan CSS modern dan Tailwind CSS."],
      ["JavaScript & TypeScript", "frontend", "Bahasa pemrograman utama untuk logika interaktif yang aman dan terstruktur."],
      ["Figma (UI/UX)", "design", "Pembuatan wireframe, desain antarmuka, prototipe interaktif, dan design system."],
      ["Canva & CorelDraw", "design", "Layout poster cepat, materi konten media sosial, dan penataan halaman publikasi."],
      ["Repair Android & iPhone", "hardware", "Perbaikan modul layar LCD, konektor pengisian daya, penggantian baterai, dan analisis kelistrikan."],
      ["Laptop & PC Diagnostics", "hardware", "Instalasi sistem, troubleshoot hardware, penggantian komponen, dan optimasi kinerja termal."],
    ];

    for (const skill of seedSkills) {
      await pool.query("INSERT INTO skills (name, category, description) VALUES (?, ?, ?)", skill);
    }
    console.log("🌱 Seeded: Skills data");
  }

  // Tabel: experiences
  await pool.query(`
    CREATE TABLE IF NOT EXISTS experiences (
      id INT PRIMARY KEY AUTO_INCREMENT,
      company VARCHAR(200) NOT NULL,
      position VARCHAR(200) NOT NULL,
      description TEXT,
      start_date DATE NOT NULL,
      end_date DATE DEFAULT NULL,
      is_current BOOLEAN NOT NULL DEFAULT FALSE,
      location VARCHAR(100) DEFAULT NULL,
      type ENUM('full-time', 'part-time', 'freelance', 'contract') NOT NULL DEFAULT 'full-time'
    ) ENGINE=InnoDB;
  `);

  // Cek apakah data experiences kosong
  const [experiences] = await pool.query("SELECT id FROM experiences LIMIT 1");
  if (experiences.length === 0) {
    const seedExperiences = [
      ["PT Teknologi Nusantara", "Full-Stack Developer", "Mengembangkan dan memelihara aplikasi web skala enterprise menggunakan React dan Node.js.", "2023-03-01", null, true, "Jakarta, Indonesia", "full-time"],
      ["Startup Kreatif Indonesia", "Frontend Developer", "Membangun antarmuka pengguna yang responsif dan interaktif untuk platform SaaS.", "2021-06-01", "2023-02-28", false, "Bandung, Indonesia", "full-time"],
      ["Freelance", "Web Developer & Graphic Designer", "Mengerjakan berbagai proyek web dan desain grafis untuk klien lokal dan internasional.", "2019-01-01", "2021-05-31", false, "Remote", "freelance"],
    ];

    for (const exp of seedExperiences) {
      await pool.query(
        "INSERT INTO experiences (company, position, description, start_date, end_date, is_current, location, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        exp
      );
    }
    console.log("🌱 Seeded: Experiences data");
  }

  // Tabel: messages
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      subject VARCHAR(200) DEFAULT 'Tidak ada subjek',
      message TEXT NOT NULL,
      is_read BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);
}

module.exports = {
  initDB,
  query: (sql, params) => pool.query(sql, params),
  pool: () => pool,
};
