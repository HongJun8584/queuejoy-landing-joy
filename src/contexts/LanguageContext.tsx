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
    "nav.about": "About",
    "nav.demo": "Demo",
    "nav.testimonials": "Testimonials",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",
    
    // Hero
    "hero.headline": "Enhance Experience. Build Loyalty.",
    "hero.subhead": "No app. Works with Telegram. Setup in 10 minutes. RM10/month.",
    "hero.cta.buy": "Buy Now — RM10/month",
    "hero.cta.demo": "Watch Demo",
    "hero.trust": "30-day money-back · 100+ businesses · Cancel anytime",
    "hero.benefit1": "Reduce perceived wait by up to 40%",
    "hero.benefit2": "100+ businesses trust QueueJoy",
    "hero.benefit3": "No app needed — Telegram works",
    
    // Features
    "feature1.title": "Instant Telegram Alerts",
    "feature1.subtitle": "Your customers get notified the moment their turn is near.",
    "feature1.bullet1": "No app install — works instantly on any phone.",
    "feature1.bullet2": "Reduces no-shows and crowding.",
    "feature1.bullet3": "Keeps customers calm and informed.",
    "feature1.cta": "See Telegram Demo",
    
    "feature2.title": "Live Queue Status",
    "feature2.subtitle": "Customers always know their number, position, and progress.",
    "feature2.bullet1": "Real-time sync across all screens.",
    "feature2.bullet2": "Less confusion for staff and customers.",
    "feature2.bullet3": "Works on any browser or display device.",
    "feature2.cta": "View Status Screen",
    
    "feature3.title": "Direct Announcements to Customers",
    "feature3.subtitle": "Send updates, promotions, and news straight via Telegram DM.",
    "feature3.bullet1": "Promote offers while customers wait.",
    "feature3.bullet2": "Optional ad space to earn extra revenue.",
    "feature3.bullet3": "Schedule announcements effortlessly.",
    "feature3.cta": "See Announcement Features",
    
    "feature4.title": "Enhance Customer Experience",
    "feature4.subtitle": "Optional engagement features that make waiting less painful.",
    "feature4.bullet1": "Optional mini-games (lightweight).",
    "feature4.bullet2": "Custom welcome messages.",
    "feature4.bullet3": "Audio callouts for busy venues.",
    "feature4.cta": "Preview Experience Tools",
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
    "hero.headline": "Tingkatkan Pengalaman. Bina Kesetiaan.",
    "hero.subhead": "Tanpa aplikasi. Berfungsi dengan Telegram. Persediaan 10 minit. RM10/bulan.",
    "hero.cta.buy": "Beli Sekarang — RM10/bulan",
    "hero.cta.demo": "Tonton Demo",
    "hero.trust": "Jaminan wang kembali 30 hari · 100+ perniagaan · Batal bila-bila masa",
    "hero.benefit1": "Kurangkan masa menunggu sehingga 40%",
    "hero.benefit2": "100+ perniagaan mempercayai QueueJoy",
    "hero.benefit3": "Tiada aplikasi diperlukan — Telegram berfungsi",
    
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
    "hero.headline": "提升体验。建立忠诚度。",
    "hero.subhead": "无需应用。通过Telegram运行。10分钟设置。RM10/月。",
    "hero.cta.buy": "立即购买 — RM10/月",
    "hero.cta.demo": "观看演示",
    "hero.trust": "30天退款保证 · 100+企业 · 随时取消",
    "hero.benefit1": "减少等待时间达40%",
    "hero.benefit2": "100+企业信赖QueueJoy",
    "hero.benefit3": "无需应用 — Telegram即可使用",
    
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
