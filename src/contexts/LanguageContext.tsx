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
    "hero.subhead": "No app — works with Telegram. Setup in under 10 minutes.",
    "hero.cta.buy": "Buy Now - RM25/month",
    "hero.cta.demo": "Watch 2-min demo",
    "hero.trust": "RM25/month · 30-day money-back · 100+ businesses · Cancel anytime",
    "hero.benefit1": "No app install — instant Telegram DMs",
    "hero.benefit2": "One-tap service — less confusion",
    "hero.benefit3": "Real-time position — 40% less wait",
    
    // Demo
    "demo.videoTitle": "Watch How QueueJoy Works",
    "demo.videoSubtitle": "See the magic in action — 2 minutes that'll change how you think about queues",
    "demo.clickToWatch": "Click to watch demo",
    "demo.liveDemo": "Try Live Demo",
    
    // Metrics
    "metrics.waitTime": "Reduce wait time",
    "metrics.businesses": "Businesses trust us",
    "metrics.setup": "Setup time",
    "metrics.price": "Per month only",
    
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
    "admin.analytics.desc": "Track queues, wait times & peak hours. Make smarter decisions instantly with real-time analytics.",
    "admin.analytics.cta": "View Analytics",
    "admin.analytics.modalDesc": "Get insights into your queue performance and optimize your operations.",
    "admin.liveDemo": "Live Demo",
    
    // Demo
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
    
    // Click Me Dialog
    "clickme.button": "Click Me!",
    "clickme.title": "About QueueJoy",
    "clickme.description": "Hi! I'm Hong Jun, 14, and I built QueueJoy to make waiting in line a thing of the past.",
    "clickme.cta.ok": "Got it",
    "clickme.cta.buy": "Buy Now - RM25/month",
    
    // Comparison
    "comparison.title": "Industries — real results, fast wins",
    "comparison.subtitle": "Turn waiting from a liability into an advantage",
    "comparison.description": "See the difference QueueJoy makes across industries",
    "comparison.hospital.title": "Hospitals & Clinics",
    "comparison.hospital.old": "Manual lists, crowded lobbies, stressed staff.",
    "comparison.hospital.new": "Patients join via QR, see position + ETA, get Telegram alerts — calmer waiting rooms.",
    "comparison.bank.title": "Banks & Government",
    "comparison.bank.old": "Long lines, lost tokens, frustrated queues.",
    "comparison.bank.new": "Staff tap 'Next'; customers arrive when called — service flow doubles.",
    "comparison.food.title": "Cafés & Fast Food",
    "comparison.food.old": "Morning chaos, orders delayed.",
    "comparison.food.new": "Virtual queue + counter management = steady throughput.",
    "comparison.transport.title": "Events & Transport",
    "comparison.transport.old": "Bottlenecks, safety risks, long entrance queues.",
    "comparison.transport.new": "Controlled entry with broadcast alerts — safer crowds.",
    "comparison.old": "Old Way",
    "comparison.new": "QueueJoy Way",
    
    // Testimonials
    "testimonials.title": "Trusted by 100+ businesses",
    "testimonials.subtitle": "See what our customers say",
    "testimonials.1.quote": "Wait times dropped by 40%. Customers love the Telegram notifications!",
    "testimonials.1.name": "Dr. Sarah Chen",
    "testimonials.1.role": "Hospital Administrator",
    "testimonials.2.quote": "We doubled throughput at peak hours. Simple, fast, reliable.",
    "testimonials.2.name": "Ahmad Razak",
    "testimonials.2.role": "Branch Manager",
    "testimonials.3.quote": "Morning rush used to be chaos. Now it's smooth and profitable.",
    "testimonials.3.name": "Lisa Wong",
    "testimonials.3.role": "Café Owner",
    
    // How It Works
    "howitworks.title": "How it works — 3 steps",
    "howitworks.subtitle": "Setup in under 10 minutes",
    "howitworks.step1.title": "Take a number",
    "howitworks.step1.desc": "QR, kiosk, or staff-issued ticket",
    "howitworks.step2.title": "Watch status",
    "howitworks.step2.desc": "Customers see live position on phone",
    "howitworks.step3.title": "Get called",
    "howitworks.step3.desc": "Telegram DM + audio callout",
    
    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.q1": "Do customers need to install an app?",
    "faq.a1": "No! QueueJoy works through Telegram, which most people already have.",
    "faq.q2": "How quickly can I set this up?",
    "faq.a2": "Most businesses are live within 10 minutes.",
    "faq.q3": "Can I cancel anytime?",
    "faq.a3": "Yes! Cancel anytime with 30-day money-back guarantee.",
    "faq.q4": "What if I need multiple counters?",
    "faq.a4": "QueueJoy supports unlimited counters, all synced in real-time.",
    
    // Contact
    "contact.title": "Get in touch",
    "contact.subtitle": "Have questions? We're here to help",
    "contact.name": "Your name",
    "contact.email": "Your email",
    "contact.message": "Your message",
    "contact.send": "Send Message",
    
    // Footer
    "footer.tagline": "Smart queue management for modern businesses",
    "footer.links": "Quick Links",
    "footer.legal": "Legal",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
  },
  ms: {
    // Nav
    "nav.home": "Laman Utama",
    "nav.about": "Tentang",
    "nav.demo": "Demo",
    "nav.testimonials": "Testimoni",
    "nav.pricing": "Harga",
    "nav.contact": "Hubungi",
    
    // Hero
    "hero.headline": "Potong giliran. Kekalkan pelanggan.",
    "hero.subhead": "Tiada aplikasi — berfungsi dengan Telegram. Persediaan kurang dari 10 minit.",
    "hero.cta.buy": "Mula RM10/bulan",
    "hero.cta.demo": "Tonton demo 2 minit",
    "hero.trust": "RM10/bulan · Jaminan wang kembali 30 hari · 100+ perniagaan · Batal bila-bila masa",
    "hero.benefit1": "Tiada aplikasi — DM Telegram segera",
    "hero.benefit2": "Perkhidmatan satu-ketukan — kurang keliru",
    "hero.benefit3": "Kedudukan masa nyata — 40% kurang tunggu",
    
    // Click Me Dialog (About QueueJoy)
    "clickme.button": "Klik Saya!",
    "clickme.title": "Tentang QueueJoy",
    "clickme.description": "Hai! Saya Hong Jun, 14 tahun, dan saya membina QueueJoy untuk menjadikan beratur sebagai perkara lepas.\n\nQueueJoy mengubah giliran tradisional yang lambat menjadi sistem moden yang pantas dan mudah — tanpa perkakasan mahal, tanpa persediaan rumit. Kakitangan boleh fokus pada perkhidmatan pelanggan, dan semua orang menikmati pengalaman yang lebih lancar dan bebas tekanan.\n\nSebagai bonus, jika anda menggunakan QueueJoy, saya akan membantu mempromosikan perniagaan anda di Instagram saya, memberikan kedai anda keterlihatan tambahan sambil anda menyelaraskan perkhidmatan.",
    "clickme.cta.ok": "Faham",
    "clickme.cta.buy": "Beli Sekarang - RM10/bulan",
    
    // Staff Counter Section
    "staffcounter.badge": "Pantas Kilat",
    "staffcounter.title": "Kaunter Kakitangan Pantas",
    "staffcounter.subtitle": "Satu ketukan 'Pelanggan Seterusnya' • Hantar makluman Telegram automatik",
    "staffcounter.bullet1": "Panggil pelanggan seterusnya dengan satu ketukan",
    "staffcounter.bullet2": "Pemberitahuan Telegram automatik dihantar serta-merta",
    "staffcounter.cta": "Lihat Demo Kaunter",
    
    // Admin Dashboard Section
    "admindashboard.badge": "Didorong Data",
    "admindashboard.title": "Papan Pemuka Pentadbir",
    "admindashboard.subtitle": "Jejak giliran, masa menunggu & waktu puncak • Buat keputusan yang lebih bijak serta-merta",
    "admindashboard.bullet1": "Analitik masa nyata dan metrik giliran",
    "admindashboard.bullet2": "Kenal pasti waktu puncak dan optimalkan kakitangan",
    "admindashboard.cta": "Lihat Demo Papan Pemuka",
    
    // Quick Benefits
    "quickbenefits.title": "Perkhidmatan Mudah. Wawasan Segera.",
    "quickbenefits.staff.title": "Kaunter Kakitangan Pantas",
    "quickbenefits.staff.desc": "Panggil pelanggan seterusnya dengan satu ketukan dan hantar makluman Telegram automatik—cepatkan perkhidmatan,gembirakan pelanggan anda.",
    "quickbenefits.admin.title": "Papan Pemuka Pentadbir",
    "quickbenefits.admin.desc": "Lihat giliran harian, masa menunggu purata, dan waktu puncak dalam masa nyata—tukar data kepada keputusan yang lebih bijak.",
    
    // Features
    "feature1.title": "Makluman Telegram Segera",
    "feature1.subtitle": "Pelanggan anda dimaklumkan apabila giliran mereka hampir.",
    "feature1.bullet1": "Tanpa pemasangan aplikasi — berfungsi serta-merta.",
    "feature1.bullet2": "Mengurangkan ketidakhadiran dan kesesakan.",
    "feature1.bullet3": "Memastikan pelanggan tenang dan bermaklumat.",
    "feature1.cta": "Lihat Demo Telegram",
    
    "feature2.title": "Status Giliran Langsung",
    "feature2.subtitle": "Pelanggan sentiasa tahu nombor, kedudukan, dan kemajuan mereka.",
    "feature2.bullet1": "Sinkronisasi masa nyata di semua skrin.",
    "feature2.bullet2": "Kurang kekeliruan untuk kakitangan dan pelanggan.",
    "feature2.bullet3": "Berfungsi pada mana-mana pelayar atau peranti paparan.",
    "feature2.cta": "Lihat Skrin Status",
    
    "feature3.title": "Pengumuman Terus kepada Pelanggan",
    "feature3.subtitle": "Hantar kemas kini, promosi, dan berita terus melalui Telegram DM.",
    "feature3.bullet1": "Promosikan tawaran semasa pelanggan menunggu.",
    "feature3.bullet2": "Ruang iklan pilihan untuk pendapatan tambahan.",
    "feature3.bullet3": "Jadualkan pengumuman dengan mudah.",
    "feature3.cta": "Lihat Ciri Pengumuman",
    
    "feature4.title": "Tingkatkan Pengalaman Pelanggan",
    "feature4.subtitle": "Ciri penglibatan pilihan yang menjadikan menunggu kurang menyakitkan.",
    "feature4.bullet1": "Permainan mini pilihan (ringan).",
    "feature4.bullet2": "Mesej alu-aluan tersuai.",
    "feature4.bullet3": "Panggilan audio untuk tempat yang sibuk.",
    "feature4.cta": "Pratonton Alat Pengalaman",
    
    // Comparison Section
    "comparison.title": "Industri — hasil nyata, kemenangan pantas",
    "comparison.subtitle": "Ubah menunggu daripada liabiliti menjadi kelebihan",
    "comparison.description": "Lihat perbezaan yang QueueJoy buat merentasi industri",
    "comparison.hospital.title": "Hospital & Klinik",
    "comparison.hospital.old": "Menunggu lama untuk berjumpa doktor. Kakitangan uruskan giliran secara manual.",
    "comparison.hospital.new": "Pesakit sertai melalui Telegram atau kiosk. Lihat kedudukan & masa menunggu. Kurang tekanan dan kesesakan.",
    "comparison.bank.title": "Bank & Kaunter Perkhidmatan",
    "comparison.bank.old": "Giliran panjang, perkhidmatan lambat, mengelirukan kakitangan.",
    "comparison.bank.new": "Satu ketukan 'Panggil Seterusnya.' Kakitangan lihat pelanggan terakhir. Perkhidmatan lebih cepat dan mudah.",
    "comparison.food.title": "Makanan Segera & Kedai Kopi",
    "comparison.food.old": "Pagi dan tengah hari sibuk perlahan pesanan. Pelanggan kecewa.",
    "comparison.food.new": "Pelanggan sertai secara maya. Kakitangan urus kaunter dengan lancar. Pesanan bergerak lebih cepat.",
    "comparison.transport.title": "Pengangkutan Awam & Acara",
    "comparison.transport.old": "Pintu masuk sesak, kelewatan, risiko keselamatan.",
    "comparison.transport.new": "QueueJoy kendalikan orang ramai. Pemberitahuan dan makluman menjaga aliran selamat dan teratur.",
    "comparison.old": "Cara Lama 👎",
    "comparison.new": "Cara QueueJoy 👍",
    
    // Testimonials
    "testimonials.title": "Dipercayai oleh 100+ perniagaan",
    "testimonials.subtitle": "Lihat apa kata pelanggan kami",
    "testimonials.1.quote": "Masa menunggu turun 40%. Pelanggan suka pemberitahuan Telegram!",
    "testimonials.1.name": "Sarah Chen",
    "testimonials.1.role": "Pemilik Kafe",
    "testimonials.2.quote": "Tiada lagi kesesakan di pendaftaran. Pesakit rasa lebih selamat dan bermaklumat.",
    "testimonials.2.name": "Dr. Ahmad",
    "testimonials.2.role": "Pengarah Klinik",
    "testimonials.3.quote": "Persediaan ambil 8 minit. Kini kami kendalikan rush tengah hari dengan lancar setiap hari.",
    "testimonials.3.name": "John Tan",
    "testimonials.3.role": "Pengurus Restoran",
    
    // How It Works
    "howitworks.title": "Persediaan dalam 10 minit",
    "howitworks.subtitle": "Mula urus giliran dengan lebih bijak hari ini",
    "howitworks.step1.title": "1. Langgan",
    "howitworks.step1.desc": "Pilih pelan anda dan lengkapkan pembayaran",
    "howitworks.step2.title": "2. Sediakan Laman",
    "howitworks.step2.desc": "Cipta slug perniagaan anda dan sesuaikan tetapan",
    "howitworks.step3.title": "3. Mulakan",
    "howitworks.step3.desc": "Kongsi pautan dengan pelanggan dan mula urus giliran",
    
    // FAQ
    "faq.title": "Soalan Lazim",
    "faq.q1": "Adakah pelanggan perlu memasang aplikasi?",
    "faq.a1": "Tidak! QueueJoy berfungsi melalui Telegram, yang kebanyakan orang sudah ada. Tiada muat turun diperlukan.",
    "faq.q2": "Berapa cepat saya boleh sediakan ini?",
    "faq.a2": "Kebanyakan perniagaan hidup dalam 10 minit. Hanya langgan, cipta laman anda, dan mulakan.",
    "faq.q3": "Bolehkah saya batal bila-bila masa?",
    "faq.a3": "Ya! Batal bila-bila masa, tiada kontrak jangka panjang. Jaminan wang kembali 30 hari.",
    "faq.q4": "Bagaimana jika saya perlukan beberapa kaunter?",
    "faq.a4": "QueueJoy menyokong kaunter tanpa had, semua disegerakkan masa nyata.",
    
    // Contact
    "contact.title": "Hubungi kami",
    "contact.subtitle": "Ada soalan? Kami di sini untuk membantu",
    "contact.name": "Nama anda",
    "contact.email": "E-mel anda",
    "contact.message": "Mesej anda",
    "contact.send": "Hantar Mesej",
    
    // Footer
    "footer.tagline": "Pengurusan giliran pintar untuk perniagaan moden",
    "footer.links": "Pautan Pantas",
    "footer.legal": "Undang-undang",
    "footer.terms": "Terma Perkhidmatan",
    "footer.privacy": "Dasar Privasi",
  },
  zh: {
    // Nav
    "nav.home": "首页",
    "nav.about": "关于",
    "nav.demo": "演示",
    "nav.testimonials": "推荐",
    "nav.pricing": "价格",
    "nav.contact": "联系",
    
    // Hero
    "hero.headline": "缩短队列。留住客户。",
    "hero.subhead": "无需应用 — 通过Telegram运行。不到10分钟设置。",
    "hero.cta.buy": "开始 RM10/月",
    "hero.cta.demo": "观看2分钟演示",
    "hero.trust": "RM10/月 · 30天退款保证 · 100+企业 · 随时取消",
    "hero.benefit1": "无需应用 — 即时Telegram消息",
    "hero.benefit2": "一键服务 — 更少混乱",
    "hero.benefit3": "实时位置 — 减少40%等待",
    
    // Click Me Dialog (About QueueJoy)
    "clickme.button": "点我！",
    "clickme.title": "关于QueueJoy",
    "clickme.description": "嗨！我是Hong Jun，14岁，我构建了QueueJoy，让排队成为过去。\n\nQueueJoy将缓慢的传统队列转变为快速、现代、轻松的系统——无需昂贵的硬件，无需复杂的设置。员工可以专注于服务客户，每个人都享受更顺畅、无压力的体验。\n\n作为奖励，如果您采用QueueJoy，我将帮助在我的Instagram上推广您的业务，在您简化服务的同时为您的商店提供额外的曝光。",
    "clickme.cta.ok": "明白了",
    "clickme.cta.buy": "立即购买 - RM10/月",
    
    // Staff Counter Section
    "staffcounter.badge": "闪电般快速",
    "staffcounter.title": "快速员工柜台",
    "staffcounter.subtitle": "一键'下一位客户' • 发送自动Telegram提醒",
    "staffcounter.bullet1": "一键呼叫下一位客户",
    "staffcounter.bullet2": "即时自动发送Telegram通知",
    "staffcounter.cta": "查看柜台演示",
    
    // Admin Dashboard Section
    "admindashboard.badge": "数据驱动",
    "admindashboard.title": "管理仪表板",
    "admindashboard.subtitle": "追踪队列、等待时间和高峰时段 • 立即做出更明智的决策",
    "admindashboard.bullet1": "实时分析和队列指标",
    "admindashboard.bullet2": "识别高峰时段并优化人员配置",
    "admindashboard.cta": "查看仪表板演示",
    
    // Quick Benefits
    "quickbenefits.title": "轻松服务。即时洞察。",
    "quickbenefits.staff.title": "快速员工柜台",
    "quickbenefits.staff.desc": "一键呼叫下一位客户并发送自动Telegram提醒——加快服务，取悦您的客户。",
    "quickbenefits.admin.title": "管理仪表板",
    "quickbenefits.admin.desc": "实时查看每日队列、平均等待时间和高峰时段——将数据转化为更明智的决策。",
    
    // Features
    "feature1.title": "即时Telegram提醒",
    "feature1.subtitle": "客户在轮到时立即收到通知。",
    "feature1.bullet1": "无需安装应用 — 即刻运行。",
    "feature1.bullet2": "减少缺席和拥挤。",
    "feature1.bullet3": "让客户保持冷静和知情。",
    "feature1.cta": "查看Telegram演示",
    
    "feature2.title": "实时队列状态",
    "feature2.subtitle": "客户始终了解他们的号码、位置和进度。",
    "feature2.bullet1": "所有屏幕实时同步。",
    "feature2.bullet2": "减少员工和客户的困惑。",
    "feature2.bullet3": "适用于任何浏览器或显示设备。",
    "feature2.cta": "查看状态屏幕",
    
    "feature3.title": "直接向客户发布公告",
    "feature3.subtitle": "通过Telegram DM直接发送更新、促销和新闻。",
    "feature3.bullet1": "在客户等待时推广优惠。",
    "feature3.bullet2": "可选广告空间以获得额外收入。",
    "feature3.bullet3": "轻松安排公告。",
    "feature3.cta": "查看公告功能",
    
    "feature4.title": "提升客户体验",
    "feature4.subtitle": "可选的互动功能，让等待不再痛苦。",
    "feature4.bullet1": "可选迷你游戏（轻量级）。",
    "feature4.bullet2": "自定义欢迎消息。",
    "feature4.bullet3": "为繁忙场所提供音频呼叫。",
    "feature4.cta": "预览体验工具",
    
    // Comparison Section
    "comparison.title": "停止因长队而失去客户",
    "comparison.subtitle": "看看QueueJoy在各行业中的不同",
    "comparison.hospital.title": "医院和诊所",
    "comparison.hospital.old": "长时间等待看医生。员工手动管理队伍。",
    "comparison.hospital.new": "患者通过Telegram或自助终端加入。查看位置和等待时间。减少压力和拥挤。",
    "comparison.bank.title": "银行和服务柜台",
    "comparison.bank.old": "长队，服务慢，员工困惑。",
    "comparison.bank.new": "一键'呼叫下一个'。员工看到最后一位客户。服务更快更容易。",
    "comparison.food.title": "快餐和咖啡店",
    "comparison.food.old": "早上和午餐忙碌减慢订单。客户沮丧。",
    "comparison.food.new": "客户虚拟加入。员工顺利管理柜台。订单移动更快。",
    "comparison.transport.title": "公共交通和活动",
    "comparison.transport.old": "拥挤的入口，延误，安全风险。",
    "comparison.transport.new": "QueueJoy处理大量人群。通知和警报保持流动安全有序。",
    "comparison.old": "旧方法 👎",
    "comparison.new": "QueueJoy方式 👍",
    
    // Testimonials
    "testimonials.title": "受100+企业信赖",
    "testimonials.subtitle": "看看我们的客户怎么说",
    "testimonials.1.quote": "等待时间减少40%。客户喜欢Telegram通知！",
    "testimonials.1.name": "Sarah Chen",
    "testimonials.1.role": "咖啡馆老板",
    "testimonials.2.quote": "注册处不再拥挤。患者感到更安全和知情。",
    "testimonials.2.name": "Dr. Ahmad",
    "testimonials.2.role": "诊所主任",
    "testimonials.3.quote": "设置只需8分钟。现在我们每天顺利处理午餐高峰。",
    "testimonials.3.name": "John Tan",
    "testimonials.3.role": "餐厅经理",
    
    // How It Works
    "howitworks.title": "10分钟内设置",
    "howitworks.subtitle": "今天开始更智能地管理队列",
    "howitworks.step1.title": "1. 订阅",
    "howitworks.step1.desc": "选择您的计划并完成付款",
    "howitworks.step2.title": "2. 设置网站",
    "howitworks.step2.desc": "创建您的业务slug并自定义设置",
    "howitworks.step3.title": "3. 上线",
    "howitworks.step3.desc": "与客户分享链接并开始管理队列",
    
    // FAQ
    "faq.title": "常见问题",
    "faq.q1": "客户需要安装应用程序吗？",
    "faq.a1": "不需要！QueueJoy通过Telegram工作，大多数人已经拥有。无需下载。",
    "faq.q2": "我能多快设置这个？",
    "faq.a2": "大多数企业在10分钟内上线。只需订阅，创建您的网站，然后开始。",
    "faq.q3": "我可以随时取消吗？",
    "faq.a3": "是的！随时取消，无长期合同。30天退款保证。",
    "faq.q4": "如果我需要多个柜台怎么办？",
    "faq.a4": "QueueJoy支持无限柜台，全部实时同步。",
    
    // Contact
    "contact.title": "联系我们",
    "contact.subtitle": "有问题吗？我们在这里帮助",
    "contact.name": "您的姓名",
    "contact.email": "您的电子邮件",
    "contact.message": "您的留言",
    "contact.send": "发送消息",
    
    // Footer
    "footer.tagline": "现代企业的智能队列管理",
    "footer.links": "快速链接",
    "footer.legal": "法律",
    "footer.terms": "服务条款",
    "footer.privacy": "隐私政策",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
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
