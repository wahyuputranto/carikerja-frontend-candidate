<template>
  <div class="min-h-screen">
    <NavBar />
    
    <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto space-y-8">
        <h1 class="text-4xl font-bold font-display">
          <span class="gradient-text">Profil Saya</span>
        </h1>

        <!-- Basic Profile Section -->
        <div class="glass rounded-3xl p-8">
          <h2 class="text-2xl font-bold mb-6">Informasi Dasar</h2>
          <div class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label>
                <input type="text" v-model="form.full_name" class="input" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input type="email" v-model="form.email" class="input" disabled />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Nomor Telepon</label>
                <input type="tel" v-model="form.phone" class="input" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Tanggal Lahir</label>
                <input type="date" v-model="form.birth_date" class="input" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Alamat</label>
              <textarea v-model="form.address" rows="3" class="input resize-none"></textarea>
            </div>

             <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Kota</label>
                <input type="text" v-model="form.city" class="input" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Provinsi</label>
                <input type="text" v-model="form.province" class="input" />
              </div>
            </div>
            
            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Tentang Saya</label>
                <textarea v-model="form.about_me" rows="3" class="input resize-none" placeholder="Ceritakan sedikit tentang diri Anda..."></textarea>
            </div>

            <div class="flex justify-end space-x-4">
              <button class="btn btn-outline" @click="resetForm">Reset</button>
              <button class="btn btn-primary" @click="saveProfile" :disabled="loading">
                {{ loading ? 'Menyimpan...' : 'Simpan Perubahan' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Education Section -->
        <div class="glass rounded-3xl p-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold">Pendidikan</h2>
            <button @click="showAddEducation = true" class="btn btn-sm btn-outline">+ Tambah</button>
          </div>
          
          <div v-if="educations.length === 0" class="text-slate-500 text-center py-4">Belum ada data pendidikan.</div>
          <div v-else class="space-y-4">
            <div v-for="edu in educations" :key="edu.id" class="p-4 border border-slate-200 rounded-xl">
              <h3 class="font-bold text-lg">{{ edu.institution_name }}</h3>
              <p class="text-slate-700">{{ edu.degree }} - {{ edu.major }}</p>
              <p class="text-sm text-slate-500">{{ edu.start_year }} - {{ edu.is_current ? 'Sekarang' : edu.end_year }}</p>
              <p v-if="edu.gpa" class="text-sm text-slate-500">IPK: {{ edu.gpa }}</p>
            </div>
          </div>

          <!-- Add Education Form (Simple Toggle) -->
          <div v-if="showAddEducation" class="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 animate-fade-in">
            <h3 class="font-bold mb-4">Tambah Pendidikan</h3>
            <div class="space-y-4">
              <input v-model="eduForm.institution_name" placeholder="Nama Institusi" class="input" />
              <div class="grid grid-cols-2 gap-4">
                <input v-model="eduForm.degree" placeholder="Gelar (mis: S1)" class="input" />
                <input v-model="eduForm.major" placeholder="Jurusan" class="input" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <input v-model.number="eduForm.start_year" type="number" placeholder="Tahun Mulai" class="input" />
                <input v-model.number="eduForm.end_year" type="number" placeholder="Tahun Selesai" class="input" />
              </div>
               <div class="grid grid-cols-2 gap-4">
                <input v-model.number="eduForm.gpa" type="number" step="0.01" placeholder="IPK" class="input" />
              </div>
              <div class="flex justify-end space-x-2">
                <button @click="showAddEducation = false" class="btn btn-sm btn-ghost">Batal</button>
                <button @click="submitEducation" class="btn btn-sm btn-primary">Simpan</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Experience Section -->
        <div class="glass rounded-3xl p-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold">Pengalaman Kerja</h2>
            <button @click="showAddExperience = true" class="btn btn-sm btn-outline">+ Tambah</button>
          </div>

          <div v-if="experiences.length === 0" class="text-slate-500 text-center py-4">Belum ada data pengalaman.</div>
          <div v-else class="space-y-4">
            <div v-for="exp in experiences" :key="exp.id" class="p-4 border border-slate-200 rounded-xl">
              <h3 class="font-bold text-lg">{{ exp.position }}</h3>
              <p class="text-slate-700">{{ exp.company_name }}</p>
              <p class="text-sm text-slate-500">
                {{ formatDate(exp.start_date) }} - {{ exp.is_current ? 'Sekarang' : (exp.end_date ? formatDate(exp.end_date) : '') }}
              </p>
              <p class="text-sm text-slate-600 mt-2">{{ exp.description }}</p>
            </div>
          </div>

          <!-- Add Experience Form -->
          <div v-if="showAddExperience" class="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 animate-fade-in">
            <h3 class="font-bold mb-4">Tambah Pengalaman</h3>
            <div class="space-y-4">
              <input v-model="expForm.company_name" placeholder="Nama Perusahaan" class="input" />
              <input v-model="expForm.position" placeholder="Posisi" class="input" />
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-xs text-slate-500">Mulai</label>
                  <input v-model="expForm.start_date" type="date" class="input" />
                </div>
                <div>
                  <label class="text-xs text-slate-500">Selesai (Kosongkan jika saat ini)</label>
                  <input v-model="expForm.end_date" type="date" class="input" />
                </div>
              </div>
              <div class="flex items-center">
                  <input type="checkbox" v-model="expForm.is_current" id="is_current_exp" class="mr-2">
                  <label for="is_current_exp" class="text-sm">Masih bekerja di sini</label>
              </div>
              <textarea v-model="expForm.description" placeholder="Deskripsi Pekerjaan" class="input" rows="2"></textarea>
              <div class="flex justify-end space-x-2">
                <button @click="showAddExperience = false" class="btn btn-sm btn-ghost">Batal</button>
                <button @click="submitExperience" class="btn btn-sm btn-primary">Simpan</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills Section -->
        <div class="glass rounded-3xl p-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold">Keahlian</h2>
            <button @click="showAddSkill = true" class="btn btn-sm btn-outline">+ Tambah</button>
          </div>

          <div v-if="skills.length === 0" class="text-slate-500 text-center py-4">Belum ada data keahlian.</div>
          <div v-else class="flex flex-wrap gap-2">
            <span v-for="skill in skills" :key="skill.id" class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
              {{ skill.skill_name }} ({{ skill.proficiency_level }})
            </span>
          </div>

          <!-- Add Skill Form -->
          <div v-if="showAddSkill" class="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 animate-fade-in">
            <h3 class="font-bold mb-4">Tambah Keahlian</h3>
            <div class="space-y-4">
              <input v-model="skillForm.skill_name" placeholder="Nama Skill (mis: Golang)" class="input" />
              <select v-model="skillForm.proficiency_level" class="input">
                <option value="">Pilih Tingkat Kemahiran</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
              <div class="flex justify-end space-x-2">
                <button @click="showAddSkill = false" class="btn btn-sm btn-ghost">Batal</button>
                <button @click="submitSkill" class="btn btn-sm btn-primary">Simpan</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import NavBar from '@/components/layout/NavBar.vue'

const authStore = useAuthStore()
const { user, educations, experiences, skills, loading } = storeToRefs(authStore)

// --- Basic Profile ---
const form = ref({
  full_name: '',
  email: '',
  phone: '',
  birth_date: '',
  address: '',
  city: '',
  province: '',
  about_me: ''
})

const initForm = () => {
  if (user.value) {
    form.value = {
      full_name: user.value.full_name || '',
      email: user.value.email || '',
      phone: user.value.phone || '',
      birth_date: user.value.birth_date ? user.value.birth_date.split('T')[0] : '',
      address: user.value.address || '',
      city: user.value.city || '',
      province: user.value.province || '',
      about_me: user.value.about_me || ''
    }
  }
}

onMounted(async () => {
  console.log('ProfilePage mounted, fetching user...')
  try {
    await authStore.fetchUser() // Fetch full profile on mount
    console.log('User fetched successfully:', user.value)
  } catch (e) {
    console.error('Error fetching user in ProfilePage:', e)
  }
})

watch(user, () => {
  initForm()
}, { deep: true })

const resetForm = () => {
  initForm()
}

const saveProfile = async () => {
  if (!user.value) return
  
  // Convert date back to ISO if needed, or send as YYYY-MM-DD depending on backend
  // Assuming backend accepts YYYY-MM-DD or ISO
  const payload = {
      ...form.value,
      birth_date: form.value.birth_date ? new Date(form.value.birth_date).toISOString() : null
  }

  const result = await authStore.updateProfile(payload)
  if (result.success) {
    alert('Profil berhasil diperbarui!')
  } else {
    alert(result.error || 'Gagal memperbarui profil')
  }
}

// --- Education ---
const showAddEducation = ref(false)
const eduForm = ref({
  institution_name: '',
  degree: '',
  major: '',
  start_year: null,
  end_year: null,
  gpa: null
})

const submitEducation = async () => {
  const result = await authStore.addEducation(eduForm.value)
  if (result.success) {
    showAddEducation.value = false
    eduForm.value = { institution_name: '', degree: '', major: '', start_year: null, end_year: null, gpa: null }
  } else {
    alert(result.error)
  }
}

// --- Experience ---
const showAddExperience = ref(false)
const expForm = ref({
  company_name: '',
  position: '',
  start_date: '',
  end_date: '',
  is_current: false,
  description: ''
})

const submitExperience = async () => {
  const payload = {
      ...expForm.value,
      start_date: expForm.value.start_date ? new Date(expForm.value.start_date).toISOString() : null,
      end_date: expForm.value.end_date ? new Date(expForm.value.end_date).toISOString() : null
  }
  
  const result = await authStore.addExperience(payload)
  if (result.success) {
    showAddExperience.value = false
    expForm.value = { company_name: '', position: '', start_date: '', end_date: '', is_current: false, description: '' }
  } else {
    alert(result.error)
  }
}

// --- Skills ---
const showAddSkill = ref(false)
const skillForm = ref({
  skill_name: '',
  proficiency_level: ''
})

const submitSkill = async () => {
  const result = await authStore.addSkill(skillForm.value)
  if (result.success) {
    showAddSkill.value = false
    skillForm.value = { skill_name: '', proficiency_level: '' }
  } else {
    alert(result.error)
  }
}

const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })
}
</script>
