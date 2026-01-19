import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

type LegalTab = "privacy" | "terms";

const Legal = () => {
  const [activeTab, setActiveTab] = useState<LegalTab>("privacy");
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xl font-black text-primary">QueueJoy</span>
            </button>
            
            {/* Tabs */}
            <div className="flex gap-2">
              <Button
                variant={activeTab === "privacy" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("privacy")}
                className="rounded-full"
              >
                <Shield className="w-4 h-4 mr-2" />
                {t("footer.privacy")}
              </Button>
              <Button
                variant={activeTab === "terms" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("terms")}
                className="rounded-full"
              >
                <FileText className="w-4 h-4 mr-2" />
                {t("footer.terms")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {activeTab === "privacy" ? (
          <PrivacyPolicy />
        ) : (
          <TermsOfService />
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} QueueJoy. All rights reserved.</p>
      </footer>
    </div>
  );
};

const PrivacyPolicy = () => {
  const { t, language } = useLanguage();

  const content = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: January 2026",
      sections: [
        {
          title: "1. Information We Collect",
          content: `We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.

• **Business Information**: Business name, slug, contact details
• **Queue Data**: Customer queue numbers, wait times, service metrics
• **Telegram Integration**: When you connect Telegram, we store your bot token to send notifications
• **Usage Data**: How you interact with our service`
        },
        {
          title: "2. How We Use Your Information",
          content: `We use the information we collect to:

• Provide, maintain, and improve our queue management services
• Send Telegram notifications to your customers
• Process your subscription payments
• Communicate with you about service updates
• Analyze usage patterns to improve our service`
        },
        {
          title: "3. Data Storage and Security",
          content: `Your data is stored securely using Firebase's infrastructure with encryption at rest and in transit. We implement industry-standard security measures to protect your information.

• All API keys and secrets are stored server-side only
• We never expose sensitive credentials to the client
• Regular security audits are performed`
        },
        {
          title: "4. Data Sharing",
          content: `We do not sell your personal information. We may share data with:

• **Service Providers**: Firebase, Stripe, Telegram for core functionality
• **Legal Requirements**: If required by law or to protect our rights`
        },
        {
          title: "5. Your Rights",
          content: `You have the right to:

• Access your personal data
• Correct inaccurate data
• Delete your account and associated data
• Export your data

Contact us at hello.queuejoy@gmail.com for any data requests.`
        },
        {
          title: "6. Contact Us",
          content: `If you have questions about this Privacy Policy, please contact us:

• Email: hello.queuejoy@gmail.com
• WhatsApp: 019-505-5266`
        }
      ]
    },
    ms: {
      title: "Dasar Privasi",
      lastUpdated: "Kemaskini Terakhir: Januari 2026",
      sections: [
        {
          title: "1. Maklumat Yang Kami Kumpul",
          content: `Kami mengumpul maklumat yang anda berikan secara langsung kepada kami, seperti apabila anda membuat akaun, menggunakan perkhidmatan kami, atau menghubungi kami untuk sokongan.

• **Maklumat Perniagaan**: Nama perniagaan, slug, maklumat hubungan
• **Data Giliran**: Nombor giliran pelanggan, masa menunggu, metrik perkhidmatan
• **Integrasi Telegram**: Apabila anda menyambungkan Telegram, kami menyimpan token bot anda untuk menghantar pemberitahuan
• **Data Penggunaan**: Bagaimana anda berinteraksi dengan perkhidmatan kami`
        },
        {
          title: "2. Bagaimana Kami Menggunakan Maklumat Anda",
          content: `Kami menggunakan maklumat yang dikumpul untuk:

• Menyediakan, mengekalkan, dan menambah baik perkhidmatan pengurusan giliran kami
• Menghantar pemberitahuan Telegram kepada pelanggan anda
• Memproses pembayaran langganan anda
• Berkomunikasi dengan anda tentang kemaskini perkhidmatan
• Menganalisis corak penggunaan untuk menambah baik perkhidmatan kami`
        },
        {
          title: "3. Penyimpanan dan Keselamatan Data",
          content: `Data anda disimpan dengan selamat menggunakan infrastruktur Firebase dengan penyulitan semasa rehat dan transit. Kami melaksanakan langkah keselamatan standard industri untuk melindungi maklumat anda.

• Semua kunci API dan rahsia disimpan di sisi pelayan sahaja
• Kami tidak pernah mendedahkan kelayakan sensitif kepada klien
• Audit keselamatan berkala dilaksanakan`
        },
        {
          title: "4. Perkongsian Data",
          content: `Kami tidak menjual maklumat peribadi anda. Kami mungkin berkongsi data dengan:

• **Penyedia Perkhidmatan**: Firebase, Stripe, Telegram untuk fungsi teras
• **Keperluan Undang-undang**: Jika dikehendaki oleh undang-undang atau untuk melindungi hak kami`
        },
        {
          title: "5. Hak Anda",
          content: `Anda mempunyai hak untuk:

• Mengakses data peribadi anda
• Membetulkan data yang tidak tepat
• Memadam akaun dan data yang berkaitan
• Mengeksport data anda

Hubungi kami di hello.queuejoy@gmail.com untuk sebarang permintaan data.`
        },
        {
          title: "6. Hubungi Kami",
          content: `Jika anda mempunyai soalan tentang Dasar Privasi ini, sila hubungi kami:

• Emel: hello.queuejoy@gmail.com
• WhatsApp: 019-505-5266`
        }
      ]
    },
    zh: {
      title: "隐私政策",
      lastUpdated: "最后更新：2026年1月",
      sections: [
        {
          title: "1. 我们收集的信息",
          content: `我们收集您直接提供给我们的信息，例如当您创建帐户、使用我们的服务或联系我们寻求支持时。

• **商业信息**：商家名称、slug、联系方式
• **排队数据**：客户排队号码、等待时间、服务指标
• **Telegram集成**：当您连接Telegram时，我们存储您的机器人令牌以发送通知
• **使用数据**：您如何与我们的服务互动`
        },
        {
          title: "2. 我们如何使用您的信息",
          content: `我们使用收集的信息来：

• 提供、维护和改进我们的排队管理服务
• 向您的客户发送Telegram通知
• 处理您的订阅付款
• 就服务更新与您沟通
• 分析使用模式以改进我们的服务`
        },
        {
          title: "3. 数据存储和安全",
          content: `您的数据使用Firebase的基础设施安全存储，具有静态和传输加密。我们实施行业标准安全措施来保护您的信息。

• 所有API密钥和秘密仅存储在服务器端
• 我们从不向客户端暴露敏感凭据
• 定期执行安全审计`
        },
        {
          title: "4. 数据共享",
          content: `我们不出售您的个人信息。我们可能与以下方共享数据：

• **服务提供商**：Firebase、Stripe、Telegram用于核心功能
• **法律要求**：如果法律要求或为保护我们的权利`
        },
        {
          title: "5. 您的权利",
          content: `您有权：

• 访问您的个人数据
• 更正不准确的数据
• 删除您的帐户和相关数据
• 导出您的数据

请联系 hello.queuejoy@gmail.com 提出任何数据请求。`
        },
        {
          title: "6. 联系我们",
          content: `如果您对本隐私政策有疑问，请联系我们：

• 电子邮件：hello.queuejoy@gmail.com
• WhatsApp：019-505-5266`
        }
      ]
    }
  };

  const currentContent = content[language] || content.en;

  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <h1 className="text-4xl font-black mb-2">{currentContent.title}</h1>
      <p className="text-muted-foreground mb-8">{currentContent.lastUpdated}</p>
      
      {currentContent.sections.map((section, idx) => (
        <section key={idx} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
          <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
            {section.content}
          </div>
        </section>
      ))}
    </article>
  );
};

const TermsOfService = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Terms of Service",
      lastUpdated: "Last Updated: January 2026",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content: `By accessing or using QueueJoy's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.`
        },
        {
          title: "2. Description of Service",
          content: `QueueJoy provides a cloud-based queue management system that includes:

• Virtual queue management for businesses
• Telegram integration for customer notifications
• Real-time queue status display
• Analytics dashboard for business insights
• Customization options for branding`
        },
        {
          title: "3. Subscription and Payment",
          content: `• **Pricing**: RM25/month per site
• **Billing**: Monthly recurring subscription via Stripe
• **Money-back Guarantee**: 30-day full refund if not satisfied
• **Cancellation**: Cancel anytime, no long-term contracts
• **Payment Methods**: Visa, MasterCard, and other cards supported by Stripe`
        },
        {
          title: "4. Acceptable Use",
          content: `You agree not to:

• Use the service for any illegal purpose
• Attempt to hack, disrupt, or exploit our systems
• Resell or redistribute the service without permission
• Use automated systems to abuse the service
• Upload malicious content or code`
        },
        {
          title: "5. Intellectual Property",
          content: `QueueJoy and its original content, features, and functionality are owned by QueueJoy and are protected by international copyright, trademark, and other intellectual property laws.`
        },
        {
          title: "6. Limitation of Liability",
          content: `QueueJoy shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.

We provide the service "as is" without warranties of any kind, either express or implied.`
        },
        {
          title: "7. Termination",
          content: `We may terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe:

• Violates these Terms
• Is harmful to other users or third parties
• Is fraudulent or illegal`
        },
        {
          title: "8. Changes to Terms",
          content: `We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through the service.`
        },
        {
          title: "9. Contact",
          content: `For questions about these Terms, please contact:

• Email: hello.queuejoy@gmail.com
• WhatsApp: 019-505-5266`
        }
      ]
    },
    ms: {
      title: "Terma Perkhidmatan",
      lastUpdated: "Kemaskini Terakhir: Januari 2026",
      sections: [
        {
          title: "1. Penerimaan Terma",
          content: `Dengan mengakses atau menggunakan perkhidmatan QueueJoy, anda bersetuju untuk terikat dengan Terma Perkhidmatan ini. Jika anda tidak bersetuju dengan terma ini, sila jangan gunakan perkhidmatan kami.`
        },
        {
          title: "2. Penerangan Perkhidmatan",
          content: `QueueJoy menyediakan sistem pengurusan giliran berasaskan awan yang termasuk:

• Pengurusan giliran maya untuk perniagaan
• Integrasi Telegram untuk pemberitahuan pelanggan
• Paparan status giliran masa nyata
• Papan pemuka analitik untuk wawasan perniagaan
• Pilihan penyesuaian untuk penjenamaan`
        },
        {
          title: "3. Langganan dan Pembayaran",
          content: `• **Harga**: RM25/bulan setiap tapak
• **Pengebilan**: Langganan bulanan berulang melalui Stripe
• **Jaminan Wang Kembali**: Pulangan penuh 30 hari jika tidak berpuas hati
• **Pembatalan**: Batal bila-bila masa, tiada kontrak jangka panjang
• **Kaedah Pembayaran**: Visa, MasterCard, dan kad lain yang disokong oleh Stripe`
        },
        {
          title: "4. Penggunaan yang Diterima",
          content: `Anda bersetuju untuk tidak:

• Menggunakan perkhidmatan untuk sebarang tujuan haram
• Cuba menggodam, mengganggu, atau mengeksploitasi sistem kami
• Menjual semula atau mengedar semula perkhidmatan tanpa kebenaran
• Menggunakan sistem automatik untuk menyalahgunakan perkhidmatan
• Memuat naik kandungan atau kod berbahaya`
        },
        {
          title: "5. Harta Intelek",
          content: `QueueJoy dan kandungan asal, ciri, dan fungsinya dimiliki oleh QueueJoy dan dilindungi oleh undang-undang hak cipta antarabangsa, tanda dagangan, dan harta intelek lain.`
        },
        {
          title: "6. Had Liabiliti",
          content: `QueueJoy tidak bertanggungjawab untuk sebarang kerosakan tidak langsung, sampingan, khas, akibat, atau punitif yang terhasil daripada penggunaan perkhidmatan anda.

Kami menyediakan perkhidmatan "seadanya" tanpa jaminan apa-apa jenis, sama ada tersurat atau tersirat.`
        },
        {
          title: "7. Penamatan",
          content: `Kami boleh menamatkan atau menggantung akaun dan akses anda kepada perkhidmatan dengan serta-merta, tanpa notis awal, untuk kelakuan yang kami percaya:

• Melanggar Terma ini
• Berbahaya kepada pengguna lain atau pihak ketiga
• Penipuan atau haram`
        },
        {
          title: "8. Perubahan kepada Terma",
          content: `Kami berhak untuk mengubah suai terma ini pada bila-bila masa. Kami akan memberitahu pengguna tentang perubahan ketara melalui e-mel atau melalui perkhidmatan.`
        },
        {
          title: "9. Hubungi",
          content: `Untuk soalan tentang Terma ini, sila hubungi:

• Emel: hello.queuejoy@gmail.com
• WhatsApp: 019-505-5266`
        }
      ]
    },
    zh: {
      title: "服务条款",
      lastUpdated: "最后更新：2026年1月",
      sections: [
        {
          title: "1. 条款接受",
          content: `通过访问或使用QueueJoy的服务，您同意受这些服务条款的约束。如果您不同意这些条款，请不要使用我们的服务。`
        },
        {
          title: "2. 服务描述",
          content: `QueueJoy提供基于云的排队管理系统，包括：

• 企业虚拟排队管理
• Telegram集成用于客户通知
• 实时排队状态显示
• 商业洞察分析仪表板
• 品牌定制选项`
        },
        {
          title: "3. 订阅和付款",
          content: `• **定价**：每站点每月RM25
• **计费**：通过Stripe月度循环订阅
• **退款保证**：30天全额退款（如不满意）
• **取消**：随时取消，无长期合同
• **付款方式**：Visa、MasterCard及Stripe支持的其他卡`
        },
        {
          title: "4. 可接受的使用",
          content: `您同意不：

• 将服务用于任何非法目的
• 尝试黑客攻击、破坏或利用我们的系统
• 未经许可转售或重新分发服务
• 使用自动化系统滥用服务
• 上传恶意内容或代码`
        },
        {
          title: "5. 知识产权",
          content: `QueueJoy及其原创内容、功能和特性由QueueJoy拥有，受国际版权、商标和其他知识产权法保护。`
        },
        {
          title: "6. 责任限制",
          content: `QueueJoy对因您使用服务而产生的任何间接、附带、特殊、后果性或惩罚性损害不承担责任。

我们"按原样"提供服务，不提供任何明示或暗示的保证。`
        },
        {
          title: "7. 终止",
          content: `对于我们认为以下行为，我们可能会立即终止或暂停您的帐户和服务访问权限，无需事先通知：

• 违反这些条款
• 对其他用户或第三方有害
• 欺诈或非法`
        },
        {
          title: "8. 条款变更",
          content: `我们保留随时修改这些条款的权利。我们将通过电子邮件或通过服务通知用户重大变更。`
        },
        {
          title: "9. 联系方式",
          content: `如对这些条款有疑问，请联系：

• 电子邮件：hello.queuejoy@gmail.com
• WhatsApp：019-505-5266`
        }
      ]
    }
  };

  const currentContent = content[language] || content.en;

  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <h1 className="text-4xl font-black mb-2">{currentContent.title}</h1>
      <p className="text-muted-foreground mb-8">{currentContent.lastUpdated}</p>
      
      {currentContent.sections.map((section, idx) => (
        <section key={idx} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
          <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
            {section.content}
          </div>
        </section>
      ))}
    </article>
  );
};

export default Legal;
