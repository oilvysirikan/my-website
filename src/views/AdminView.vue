<template>
  <div class="admin-page">

    <!-- ══ Login Gate ══════════════════════════════════════════ -->
    <div v-if="!loggedIn" class="login-screen">
      <div class="login-card">
        <div class="login-logo">⚙️ Admin Panel</div>
        <h1>เข้าสู่ระบบ</h1>
        <p class="login-sub">SignCraft Studio CMS</p>

        <form @submit.prevent="doLogin" class="login-form">
          <div class="field">
            <label>Username</label>
            <input v-model="loginForm.username" type="text" placeholder="admin" required autocomplete="username" />
          </div>
          <div class="field">
            <label>Password</label>
            <input v-model="loginForm.password" type="password" placeholder="••••••••" required autocomplete="current-password" />
          </div>
          <p v-if="loginError" class="error-msg">{{ loginError }}</p>
          <button type="submit" class="btn-gold" :disabled="loginLoading">
            {{ loginLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ' }}
          </button>
        </form>
      </div>
    </div>

    <!-- ══ Admin Dashboard ════════════════════════════════════ -->
    <template v-else>
      <header class="admin-header">
        <div class="admin-header-inner">
          <div class="admin-brand">
            <span class="brand-icon">⚙️</span>
            <span>Admin Panel</span>
            <span class="brand-sep">|</span>
            <span class="brand-site">SignCraft Studio</span>
          </div>
          <div class="admin-actions">
            <a href="/" target="_blank" class="btn-ghost">🔗 ดูหน้าเว็บ</a>
            <button @click="doLogout" class="btn-ghost danger">ออกจากระบบ</button>
          </div>
        </div>
      </header>

      <div class="admin-layout">
        <!-- Sidebar -->
        <nav class="admin-sidebar">
          <button
            v-for="tab in tabs" :key="tab.id"
            :class="['sidebar-btn', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            <span class="tab-icon">{{ tab.icon }}</span>
            <span>{{ tab.label }}</span>
          </button>
        </nav>

        <!-- Content -->
        <main class="admin-content">

          <!-- ─── Tab: ข้อมูลร้าน ───────────────────────────── -->
          <section v-if="activeTab === 'settings'" class="tab-section">
            <div class="section-header">
              <h2>⚙️ ข้อมูลร้าน</h2>
              <button @click="saveSettingsData" class="btn-gold" :disabled="saving">
                {{ saving ? 'กำลังบันทึก...' : '💾 บันทึก' }}
              </button>
            </div>
            <p v-if="saveMsg" :class="['save-msg', saveMsg.ok ? 'ok' : 'err']">{{ saveMsg.text }}</p>

            <div class="form-grid">
              <div class="field-group">
                <h3>ชื่อบริษัท</h3>
                <div class="field">
                  <label>ชื่อภาษาไทย</label>
                  <input v-model="settings.company_name_th" type="text" />
                </div>
                <div class="field">
                  <label>ชื่อภาษาอังกฤษ</label>
                  <input v-model="settings.company_name_en" type="text" />
                </div>
              </div>

              <div class="field-group">
                <h3>Tagline หน้าแรก</h3>
                <div class="field">
                  <label>Tagline ภาษาไทย</label>
                  <input v-model="settings.tagline_th" type="text" />
                </div>
                <div class="field">
                  <label>Tagline ภาษาอังกฤษ</label>
                  <input v-model="settings.tagline_en" type="text" />
                </div>
                <div class="field">
                  <label>ข้อความ Hero รอง</label>
                  <input v-model="settings.hero_subtitle_th" type="text" />
                </div>
              </div>

              <div class="field-group">
                <h3>ติดต่อ</h3>
                <div class="field"><label>เบอร์โทร 1</label><input v-model="settings.phone" type="text" /></div>
                <div class="field"><label>เบอร์โทร 2</label><input v-model="settings.phone2" type="text" /></div>
                <div class="field"><label>Line ID</label><input v-model="settings.line_id" type="text" /></div>
                <div class="field"><label>Email</label><input v-model="settings.email" type="email" /></div>
                <div class="field"><label>ที่อยู่</label><textarea v-model="settings.address_th" rows="2" /></div>
              </div>

              <div class="field-group">
                <h3>ตัวเลขสถิติ (หน้าแรก)</h3>
                <div class="stats-grid">
                  <div class="field">
                    <label>ปีประสบการณ์</label>
                    <input v-model="settings.stat_years" type="text" />
                  </div>
                  <div class="field">
                    <label>พื้นที่ผลิต (ตร.ม.)</label>
                    <input v-model="settings.stat_area" type="text" />
                  </div>
                  <div class="field">
                    <label>ทีมงาน</label>
                    <input v-model="settings.stat_team" type="text" />
                  </div>
                  <div class="field">
                    <label>โปรเจกต์สำเร็จ</label>
                    <input v-model="settings.stat_projects" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- ─── Tab: ผลงาน ────────────────────────────────── -->
          <section v-if="activeTab === 'portfolio'" class="tab-section">
            <div class="section-header">
              <h2>🖼️ ผลงาน (Portfolio)</h2>
              <button @click="openPortfolioModal(null)" class="btn-gold">+ เพิ่มผลงาน</button>
            </div>

            <div class="portfolio-table">
              <div class="pt-head">
                <span>รูป</span><span>ชื่อโปรเจกต์</span><span>ลูกค้า</span><span>หมวด</span><span>แนะนำ</span><span>จัดการ</span>
              </div>
              <div v-for="p in portfolioItems" :key="p.id" class="pt-row">
                <div class="pt-img">
                  <img v-if="p.image_url" :src="p.image_url.startsWith('http') || p.image_url.startsWith('/') ? p.image_url : `/api/images/${p.image_url}`" :alt="p.project_name_th" />
                  <div v-else class="pt-noimg">📷</div>
                </div>
                <div class="pt-name">
                  <strong>{{ p.project_name_th }}</strong>
                  <small>{{ p.project_name_en }}</small>
                </div>
                <div>{{ p.client_name_th }}</div>
                <div><span class="badge">{{ p.category }}</span></div>
                <div>
                  <span :class="['feat-dot', { active: p.is_featured }]">{{ p.is_featured ? '⭐' : '–' }}</span>
                </div>
                <div class="row-actions">
                  <button @click="openPortfolioModal(p)" class="btn-sm edit">✏️ แก้ไข</button>
                  <button @click="confirmDelete(p)" class="btn-sm del">🗑️ ลบ</button>
                </div>
              </div>
              <div v-if="!portfolioItems.length" class="pt-empty">ยังไม่มีผลงาน — กด "+ เพิ่มผลงาน" เพื่อเริ่ม</div>
            </div>
          </section>



          <!-- ─── Tab: ตั้งรหัสผ่าน ──────────────────────────── -->
          <section v-if="activeTab === 'password'" class="tab-section">
            <div class="section-header"><h2>🔐 ตั้งรหัสผ่าน Admin</h2></div>
            <div class="pw-info">
              <p>เพื่อเพิ่มหรือเปลี่ยน Admin ให้ใช้คำสั่ง <code>wrangler</code> ด้านล่างใน Terminal:</p>
              <div class="code-block">
                <pre># 1. Hash รหัสผ่านด้วย SHA-256 (ใน Node.js)
node -e "const crypto=require('crypto'); console.log(crypto.createHash('sha256').update('YOUR_PASSWORD').digest('hex'))"

# 2. Insert admin user ลงใน D1
npx wrangler d1 execute signcraft-db --remote --command \
  "INSERT OR REPLACE INTO admin_users(username,password_hash) VALUES('admin','&lt;HASH_HERE&gt;')"

# 3. ตั้ง JWT Secret (ครั้งแรกครั้งเดียว)
npx wrangler pages secret put JWT_SECRET --project-name=signcraft-studio</pre>
              </div>
              <p class="pw-note">💡 หลังตั้งค่าแล้ว logout แล้ว login ใหม่ด้วยรหัสผ่านใหม่</p>
            </div>
          </section>

        </main>
      </div>
    </template>

    <!-- ══ Portfolio Modal ════════════════════════════════════ -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-box">
        <div class="modal-header">
          <h3>{{ editItem?.id ? '✏️ แก้ไขผลงาน' : '➕ เพิ่มผลงาน' }}</h3>
          <button @click="showModal = false" class="modal-close">✕</button>
        </div>

        <div class="modal-body">
          <div class="field"><label>ชื่อโปรเจกต์ (ไทย) *</label><input v-model="form.project_name_th" type="text" required /></div>
          <div class="field"><label>Project Name (EN)</label><input v-model="form.project_name_en" type="text" /></div>

          <div class="field-row">
            <div class="field">
              <label>หมวดหมู่</label>
              <select v-model="form.category">
                <option value="signage">ป้ายสัญลักษณ์</option>
                <option value="backdrop">ฉากหลัง</option>
                <option value="booth">บูธนิทรรศการ</option>
                <option value="sticker">สติกเกอร์</option>
              </select>
            </div>
            <div class="field">
              <label>วันที่ส่งมอบ</label>
              <input v-model="form.completion_date" type="date" />
            </div>
          </div>

          <div class="field"><label>ชื่อลูกค้า (ไทย)</label><input v-model="form.client_name_th" type="text" /></div>
          <div class="field"><label>Client Name (EN)</label><input v-model="form.client_name_en" type="text" /></div>

          <div class="field">
            <label>รายละเอียดงาน</label>
            <textarea v-model="form.work_description" rows="3" />
          </div>

          <div class="field">
            <label>จุดเด่น (กด Enter เพื่อเพิ่ม)</label>
            <div class="highlights-input">
              <input v-model="newHighlight" type="text" placeholder="เช่น อักษรโลหะพ่นสีอบอย่างดี"
                @keydown.enter.prevent="addHighlight" />
              <button @click="addHighlight" class="btn-sm edit">+</button>
            </div>
            <div class="highlights-list">
              <span v-for="(h, i) in form.highlights" :key="i" class="highlight-tag">
                {{ h }} <button @click="form.highlights.splice(i,1)">✕</button>
              </span>
            </div>
          </div>

          <div class="field">
            <label>รูปภาพ</label>
            <div class="upload-area" @dragover.prevent @drop.prevent="onDrop">
              <div v-if="form.image_url" class="preview-wrap">
                <img :src="form.image_url.startsWith('http') || form.image_url.startsWith('/') ? form.image_url : `/api/images/${form.image_url}`" class="preview-img" />
                <button @click="form.image_url = ''" class="remove-img">✕</button>
              </div>
              <div v-else class="upload-placeholder">
                <span>📤 ลากวางรูปที่นี่ หรือ</span>
                <label class="file-pick">
                  คลิกเลือกไฟล์
                  <input type="file" accept="image/*" @change="onFileChange" hidden />
                </label>
              </div>
              <div v-if="uploading" class="upload-progress">⏳ กำลังอัปโหลด...</div>
            </div>
            <div class="field" style="margin-top:0.5rem">
              <label style="font-size:0.8rem;color:#888">หรือใส่ URL รูปภาพโดยตรง</label>
              <input v-model="form.image_url" type="text" placeholder="https://... หรือ /api/images/..." />
            </div>
          </div>

          <div class="field check-field">
            <input id="is-featured" v-model="form.is_featured" type="checkbox" />
            <label for="is-featured">⭐ ผลงานแนะนำ (แสดงในหน้าแรก)</label>
          </div>

          <div class="field">
            <label>รูปการติดตั้ง (Installation Images)</label>
            <div class="upload-area" @dragover.prevent @drop.prevent="onDropInstallation">
              <div class="installation-images-grid">
                <div v-for="(img, idx) in form.installation_images" :key="idx" class="installation-preview-wrap">
                  <img :src="img.startsWith('http') || img.startsWith('/') ? img : `/api/images/${img}`" class="installation-preview-img" />
                  <button @click="form.installation_images.splice(idx, 1)" class="remove-installation-img">✕</button>
                </div>
                <div class="add-installation-btn" @click="$refs.installationFileInput.click()">
                  <span>+</span>
                </div>
              </div>
              <input ref="installationFileInput" type="file" accept="image/*" multiple @change="onInstallationFileChange" hidden />
            </div>
            <div class="field" style="margin-top:0.5rem">
              <label style="font-size:0.8rem;color:#888">หรือใส่ URL รูปภาพ (คั่นด้วยจุลภาค)</label>
              <input v-model="installationUrlsInput" type="text" placeholder="https://..., https://..." @blur="addInstallationUrls" />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button @click="showModal = false" class="btn-ghost">ยกเลิก</button>
          <button @click="savePortfolioItem" class="btn-gold" :disabled="saving">
            {{ saving ? 'กำลังบันทึก...' : '💾 บันทึก' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Confirm Delete -->
    <div v-if="deleteTarget" class="modal-overlay" @click.self="deleteTarget = null">
      <div class="modal-box confirm-box">
        <h3>🗑️ ยืนยันการลบ</h3>
        <p>คุณต้องการลบ <strong>{{ deleteTarget.project_name_th }}</strong> ใช่หรือไม่?</p>
        <div class="modal-footer">
          <button @click="deleteTarget = null" class="btn-ghost">ยกเลิก</button>
          <button @click="doDelete" class="btn-gold danger">ลบเลย</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import {
  login, isLoggedIn, clearToken,
  getSettings, saveSettings,
  getPortfolio, createPortfolioItem, updatePortfolioItem, deletePortfolioItem,
  uploadImage,
} from '@/composables/useApi.js';

// ── Auth ─────────────────────────────────────────────────────
const loggedIn   = ref(isLoggedIn());
const loginForm  = reactive({ username: '', password: '' });
const loginError = ref('');
const loginLoading = ref(false);

async function doLogin() {
  loginLoading.value = true;
  loginError.value = '';
  const res = await login(loginForm.username, loginForm.password);
  loginLoading.value = false;
  if (res.ok) {
    loggedIn.value = true;
    loadAll();
  } else {
    loginError.value = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
  }
}

function doLogout() {
  clearToken();
  loggedIn.value = false;
}

// ── Tabs ─────────────────────────────────────────────────────
  const tabs = [
    { id: 'settings',  icon: '⚙️',  label: 'ข้อมูลร้าน' },
    { id: 'portfolio', icon: '🖼️', label: 'ผลงาน' },
    { id: 'password',  icon: '🔐',  label: 'ตั้งรหัสผ่าน' },
  ];
const activeTab = ref('settings');

// ── Settings ──────────────────────────────────────────────────
const settings = reactive({});
const saving   = ref(false);
const saveMsg  = ref(null);

async function loadSettings() {
  const data = await getSettings();
  if (data) Object.assign(settings, data);
}

async function saveSettingsData() {
  saving.value = true;
  saveMsg.value = null;
  const res = await saveSettings({ ...settings });
  saving.value = false;
  saveMsg.value = res.ok
    ? { ok: true,  text: '✅ บันทึกสำเร็จ!' }
    : { ok: false, text: '❌ บันทึกไม่สำเร็จ: ' + res.error };
  setTimeout(() => saveMsg.value = null, 3000);
}

// ── Portfolio ─────────────────────────────────────────────────
const portfolioItems = ref([]);

async function loadPortfolio() {
  portfolioItems.value = await getPortfolio();
}

const showModal   = ref(false);
const editItem    = ref(null);
const newHighlight = ref('');
const uploading   = ref(false);
const installationUrlsInput = ref('');
const form = reactive({
  project_name_th: '', project_name_en: '',
  category: 'signage', completion_date: '',
  client_name_th: '', client_name_en: '',
  work_description: '', image_url: '',
  highlights: [], is_featured: false,
  installation_images: [],
});

function openPortfolioModal(item) {
  editItem.value = item;
  newHighlight.value = '';
  installationUrlsInput.value = '';
  if (item) {
    Object.assign(form, {
      ...item,
      highlights: Array.isArray(item.highlights) ? [...item.highlights] : [],
      installation_images: Array.isArray(item.installation_images) ? [...item.installation_images] : [],
    });
  } else {
    Object.assign(form, {
      project_name_th: '', project_name_en: '',
      category: 'signage', completion_date: new Date().toISOString().split('T')[0],
      client_name_th: '', client_name_en: '',
      work_description: '', image_url: '',
      highlights: [], is_featured: false,
      installation_images: [],
    });
  }
  showModal.value = true;
}

function addHighlight() {
  const v = newHighlight.value.trim();
  if (v) { form.highlights.push(v); newHighlight.value = ''; }
}

async function onFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  uploading.value = true;
  const res = await uploadImage(file);
  uploading.value = false;
  if (res.ok) form.image_url = res.url;
}

async function onDrop(e) {
  const file = e.dataTransfer.files[0];
  if (!file) return;
  uploading.value = true;
  const res = await uploadImage(file);
  uploading.value = false;
  if (res.ok) form.image_url = res.url;
}

async function onInstallationFileChange(e) {
  const files = Array.from(e.target.files);
  if (!files.length) return;
  uploading.value = true;
  for (const file of files) {
    const res = await uploadImage(file);
    if (res.ok) form.installation_images.push(res.url);
  }
  uploading.value = false;
  e.target.value = '';
}

async function onDropInstallation(e) {
  const files = Array.from(e.dataTransfer.files);
  if (!files.length) return;
  uploading.value = true;
  for (const file of files) {
    const res = await uploadImage(file);
    if (res.ok) form.installation_images.push(res.url);
  }
  uploading.value = false;
}

function addInstallationUrls() {
  const urls = installationUrlsInput.value.split(',').map(u => u.trim()).filter(u => u);
  if (urls.length) {
    form.installation_images.push(...urls);
    installationUrlsInput.value = '';
  }
}

async function savePortfolioItem() {
  saving.value = true;
  const payload = { ...form };
  const res = editItem.value?.id
    ? await updatePortfolioItem({ ...payload, id: editItem.value.id })
    : await createPortfolioItem(payload);
  saving.value = false;
  if (res.ok) { showModal.value = false; loadPortfolio(); }
  else alert('บันทึกไม่สำเร็จ: ' + res.error);
}

// ── Delete ────────────────────────────────────────────────────
const deleteTarget = ref(null);

function confirmDelete(p) { deleteTarget.value = p; }

async function doDelete() {
  if (!deleteTarget.value) return;
  await deletePortfolioItem(deleteTarget.value.id);
  deleteTarget.value = null;
  loadPortfolio();
}




onMounted(() => { if (loggedIn.value) loadAll(); });
</script>

<style scoped>
/* ─── Design tokens ───────────────────────────────────────── */
:root {
  --gold: #D4AF37;
  --gold-d: #B8860B;
  --dark: #121212;
  --card: #1E1E1E;
  --border: rgba(255,255,255,0.08);
  --text: #E0E0E0;
  --muted: #888;
}

.admin-page {
  min-height: 100vh;
  background: #0f0f0f;
  color: #E0E0E0;
  font-family: 'Inter', 'Open Sans', sans-serif;
}

/* ─── Login ──────────────────────────────────────────────── */
.login-screen {
  display: flex; align-items: center; justify-content: center;
  min-height: 100vh;
  background: radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%);
}
.login-card {
  background: #1a1a1a;
  border: 1px solid rgba(212,175,55,0.2);
  border-radius: 20px;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}
.login-logo {
  font-size: 2rem; text-align: center; margin-bottom: 1rem;
}
.login-card h1 {
  font-size: 1.5rem; font-weight: 700; text-align: center;
  color: #fff; margin-bottom: 0.25rem;
}
.login-sub { text-align: center; color: #888; font-size: 0.9rem; margin-bottom: 1.5rem; }
.login-form { display: flex; flex-direction: column; gap: 1rem; }
.error-msg { color: #ff6b6b; font-size: 0.875rem; text-align: center; }

/* ─── Admin Header ───────────────────────────────────────── */
.admin-header {
  background: #161616;
  border-bottom: 1px solid rgba(212,175,55,0.15);
  padding: 0 1.5rem;
  height: 60px;
  display: flex;
  align-items: center;
}
.admin-header-inner {
  width: 100%; display: flex; align-items: center; justify-content: space-between;
}
.admin-brand {
  display: flex; align-items: center; gap: 0.75rem;
  font-weight: 600; font-size: 1rem; color: #fff;
}
.brand-icon { font-size: 1.2rem; }
.brand-sep { color: #444; }
.brand-site { color: #D4AF37; font-style: italic; }
.admin-actions { display: flex; gap: 0.5rem; }

/* ─── Layout ─────────────────────────────────────────────── */
.admin-layout { display: flex; min-height: calc(100vh - 60px); }

.admin-sidebar {
  width: 220px; min-width: 220px;
  background: #161616;
  border-right: 1px solid rgba(255,255,255,0.05);
  padding: 1.5rem 1rem;
  display: flex; flex-direction: column; gap: 0.5rem;
}

.sidebar-btn {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: none; background: transparent;
  color: #aaa; font-size: 0.95rem;
  cursor: pointer; text-align: left; width: 100%;
  transition: all 0.2s;
}
.sidebar-btn:hover { background: rgba(255,255,255,0.05); color: #fff; }
.sidebar-btn.active {
  background: rgba(212,175,55,0.12);
  color: #D4AF37;
  font-weight: 600;
}
.tab-icon { font-size: 1.1rem; }

.admin-content {
  flex: 1; padding: 2rem; overflow-y: auto;
}

/* ─── Section ────────────────────────────────────────────── */
.tab-section { max-width: 900px; }

.section-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 1.5rem; padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.section-header h2 { font-size: 1.4rem; font-weight: 700; color: #fff; margin: 0; }

/* ─── Form ───────────────────────────────────────────────── */
.form-grid { display: flex; flex-direction: column; gap: 1.5rem; }

.field-group {
  background: #1a1a1a;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 1.5rem;
}
.field-group h3 {
  font-size: 0.9rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: #D4AF37; margin-bottom: 1rem;
}

.field { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 0.75rem; }
.field label { font-size: 0.85rem; color: #999; font-weight: 500; }
.field input, .field select, .field textarea {
  background: #111; border: 1.5px solid rgba(255,255,255,0.1);
  border-radius: 8px; padding: 0.65rem 0.9rem;
  color: #e0e0e0; font-size: 0.95rem; font-family: inherit;
  transition: border-color 0.2s;
}
.field input:focus, .field select:focus, .field textarea:focus {
  outline: none; border-color: #D4AF37;
}
.field textarea { resize: vertical; }

.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }

/* ─── Buttons ─────────────────────────────────────────────── */
.btn-gold {
  background: #D4AF37; color: #111;
  border: none; border-radius: 8px;
  padding: 0.65rem 1.5rem; font-weight: 700;
  font-size: 0.9rem; cursor: pointer; font-family: inherit;
  transition: all 0.2s;
}
.btn-gold:hover:not(:disabled) { background: #B8860B; }
.btn-gold:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-gold.danger { background: #e74c3c; color: #fff; }
.btn-gold.danger:hover { background: #c0392b; }

.btn-ghost {
  background: transparent;
  border: 1.5px solid rgba(255,255,255,0.15);
  color: #aaa; border-radius: 8px;
  padding: 0.5rem 1rem; font-size: 0.85rem;
  cursor: pointer; font-family: inherit;
  text-decoration: none; display: inline-block;
  transition: all 0.2s;
}
.btn-ghost:hover { border-color: #D4AF37; color: #D4AF37; }
.btn-ghost.danger:hover { border-color: #e74c3c; color: #e74c3c; }

.btn-sm {
  border: none; border-radius: 6px;
  padding: 0.35rem 0.7rem; font-size: 0.8rem;
  cursor: pointer; font-family: inherit; font-weight: 600;
  transition: all 0.15s;
}
.btn-sm.edit { background: rgba(212,175,55,0.15); color: #D4AF37; }
.btn-sm.edit:hover { background: rgba(212,175,55,0.3); }
.btn-sm.del { background: rgba(231,76,60,0.15); color: #e74c3c; }
.btn-sm.del:hover { background: rgba(231,76,60,0.3); }

/* ─── Save msg ───────────────────────────────────────────── */
.save-msg { padding: 0.6rem 1rem; border-radius: 8px; font-size: 0.9rem; margin-bottom: 1rem; }
.save-msg.ok  { background: rgba(46,213,115,0.1); color: #2ed573; border: 1px solid rgba(46,213,115,0.2); }
.save-msg.err { background: rgba(231,76,60,0.1);  color: #e74c3c; border: 1px solid rgba(231,76,60,0.2); }

/* ─── Portfolio Table ────────────────────────────────────── */
.portfolio-table {
  background: #1a1a1a;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px; overflow: hidden;
}
.pt-head {
  display: grid;
  grid-template-columns: 60px 1fr 1fr 90px 70px 120px;
  gap: 0.5rem; padding: 0.75rem 1rem;
  background: rgba(255,255,255,0.03);
  font-size: 0.78rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.07em; color: #666;
}
.pt-row {
  display: grid;
  grid-template-columns: 60px 1fr 1fr 90px 70px 120px;
  gap: 0.5rem; padding: 0.85rem 1rem;
  border-top: 1px solid rgba(255,255,255,0.04);
  align-items: center; font-size: 0.9rem;
  transition: background 0.15s;
}
.pt-row:hover { background: rgba(255,255,255,0.02); }
.pt-img img { width: 50px; height: 40px; object-fit: cover; border-radius: 6px; }
.pt-noimg {
  width: 50px; height: 40px; border-radius: 6px;
  background: #2a2a2a; display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem; color: #555;
}
.pt-name { display: flex; flex-direction: column; gap: 0.1rem; }
.pt-name strong { font-size: 0.88rem; color: #e0e0e0; }
.pt-name small { font-size: 0.75rem; color: #666; }
.badge {
  background: rgba(212,175,55,0.1); color: #D4AF37;
  padding: 0.2rem 0.55rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600;
}
.feat-dot { font-size: 1.1rem; }
.row-actions { display: flex; gap: 0.4rem; }
.pt-empty { padding: 2rem; text-align: center; color: #555; font-style: italic; }

/* ─── Modal ─────────────────────────────────────────────── */
.modal-overlay {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,0.75);
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
}
.modal-box {
  background: #1a1a1a;
  border: 1px solid rgba(212,175,55,0.2);
  border-radius: 18px;
  width: 100%; max-width: 640px;
  max-height: 90vh; display: flex; flex-direction: column;
  box-shadow: 0 30px 80px rgba(0,0,0,0.6);
}
.confirm-box { max-width: 400px; }
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.modal-header h3 { margin: 0; color: #fff; font-size: 1.1rem; }
.modal-close {
  background: transparent; border: none; color: #888;
  font-size: 1.2rem; cursor: pointer; padding: 0.25rem;
}
.modal-close:hover { color: #fff; }
.modal-body { flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
.modal-footer {
  display: flex; justify-content: flex-end; gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.07);
}

/* Highlights */
.highlights-input { display: flex; gap: 0.5rem; }
.highlights-input input { flex: 1; }
.highlights-list { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.5rem; }
.highlight-tag {
  background: rgba(212,175,55,0.1); color: #D4AF37;
  padding: 0.25rem 0.6rem; border-radius: 20px; font-size: 0.8rem;
  display: flex; align-items: center; gap: 0.3rem;
}
.highlight-tag button { background: none; border: none; color: inherit; cursor: pointer; padding: 0; }

/* Upload area */
.upload-area {
  border: 2px dashed rgba(255,255,255,0.15);
  border-radius: 10px; padding: 1.25rem;
  text-align: center; cursor: pointer;
  transition: border-color 0.2s;
}
.upload-area:hover { border-color: #D4AF37; }
.upload-placeholder { color: #888; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; flex-wrap: wrap; }
.file-pick { color: #D4AF37; cursor: pointer; text-decoration: underline; }
.upload-progress { color: #D4AF37; font-size: 0.85rem; margin-top: 0.5rem; }
.preview-wrap { position: relative; display: inline-block; }
.preview-img { max-height: 140px; border-radius: 8px; }
.remove-img {
  position: absolute; top: -8px; right: -8px;
  background: #e74c3c; color: #fff;
  border: none; border-radius: 50%; width: 22px; height: 22px;
  font-size: 0.75rem; cursor: pointer; display: flex; align-items: center; justify-content: center;
}

/* Installation images grid */
.installation-images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.installation-preview-wrap {
  position: relative;
  aspect-ratio: 1;
}

.installation-preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.remove-installation-img {
  position: absolute; top: -6px; right: -6px;
  background: #e74c3c; color: #fff;
  border: none; border-radius: 50%; width: 20px; height: 20px;
  font-size: 0.7rem; cursor: pointer; display: flex; align-items: center; justify-content: center;
  z-index: 1;
}

.add-installation-btn {
  aspect-ratio: 1;
  border: 2px dashed rgba(212,175,55,0.3);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #D4AF37;
  font-size: 1.5rem;
  transition: all 0.2s;
}

.add-installation-btn:hover {
  border-color: #D4AF37;
  background: rgba(212,175,55,0.1);
}

/* check field */
.check-field { flex-direction: row !important; align-items: center; gap: 0.5rem !important; }
.check-field input { width: auto; }

/* ─── Password info ──────────────────────────────────────── */
.pw-info {
  background: #1a1a1a; border-radius: 14px;
  padding: 1.5rem;
  border: 1px solid rgba(255,255,255,0.06);
}
.pw-info p { color: #aaa; font-size: 0.95rem; margin-bottom: 1rem; }
.code-block {
  background: #0d0d0d; border-radius: 10px;
  padding: 1.25rem; overflow-x: auto;
  border: 1px solid rgba(255,255,255,0.06);
}
.code-block pre { margin: 0; font-family: 'Courier New', monospace; font-size: 0.82rem; color: #7ec8e3; white-space: pre-wrap; }
.pw-note { color: #D4AF37 !important; font-size: 0.875rem !important; margin-top: 1rem !important; }
</style>
