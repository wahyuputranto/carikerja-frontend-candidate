<script setup>
import { onMounted } from 'vue'
import NavBar from '@/components/layout/NavBar.vue'
import Footer from '@/components/layout/Footer.vue'

const appName = import.meta.env.VITE_APP_NAME || 'ZMI Jobs'

onMounted(() => {
    window.scrollTo(0, 0)
})
</script>

<template>
    <div class="min-h-screen bg-slate-50 font-sans antialiased text-slate-800">
        <NavBar />
        
        <div class="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-4xl mx-auto space-y-12">
                <!-- Header Section -->
                <div class="text-center space-y-4">
                    <h1 class="text-4xl md:text-5xl font-bold text-[#008B99] animate-fade-in-up">
                        About Us
                    </h1>
                    <p class="text-xl text-slate-600 max-w-2xl mx-auto">
                        Mengenal lebih dekat visi dan misi kami di {{ appName }}
                    </p>
                </div>

                <!-- Main Content -->
                <div class="grid gap-8 md:gap-12">
                    <!-- Section 1 -->
                    <div class="card glass hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-[#ecfeff] rounded-bl-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                        <div class="relative z-10">
                            <p class="text-lg leading-relaxed text-slate-700 text-justify">
                                <span class="font-bold text-[#008B99]">{{ appName }}</span> dibangun atas keyakinan bahwa pekerjaan bukan hanya transaksi antara perusahaan dan individu, tetapi fondasi bagi pertumbuhan ekonomi, kemajuan sosial, dan pengembangan manusia. Di tengah dunia kerja yang terus berubah, kami hadir sebagai platform yang menghubungkan talenta terbaik dengan peluang yang tepat; secara cepat, akurat, dan berintegritas.
                            </p>
                        </div>
                    </div>

                    <!-- Section 2 -->
                    <div class="card glass hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                        <div class="absolute bottom-0 left-0 w-24 h-24 bg-[#ecfeff] rounded-tr-full -ml-12 -mb-12 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                        <div class="relative z-10 flex flex-col md:flex-row gap-6 items-center">
                            <div class="flex-1">
                                <p class="text-lg leading-relaxed text-slate-700 text-justify">
                                    Kami memahami bahwa setiap pencari kerja membawa potensi, pengalaman, dan aspirasi yang unik. Karena itu, <span class="font-bold text-[#008B99]">{{ appName }}</span> berkomitmen menyediakan akses yang adil dan transparan bagi siapa pun untuk menemukan posisi yang sesuai dengan kemampuan dan tujuan hidup mereka. Bagi perusahaan, kami menawarkan solusi rekrutmen yang efisien, didukung teknologi yang relevan dan proses yang terstandar.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Section 3 -->
                    <div class="card glass hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#008B99] to-[#06b6d4]"></div>
                        <div class="relative z-10">
                            <p class="text-lg leading-relaxed text-slate-700 text-justify">
                                Peran kami sederhana namun strategis: menjadi perantara yang memudahkan pertemuan antara kebutuhan industri dan kualitas sumber daya manusia. Dengan pendekatan yang berorientasi pada data, dukungan sistem yang andal, serta pelayanan yang responsif, <span class="font-bold text-[#008B99]">{{ appName }}</span> memastikan setiap proses rekrutmen berjalan lebih mudah, lebih cepat, dan lebih tepat sasaran.
                            </p>
                        </div>
                    </div>

                    <!-- Closing / Vision -->
                    <div class="text-center space-y-6 py-8">
                        <p class="text-xl font-medium text-slate-800 max-w-3xl mx-auto italic">
                            "Kami percaya bahwa pertumbuhan perusahaan dimulai dari manusia yang tepat. Dan kami hadir untuk memastikan pertemuan itu terjadi—dengan profesionalisme, kepercayaan, dan komitmen jangka panjang."
                        </p>

                        <div class="pt-8">
                            <h2 class="text-3xl font-bold text-slate-900 mb-2">{{ appName }}</h2>
                            <p class="text-lg text-[#008B99] font-semibold tracking-wide">
                                Connecting People, Enabling Growth.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>

<style scoped>
.animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
