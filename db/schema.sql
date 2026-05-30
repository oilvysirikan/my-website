-- ═══════════════════════════════════════════════════════════
--  SignCraft Studio — D1 Schema
-- ═══════════════════════════════════════════════════════════

-- ── Site Settings (singleton) ────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  company_name_th TEXT NOT NULL DEFAULT 'เป็นหนึ่ง STUDIO',
  company_name_en TEXT NOT NULL DEFAULT 'SignCraft Studio',
  tagline_th      TEXT NOT NULL DEFAULT 'นวัตกรรมงานป้ายและโครงสร้างครบวงจร',
  tagline_en      TEXT NOT NULL DEFAULT 'Premium Signage & Structure Solutions',
  hero_subtitle_th TEXT NOT NULL DEFAULT 'ผลิตจริงโดยโรงงานโดยตรง',
  phone           TEXT NOT NULL DEFAULT '02-XXX-XXXX',
  phone2          TEXT DEFAULT '',
  line_id         TEXT NOT NULL DEFAULT '@SignCraft',
  email           TEXT DEFAULT '',
  address_th      TEXT NOT NULL DEFAULT 'แขวง/เขต บางเขน กรุงเทพมหานคร',
  stat_years      TEXT NOT NULL DEFAULT '15+',
  stat_area       TEXT NOT NULL DEFAULT '1,500',
  stat_team       TEXT NOT NULL DEFAULT '40+',
  stat_projects   TEXT NOT NULL DEFAULT '500+',
  updated_at      TEXT DEFAULT (datetime('now'))
);

-- Seed default
INSERT OR IGNORE INTO site_settings (id) VALUES (1);

-- ── Services ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  service_name_th   TEXT NOT NULL,
  service_name_en   TEXT,
  icon              TEXT DEFAULT '✦',
  short_desc_th     TEXT,
  material_features TEXT,
  recommended_usage TEXT,
  base_price_sqm    REAL DEFAULT 0,
  sort_order        INTEGER DEFAULT 0,
  is_active         INTEGER DEFAULT 1,
  updated_at        TEXT DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO services (id, service_name_th, service_name_en, icon, short_desc_th, material_features, recommended_usage, base_price_sqm, sort_order) VALUES
(1, 'งานป้ายสัญลักษณ์และตัวอักษรไฟ', 'Premium Signage', '✦',
  'ป้ายตัวอักษรไฟ LED เกรดนำเข้า โลหะฉลุซ่อนไฟ อะคริลิคพรีเมียม สำหรับแบรนด์และองค์กรชั้นนำ',
  'อักษรอะคริลิคซ่อนไฟ LED, อักษรโลหะฉลุพ่นสีอบซ่อนไฟส่องหลัง (Backlit LED) เกรดนำเข้า ทนทานความร้อนและการขูดขีด แสงนุ่มสวยงามสม่ำเสมอ',
  'ป้ายชื่ออาคาร, ป้ายตกแต่งสำนักงานภายใน, ป้ายหน้าร้านแบรนด์เนม, ป้ายแผนกสถานพยาบาล',
  12500.00, 1),
(2, 'งานฉากหลังและนิทรรศการ', 'Backdrop & Showcase', '◆',
  'ฉากแบคดรอปโครงไม้กล่องแสง ตึงขอบกริบ พิมพ์คมชัดด้วยหมึกญี่ปุ่นแท้ สีสันสดสมจริง',
  'ฉากหลังโครงสร้างกล่องไม้กล่องแสง (Lightbox Backdrop) ตึงขอบกริบ งานกรุผ้าและงานพิมพ์คุณภาพระดับพรีเมียม สปอร์ตหมึกญี่ปุ่นแท้ สีสันสดคมชัด',
  'งานวันแถลงข่าวเปิดตัว, งานนิทรรศการวัฒนธรรม, งานเปิดตัวอาคารเรียนและสถาบันนานาชาติ',
  3200.00, 2),
(3, 'งานโครงสร้างบูธจัดแสดงสินค้า', 'Exhibition Booth', '◈',
  'บูธดีไซน์โค้งมนไร้รอยต่อ พ่นสีผิวเงาระดับไฮเอนด์ พร้อมระบบไฟนีออนดัดตกแต่ง',
  'บูธโครงสร้างไม้และเหล็กทรงดีไซน์โค้งมนพิเศษ งานเดินสีพ่นผิวเรียบล่วงไหลระดับไฮเอนด์ ซ่อนสายระบบไฟฟ้ามิดชิด พร้อมติดตั้งแนวไฟนีออนดัด (Neon Flex)',
  'บูธจัดแสดงผลงานในศูนย์จัดแสดงสินค้า (Expo), งานนิทรรศการโชว์เทคโนโลยีทางการแพทย์และผลิตภัณฑ์นวัตกรรมชั้นนำ',
  8500.00, 3),
(4, 'งานสติกเกอร์และงานพิมพ์เชิงพาณิชย์', 'Printing & Sticker', '▣',
  'สติกเกอร์ไดคัท 3M เกรดสูง งานพิมพ์ไวนิลทนแดดทนฝน ติดตั้งโดยช่างมืออาชีพ',
  'สติกเกอร์ไดคัตเกรดสูง 3M, งานกรุกระจกตกแต่งสำนักงานนิรภัย, งานพิมพ์ไวนิลคุณภาพหนาพิเศษ ทนแดดและทนฝน อายุการใช้งานกลางแจ้งยาวนาน 3-5 ปี',
  'งานแต่งห้องกระจกและฝ้าสำนักงาน, ป้ายอิงค์เจ็ทบิลบอร์ดริมถนนขนาดใหญ่, งานติดตั้งโฆษณา Wrap รอบตัวรถขนส่งของแบรนด์',
  500.00, 4);

-- ── Price Catalogue ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS price_catalogue (
  id          TEXT PRIMARY KEY,
  service_id  INTEGER NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  style       TEXT NOT NULL,
  price_min   REAL NOT NULL,
  price_max   REAL NOT NULL,
  sort_order  INTEGER DEFAULT 0
);

INSERT OR IGNORE INTO price_catalogue VALUES
  ('s1',  1, 'อักษรอะคริลิคซ่อนไฟ LED คมชัดสูง',              12500, 13500, 1),
  ('s2',  1, 'อักษรโลหะฉลุซ่อนไฟเรืองหลัง (Backlit LED)',      14000, 15500, 2),
  ('s3',  1, 'ป้ายตู้ไฟ Lightbox กรุสติกเกอร์โปร่งแสง',        5500,  7500,  3),
  ('b1',  2, 'ฉากแบคดรอปโครงไม้กรุผ้าใบไวนิลพิมพ์พรีเมียม',   3200,  4500,  1),
  ('b2',  2, 'ฉากโครงสร้างกล่องไม้ซ่อนกล่องแสงกระจายทั่วถึง', 5800,  7200,  2),
  ('bo1', 3, 'บูธมาตรฐานวัสดุไม้เรียบ พ่นสีกรุผิวพรีเมียม',    8500, 11500,  1),
  ('bo2', 3, 'บูธโครงสร้างพิเศษ ดีไซน์โค้ง เว้า พร้อมนีออนดัด', 16000, 22000, 2);

-- ── Portfolio ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS portfolio (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  category          TEXT NOT NULL DEFAULT 'signage',
  project_name_th   TEXT NOT NULL,
  project_name_en   TEXT,
  client_name_th    TEXT,
  client_name_en    TEXT,
  work_description  TEXT,
  image_url         TEXT,
  completion_date   TEXT,
  is_featured       INTEGER DEFAULT 0,
  highlights        TEXT DEFAULT '[]',  -- JSON array
  installation_images TEXT DEFAULT '[]',  -- JSON array
  sort_order        INTEGER DEFAULT 0,
  is_active         INTEGER DEFAULT 1,
  created_at        TEXT DEFAULT (datetime('now')),
  updated_at        TEXT DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO portfolio
  (id, category, project_name_th, project_name_en, client_name_th, client_name_en, work_description, image_url, completion_date, is_featured, highlights, sort_order)
VALUES
(1, 'signage',
  'งานป้ายอักษรโลหะซ่อนไฟ โรงพยาบาลจุฬาภรณ์',
  'Backlit LED Signage - Chulabhorn Hospital',
  'โรงพยาบาลจุฬาภรณ์', 'Chulabhorn Hospital',
  'ออกแบบและติดตั้งตัวอักษรโลหะประณีตพ่นสีอบ ทนทานต่อสภาวะขูดขีด เดินแนวไฟ LED Backlit เรืองแสงนุ่มนวลอย่างประณีตระนาบสวยบนผนังหินอ่อนพรีเมียมนำเข้า',
  'image_7d9574.jpg', '2025-10-15', 1,
  '["อักษรโลหะพ่นสีอบอย่างดี ทนความร้อนสูง","ไฟ LED เกรดนำเข้า ทนทานและให้แสงที่กระจายเรียบเนียน","งานติดตั้งแนบเนียนไปบนพื้นผิวหินอ่อนนำเข้าชั้นยอด"]',
  1),
(2, 'backdrop',
  'งานติดตั้งฉากหลังงานนิทรรศการหลัก Dulwich College Bangkok',
  'Premium Exhibition Backdrop - Dulwich College',
  'โรงเรียนนานาชาติดัลวิช คอลเลจ กรุงเทพฯ', 'Dulwich College International School',
  'โครงสร้างกล่องไม้และฐานเหล็กสูงพยุงฉากสูงกว่า 3 เมตร กรุฉากพิมพ์ด้วยผ้าละเอียดคมชัดสมจริง',
  'image_7d9555.jpg', '2025-11-20', 1,
  '["โครงสร้างฐานเหล็กและกล่องไม้แข็งแกร่งความสูง 3 เมตร ปลอดภัย","งานดึงขอบผ้ากรุกล่องแสงเรียบเนียน ปราศจากรอยย่นยับหน้างาน"]',
  2),
(3, 'booth',
  'บูธจัดแสดงสินค้าเชิงนวัตกรรมการแพทย์ แบรนด์ BeAmed',
  'Innovative Medical Booth - BeAmed',
  'บีเอเมด เมดิคอล กรุ๊ป', 'BeAmed Medical Group',
  'สร้างสรรค์บูธนวัตกรรมรูปทรงกลมและทางโค้งไร้รอยตัดต่อ พ่นสีกรุผิวเงาเนียนละเอียด ประดับตกแต่งเส้นทางเดินไฟสายตรงนีออนสีน้ำเงินสว่างสไตล์เทคโนโลยีล้ำสมัยระดับสูง',
  'image_7d958d.jpg', '2025-09-05', 1,
  '["งานประกอบชิ้นงานโครงสร้างทรงโค้งซับซ้อนไร้รอยต่อ","สีพ่นพรีเมียมเคลือบเงาช่วยเน้นความรู้สึกหรูหราแบบไฮเอนด์"]',
  3),
(4, 'backdrop',
  'เวทีนิทรรศการจำลองเมืองประวัติศาสตร์ CRA Harmony in Heritage City',
  'Harmony in Heritage Exhibition Backdrop',
  'ราชวิทยาลัยจุฬาภรณ์', 'CRA Thailand',
  'ฉากเวทีและป๊อปอัพ 3 มิติตัดไดคัตเรียบกริบไร้รอยต่อ ซ้อนเลเยอร์สร้างความลึกสมจริงให้ภาพจำลองประวัติศาสตร์อยุธยา พิมพ์ด้วยระบบคุณภาพสีสดอิมพอร์ตหมึกญี่ปุ่น',
  'image_7d95b3.jpg', '2025-08-12', 1,
  '["ไดคัตป๊อปอัพพรีเมียมซ้อนระยะชัดลึกเพื่อสร้างอรรถรสประวัติศาสตร์","หมึกพิมพ์อิมพอร์ตจากประเทศญี่ปุ่นแท้ ให้เฉดสีสดแม่นยำ"]',
  4);

-- ── Admin Users ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  username     TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,   -- SHA-256 hex
  created_at   TEXT DEFAULT (datetime('now'))
);
