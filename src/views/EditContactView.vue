<template>
  <section class="edit-contact">
    <h1 class="title">แก้ไขข้อมูลติดต่อ</h1>
    <form @submit.prevent="save" class="form">
      <div class="field">
        <label for="phone">เบอร์โทรศัพท์</label>
        <input id="phone" v-model="form.phone" type="tel" placeholder="เช่น 095-764-6162" required />
      </div>
      <div class="field">
        <label for="email">อีเมล</label>
        <input id="email" v-model="form.email" type="email" placeholder="pen1office@gmail.com" required />
      </div>
      <div class="field">
        <label for="line">Line ID</label>
        <input id="line" v-model="form.line" type="text" placeholder="@qik5926b" />
      </div>
      <div class="actions">
        <button type="submit" class="save-btn">บันทึก</button>
        <button type="button" @click="reset" class="reset-btn">รีเซ็ต</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { getSettings, saveSettings } from '@/composables/useApi'

const form = reactive({
  phone: '',
  email: '',
  line: ''
})

onMounted(async () => {
  const data = await getSettings()
  if (data) {
    form.phone = data.phone || ''
    form.email = data.email || ''
    form.line = data.line || ''
  }
})

async function save() {
  try {
    await saveSettings({ ...form })
    alert('บันทึกสำเร็จ!')
  } catch (err) {
    console.error(err)
    alert('เกิดข้อผิดพลาดในการบันทึก')
  }
}

function reset() {
  form.phone = ''
  form.email = ''
  form.line = ''
}
</script>

<style scoped>
.edit-contact {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
.title {
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #222;
}
.form .field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}
.form label {
  margin-bottom: 0.4rem;
  font-weight: 600;
  color: #333;
}
.form input {
  padding: 0.6rem 0.8rem;
  border: none;
  border-radius: 6px;
  background: rgba(255,255,255,0.8);
  font-size: 1rem;
}
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}
.save-btn, .reset-btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.save-btn {
  background: #4caf50;
  color: white;
}
.reset-btn {
  background: #f44336;
  color: white;
}
</style>
