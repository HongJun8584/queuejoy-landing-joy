import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ms" | "zh";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.functions": "Functions",
    "nav.about": "About",
    "nav.demo": "Demo",
    "nav.testimonials": "Testimonials",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",
    
    // Hero
    "hero.headline": "Short Waits, Long Loyalty",
    "hero.subhead": "No app — works with Telegram. Setup in under 3 minutes.",
    "hero.cta.buy": "Buy Now - RM25/month",
    "hero.cta.demo": "Watch 2-min demo",
    "hero.trust": "RM25/month · 30-day money-back · 100+ businesses · Cancel anytime",
    "hero.benefit1": "No app install — instant Telegram DMs",
    "hero.benefit2": "One-tap service — less confusion",
    "hero.benefit3": "Real-time position — 40% less wait",
    
    // Metrics
    "metrics.waitTime": "Reduce wait time",
    "metrics.businesses": "Businesses trust us",
    "metrics.setup": "Setup time",
    "metrics.price": "Per month only",
    
    // Demo
    "demo.videoTitle": "Watch How QueueJoy Works",
    "demo.videoSubtitle": "See the magic in action — 2 minutes that'll change how you think about queues",
    "demo.clickToWatch": "Click to watch demo",
    "demo.liveDemo": "Try Live Demo",
    "demo.badge": "Try It Now",
    "demo.title": "Interactive Live Demo",
    "demo.subtitle": "Experience QueueJoy's queue management in action",
    "demo.customerView": "Customer View",
    "demo.staffView": "Staff View",
    "demo.welcome": "Welcome",
    "demo.tapToJoin": "Tap to join the queue",
    "demo.getNumber": "Get Queue Number",
    "demo.yourNumber": "Your Number",
    "demo.nowServing": "Now Serving",
    "demo.peopleAhead": "People Ahead",
    "demo.connected": "Connected to Telegram",
    "demo.yourTurn": "It's your turn!",
    "demo.counterPanel": "Counter Panel",
    "demo.lastIssued": "Last Issued",
    "demo.waiting": "Waiting",
    "demo.callNext": "Call Next",
    "demo.reset": "Reset Demo",
    "demo.instructions": "Try clicking 'Get Number' then 'Call Next' to see the notification!",
    
    // Sticky
    "sticky.title": "Quick Actions",
    "sticky.buyNow": "Buy Now - RM25/month",
    "sticky.watchDemo": "Watch Demo",
    "sticky.status": "Status Page",
    "sticky.counter": "Counter Panel",
    "sticky.admin": "Admin Dashboard",
    
    // User Page
    "userpage.badge": "User Experience",
    "userpage.title": "The User Page",
    "userpage.subtitle": "A zero-contact queue page with your logo, video ads, and a smooth user experience.",
    "userpage.bullet1": "One-tap connect — user stays synced forever",
    "userpage.bullet2": "Notifications without opening Telegram",
    "userpage.bullet3": "Give reminders & your turn notifications",
    "userpage.cta": "See It in Action",
    "userpage.liveDemo": "Live Demo",
    "userpage.modalDesc": "Experience how customers join your queue with a single tap and receive instant Telegram notifications.",
    
    // Status Page
    "statuspage.badge": "Real-Time Status",
    "statuspage.title": "Automatic Telegram Linking",
    "statuspage.subtitle": "User taps once → queue + alerts synced. Get notifications without opening anything.",
    "statuspage.step1": "One-tap connect, user stays synced forever",
    "statuspage.step2": "User can close everything; notifications still push",
    "statuspage.step3": "Give reminder, your turn notification to every user",
    "statuspage.cta": "See Status Demo",
    "statuspage.liveDemo": "Live Demo",
    "statuspage.modalDesc": "See how customers receive real-time updates and Telegram notifications automatically.",
    
    // Counter
    "counter.badge": "Smart Queue System",
    "counter.title": "The Counter Panel",
    "counter.subtitle": "See last issued, now serving, next up. Give live update to the customer page.",
    "counter.feature1.title": "One-tap Call Next",
    "counter.feature1.desc": "Call the next customer instantly through one-tap",
    "counter.feature2.title": "Real-time Sync",
    "counter.feature2.desc": "Real-time sync between counter and user",
    "counter.feature3.title": "Counter Settings",
    "counter.feature3.desc": "Set counter information — name, prefix",
    "counter.highlight": "Smooth queue management and real-time notifications",
    "counter.cta": "See Counter Demo",
    "counter.liveDemo": "Live Demo",
    "counter.modalDesc": "Experience the counter panel that staff use to manage queues efficiently.",
    
    // Admin
    "admin.announcement.badge": "Direct Communication",
    "admin.announcement.title": "Direct Announcements to Customers",
    "admin.announcement.desc": "Businesses don't lose customers because the product is bad — they lose them when communication stops. QueueJoy lets you instantly send announcements to every customer who has ever joined your queue, directly on Telegram.",
    "admin.announcement.cta": "See Announcement Features",
    "admin.announcement.modalDesc": "Send updates, promotions, and news straight via Telegram DM to all your customers.",
    "admin.customize.badge": "Full Customization",
    "admin.customize.title": "Customize Everything. Even Support Video, GIF!",
    "admin.customize.desc": "Make your queue page truly yours with custom branding, video ads, and media support.",
    "admin.customize.cta": "See Customization",
    "admin.customize.modalDesc": "Add your logo, custom messages, video ads, and more to create a unique experience.",
    "admin.analytics.badge": "Data Analytics",
    "admin.analytics.title": "Analytics Dashboard",
    "admin.analytics.desc": "Track queues, wait times & peak hours. Make smarter decisions instantly with real-time analytics. Identify busy periods, optimize staffing, and improve customer flow with data-driven insights.",
    "admin.analytics.cta": "View Analytics",
    "admin.analytics.modalDesc": "Get insights into your queue performance and optimize your operations.",
    "admin.liveDemo": "Live Demo",
    
    // Comparison
    "comparison.title": "Industries — real results, fast wins",
    "comparison.subtitle": "Turn waiting from a liability into an advantage",
    "comparison.description": "See the difference QueueJoy makes across industries",
    "comparison.old": "Old Way",
    "comparison.new": "QueueJoy Way",
    
    // Industries
    "industries.healthcare.title": "Healthcare & Wellness",
    "industries.healthcare.old1": "Long queues, stressed front desk.",
    "industries.healthcare.old2": "No customer follow-up channel.",
    "industries.healthcare.joy1": "Virtual queue + table notify → calmer flow.",
    "industries.healthcare.joy2": "Post-visit Telegram broadcast → drive return visits.",
    "industries.healthcare.benefit": "QueueJoy helps healthcare providers reduce waiting room stress, keep patients informed with real-time updates, and build lasting relationships through post-visit Telegram broadcasts. Perfect for clinics, dental offices, physiotherapy centers, and wellness spas.",
    "industries.finance.title": "Finance & Government",
    "industries.finance.old1": "Slow counters, frustrated customers.",
    "industries.finance.old2": "Manual tokens, inefficient flow.",
    "industries.finance.joy1": "Virtual queuing → predictable flow.",
    "industries.finance.joy2": "Broadcast reminders and follow-ups.",
    "industries.finance.benefit": "QueueJoy streamlines service delivery for banks, government offices, and service centers. Reduce walk-aways, improve customer satisfaction, and double your service efficiency with virtual queuing and automated notifications.",
    "industries.fnb.title": "F&B",
    "industries.fnb.old1": "Counter chaos, lost sales.",
    "industries.fnb.old2": "No re-engagement channel.",
    "industries.fnb.joy1": "QR join + virtual queue → table waiting.",
    "industries.fnb.joy2": "Post-visit Telegram broadcast → rapid loyalty ROI.",
    "industries.fnb.benefit": "Perfect for kopitiams, cafes, bubble tea shops, and fast casual restaurants. QueueJoy eliminates counter chaos, lets customers wait at their table, and builds repeat business through Telegram broadcasts. Turn first-time buyers into loyal regulars.",
    "industries.beauty.title": "Beauty & Lifestyle",
    "industries.beauty.old1": "Walk-in chaos, missed bookings.",
    "industries.beauty.old2": "No easy rebook/promo channel.",
    "industries.beauty.joy1": "Virtual queue + appointment buffer → smoother flow.",
    "industries.beauty.joy2": "Broadcasts to past customers → increase rebook.",
    "industries.beauty.benefit": "Salons, spas, nail studios, and fitness centers can manage walk-ins and appointments seamlessly. Send promotions directly to past customers, increase rebookings, and keep your schedule full with QueueJoy's broadcast feature.",
    "industries.exploreMore": "Explore More",
    "industries.howQueueJoyHelps": "How QueueJoy helps this industry:",
    
    // Testimonials
    "testimonials.title": "What Our Customers Say",
    "testimonials.subtitle": "Join 100+ businesses that reduced wait times today",
    "testimonials.1.quote": "Reduced wait times by 40%. Patients love the Telegram alerts. Our staff can focus on care, not crowd control.",
    "testimonials.1.name": "Dr. Sarah Chen",
    "testimonials.1.role": "Hospital Administrator",
    "testimonials.2.quote": "QueueJoy transformed our service. No more chaos. Customers are happier and our efficiency doubled.",
    "testimonials.2.name": "Ahmad Razak",
    "testimonials.2.role": "Bank Branch Manager",
    "testimonials.3.quote": "Morning rush used to be chaos. Now customers join the queue from their phones. Game changer!",
    "testimonials.3.name": "Lisa Wong",
    "testimonials.3.role": "Café Owner",
    
    // How It Works
    "howitworks.title": "How it works",
    "howitworks.subtitle": "Simple 3-step flow — setup in under 3 minutes",
    "howitworks.step1.title": "Take a number",
    "howitworks.step1.desc": "QR / kiosk / staff-issued",
    "howitworks.step2.title": "Watch status",
    "howitworks.step2.desc": "Phone or screen",
    "howitworks.step3.title": "Get notified",
    "howitworks.step3.desc": "Telegram DM or audio call",
    
    // Pricing
    "pricing.title": "Simple, Transparent Pricing",
    "pricing.subtitle": "Everything you need to manage queues professionally",
    "pricing.features": "Features",
    "pricing.others": "Others",
    "pricing.badge": "Best Value",
    "pricing.perMonth": "per month · per site",
    "pricing.feature.telegram": "Instant Telegram Alerts",
    "pricing.feature.noApp": "No App Install Required",
    "pricing.feature.multiCounter": "Multi-Counter Support",
    "pricing.feature.realtime": "Real-time Sync",
    "pricing.feature.analytics": "Analytics Dashboard",
    "pricing.feature.announcements": "Direct Announcements",
    "pricing.feature.customization": "Full Customization",
    "pricing.feature.setup": "Setup Time",
    "pricing.feature.price": "Monthly Price",
    "pricing.includes.telegram": "Instant Telegram alerts",
    "pricing.includes.counters": "Unlimited counters",
    "pricing.includes.analytics": "Full analytics dashboard",
    "pricing.includes.announcements": "Direct announcements",
    "pricing.includes.support": "Priority support",
    "pricing.guarantee": "30-day money-back guarantee",
    "pricing.guaranteeDesc": "If it doesn't cut wait times, get a full refund",
    "pricing.cancel": "Cancel anytime · No long-term contracts",
    
    // FAQ
    "faq.title": "Frequently Asked",
    "faq.subtitle": "Questions",
    "faq.description": "Everything you need to know about QueueJoy",
    "faq.q1": "Do I need to install anything?",
    "faq.a1": "No setup or sign-up needed. We handle everything for you — but you still have full control. Customize your logo, colors, and text anytime to match your brand.",
    "faq.q2": "How do Telegram notifications work?",
    "faq.a2": "After users tap once to connect, we link them to your store and send reminders and announcements via Telegram DM.",
    "faq.q3": "How many counters can I have?",
    "faq.a3": "Unlimited counters are supported (based on subscription plan).",
    "faq.q4": "Can the system work without Telegram?",
    "faq.a4": "Yes. The queue works normally without Telegram. Telegram is optional and unlocks extra features like live updates, notifications, and announcements.",
    "faq.q5": "Can any queue-based business use this system?",
    "faq.a5": "Yes. QueueJoy works for most businesses that manage customer queues, including services, clinics, salons, and food outlets.",
    "faq.q6": "How quickly can I set this up?",
    "faq.a6": "Most businesses are live within 3 minutes. Just subscribe, create your site, and start.",
    
    // Contact
    "contact.title": "Get in touch",
    "contact.subtitle": "Have questions? Want a custom setup? Contact us.",
    "contact.name": "Your name",
    "contact.business": "Your business",
    "contact.email": "Your email",
    "contact.message": "Your message",
    "contact.send": "Send Message",
    
    // Footer
    "footer.tagline": "Smart queue management for modern businesses",
    "footer.links": "Resources",
    "footer.documentation": "Documentation",
    "footer.legal": "Legal",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
    "footer.rights": "All rights reserved.",
    
    // Popup
    "popup.title": "Want more returning customers?",
    "popup.subtitle": "Kopitiams, cafes & stalls use QueueJoy to speed up orders — and to turn first-time buyers into loyal repeat customers.",
    "popup.description": "QueueJoy isn't just queue management. It also builds loyalty and repeat visits.",
    "popup.cta.yes": "Yes — I want more returning customers",
    "popup.cta.no": "No — I'm fine losing returning customers",
    
    // Click Me
    "clickme.button": "Click Me!",
    "clickme.title": "About QueueJoy",
    "clickme.description": "Hi! I'm Hong Jun, 14, and I built QueueJoy to make waiting in line a thing of the past.",
  },
  ms: {
    // Nav
    "nav.home": "Laman Utama",
    "nav.functions": "Fungsi",
    "nav.about": "Tentang",
    "nav.demo": "Demo",
    "nav.testimonials": "Testimoni",
    "nav.pricing": "Harga",
    "nav.contact": "Hubungi",
    
    // Hero
    "hero.headline": "Menunggu Singkat, Kesetiaan Lama",
    "hero.subhead": "Tiada aplikasi — berfungsi dengan Telegram. Sediakan dalam masa kurang 3 minit.",
    "hero.cta.buy": "Beli Sekarang - RM25/bulan",
    "hero.cta.demo": "Tonton demo 2 minit",
    "hero.trust": "RM25/bulan · Jaminan wang kembali 30 hari · 100+ perniagaan · Batal bila-bila masa",
    "hero.benefit1": "Tiada pemasangan aplikasi — DMs Telegram serta-merta",
    "hero.benefit2": "Perkhidmatan satu ketik — kurang kekeliruan",
    "hero.benefit3": "Status posisi masa nyata — kurangkan masa menunggu 40%",
    
    // Metrics
    "metrics.waitTime": "Kurangkan masa menunggu",
    "metrics.businesses": "Perniagaan mempercayai kami",
    "metrics.setup": "Masa penyediaan",
    "metrics.price": "Hanya sebulan",
    
    // Demo
    "demo.videoTitle": "Tonton Cara QueueJoy Berfungsi",
    "demo.videoSubtitle": "Lihat demo tindakan — 2 minit yang akan mengubah cara anda melihat barisan",
    "demo.clickToWatch": "Klik untuk tonton demo",
    "demo.liveDemo": "Cuba Demo Langsung",
    "demo.badge": "Cuba Sekarang",
    "demo.title": "Demo Interaktif Masa Nyata",
    "demo.subtitle": "Rasai pengurusan barisan QueueJoy secara langsung",
    "demo.customerView": "Pandangan Pelanggan",
    "demo.staffView": "Pandangan Kakitangan",
    "demo.welcome": "Selamat Datang",
    "demo.tapToJoin": "Ketuk untuk sertai barisan",
    "demo.getNumber": "Dapatkan Nombor Barisan",
    "demo.yourNumber": "Nombor Anda",
    "demo.nowServing": "Sedang Dihidangkan",
    "demo.peopleAhead": "Orang Di Hadapan",
    "demo.connected": "Disambungkan ke Telegram",
    "demo.yourTurn": "Giliran anda!",
    "demo.counterPanel": "Panel Kaunter",
    "demo.lastIssued": "Dikeluarkan Terakhir",
    "demo.waiting": "Menunggu",
    "demo.callNext": "Panggil Seterusnya",
    "demo.reset": "Tetapkan Semula Demo",
    "demo.instructions": "Cuba klik 'Dapatkan Nombor' kemudian 'Panggil Seterusnya' untuk melihat notifikasi!",
    
    // Sticky
    "sticky.title": "Tindakan Pantas",
    "sticky.buyNow": "Beli Sekarang - RM25/bulan",
    "sticky.watchDemo": "Tonton Demo",
    "sticky.status": "Halaman Status",
    "sticky.counter": "Panel Kaunter",
    "sticky.admin": "Papan Pemuka Pentadbir",
    
    // Comparison
    "comparison.title": "Industri — hasil sebenar, kemenangan cepat",
    "comparison.subtitle": "Ubah menunggu dari liabiliti kepada kelebihan",
    "comparison.description": "Lihat perbezaan QueueJoy mengikut industri",
    "comparison.old": "Cara Lama",
    "comparison.new": "Cara QueueJoy",
    
    // Industries
    "industries.healthcare.title": "Kesihatan & Kesejahteraan",
    "industries.healthcare.old1": "Senarai manual, lobi sesak, kakitangan tertekan.",
    "industries.healthcare.old2": "Tiada saluran tindakan susulan pelanggan.",
    "industries.healthcare.joy1": "Barisan maya + pemberitahuan meja → aliran lebih tenang.",
    "industries.healthcare.joy2": "Siaran Telegram selepas lawatan → galakkan lawatan semula.",
    "industries.healthcare.benefit": "QueueJoy membantu penyedia kesihatan mengurangkan tekanan bilik menunggu.",
    "industries.finance.title": "Kewangan & Kerajaan",
    "industries.finance.old1": "Barisan panjang, tiket hilang, pelanggan kecewa.",
    "industries.finance.old2": "Token manual, aliran tidak cekap.",
    "industries.finance.joy1": "Giliran maya → aliran yang boleh diramal.",
    "industries.finance.joy2": "Siaran peringatan dan tindakan susulan.",
    "industries.finance.benefit": "QueueJoy mempercepat penyampaian perkhidmatan.",
    "industries.fnb.title": "F&B",
    "industries.fnb.old1": "Kekacauan kaunter, jualan hilang.",
    "industries.fnb.old2": "Tiada saluran penglibatan semula.",
    "industries.fnb.joy1": "Sertai QR + barisan maya → menunggu di meja.",
    "industries.fnb.joy2": "Siaran Telegram selepas lawatan → ROI kesetiaan pantas.",
    "industries.fnb.benefit": "Sesuai untuk kopitiam, kafe, dan restoran.",
    "industries.beauty.title": "Kecantikan & Gaya Hidup",
    "industries.beauty.old1": "Kekacauan walk-in, tempahan terlepas.",
    "industries.beauty.old2": "Tiada saluran tempah semula/promosi.",
    "industries.beauty.joy1": "Barisan maya + penimbal temujanji → aliran lebih lancar.",
    "industries.beauty.joy2": "Siaran kepada pelanggan lalu → tingkatkan tempahan semula.",
    "industries.beauty.benefit": "Salon dan spa boleh mengurus walk-in dengan lancar.",
    "industries.exploreMore": "Terokai Lagi",
    "industries.howQueueJoyHelps": "Bagaimana QueueJoy membantu industri ini:",
    
    // FAQ
    "faq.title": "Soalan",
    "faq.subtitle": "Lazim",
    "faq.description": "Segala yang anda perlu tahu tentang QueueJoy",
    "faq.q1": "Saya perlu memasang apa-apa?",
    "faq.a1": "Tidak. Pelanggan menerima mesej melalui Telegram; tiada pemasangan aplikasi tambahan diperlukan.",
    "faq.q2": "Bagaimana notifikasi Telegram berfungsi?",
    "faq.a2": "Selepas pengguna ketik sekali untuk menyambung, kami memautkan mereka ke kedai anda dan menghantar peringatan serta pengumuman melalui DM Telegram.",
    "faq.q3": "Berapa banyak kaunter yang boleh saya ada?",
    "faq.a3": "Sokongan kaunter tanpa had (bergantung pada pelan langganan).",
    "faq.q4": "Bolehkah sistem berfungsi tanpa Telegram?",
    "faq.a4": "Ya. Barisan berfungsi seperti biasa tanpa Telegram. Telegram adalah pilihan dan membuka ciri tambahan seperti kemas kini langsung, pemberitahuan, dan pengumuman.",
    "faq.q5": "Bolehkah mana-mana perniagaan berasaskan barisan menggunakan sistem ini?",
    "faq.a5": "Ya. QueueJoy berfungsi untuk kebanyakan perniagaan yang mengurus barisan pelanggan, termasuk perkhidmatan, klinik, salon, dan outlet makanan.",
    "faq.q6": "Berapa cepat saya boleh sediakan ini?",
    "faq.a6": "Kebanyakan perniagaan hidup dalam 3 minit. Hanya langgan, cipta laman anda, dan mulakan.",
    
    // Footer
    "footer.tagline": "Pengurusan barisan pintar untuk perniagaan moden",
    "footer.links": "Sumber",
    "footer.documentation": "Dokumentasi",
    "footer.legal": "Undang-undang",
    "footer.terms": "Terma Perkhidmatan",
    "footer.privacy": "Dasar Privasi",
    "footer.rights": "Semua hak terpelihara.",
    
    // Popup
    "popup.title": "Mahu lebih ramai pelanggan berulang?",
    "popup.subtitle": "Kopitiam, kafe & gerai menggunakan QueueJoy untuk mempercepat pesanan — dan menukar pembeli pertama kali menjadi pelanggan setia berulang.",
    "popup.description": "QueueJoy bukan sekadar pengurusan barisan. Ia juga membina kesetiaan dan lawatan berulang.",
    "popup.cta.yes": "Ya — Saya mahu lebih ramai pelanggan berulang",
    "popup.cta.no": "Tidak — Saya okay kehilangan pelanggan berulang",
    
    // Click Me
    "clickme.button": "Klik Aku!",
    "clickme.title": "Tentang QueueJoy",
    
    // User Page
    "userpage.badge": "Pengalaman Pengguna",
    "userpage.title": "Halaman Pengguna",
    "userpage.subtitle": "Halaman barisan tanpa sentuhan dengan logo anda, iklan video, dan pengalaman pengguna yang lancar.",
    "userpage.bullet1": "Sambungan satu ketik — pengguna kekal diselaraskan selamanya",
    "userpage.bullet2": "Notifikasi tanpa membuka Telegram",
    "userpage.bullet3": "Berikan peringatan & pemberitahuan giliran",
    "userpage.cta": "Lihat Dalam Tindakan",
    "userpage.liveDemo": "Demo Langsung",
    
    // Status Page
    "statuspage.badge": "Status Masa Nyata",
    "statuspage.title": "Pautan Telegram Automatik",
    "statuspage.subtitle": "Pengguna ketik sekali → barisan + amaran diselaraskan. Terima notifikasi tanpa membuka apa-apa.",
    "statuspage.step1": "Sambungan satu ketik, pengguna kekal diselaraskan selamanya",
    "statuspage.step2": "Pengguna boleh tutup segalanya; notifikasi tetap dihantar",
    "statuspage.step3": "Berikan peringatan, pemberitahuan giliran kepada setiap pengguna",
    "statuspage.cta": "Lihat Demo Status",
    "statuspage.liveDemo": "Demo Langsung",
    
    // Counter
    "counter.badge": "Sistem Barisan Pintar",
    "counter.title": "Panel Kaunter",
    "counter.subtitle": "Lihat dikeluarkan terakhir, sedang dihidangkan, seterusnya. Berikan kemas kini masa nyata ke halaman pelanggan.",
    "counter.feature1.title": "Panggil Seterusnya Satu Ketik",
    "counter.feature1.desc": "Panggil pelanggan seterusnya serta-merta dengan satu ketikan",
    "counter.feature2.title": "Penyelarasan Masa Nyata",
    "counter.feature2.desc": "Penyelarasan masa nyata antara kaunter dan pengguna",
    "counter.feature3.title": "Tetapan Kaunter",
    "counter.feature3.desc": "Tetapkan maklumat kaunter — nama, awalan",
    "counter.highlight": "Pengurusan barisan lancar dan notifikasi masa nyata",
    "counter.cta": "Lihat Demo Kaunter",
    "counter.liveDemo": "Demo Langsung",
    
    // Admin
    "admin.announcement.badge": "Komunikasi Langsung",
    "admin.announcement.title": "Pengumuman Terus kepada Pelanggan",
    "admin.announcement.desc": "Perniagaan tidak kehilangan pelanggan kerana produk buruk — mereka kehilangan pelanggan apabila komunikasi berhenti. QueueJoy membolehkan anda menghantar pengumuman serta-merta kepada setiap pelanggan yang pernah menyertai barisan anda, terus di Telegram.",
    "admin.announcement.cta": "Lihat Ciri Pengumuman",
    "admin.customize.badge": "Penyesuaian Penuh",
    "admin.customize.title": "Sesuaikan Semua. Termasuk Video Sokongan, GIF!",
    "admin.customize.desc": "Jadikan halaman barisan anda benar-benar milik anda dengan penjenamaan tersuai, iklan video, dan sokongan media.",
    "admin.analytics.badge": "Analitis Data",
    "admin.analytics.title": "Papan Pemuka Analitik",
    "admin.analytics.desc": "Jejak barisan, masa menunggu & waktu puncak. Buat keputusan lebih pintar segera dengan analitik masa nyata.",
    "admin.analytics.cta": "Lihat Analitik",
    "admin.liveDemo": "Demo Langsung",
    
    // Pricing
    "pricing.title": "Harga Mudah & Telus",
    "pricing.subtitle": "Segala yang anda perlukan untuk mengurus barisan secara profesional",
    "pricing.features": "Ciri",
    "pricing.others": "Lain-lain",
    "pricing.badge": "Nilai Terbaik",
    "pricing.perMonth": "sebulan · setiap tapak",
    "pricing.feature.telegram": "Amaran Telegram Serta-merta",
    "pricing.feature.noApp": "Tiada Keperluan Pemasangan Aplikasi",
    "pricing.feature.multiCounter": "Sokongan Berbilang Kaunter",
    "pricing.feature.realtime": "Penyelarasan Masa Nyata",
    "pricing.feature.analytics": "Papan Pemuka Analitik",
    "pricing.feature.announcements": "Pengumuman Terus",
    "pricing.feature.customization": "Penyesuaian Penuh",
    "pricing.feature.setup": "Masa Penyediaan",
    "pricing.feature.price": "Harga Bulanan",
    "pricing.includes.telegram": "Amaran Telegram serta-merta",
    "pricing.includes.counters": "Kaunter tanpa had",
    "pricing.includes.analytics": "Papan pemuka analitik penuh",
    "pricing.includes.announcements": "Pengumuman terus",
    "pricing.includes.support": "Sokongan keutamaan",
    "pricing.guarantee": "Jaminan wang kembali 30 hari",
    "pricing.guaranteeDesc": "Jika ia tidak memendekkan masa menunggu, dapatkan pulangan penuh",
    "pricing.cancel": "Batal bila-bila masa · Tiada kontrak jangka panjang",
    
    // Testimonials
    "testimonials.title": "Apa Kata Pelanggan Kami",
    "testimonials.subtitle": "Bergabung dengan 100+ perniagaan yang memendekkan masa menunggu hari ini",
    "testimonials.1.quote": "Mengurangkan masa menunggu sebanyak 40%. Pesakit menyukai amaran Telegram. Kakitangan kami boleh fokus pada rawatan, bukan kawalan orang ramai.",
    "testimonials.1.name": "Dr. Sarah Chen",
    "testimonials.1.role": "Pentadbir Hospital",
    "testimonials.2.quote": "QueueJoy mengubah perkhidmatan kami. Tiada lagi kekeliruan. Pelanggan lebih gembira dan kecekapan kami berganda.",
    "testimonials.2.name": "Ahmad Razak",
    "testimonials.2.role": "Pengurus Cawangan Bank",
    "testimonials.3.quote": "Kekacauan waktu pagi dulu banyak. Sekarang pelanggan sertai barisan dari telefon mereka. Perubahan besar!",
    "testimonials.3.name": "Lisa Wong",
    "testimonials.3.role": "Pemilik Kafe",
    
    // How It Works
    "howitworks.title": "Cara Ia Berfungsi",
    "howitworks.subtitle": "Aliran 3 langkah ringkas — sediakan dalam masa kurang 3 minit",
    "howitworks.step1.title": "Ambil nombor",
    "howitworks.step1.desc": "QR / kiosk / kakitangan",
    "howitworks.step2.title": "Lihat status",
    "howitworks.step2.desc": "Telefon atau skrin",
    "howitworks.step3.title": "Terima pemberitahuan",
    "howitworks.step3.desc": "DM Telegram atau panggilan audio",
    
    // Contact
    "contact.title": "Hubungi Kami",
    "contact.subtitle": "Ada soalan? Mahu tetapan khusus? Hubungi kami.",
    "contact.name": "Nama anda",
    "contact.business": "Nama perniagaan anda",
    "contact.email": "Emel anda",
    "contact.message": "Beritahu kami tentang keperluan anda",
    "contact.send": "Hantar Mesej",
  },
  zh: {
    // Nav
    "nav.home": "首页",
    "nav.functions": "功能",
    "nav.about": "关于",
    "nav.demo": "演示",
    "nav.testimonials": "推荐",
    "nav.pricing": "价格",
    "nav.contact": "联系我们",
    
    // Hero
    "hero.headline": "短等待，长回头",
    "hero.subhead": "无需安装应用 — 与 Telegram 配合使用。3分钟内完成设置。",
    "hero.cta.buy": "立即购买 - RM25/月",
    "hero.cta.demo": "观看 2 分钟演示",
    "hero.trust": "RM25/月 · 30 天退款保证 · 100+ 商家 · 随时取消",
    "hero.benefit1": "无需安装任何应用 — 即刻收到 Telegram 私信",
    "hero.benefit2": "一键服务 — 更少混乱",
    "hero.benefit3": "实时排队状态 — 等候时间降低 40%",
    
    // Metrics
    "metrics.waitTime": "减少等候时间",
    "metrics.businesses": "商家信赖我们",
    "metrics.setup": "设置时间",
    "metrics.price": "每月仅需",
    
    // Demo
    "demo.videoTitle": "观看 QueueJoy 工作原理",
    "demo.videoSubtitle": "观看实操 — 2 分钟改变你对排队的看法",
    "demo.clickToWatch": "点击观看演示",
    "demo.liveDemo": "试用实时演示",
    "demo.badge": "立即体验",
    "demo.title": "交互式实时演示",
    "demo.subtitle": "体验 QueueJoy 的排队管理实况",
    "demo.customerView": "客户端视图",
    "demo.staffView": "员工视图",
    "demo.welcome": "欢迎",
    "demo.tapToJoin": "点击加入队列",
    "demo.getNumber": "获取排队号码",
    "demo.yourNumber": "您的号码",
    "demo.nowServing": "正在服务",
    "demo.peopleAhead": "前面人数",
    "demo.connected": "已连接Telegram",
    "demo.yourTurn": "轮到您了！",
    "demo.counterPanel": "柜台面板",
    "demo.lastIssued": "上次出票",
    "demo.waiting": "当前等待",
    "demo.callNext": "呼叫下一位",
    "demo.reset": "重置演示",
    "demo.instructions": "试着点击"获取排号"再点击"呼叫下一位"来查看通知效果！",
    
    // Sticky
    "sticky.title": "快速操作",
    "sticky.buyNow": "立即购买 - RM25/月",
    "sticky.watchDemo": "观看演示",
    "sticky.status": "状态页面",
    "sticky.counter": "柜台面板",
    "sticky.admin": "管理仪表板",
    
    // Comparison
    "comparison.title": "行业案例 — 真实效果，快速见效",
    "comparison.subtitle": "把等待从负担变为机会",
    "comparison.description": "看看 QueueJoy 在各行业的差别",
    "comparison.old": "旧方式",
    "comparison.new": "QueueJoy 方式",
    
    // Industries
    "industries.healthcare.title": "医院与诊所",
    "industries.healthcare.old1": "手写名单，候诊室拥挤，员工压力大。",
    "industries.healthcare.old2": "无客户跟进渠道。",
    "industries.healthcare.joy1": "虚拟排队 + 桌面通知 → 更平静的流程。",
    "industries.healthcare.joy2": "就诊后 Telegram 广播 → 促进回访。",
    "industries.healthcare.benefit": "QueueJoy 帮助医疗机构减少候诊室压力。",
    "industries.finance.title": "银行与政府机构",
    "industries.finance.old1": "长队、取号混乱、客户不满。",
    "industries.finance.old2": "手动取号，流程低效。",
    "industries.finance.joy1": "虚拟排队 → 可预测的流程。",
    "industries.finance.joy2": "广播提醒和跟进。",
    "industries.finance.benefit": "QueueJoy 简化服务交付。",
    "industries.fnb.title": "餐饮",
    "industries.fnb.old1": "柜台混乱，销售损失。",
    "industries.fnb.old2": "无再参与渠道。",
    "industries.fnb.joy1": "扫码加入 + 虚拟排队 → 桌边等候。",
    "industries.fnb.joy2": "就餐后 Telegram 广播 → 快速忠诚度回报。",
    "industries.fnb.benefit": "非常适合咖啡馆、快餐店和餐厅。",
    "industries.beauty.title": "美容与生活方式",
    "industries.beauty.old1": "到店混乱，预约遗漏。",
    "industries.beauty.old2": "无便捷的再预约/促销渠道。",
    "industries.beauty.joy1": "虚拟排队 + 预约缓冲 → 更顺畅的流程。",
    "industries.beauty.joy2": "向老客户广播 → 增加再预约。",
    "industries.beauty.benefit": "沙龙和水疗中心可以无缝管理客户。",
    "industries.exploreMore": "探索更多",
    "industries.howQueueJoyHelps": "QueueJoy 如何帮助这个行业：",
    
    // FAQ
    "faq.title": "常见",
    "faq.subtitle": "问题",
    "faq.description": "关于 QueueJoy 的所有问题",
    "faq.q1": "我需要安装任何东西吗？",
    "faq.a1": "不需要用户端安装。顾客通过 Telegram 接收消息，无需安装额外应用。",
    "faq.q2": "Telegram 通知如何工作？",
    "faq.a2": "用户点击一次连接后，我们会把他们与店铺绑定，之后通过 Telegram 私信推送提醒与公告。",
    "faq.q3": "我可以有多少个柜台？",
    "faq.a3": "支持无限柜台（根据订阅计划）。",
    "faq.q4": "系统可以在没有 Telegram 的情况下工作吗？",
    "faq.a4": "可以。排队系统在没有 Telegram 的情况下正常工作。Telegram 是可选的，可解锁实时更新、通知和公告等额外功能。",
    "faq.q5": "任何基于排队的业务都可以使用这个系统吗？",
    "faq.a5": "是的。QueueJoy 适用于大多数管理客户排队的企业，包括服务、诊所、沙龙和餐饮店。",
    "faq.q6": "我能多快设置这个？",
    "faq.a6": "大多数企业在3分钟内上线。只需订阅，创建您的网站，然后开始。",
    
    // Footer
    "footer.tagline": "面向现代商家的智能排队管理",
    "footer.links": "资源",
    "footer.documentation": "文档",
    "footer.legal": "法律",
    "footer.terms": "服务条款",
    "footer.privacy": "隐私政策",
    "footer.rights": "保留所有权利。",
    
    // Popup
    "popup.title": "想要更多回头客？",
    "popup.subtitle": "咖啡馆和摊位使用 QueueJoy 加速订单 — 并将首次购买者转变为忠实回头客。",
    "popup.description": "QueueJoy 不仅仅是排队管理。它还能建立忠诚度和回访。",
    "popup.cta.yes": "是的 — 我想要更多回头客",
    "popup.cta.no": "不 — 我接受失去回头客",
    
    // Click Me
    "clickme.button": "点我！",
    "clickme.title": "关于 QueueJoy",
    
    // User Page
    "userpage.badge": "用户体验",
    "userpage.title": "用户页面",
    "userpage.subtitle": "一个零接触的排队页面，带有你的 Logo、视频广告和顺畅的用户体验。",
    "userpage.bullet1": "一键连接 — 用户永久保持同步",
    "userpage.bullet2": "无需打开 Telegram 也能接收通知",
    "userpage.bullet3": "提供提醒与轮到通知",
    "userpage.cta": "查看演示",
    "userpage.liveDemo": "实时演示",
    
    // Status Page
    "statuspage.badge": "实时状态",
    "statuspage.title": "自动关联 Telegram",
    "statuspage.subtitle": "用户只需点击一次 → 排队与提醒同步。无需打开任何应用也能收到提醒。",
    "statuspage.step1": "一键连接，用户永久保持同步",
    "statuspage.step2": "用户可以关闭页面；通知仍会推送",
    "statuspage.step3": "向每位用户发送提醒与轮到通知",
    "statuspage.cta": "查看状态演示",
    "statuspage.liveDemo": "实时演示",
    
    // Counter
    "counter.badge": "智能排队系统",
    "counter.title": "柜台面板",
    "counter.subtitle": "查看上次出票、当前服务、下一个。向用户页面实时推送更新。",
    "counter.feature1.title": "一键呼叫下一位",
    "counter.feature1.desc": "通过一键操作立即呼叫下一位顾客",
    "counter.feature2.title": "实时同步",
    "counter.feature2.desc": "柜台与用户之间实时同步",
    "counter.feature3.title": "柜台设置",
    "counter.feature3.desc": "设置柜台信息 — 名称、前缀等",
    "counter.highlight": "平滑的队列管理与实时通知",
    "counter.cta": "查看柜台演示",
    "counter.liveDemo": "实时演示",
    
    // Admin
    "admin.announcement.badge": "直接沟通",
    "admin.announcement.title": "直接向顾客公告",
    "admin.announcement.desc": "商家丢失客户并非因为产品不好，而是沟通中断。QueueJoy 让你可以立即向所有曾加入过队列的顾客发送公告，直接在 Telegram 上触达。",
    "admin.announcement.cta": "查看公告功能",
    "admin.customize.badge": "完全自定义",
    "admin.customize.title": "自定义一切。支持视频、GIF！",
    "admin.customize.desc": "用自定义品牌、视频广告和媒体支持让你的排队页面更贴合你的商家形象。",
    "admin.analytics.badge": "数据分析",
    "admin.analytics.title": "分析面板",
    "admin.analytics.desc": "追踪队列、等待时间与高峰时段。借助实时分析做出更聪明的决策。",
    "admin.analytics.cta": "查看分析",
    "admin.liveDemo": "实时演示",
    
    // Pricing
    "pricing.title": "简单透明的定价",
    "pricing.subtitle": "专业排队管理所需的一切",
    "pricing.features": "功能",
    "pricing.others": "其他",
    "pricing.badge": "最划算",
    "pricing.perMonth": "每月 · 每站点",
    "pricing.feature.telegram": "即时 Telegram 提醒",
    "pricing.feature.noApp": "无需安装应用",
    "pricing.feature.multiCounter": "多柜台支持",
    "pricing.feature.realtime": "实时同步",
    "pricing.feature.analytics": "分析面板",
    "pricing.feature.announcements": "直接公告",
    "pricing.feature.customization": "完全自定义",
    "pricing.feature.setup": "设置时间",
    "pricing.feature.price": "月费",
    "pricing.includes.telegram": "即时 Telegram 提醒",
    "pricing.includes.counters": "无限柜台",
    "pricing.includes.analytics": "完整分析面板",
    "pricing.includes.announcements": "直接公告",
    "pricing.includes.support": "优先支持",
    "pricing.guarantee": "30 天退款保证",
    "pricing.guaranteeDesc": "如果它不能缩短等候时间，可申请全额退款",
    "pricing.cancel": "随时取消 · 无长期合约",
    
    // Testimonials
    "testimonials.title": "客户评价",
    "testimonials.subtitle": "加入 100+ 商家，一起缩短等候时间",
    "testimonials.1.quote": "等待时间减少了 40%。患者喜欢 Telegram 提醒。我们的员工能专注医疗，而不是人群管理。",
    "testimonials.1.name": "陈医生",
    "testimonials.1.role": "医院管理者",
    "testimonials.2.quote": "QueueJoy 改变了我们的服务流程。再也没有混乱。顾客更满意，我们的效率翻倍。",
    "testimonials.2.name": "阿末·拉扎克",
    "testimonials.2.role": "银行分行经理",
    "testimonials.3.quote": "早高峰以前是一团乱。现在顾客在手机上加入队列。真的很改观！",
    "testimonials.3.name": "李莎·黄",
    "testimonials.3.role": "咖啡店老板",
    
    // How It Works
    "howitworks.title": "工作原理",
    "howitworks.subtitle": "简单三步流程 — 3 分钟内完成设置",
    "howitworks.step1.title": "取号",
    "howitworks.step1.desc": "二维码 / 自助机 / 员工代取",
    "howitworks.step2.title": "查看状态",
    "howitworks.step2.desc": "手机或屏幕",
    "howitworks.step3.title": "收到通知",
    "howitworks.step3.desc": "Telegram 私信或语音播报",
    
    // Contact
    "contact.title": "联系我们",
    "contact.subtitle": "有问题？需要定制化设置？联系我们。",
    "contact.name": "你的名字",
    "contact.business": "你的商家名称",
    "contact.email": "电子邮件",
    "contact.message": "告诉我们你的需求",
    "contact.send": "发送信息",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
