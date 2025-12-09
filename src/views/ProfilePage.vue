<template>
  <div class="min-h-screen">
    <NavBar />
    
    <div class="pt-20 md:pt-24 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto space-y-6 md:space-y-8">
        <div class="flex items-center mb-2">
            <router-link to="/dashboard" class="group flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 group-hover:-translate-x-1 transition-transform">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                <span class="text-lg font-bold">Kembali ke Dashboard</span>
            </router-link>
        </div>

        <!-- Basic Profile Section -->
        <div class="glass rounded-3xl p-5 md:p-8">
          <h2 class="text-lg md:text-2xl font-bold mb-4 md:mb-6">Informasi Dasar</h2>
          
          <!-- Photo Upload Section -->
          <div class="mb-6 md:mb-8 flex flex-col items-center">
            <div class="relative group">
              <img 
                :src="photoPreview || currentUser?.photo_url || defaultAvatar" 
                alt="Profile Photo" 
                class="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-primary-200 shadow-lg"
              />
              <div class="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <label for="photo-upload" class="cursor-pointer text-white text-sm font-medium flex flex-col items-center">
                  <svg class="w-6 h-6 md:w-8 md:h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span class="text-xs md:text-sm">Ubah Foto</span>
                </label>
                <input 
                  id="photo-upload" 
                  type="file" 
                  accept="image/*" 
                  @change="handlePhotoUpload" 
                  class="hidden"
                />
              </div>
            </div>
            <p class="text-xs md:text-sm text-slate-500 mt-3">Klik foto untuk mengubah</p>
            <p v-if="photoFile" class="text-xs text-primary-600 mt-1">{{ photoFile.name }}</p>
          </div>

          <div class="space-y-5 md:space-y-6">
            <div class="grid md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label>
                <input type="text" v-model="form.full_name" class="input" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input type="email" v-model="form.email" class="input" disabled />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Nomor Telepon</label>
                <input type="tel" v-model="form.phone" class="input" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Alamat</label>
              <textarea v-model="form.address" rows="3" class="input resize-none"></textarea>
            </div>

             <div class="grid md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Provinsi</label>
                <select v-model="form.province" @change="handleProvinceChange" class="input">
                  <option value="">Pilih Provinsi</option>
                  <option v-for="prov in provinces" :key="prov.id" :value="prov.name">{{ prov.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Kota</label>
                <select v-model="form.city" class="input" :disabled="!form.province">
                  <option value="">Pilih Kota</option>
                  <option v-for="city in cities" :key="city.id" :value="city.name">{{ city.name }}</option>
                </select>
              </div>
            </div>
            
            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Tentang Saya</label>
                <textarea v-model="form.about_me" rows="3" class="input resize-none" placeholder="Ceritakan sedikit tentang diri Anda..."></textarea>
            </div>

            <!-- Personal Details -->
            <div class="border-t border-slate-200 pt-6 mt-6">
                <h3 class="text-lg font-bold mb-4">Detail Pribadi</h3>
                <div class="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2">NIK</label>
                        <input type="text" v-model="form.nik" class="input" placeholder="Nomor Induk Kependudukan" />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2">Jenis Kelamin</label>
                        <select v-model="form.gender" class="input">
                            <option value="">Pilih Jenis Kelamin</option>
                            <option value="Male">Laki-laki</option>
                            <option value="Female">Perempuan</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2">Tanggal Lahir</label>
                        <input type="date" v-model="form.birth_date" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2">Tempat Lahir</label>
                        <input type="text" v-model="form.birth_place" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2">Kode Pos</label>
                        <input type="text" v-model="form.postal_code" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2">Kewarganegaraan</label>
                        <input type="text" v-model="personalDetailForm.citizenship" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2">Nama Ayah</label>
                        <input type="text" v-model="personalDetailForm.fathers_name" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2">Nama Ibu</label>
                        <input type="text" v-model="personalDetailForm.mothers_name" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2">Tinggi Badan (cm)</label>
                        <input type="number" v-model.number="personalDetailForm.height" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2">Berat Badan (kg)</label>
                        <input type="number" v-model.number="personalDetailForm.weight" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2">Status Pernikahan</label>
                        <select v-model="personalDetailForm.marital_status" class="input">
                            <option value="">Pilih Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2">Agama</label>
                        <select v-model="personalDetailForm.religion" class="input">
                            <option value="">Pilih Agama</option>
                            <option value="Islam">Islam</option>
                            <option value="Kristen">Kristen</option>
                            <option value="Katolik">Katolik</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Buddha">Buddha</option>
                            <option value="Konghucu">Konghucu</option>
                            <option value="Lainnya">Lainnya</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="flex justify-end gap-3 mt-6">
              <button class="btn btn-sm btn-square btn-outline" @click="resetForm" title="Reset">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
              <button class="btn btn-sm btn-square btn-primary" @click="saveProfile" :disabled="loading || uploadingPhoto" title="Simpan Perubahan">
                <svg v-if="loading || uploadingPhoto" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Passports Section -->
        <div class="glass rounded-3xl p-5 md:p-8">
          <div class="flex items-center justify-between mb-4 md:mb-6">
            <h2 class="text-lg md:text-2xl font-bold">Paspor</h2>
          </div>

          <div class="space-y-4">
            <label class="text-xs text-slate-500">Nomor Paspor</label>
            <input v-model="passportForm.passport_number" placeholder="Nomor Paspor" class="input" />
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                  <label class="text-xs text-slate-500">Tanggal Dikeluarkan</label>
                  <input v-model="passportForm.issue_date" type="date" class="input" />
              </div>
              <div>
                  <label class="text-xs text-slate-500">Tanggal Habis Berlaku</label>
                  <input v-model="passportForm.expiry_date" type="date" class="input" />
              </div>
            </div>
            <label class="text-xs text-slate-500">Dikeluarkan Oleh</label>
            <input v-model="passportForm.issued_by" placeholder="Dikeluarkan Oleh" class="input" />
            <div class="flex justify-end gap-2">
              <button v-if="editingPassportId" @click="deletePassport(editingPassportId)" class="btn btn-sm btn-square btn-outline btn-error" title="Hapus">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
              <button @click="submitPassport" class="btn btn-sm btn-square btn-primary" title="Simpan">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Emergency Contacts Section -->
        <div class="glass rounded-3xl p-5 md:p-8">
          <div class="flex items-center justify-between mb-4 md:mb-6">
            <h2 class="text-lg md:text-2xl font-bold">Kontak Darurat</h2>
          </div>

          <div class="space-y-4">
            <label class="text-xs text-slate-500">Nama Kontak</label>
            <input v-model="emergencyContactForm.name" placeholder="Nama Kontak" class="input" />
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
              <label class="text-xs text-slate-500">Nomor Telepon</label>
              <input v-model="emergencyContactForm.contact_number" placeholder="Nomor Telepon" class="input" />   
              </div>
              <div>
                <label class="text-xs text-slate-500">Hubungan (mis: Orang Tua)</label>
              <input v-model="emergencyContactForm.relation" placeholder="Hubungan (mis: Orang Tua)" class="input" />
              </div>
            </div>
            <label class="text-xs text-slate-500">Alamat</label>
            <textarea v-model="emergencyContactForm.address" placeholder="Alamat" class="input" rows="2"></textarea>
            <div class="flex justify-end gap-2">
              <button v-if="editingEmergencyContactId" @click="deleteEmergencyContact(editingEmergencyContactId)" class="btn btn-sm btn-square btn-outline btn-error" title="Hapus">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
              <button @click="submitEmergencyContact" class="btn btn-sm btn-square btn-primary" title="Simpan">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Education Section -->
        <div class="glass rounded-3xl p-5 md:p-8">
          <div class="flex items-center justify-between mb-4 md:mb-6">
            <h2 class="text-lg md:text-2xl font-bold">Pendidikan Formal</h2>
            <button @click="showAddEducation = true" class="btn btn-sm btn-square btn-outline btn-info" title="Tambah Pendidikan">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
          
          <div v-if="educations.length === 0" class="text-slate-500 text-center py-4">Belum ada data pendidikan.</div>
          <div v-else class="space-y-4">
            <div v-for="edu in educations" :key="edu.id" class="p-4 md:p-5 border border-slate-200 rounded-2xl hover:border-primary-300 transition-colors bg-slate-50/50 group">
              <div class="flex justify-between items-start gap-4">
                <!-- Left: Info -->
                <div class="flex-1">
                  <h3 class="font-bold text-lg text-slate-800">{{ edu.institution_name }}</h3>
                  <div class="text-slate-600 font-medium text-sm mt-1">
                    {{ edu.degree }} <span v-if="edu.major" class="text-slate-400 mx-1">•</span> {{ edu.major }}
                  </div>

                </div>

                <!-- Right: Year & Action -->
                <div class="flex items-center gap-3 shrink-0">
                  <span class="text-slate-500 font-medium text-sm">
                    {{ edu.start_year }} - {{ edu.is_current ? 'Sekarang' : edu.end_year }}
                  </span>
                  <button @click="deleteEducation(edu.id)" class="btn btn-circle btn-xs btn-outline btn-error shadow-sm" title="Hapus">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3.5 h-3.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Add Education Form (Simple Toggle) -->
          <div v-if="showAddEducation" class="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 animate-fade-in">
            <h3 class="font-bold mb-4">Tambah Pendidikan</h3>
            <div class="space-y-5">
              <!-- Row 1: Institution & Level -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label class="label-text">Nama Institusi / Sekolah</label>
                  <input v-model="eduForm.institution_name" placeholder="Contoh: Universitas Indonesia / SMAN 1 Jakarta" class="input mt-1" />
                </div>
                <div>
                  <label class="label-text">Jenjang Pendidikan</label>
                  <select v-model="eduForm.level" class="input mt-1" @change="eduForm.degree = eduForm.level">
                    <option value="">Pilih Jenjang</option>
                    <option value="SD">SD / Sederajat</option>
                    <option value="SMP">SMP / Sederajat</option>
                    <option value="SMA">SMA / SMK / Sederajat</option>
                    <option value="D1">D1</option>
                    <option value="D2">D2</option>
                    <option value="D3">D3</option>
                    <option value="D4">D4</option>
                    <option value="S1">S1</option>
                    <option value="S2">S2</option>
                    <option value="S3">S3</option>
                  </select>
                </div>
              </div>


              
              <!-- Row 3: Timeline & Degree -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label class="label-text">Tahun Mulai</label>
                  <input v-model.number="eduForm.start_year" type="number" placeholder="YYYY" class="input mt-1" />
                </div>
                <div>
                  <label class="label-text">Tahun Selesai</label>
                  <input v-model.number="eduForm.end_year" type="number" placeholder="YYYY" class="input mt-1" />
                </div>
                <div v-if="['D1', 'D2', 'D3', 'D4', 'S1', 'S2', 'S3'].includes(eduForm.level)">
                   <label class="label-text">Gelar Akademik</label>
                   <input v-model="eduForm.degree" placeholder="Contoh: S.Par, S.E, A.Md.Par" class="input mt-1" />
                </div>
              </div>

              <div class="flex justify-end gap-2 pt-2">
                <button @click="showAddEducation = false" class="btn btn-sm btn-square btn-outline" title="Batal">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
                <button @click="submitEducation" class="btn btn-sm btn-square btn-primary" title="Simpan">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Non-Formal Education Section -->
        <div class="glass rounded-3xl p-5 md:p-8">
          <div class="flex items-center justify-between mb-4 md:mb-6">
            <h2 class="text-lg md:text-2xl font-bold">Pendidikan Non-Formal / Training</h2>
            <button @click="showAddNonFormalEducation = true" class="btn btn-sm btn-square btn-outline btn-success" title="Tambah Pendidikan Non-Formal">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
          
          <div class="mb-4 p-3 bg-blue-50 text-blue-700 rounded-xl text-sm md:text-base border border-blue-100 flex items-start gap-3">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 flex-shrink-0 mt-0.5">
               <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
             </svg>
             <p>Harap isi data pelatihan atau pendidikan non-formal yang relevan dengan posisi yang Anda lamar.</p>
          </div>
          
          <div v-if="nonFormalEducations.length === 0" class="text-slate-500 text-center py-4">Belum ada data pendidikan non-formal.</div>
          <div v-else class="space-y-4">
            <div v-for="edu in nonFormalEducations" :key="edu.id" class="p-4 md:p-5 border border-slate-200 rounded-2xl hover:border-primary-300 transition-colors bg-slate-50/50 group">
              <div class="flex justify-between items-start gap-4">
                <div class="flex-1">
                  <h3 class="font-bold text-base md:text-lg text-slate-800">{{ edu.name }}</h3>
                  <div class="text-slate-700 text-sm md:text-base mt-1">
                      <p><span class="font-semibold text-slate-500">Subjek:</span> {{ edu.subject }}</p>
                      <p><span class="font-semibold text-slate-500">Negara:</span> {{ edu.country }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3 shrink-0">
                   <span class="text-slate-600 font-medium text-xs md:text-sm">{{ edu.year }}</span>
                   <button @click="deleteNonFormalEducation(edu.id)" class="btn btn-circle btn-xs btn-outline btn-error shadow-sm" title="Hapus">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3.5 h-3.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Add Non-Formal Education Form -->
          <div v-if="showAddNonFormalEducation" class="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 animate-fade-in">
            <h3 class="font-bold mb-4">Tambah Pendidikan Non-Formal</h3>
            <div class="space-y-4">
              <input v-model="nonFormalEduForm.name" placeholder="Nama Training / Kursus" class="input" />
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input v-model="nonFormalEduForm.year" placeholder="Tahun" class="input" />
                <input v-model="nonFormalEduForm.country" placeholder="Negara" class="input" />
              </div>
              <input v-model="nonFormalEduForm.subject" placeholder="Subjek / Materi" class="input" />
              <div class="flex justify-end gap-2">
                <button @click="showAddNonFormalEducation = false" class="btn btn-sm btn-square btn-outline" title="Batal">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
                <button @click="submitNonFormalEducation" class="btn btn-sm btn-square btn-primary" title="Simpan">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Experience Section -->
        <div class="glass rounded-3xl p-5 md:p-8">
          <div class="flex items-center justify-between mb-4 md:mb-6">
            <h2 class="text-lg md:text-2xl font-bold">Pengalaman Kerja</h2>
            <button @click="showAddExperience = true" class="btn btn-sm btn-square btn-outline btn-secondary" title="Tambah Pengalaman">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>

          <div v-if="experiences.length === 0" class="text-slate-500 text-center py-4">Belum ada data pengalaman.</div>
          <div v-else class="space-y-4">
            <div v-for="exp in experiences" :key="exp.id" class="p-4 md:p-5 border border-slate-200 rounded-2xl hover:border-primary-300 transition-colors bg-slate-50/50 group">
              <div class="flex justify-between items-start gap-4">
                <div class="flex-1">
                  <h3 class="font-bold text-base md:text-lg text-slate-800">{{ exp.company_name }}</h3>
                  <p class="text-slate-700 text-sm md:text-base"><span class="font-semibold text-slate-500">Posisi :</span> {{ exp.position }}</p>
                  <div v-if="exp.description" class="mt-2">
                    <p class="text-slate-700 whitespace-pre-line text-sm md:text-base"><span class="font-semibold text-slate-500">Deskripsi :</span> {{ exp.description }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3 shrink-0">
                  <span class="text-slate-600 font-medium text-xs md:text-sm">
                    {{ formatDate(exp.start_date) }} - {{ exp.is_current ? 'Sekarang' : (exp.end_date ? formatDate(exp.end_date) : 'Sekarang') }}
                  </span>
                  <button @click="deleteExperience(exp.id)" class="btn btn-circle btn-xs btn-outline btn-error shadow-sm" title="Hapus">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3.5 h-3.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Add Experience Form -->
          <div v-if="showAddExperience" class="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 animate-fade-in">
            <h3 class="font-bold mb-4">Tambah Pengalaman</h3>
            <div class="space-y-4">
              <input v-model="expForm.company_name" placeholder="Nama Perusahaan" class="input" />
              <input v-model="expForm.position" placeholder="Posisi" class="input" />
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div class="flex justify-end gap-2">
                <button @click="showAddExperience = false" class="btn btn-sm btn-square btn-outline" title="Batal">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
                <button @click="submitExperience" class="btn btn-sm btn-square btn-primary" title="Simpan">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills Section -->
        <div class="glass rounded-3xl p-5 md:p-8">
          <div class="flex items-center justify-between mb-4 md:mb-6">
            <h2 class="text-lg md:text-2xl font-bold">Keahlian</h2>
            <button @click="showAddSkill = true" class="btn btn-sm btn-square btn-outline btn-accent" title="Tambah Keahlian">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>

          <div v-if="skills.length === 0" class="text-slate-500 text-center py-4">Belum ada data keahlian.</div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div v-for="skill in skills" :key="skill.id" class="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-slate-50/50 hover:border-primary-300 transition-colors relative group">
              <span class="font-medium text-slate-700 text-sm md:text-base">{{ skill.skill_name }}</span>
              <div class="flex items-center gap-2">
                  <span :class="{
                    'bg-emerald-100 text-emerald-700 border-emerald-200': skill.proficiency_level === 'Beginner',
                    'bg-blue-100 text-blue-700 border-blue-200': skill.proficiency_level === 'Intermediate',
                    'bg-indigo-100 text-indigo-700 border-indigo-200': skill.proficiency_level === 'Advanced',
                    'bg-purple-100 text-purple-700 border-purple-200': skill.proficiency_level === 'Expert'
                  }" class="px-2 py-0.5 text-xs rounded-md border font-medium">
                    {{ skill.proficiency_level }}
                  </span>
                  <button @click="deleteSkill(skill.id)" class="btn btn-circle btn-xs btn-outline btn-error shadow-sm" title="Hapus">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3.5 h-3.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                  </button>
              </div>
            </div>
          </div>

          <!-- Add Skill Form -->
          <div v-if="showAddSkill" class="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 animate-fade-in">
            <h3 class="font-bold mb-4">Tambah Keahlian</h3>
            <div class="space-y-4">
              <input v-model="skillForm.skill_name" placeholder="Nama Skill (mis: Housekeeping, Cooking, Ms. Office)" class="input" />
              <select v-model="skillForm.proficiency_level" class="input">
                <option value="">Pilih Tingkat Kemahiran</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
              <div class="flex justify-end gap-2">
                <button @click="showAddSkill = false" class="btn btn-sm btn-square btn-outline" title="Batal">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
                <button @click="submitSkill" class="btn btn-sm btn-square btn-primary" title="Simpan">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>








      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useMasterStore } from '@/stores/master'
import NavBar from '@/components/layout/NavBar.vue'
import defaultAvatar from '@/assets/default-avatar.png'

const authStore = useAuthStore()
const masterStore = useMasterStore()
const { currentUser, educations, experiences, skills, personalDetail, emergencyContacts, languages, passports, nonFormalEducations, loading } = storeToRefs(authStore)

// Alias currentUser as user for easier reference
const user = currentUser

// --- Photo Upload ---
const photoFile = ref(null)
const photoPreview = ref(null)
const uploadingPhoto = ref(false)

const handlePhotoUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('File harus berupa gambar!')
    return
  }

  // Validate file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert('Ukuran file maksimal 2MB!')
    return
  }

  photoFile.value = file

  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    photoPreview.value = e.target.result
  }
  reader.readAsDataURL(file)

  // Upload immediately
  await uploadPhoto()
}

const uploadPhoto = async () => {
  if (!photoFile.value) return

  uploadingPhoto.value = true
  
  const formData = new FormData()
  formData.append('photo', photoFile.value)

  try {
    const result = await authStore.uploadProfilePhoto(formData)
    if (result.success) {
      alert('Foto profil berhasil diperbarui!')
      photoFile.value = null
      // Preview will be updated from the server response
      await authStore.fetchUser()
    } else {
      alert(result.error || 'Gagal mengupload foto')
      photoPreview.value = null
      photoFile.value = null
    }
  } catch (error) {
    console.error('Error uploading photo:', error)
    alert('Gagal mengupload foto')
    photoPreview.value = null
    photoFile.value = null
  } finally {
    uploadingPhoto.value = false
  }
}

// --- Basic Profile ---
const form = ref({
  full_name: '',
  email: '',
  phone: '',
  nik: '',
  birth_date: '',
  birth_place: '',
  gender: '',
  address: '',
  city: '',
  province: '',
  postal_code: '',
  about_me: ''
})

// Computed properties for locations
import { computed } from 'vue'

const provinces = computed(() => {
    const indonesia = masterStore.locations.find(l => l.type === 'COUNTRY' && l.name === 'Indonesia')
    if (!indonesia) return []
    return masterStore.locations.filter(l => l.type === 'PROVINCE' && l.parent_id === indonesia.id)
})

const cities = computed(() => {
    const selectedProvince = provinces.value.find(p => p.name === form.value.province)
    if (!selectedProvince) return []
    return masterStore.locations.filter(l => l.parent_id === selectedProvince.id && l.type === 'CITY')
})

const handleProvinceChange = () => {
    form.value.city = ''
}

// --- Personal Detail ---
const personalDetailForm = ref({
  fathers_name: '',
  mothers_name: '',
  height: null,
  weight: null,
  marital_status: '',
  citizenship: '',
  marital_status: '',
  citizenship: '',
  religion: ''
})

const initForm = () => {
  if (user.value) {
    form.value = {
      full_name: user.value.full_name || '',
      email: user.value.email || '',
      phone: user.value.phone || '',
      nik: user.value.nik || '',
      birth_date: user.value.birth_date ? user.value.birth_date.split('T')[0] : '',
      birth_place: user.value.birth_place || '',
      gender: user.value.gender || '',
      address: user.value.address || '',
      city: user.value.city || '',
      province: user.value.province || '',
      postal_code: user.value.postal_code || '',
      about_me: user.value.about_me || ''
    }
  }
  if (personalDetail.value) {
    personalDetailForm.value = {
      fathers_name: personalDetail.value.fathers_name || '',
      mothers_name: personalDetail.value.mothers_name || '',
      height: personalDetail.value.height || null,
      weight: personalDetail.value.weight || null,
      marital_status: personalDetail.value.marital_status || '',
      citizenship: personalDetail.value.citizenship || '',
      religion: personalDetail.value.religion || ''
    }
  }
  if (passports.value && passports.value.length > 0) {
      const p = passports.value[0]
      passportForm.value = {
          passport_number: p.passport_number || '',
          issue_date: p.issue_date ? p.issue_date.split('T')[0] : '',
          expiry_date: p.expiry_date ? p.expiry_date.split('T')[0] : '',
          issued_by: p.issued_by || ''
      }
      editingPassportId.value = p.id
  } else {
      passportForm.value = { passport_number: '', issue_date: '', expiry_date: '', issued_by: '' }
      editingPassportId.value = null
  }

  if (emergencyContacts.value && emergencyContacts.value.length > 0) {
      const ec = emergencyContacts.value[0]
      emergencyContactForm.value = {
          name: ec.name || '',
          contact_number: ec.contact_number || '',
          relation: ec.relation || '',
          address: ec.address || ''
      }
      editingEmergencyContactId.value = ec.id
  } else {
      emergencyContactForm.value = { name: '', contact_number: '', relation: '', address: '' }
      editingEmergencyContactId.value = null
  }
}

onMounted(async () => {
  console.log('ProfilePage mounted, fetching user...')
  try {
    await Promise.all([
        authStore.fetchUser(),
        masterStore.fetchLocations()
    ])
    console.log('User fetched successfully:', user.value)
  } catch (e) {
    console.error('Error fetching user in ProfilePage:', e)
  }
})

watch([user, personalDetail, passports, emergencyContacts], () => {
  initForm()
}, { deep: true })

const resetForm = () => {
  initForm()
  photoPreview.value = null
  photoFile.value = null
}

const saveProfile = async () => {
  if (!user.value) return
  
  const payload = {
      ...form.value,
      birth_date: form.value.birth_date ? new Date(form.value.birth_date).toISOString() : null
  }

  const result = await authStore.updateProfile(payload)
  if (result.success) {
    // Also save personal details
    const personalPayload = {
        ...personalDetailForm.value,
        height: personalDetailForm.value.height ? parseInt(personalDetailForm.value.height) : null,
        weight: personalDetailForm.value.weight ? parseInt(personalDetailForm.value.weight) : null
    }
    const personalResult = await authStore.updatePersonalDetail(personalPayload)
    
    if (personalResult.success) {
        alert('Profil berhasil diperbarui!')
    } else {
        alert('Profil dasar diperbarui, tetapi gagal memperbarui detail pribadi: ' + personalResult.error)
    }
  } else {
    alert(result.error || 'Gagal memperbarui profil')
  }
}

// --- Education ---
const showAddEducation = ref(false)
const eduForm = ref({
  level: '', // Added level for UI logic
  institution_name: '',
  degree: '',
  major: 'GENERAL',
  start_year: null,
  end_year: null,
  gpa: null
})

const submitEducation = async () => {
  if (eduForm.value.start_year && eduForm.value.end_year && eduForm.value.start_year > eduForm.value.end_year) {
    alert('Tahun mulai tidak boleh lebih besar dari tahun selesai.')
    return
  }

  const result = await authStore.addEducation(eduForm.value)
  if (result.success) {
    showAddEducation.value = false
    eduForm.value = { level: '', institution_name: '', degree: '', major: 'GENERAL', start_year: null, end_year: null, gpa: null }
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

const deleteSkill = async (id) => {
    if(confirm('Apakah Anda yakin ingin menghapus keahlian ini?')) {
        const result = await authStore.deleteSkill(id)
        if (!result.success) alert(result.error)
    }
}

// --- Emergency Contact ---
const showAddEmergencyContact = ref(false)
const editingEmergencyContactId = ref(null)
const emergencyContactForm = ref({
  name: '',
  contact_number: '',
  relation: '',
  address: ''
})

const editEmergencyContact = (contact) => {
    emergencyContactForm.value = { ...contact }
    editingEmergencyContactId.value = contact.id
    showAddEmergencyContact.value = true
}

const cancelEmergencyContact = () => {
    showAddEmergencyContact.value = false
    editingEmergencyContactId.value = null
    emergencyContactForm.value = { name: '', contact_number: '', relation: '', address: '' }
}

const submitEmergencyContact = async () => {
  let result;
  if (editingEmergencyContactId.value) {
      result = await authStore.updateEmergencyContact(editingEmergencyContactId.value, emergencyContactForm.value)
  } else {
      result = await authStore.addEmergencyContact(emergencyContactForm.value)
  }
  
  if (result.success) {
    alert('Kontak darurat berhasil disimpan')
  } else {
    alert(result.error)
  }
}

const deleteEmergencyContact = async (id) => {
    if(confirm('Apakah Anda yakin ingin menghapus kontak darurat ini?')) {
        const result = await authStore.deleteEmergencyContact(id)
        if (result.success) {
            alert('Kontak darurat berhasil dihapus')
            emergencyContactForm.value = { name: '', contact_number: '', relation: '', address: '' }
            editingEmergencyContactId.value = null
        } else {
            alert(result.error)
        }
    }
}



// --- Passport ---
const showAddPassport = ref(false)
const editingPassportId = ref(null)
const passportForm = ref({
  passport_number: '',
  issue_date: '',
  expiry_date: '',
  issued_by: ''
})

const editPassport = (passport) => {
    passportForm.value = {
        ...passport,
        issue_date: passport.issue_date ? passport.issue_date.split('T')[0] : '',
        expiry_date: passport.expiry_date ? passport.expiry_date.split('T')[0] : ''
    }
    editingPassportId.value = passport.id
    showAddPassport.value = true
}

const cancelPassport = () => {
    showAddPassport.value = false
    editingPassportId.value = null
    passportForm.value = { passport_number: '', issue_date: '', expiry_date: '', issued_by: '' }
}

const submitPassport = async () => {
  const payload = {
      ...passportForm.value,
      issue_date: passportForm.value.issue_date ? new Date(passportForm.value.issue_date).toISOString() : null,
      expiry_date: passportForm.value.expiry_date ? new Date(passportForm.value.expiry_date).toISOString() : null
  }
  
  let result;
  if (editingPassportId.value) {
      result = await authStore.updatePassport(editingPassportId.value, payload)
  } else {
      result = await authStore.addPassport(payload)
  }

  if (result.success) {
    alert('Paspor berhasil disimpan')
  } else {
    alert(result.error)
  }
}

const deletePassport = async (id) => {
    if(confirm('Apakah Anda yakin ingin menghapus paspor ini?')) {
        const result = await authStore.deletePassport(id)
        if (result.success) {
            alert('Paspor berhasil dihapus')
            passportForm.value = { passport_number: '', issue_date: '', expiry_date: '', issued_by: '' }
            editingPassportId.value = null
        } else {
            alert(result.error)
        }
    }
}

// --- Non-Formal Education ---
const showAddNonFormalEducation = ref(false)
const nonFormalEduForm = ref({
  name: '',
  year: '',
  subject: '',
  country: ''
})

const submitNonFormalEducation = async () => {
  const result = await authStore.addNonFormalEducation(nonFormalEduForm.value)
  if (result.success) {
    showAddNonFormalEducation.value = false
    nonFormalEduForm.value = { name: '', year: '', subject: '', country: '' }
  } else {
    alert(result.error)
  }
}

const deleteNonFormalEducation = async (id) => {
    if(confirm('Apakah Anda yakin ingin menghapus pendidikan non-formal ini?')) {
        const result = await authStore.deleteNonFormalEducation(id)
        if (!result.success) alert(result.error)
    }
}

const deleteEducation = async (id) => {
    if(confirm('Apakah Anda yakin ingin menghapus pendidikan ini?')) {
        const result = await authStore.deleteEducation(id)
        if (!result.success) alert(result.error)
    }
}

const deleteExperience = async (id) => {
    if(confirm('Apakah Anda yakin ingin menghapus pengalaman ini?')) {
        const result = await authStore.deleteExperience(id)
        if (!result.success) alert(result.error)
    }
}

const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })
}
</script>
