<template>
  <nav :class="['fixed w-full z-50 transition-all duration-300', isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6']">
    <div class="container mx-auto px-6 flex justify-between items-center">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 group cursor-pointer">
        <img :src="logoZmi" alt="Logo" class="h-12 w-auto" />
        <!-- <span class="text-2xl font-bold text-slate-900 tracking-tight font-display">ZmiJobs</span> -->
      </router-link>

      <!-- Mobile Menu Button -->
      <div class="md:hidden flex items-center gap-4">
        <NotificationBell v-if="isAuthenticated" />
        <button @click="showMobileMenu = !showMobileMenu" class="text-slate-700 hover:text-[#008B99] transition">
          <i class="ph-bold text-2xl" :class="showMobileMenu ? 'ph-x' : 'ph-list'"></i>
        </button>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-6 text-sm font-semibold">
        <template v-if="isAuthenticated">
          <!-- Jobs Link (Visible only if profile 100%) -->
          <router-link v-if="progressPercentage >= 100" to="/jobs" class="text-slate-600 hover:text-[#008B99] transition">Lowongan Kerja</router-link>
          <router-link to="/dashboard" class="text-slate-600 hover:text-[#008B99] transition">Dashboard</router-link>
          <NotificationBell />
          
          <!-- Profile Dropdown -->
          <div class="relative" ref="profileMenu">
            <button @click="showProfileMenu = !showProfileMenu" class="flex items-center gap-2 hover:bg-white/50 p-2 rounded-lg transition">
               <img :src="userPhoto" alt="User" class="w-8 h-8 rounded-full object-cover border border-slate-200" />
               <span class="font-bold text-slate-800">{{ userName }}</span>
               <i class="ph-bold ph-caret-down text-slate-600" :class="{ 'rotate-180': showProfileMenu }"></i>
            </button>
             <transition name="dropdown">
                <div v-if="showProfileMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 border border-slate-100">
                  <router-link to="/profile" class="block px-4 py-2 text-slate-700 hover:bg-gray-50 transition-colors">Profil Saya</router-link>
                  <router-link to="/applications" class="block px-4 py-2 text-slate-700 hover:bg-gray-50 transition-colors">Lamaran Saya</router-link>
                  <hr class="my-2 border-slate-100" />
                  <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">Keluar</button>
                </div>
              </transition>
          </div>
        </template>
        <template v-else>
          <router-link to="/login" class="bg-[#008B99] text-white px-6 py-2.5 rounded-full shadow-lg border border-[#008B99] hover:bg-white hover:text-[#008B99] hover:shadow-brand-teal/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
            Masuk
            <i class="ph-bold ph-arrow-right"></i>
          </router-link>
        </template>
      </div>
    </div>

    <!-- Mobile Menu Content -->
    <transition name="slide-down">
      <div v-if="showMobileMenu" class="md:hidden glass-nav border-t border-slate-200 absolute w-full left-0 top-full bg-white/95 backdrop-blur-xl">
        <div class="px-6 py-6 space-y-4">
           <template v-if="isAuthenticated">
             <div class="flex items-center gap-3 pb-4 border-b border-slate-100">
                <img :src="userPhoto" alt="User" class="w-10 h-10 rounded-full object-cover border border-slate-200" />
                <div>
                  <div class="font-bold text-slate-800">{{ userName }}</div>
                  <div class="text-xs text-slate-500">Candidate</div>
                </div>
              </div>
             <router-link v-if="progressPercentage >= 100" to="/jobs" @click="showMobileMenu = false" class="block text-slate-700 font-medium hover:text-brand-teal">Lowongan Kerja</router-link>
             <router-link to="/dashboard" @click="showMobileMenu = false" class="block text-slate-700 font-medium hover:text-brand-teal">Dashboard</router-link>
             <router-link to="/profile" @click="showMobileMenu = false" class="block text-slate-700 font-medium hover:text-brand-teal">Profil Saya</router-link>
             <router-link v-if="progressPercentage >= 100" to="/applications" @click="showMobileMenu = false" class="block text-slate-700 font-medium hover:text-brand-teal">Lamaran Saya</router-link>
             <button @click="handleLogout" class="block w-full text-left text-red-600 font-medium">Keluar</button>
           </template>
           <template v-else>
             <router-link to="/login" @click="showMobileMenu = false" class="block bg-[#008B99] text-white text-center py-3 rounded-xl font-bold hover:bg-white hover:text-[#008B99] border border-[#008B99] transition-colors">Masuk</router-link>
           </template>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useDocumentsStore } from '@/stores/documents';
import NotificationBell from '@/components/NotificationBell.vue'; // Check if this exists, likely needs generic bell or update imports
import defaultAvatar from '@/assets/default-avatar.png'; // Make sure path aligns
import logoZmi from '@/assets/logo_zmi.png';

const authStore = useAuthStore();
const documentsStore = useDocumentsStore();
const router = useRouter();

const { currentUser, educations, experiences, skills } = storeToRefs(authStore);
const { documentTypes, userDocuments } = storeToRefs(documentsStore);

const appName = import.meta.env.VITE_APP_NAME || 'CariKerja';

const isScrolled = ref(false);
const showMobileMenu = ref(false);
const showProfileMenu = ref(false);
const profileMenu = ref(null);

const isAuthenticated = computed(() => authStore.isAuthenticated);
const userName = computed(() => authStore.currentUser?.full_name || authStore.currentUser?.email || 'User');
const userPhoto = computed(() => authStore.currentUser?.photo_url || defaultAvatar);

// Profile Completion Logic (Replicated from Dashboard for consistency)
const isBasicInfoComplete = computed(() => {
  const u = currentUser.value
  return !!(u?.full_name && u?.phone && u?.email && u?.address)
})
const isEducationComplete = computed(() => educations.value && educations.value.length > 0)
const isExperienceComplete = computed(() => experiences.value && experiences.value.length > 0)
const isSkillsComplete = computed(() => skills.value && skills.value.length > 0)

const mandatoryDocTypes = computed(() => {
  return documentTypes.value ? documentTypes.value.filter(d => d.is_mandatory) : []
})

const getDocStatus = (typeId) => {
  if (!userDocuments.value) return 'MISSING'
  const doc = userDocuments.value.find(d => d.document_type_id === typeId)
  if (!doc) return 'MISSING'
  return doc.status
}

const isDocComplete = (typeId) => {
  const status = getDocStatus(typeId)
  return status === 'VALID'
}

const progressPercentage = computed(() => {
  if (!isAuthenticated.value) return 0;
  
  let completedItems = 0
  let totalItems = 2 // Basic, Edu (removed Exp & Skills from mandatory count)

  if (isBasicInfoComplete.value) completedItems++
  if (isEducationComplete.value) completedItems++
  // Removed Exp & Skills checks

  // Add mandatory docs to calculation
  if (mandatoryDocTypes.value.length > 0) {
    totalItems += mandatoryDocTypes.value.length
    mandatoryDocTypes.value.forEach(docType => {
      if (isDocComplete(docType.id)) {
        completedItems++
      }
    })
  }

  if (totalItems === 0) return 0
  return Math.round((completedItems / totalItems) * 100)
})


const handleScroll = () => {
  isScrolled.value = window.scrollY > 10; // Trigger earlier for smoother effect
};

const handleLogout = () => {
  authStore.logout();
  showProfileMenu.value = false;
  showMobileMenu.value = false;
  router.push('/');
};

const handleClickOutside = (event) => {
  if (profileMenu.value && !profileMenu.value.contains(event.target)) {
    showProfileMenu.value = false;
  }
};

onMounted(async () => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
  
  // Ensure we have data for progress calculation if authenticated
  if (isAuthenticated.value) {
     // We try to fetch but avoid blocking if detailed calls fail or are redundant
     // Ideally these stores manage their own 'loaded' state
     try {
         await Promise.all([
             authStore.fetchUser(), // ensures user + relations
             documentsStore.fetchDocumentTypes(),
             documentsStore.fetchUserDocuments()
         ]);
     } catch (e) {
         console.warn("NavBar stats fetch warning", e);
     }
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.glass-nav {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>