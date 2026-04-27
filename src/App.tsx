/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  LifeBuoy, 
  Server, 
  Layout, 
  Facebook, 
  Twitter, 
  Instagram, 
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Cpu,
  ShieldCheck,
  Zap,
  Send,
  Lock,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Turnstile from 'react-turnstile';
import { MailInput } from './components/MailInput';

// --- Types & Translations ---
type Language = 'tr' | 'en' | 'de';

const currentYear = new Date().getFullYear();

const translations = {
  tr: {
    nav: { home: 'Ana Sayfa', services: 'Hizmetler', about: 'Hakkımızda', contact: 'İletişim', offer: 'Teklif Al' },
    hero: { badge: 'Geleceğin Teknolojisi Bugün Burada', title1: 'Dijital Dünyada', title2: 'Güçlü', title3: 'İzler Bırakın.', desc: 'Yazılım, ağ ve güvenlik çözümlerimizle işletmenizi yarına hazırlıyoruz. Eker Bilişim profesyonel ekibiyle her adımda yanınızdayız.', cta1: 'Bizimle İletişime Geçin', cta2: 'Hizmetleri Gör' },
    services: { badge: 'Hizmetlerimiz', title: 'Teknolojiyi İhtiyacınıza Göre Şekillendiriyoruz', more: 'Detaylı Bilgi' },
    about: { badge: 'Hakkımızda', title: 'Geleceği Bugünün Teknolojisiyle İnşa Ediyoruz', p1: 'Eker Bilişim olarak, teknoloji dünyasındaki hızlı değişime ayak uydurmak yerine, değişimi yönetenler arasında yer alıyoruz.', p2: 'Her projeye butik ve çözüm odaklı yaklaşarak, işletmenizin gerçek potansiyelini dijital dünyaya yansıtıyoruz.', exp: 'Yıllık Deneyim', fastSupport: 'Hızlı Destek', secureInfra: 'Güvenilir Altyapı', more: 'Daha Fazla Bilgi' },
    cta: { title: 'Projenizi Başlatmaya Hazır mısınız?', p: 'Hemen bizimle iletişime geçin, işiniz için en uygun teknolojik çözümleri planlayalım.' },
    contact: { badge: 'İletişim', title: 'Bizimle Bağlantıda Kalın', desc: 'Soru ve talepleriniz için aşağıdaki formu doldurun. En kısa sürede size dönüş yapacağız.', labelName: 'Adınız Soyadınız', labelEmail: 'E-posta Adresiniz', labelSubject: 'Konu', labelMsg: 'Mesajınız', send: 'Mesajı Gönder', limitReached: 'Mesaj limitine ulaştınız. (Maks. 2)', success: 'Mesajınız başarıyla gönderildi!' },
    footer: { desc: 'Teknolojiyi erişilebilir ve verimli kılarak işletmelerin dijital hedeflerine ulaşmalarına yardımcı oluyoruz.', quickLinks: 'Hızlı Menü', subscribe: 'Bülten', placeholder: 'E-posta adresiniz', subButton: 'Abone Ol', rights: `© ${currentYear} Eker Bilişim. Tüm Hakları Saklıdır.` }
  },
  en: {
    nav: { home: 'Home', services: 'Services', about: 'About', contact: 'Contact', offer: 'Get Offer' },
    hero: { badge: 'Future Tech is Here Today', title1: 'Leave', title2: 'Strong', title3: 'Marks in Digital.', desc: 'We prepare your business for tomorrow with software, network and security solutions. Eker Bilişim is with you at every step.', cta1: 'Contact Us', cta2: 'View Services' },
    services: { badge: 'Our Services', title: 'Shaping Technology According to Your Needs', more: 'Learn More' },
    about: { badge: 'About Us', title: 'Building the Future with Today\'s Tech', p1: 'At Eker Bilişim, we are among those who manage change rather than just keeping up with it.', p2: 'We reflect your business\'s true potential to the digital world with a solutions-oriented approach.', exp: 'Years Experience', fastSupport: 'Fast Support', secureInfra: 'Secure Infra', more: 'More Info' },
    cta: { title: 'Ready to Start Your Project?', p: 'Contact us now, let\'s plan the most suitable tech solutions for your business.' },
    contact: { badge: 'Contact', title: 'Stay Connected With Us', desc: 'Fill out the form below for any questions or requests. We will get back to you soon.', labelName: 'Full Name', labelEmail: 'Email Address', labelSubject: 'Subject', labelMsg: 'Your Message', send: 'Send Message', limitReached: 'Message limit reached. (Max 2)', success: 'Your message has been sent successfully!' },
    footer: { desc: 'We help businesses reach their digital goals by making technology accessible and efficient.', quickLinks: 'Quick Menu', subscribe: 'Newsletter', placeholder: 'Your email address', subButton: 'Subscribe', rights: `© ${currentYear} Eker Bilişim. All Rights Reserved.` }
  },
  de: {
    nav: { home: 'Startseite', services: 'Dienste', about: 'Über uns', contact: 'Kontakt', offer: 'Angebot' },
    hero: { badge: 'Zukunftstechnologie Ist Heute Hier', title1: 'Hinterlassen Sie', title2: 'Starke', title3: 'Spuren Digital.', desc: 'Wir bereiten Ihr Unternehmen mit Software-, Netzwerk- und Sicherheitslösungen auf morgen vor. Eker Bilişim begleitet Sie bei jedem Schritt.', cta1: 'Kontaktieren Sie uns', cta2: 'Dienste sehen' },
    services: { badge: 'Unsere Dienste', title: 'Technologie nach Ihren Bedürfnissen gestalten', more: 'Mehr Details' },
    about: { badge: 'Über uns', title: 'Zukunft mit heutiger Technologie bauen', p1: 'Bei Eker Bilişim gehören wir zu denen, die den Wandel gestalten, anstatt nur mitzuhalten.', p2: 'Wir spiegeln das wahre Potenzial Ihres Unternehmens mit einem lösungsorientierten Ansatz wider.', exp: 'Jahre Erfahrung', fastSupport: 'Schneller Support', secureInfra: 'Sichere Infra', more: 'Mehr Info' },
    cta: { title: 'Bereit, Ihr Projekt zu starten?', p: 'Kontaktieren Sie uns jetzt, wir planen die passenden Lösungen für Sie.' },
    contact: { badge: 'Kontakt', title: 'Bleiben Sie mit uns in Verbindung', desc: 'Füllen Sie das untenstehende Formular aus. Wir melden uns in Kürze.', labelName: 'Vollständiger Name', labelEmail: 'E-Mail-Adresse', labelSubject: 'Betreff', labelMsg: 'Ihre Nachricht', send: 'Nachricht senden', limitReached: 'Nachrichtenlimit erreicht. (Max 2)', success: 'Ihre Nachricht wurde erfolgreich gesendet!' },
    footer: { desc: 'Wir helfen Unternehmen, ihre digitalen Ziele zu erreichen, indem wir Technologie zugänglich machen.', quickLinks: 'Quick-Menü', subscribe: 'Newsletter', placeholder: 'Deine E-Mail', subButton: 'Abonnieren', rights: `© ${currentYear} Eker Bilişim. Alle Rechte vorbehalten.` }
  }
};

const getServices = (t: any) => [
  { id: 'web', title: t.webTitle, desc: t.webShortDesc, fullDesc: t.webFullDesc, icon: <Layout className="w-8 h-8" /> },
  { id: 'app', title: t.appTitle, desc: t.appShortDesc, fullDesc: t.appFullDesc, icon: <Smartphone className="w-8 h-8" /> },
  { id: 'infra', title: t.infraTitle, desc: t.infraShortDesc, fullDesc: t.infraFullDesc, icon: <ShieldCheck className="w-8 h-8" /> },
  { id: 'support', title: t.supportTitle, desc: t.supportShortDesc, fullDesc: t.supportFullDesc, icon: <LifeBuoy className="w-8 h-8" /> },
  { id: 'server', title: t.serverTitle, desc: t.serverShortDesc, fullDesc: t.serverFullDesc, icon: <Server className="w-8 h-8" /> },
  { id: 'security', title: t.secureTitle, desc: t.secureShortDesc, fullDesc: t.secureFullDesc, icon: <ShieldCheck className="w-8 h-8" /> },
];

const serviceLocales = {
  tr: { 
    webTitle: 'Web Sitesi Kurulumu', 
    webShortDesc: 'Modern ve hızlı web siteleri tasarlıyoruz.',
    webFullDesc: 'Web sitesi sahibi olmak günümüzde işletmeler için bir zorunluluktur. Eker Bilişim olarak, kullanıcı deneyimi odaklı, hızlı ve SEO dostu web siteleri geliştiriyoruz. Web sitenizin temel taşı olan Alan Adı (Domain) konusunda, güvenilirliğiniz için sadece sektörün devleri ile çalışmanızı öneriyoruz. Önerdiğimiz Global firmalar: GoDaddy, Namecheap, Cloudflare, Google Domains. Önerdiğimiz Yerel firmalar: Natro, Turhost, IHS, Metunic.',
    appTitle: 'Uygulama Geliştirme', 
    appShortDesc: 'iOS, Android ve karmaşık kurumsal çözümler.',
    appFullDesc: 'Şirketinizin ihtiyaçlarına özel mobil ve masaüstü uygulamalar geliştiriyoruz. Sadece iOS ve Android değil, en karmaşık kurumsal yazılım ihtiyaçlarınıza kadar geniş bir yelpazede, ölçeklenebilir ve performanslı çözümler inşa ediyoruz.',
    infraTitle: 'Altyapı & Güvenlik', 
    infraShortDesc: 'Evlerden karmaşık kurumsal yapılara altyapı çözümleri.',
    infraFullDesc: 'Hem bireysel kullanıcılar hem de büyük ölçekli işletmeler için kapsamlı altyapı hizmetleri sunuyoruz. Ev içi ağ kurulumlarından, karmaşık kurumsal veri merkezlerine ve gelişmiş güvenlik duvarı yapılandırmalarına kadar her ölçekte yanınızdayız.',
    supportTitle: 'Teknik Destek', 
    supportShortDesc: 'Hızlı ve profesyonel teknik servis.',
    supportFullDesc: 'Eker Bilişim olarak geniş iş ortağı ağımızla birlikte, donanım ve yazılım sorunlarınıza en hızlı ve profesyonel çözümleri sunuyoruz. Uzman ekibimiz ve çözüm ortaklarımızla birlikte, iş akışınızın aksamaması için profesyonel destek sağlıyoruz.',
    serverTitle: 'Kurulum Hizmetleri', 
    serverShortDesc: 'Fiziksel, bulut ve donanım kurulum hizmetleri.',
    serverFullDesc: 'Fiziksel ve bulut sunucu kurulumlarının yanı sıra; kamera sistemleri, güvenlik sistemleri, modem ve ağ cihazları gibi donanımların uçtan uca kurulumunu gerçekleştiriyoruz. Müşterilerimize ait fiziksel sunucuların konfigürasyon ve yönetim süreçlerinde profesyonel çözümler sunuyoruz.',
    secureTitle: 'Siber Güvenlik',
    secureShortDesc: 'Hızlı, kolay ve güvenli siber güvenlik çözümleri.',
    secureFullDesc: 'Bireysel ihtiyaçlardan karmaşık kurumsal yapılara kadar her türlü dijital varlığınızı koruyoruz. Sızma testleri, güvenlik analizleri ve modern koruma sistemlerimizle siber tehditlere karşı hızlı, kolay ve tam güvenli çözümler sunuyoruz.'
  },
  en: { 
    webTitle: 'Web Setup', 
    webShortDesc: 'We design modern and fast websites.',
    webFullDesc: 'Having a website is a must for businesses today. We develop fast and SEO-friendly websites focusing on user experience. For your domain registration, we recommend working with industry giants for maximum reliability. Global recommendations: GoDaddy, Namecheap, Cloudflare, Google Domains. Depending on your region, we also recommend major local registrars like Natro or Turhost for local support.',
    appTitle: 'App Development', 
    appShortDesc: 'iOS, Android, and complex enterprise solutions.',
    appFullDesc: 'We develop custom applications tailored to your business needs. From iOS and Android apps to high-complexity enterprise software, we build scalable and high-performance solutions for diverse requirements.',
    infraTitle: 'Infra & Security', 
    infraShortDesc: 'Infrastructure solutions from private homes to complex business needs.',
    infraFullDesc: 'We provide comprehensive infrastructure services for both residential users and large-scale enterprises. From home network setups to complex corporate data centers and advanced firewall configurations, we support you at every scale.',
    supportTitle: 'Technical Support', 
    supportShortDesc: 'Fast and professional technical service.',
    supportFullDesc: 'At Eker Bilişim, working alongside our extensive network of business partners, we provide the fastest and most professional solutions for your hardware and software needs. Together with our partners, we ensure your workflow remains uninterrupted.',
    serverTitle: 'Installation Services', 
    serverShortDesc: 'Physical, cloud, and hardware installation services.',
    serverFullDesc: 'In addition to physical and cloud server installations, we provide end-to-end setup for cameras, security systems, and network devices like modems. We also offer professional configuration and management for physical servers provided by our clients.',
    secureTitle: 'Cyber Security',
    secureShortDesc: 'Fast, easy and secure cyber security solutions.',
    secureFullDesc: 'We provide cyber security solutions tailored for all needs, including individual requirements. Our services ensure your digital assets are protected against threats with a focus on being fast, easy to implement, and ultra-secure.'
  },
  de: { 
    webTitle: 'Web-Installation', 
    webShortDesc: 'Wir entwerfen moderne und schnelle Websites.',
    webFullDesc: 'Eine Website ist heute für Unternehmen unverzichtbar. Wir entwickeln schnelle und SEO-freundliche Websites mit Fokus auf Benutzererfahrung. Für Ihre Domain-Registrierung empfehlen wir die Zusammenarbeit mit Branchenriesen für maximale Zuverlässigkeit. Globale Empfehlungen: GoDaddy, Namecheap, Cloudflare, Google Domains. Wir empfehlen auch große lokale Registrare in Ihrer Region.',
    appTitle: 'App-Entwicklung', 
    appShortDesc: 'iOS, Android und komplexe Unternehmenslösungen.',
    appFullDesc: 'Wir entwickeln maßgeschneiderte Anwendungen für Ihre geschäftlichen Anforderungen. Von iOS- und Android-Apps bis hin zu hochkomplexer Unternehmenssoftware bauen wir skalierbare und leistungsstarke Lösungen für vielfältige Anforderungen.',
    infraTitle: 'Infra & Sicherheit', 
    infraShortDesc: 'Infrastrukturlösungen vom Privathaus bis zum komplexen Unternehmen.',
    infraFullDesc: 'Wir bieten umfassende Infrastrukturdienstleistungen sowohl für Privatnutzer als auch für Großunternehmen an. Von der Heimnetzwerkeinrichtung bis hin zu komplexen Unternehmensrechenzentren und fortschrittlichen Firewall-Konfigurationen unterstützen wir Sie in jeder Größenordnung.',
    supportTitle: 'Technischer Support', 
    supportShortDesc: 'Schneller und professioneller technischer Service.',
    supportFullDesc: 'Eker Bilişim bietet in Zusammenarbeit mit unseren zahlreichen Geschäftspartnern schnelle und professionelle Lösungen für Ihre Hard- und Softwareprobleme. Gemeinsam mit unseren Partnern garantieren wir einen reibungslosen Workflow.',
    serverTitle: 'Installationsdienste', 
    serverShortDesc: 'Physische, Cloud- und Hardware-Installationsdienste.',
    serverFullDesc: 'Neben physischen und Cloud-Server-Installationen bieten wir die End-to-End-Einrichtung von Kameras, Sicherheitssystemen und Netzwerkgeräten wie Modems an. Wir bieten auch professionelle Konfiguration und Verwaltung für physische Server unserer Kunden an.',
    secureTitle: 'Cyber-Sicherheit',
    secureShortDesc: 'Schnelle, einfache und sichere Cybersicherheitslösungen.',
    secureFullDesc: 'Wir bieten Cybersicherheitslösungen für alle Bedürfnisse, einschließlich individueller Anforderungen. Wir schützen Ihre digitalen Assets schnell, einfach und sicher vor Bedrohungen.'
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('eker_lang') as Language;
      if (saved && ['tr', 'en', 'de'].includes(saved)) return saved;
      
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('tr')) return 'tr';
      if (browserLang.startsWith('de')) return 'de';
      return 'en';
    }
    return 'tr';
  });

  useEffect(() => {
    localStorage.setItem('eker_lang', lang);
  }, [lang]);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('eker_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [isSent, setIsSent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAADD5YIGWCSyNrXcD';

  const t = translations[lang];
  const s = getServices(serviceLocales[lang]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Initial message count from localStorage
    const savedCount = localStorage.getItem('eker_message_count');
    if (savedCount) {
      setMessageCount(parseInt(savedCount, 10));
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Apply theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      document.body.style.backgroundColor = '#020617'; // slate-950 matches dark:bg-slate-950
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
      document.body.style.backgroundColor = '#ffffff'; // Ensure white background
    }
    localStorage.setItem('eker_theme', theme);
  }, [theme]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      alert(lang === 'tr' ? 'Lütfen robot olmadığınızı doğrulayın.' : (lang === 'de' ? 'Bitte bestätigen Sie, dass Sie kein Roboter sind.' : 'Please verify that you are not a robot.'));
      return;
    }

    if (messageCount >= 2) {
      alert(t.contact.limitReached);
      return;
    }

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Add some metadata for FormSubmit
    const payload = {
      ...data,
      _subject: `Yeni İletişim Formu Mesajı: ${data.subject}`,
      _template: 'table',
      _captcha: 'false', // We use Turnstile instead
      'Turnstile-Token': turnstileToken
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/ugure47@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const nextCount = messageCount + 1;
        setMessageCount(nextCount);
        localStorage.setItem('eker_message_count', nextCount.toString());
        setIsSent(true);
        alert(t.contact.success);
        form.reset();
        setTurnstileToken(null);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error(error);
      alert(lang === 'tr' ? 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.' : (lang === 'de' ? 'Ein Fehler ist aufgetreten, bitte versuchen Sie es später erneut.' : 'An error occurred, please try again later.'));
    }
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-blue-600/30">
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-slate-900/95 border-slate-100 dark:border-slate-800' + ' backdrop-blur-md py-4 shadow-sm border-b' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="bg-blue-600 overflow-hidden rounded-xl group-hover:scale-105 transition-transform w-[50px] h-[50px]">
              <img src="https://i.ibb.co/dwKTmdHD/Logo-arkaplanl-Photoroom.png" alt="Eker Bilişim Logo" className="w-full h-full object-cover" />
            </div>
            <span className={`text-xl font-bold tracking-tight underline decoration-blue-600 decoration-2 underline-offset-4 text-slate-900 dark:text-white`}>
              Eker <span className="text-blue-600">Bilişim</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {Object.entries(t.nav).slice(0, 4).map(([key, name]) => (
              <a 
                key={key} 
                href={`#${key === 'home' ? 'home' : key}`} 
                className="text-sm font-semibold uppercase tracking-widest transition-colors hover:text-blue-600 text-slate-600 dark:text-slate-300"
              >
                {name}
              </a>
            ))}
            
            <div className="flex items-center gap-3 ml-4 border-l border-slate-300/30 dark:border-slate-700/50 pl-6">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mr-2"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              {/* Language Dropdown PC */}
              <div 
                className="relative group"
                onMouseEnter={() => setLangDropdownOpen(true)}
                onMouseLeave={() => setLangDropdownOpen(false)}
              >
                <button 
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold rounded-xl uppercase transition-all bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  {lang}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {langDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden py-1 z-[60]"
                    >
                      {(['tr', 'en', 'de'] as Language[]).map((l) => (
                        <button 
                          key={l}
                          onClick={() => {
                            setLang(l);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-[10px] font-bold uppercase text-left transition-all ${lang === l ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-300'}`}
                        >
                          {l === 'tr' ? 'Türkçe' : l === 'en' ? 'English' : 'Deutsch'}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="#contact" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95">
                {t.nav.offer}
              </a>
            </div>
          </div>

          <button className="md:hidden p-2 text-blue-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 border-t shadow-xl overflow-hidden p-6 md:hidden flex flex-col gap-4 text-slate-900 dark:text-white"
            >
              {Object.entries(t.nav).slice(0, 4).map(([key, name]) => (
                <a key={key} href={`#${key}`} className="text-lg font-medium hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>{name}</a>
              ))}
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <button 
                    onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold uppercase text-slate-600 dark:text-slate-300"
                  >
                    <span className="flex items-center gap-2">
                      {lang === 'tr' ? 'Türkçe' : lang === 'en' ? 'English' : 'Deutsch'}
                    </span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {langDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl mt-2 overflow-hidden shadow-lg"
                      >
                        {(['tr', 'en', 'de'] as Language[]).map((l) => (
                          <button 
                            key={l}
                            onClick={() => {
                              setLang(l);
                              setLangDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-3 text-xs font-bold uppercase text-left transition-all ${lang === l ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 dark:hover:bg-blue-800 text-slate-600 dark:text-slate-300 border-b border-slate-50 dark:border-slate-800 last:border-0'}`}
                          >
                            {l === 'tr' ? 'Türkçe' : l === 'en' ? 'English' : 'Deutsch'}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section id="home" className="relative pt-32 pb-20 overflow-hidden min-h-[95vh] flex items-center transition-colors bg-white dark:bg-slate-950">
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
           <div className="absolute top-0 -left-20 w-[45rem] h-[45rem] bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-[130px] animate-pulse"></div>
           <div className="absolute bottom-0 -right-20 w-[35rem] h-[35rem] bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-[110px] animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-3/5">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-block py-1.5 px-4 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full mb-6 uppercase tracking-widest border border-blue-200"
              >
                {t.hero.badge}
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-[6.5rem] font-black leading-[0.95] mb-8 font-display text-slate-900 dark:text-white"
              >
                {t.hero.title1} <br />
                <span className="text-blue-600">{t.hero.title2}</span> {t.hero.title3}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl max-w-xl mb-12 leading-relaxed text-slate-600 dark:text-slate-400"
              >
                {t.hero.desc}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-blue-700 hover:translate-y-[-2px] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
                  {t.hero.cta1} <ArrowRight />
                </a>
                <a href="#services" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 px-10 py-4 rounded-2xl font-black text-lg transition-all active:scale-95 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700">
                  {t.hero.cta2}
                </a>
              </motion.div>
            </div>

            <div className="hidden lg:grid w-2/5 grid-cols-2 gap-4">
              {s.slice(0, 4).map((srv, idx) => (
                <motion.a 
                  key={srv.id} 
                  href="#services"
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ delay: 0.8 + (idx * 0.1) }}
                  className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white rounded-3xl shadow-sm hover:border-blue-600/30 transition-all group cursor-pointer hover:shadow-lg hover:-translate-y-1 block"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors bg-blue-50 dark:bg-blue-900/20 text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                    {srv.icon}
                  </div>
                  <h3 className="font-black text-xs uppercase tracking-widest">{srv.title}</h3>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-4">{t.services.badge}</h2>
            <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tight font-display text-slate-900 dark:text-white">{t.services.title}</h3>
            <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {s.map((srv, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="p-10 bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 rounded-3xl transition-all shadow-sm hover:shadow-2xl hover:border-blue-600/30">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-md bg-blue-50/50 dark:bg-blue-900/20 text-blue-600">
                  {srv.icon}
                </div>
                <h4 className="text-xl font-black mb-4 font-display text-slate-900 dark:text-white">{srv.title}</h4>
                <p className="text-sm leading-relaxed mb-8 text-slate-500 dark:text-slate-400">
                  {srv.desc}
                </p>
                <button 
                  onClick={() => setSelectedService(srv)}
                  className="text-xs font-black text-blue-600 uppercase tracking-widest underline underline-offset-8 decoration-blue-200 hover:decoration-blue-600 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  {t.services.more} <ChevronRight size={14}/>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 transition-colors bg-slate-50/50 dark:bg-slate-900/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" className="rounded-[3rem] shadow-2xl relative z-10 hover:shadow-blue-200/50 dark:hover:shadow-blue-900/50 transition-all duration-700" alt="Team" />
              <div className="absolute -bottom-10 -right-10 bg-blue-600 text-white p-8 rounded-[2rem] shadow-2xl z-20 hidden md:block">
                <span className="text-5xl font-black block">10+</span>
                <span className="text-[10px] uppercase font-black tracking-widest opacity-80">{t.about.exp}</span>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-4">{t.about.badge}</h2>
              <h3 className="text-3xl md:text-5xl font-black mb-8 leading-[1.1] font-display text-slate-900 dark:text-white">{t.about.title}</h3>
              <p className="text-lg mb-6 leading-relaxed text-slate-700 dark:text-slate-300">{t.about.p1}</p>
              <p className="mb-10 leading-relaxed text-slate-600 dark:text-slate-400">{t.about.p2}</p>
              
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="flex gap-4">
                  <Zap className="text-blue-600 shrink-0" />
                  <div><h5 className="font-black text-sm uppercase text-slate-900 dark:text-white">{t.about.fastSupport}</h5><p className="text-xs text-slate-500 dark:text-slate-400">7/24 Teknik destek</p></div>
                </div>
                <div className="flex gap-4">
                  <ShieldCheck className="text-blue-600 shrink-0" />
                  <div><h5 className="font-black text-sm uppercase text-slate-900 dark:text-white">{t.about.secureInfra}</h5><p className="text-xs text-slate-500 dark:text-slate-400">Maksimum güvenlik</p></div>
                </div>
              </div>
              <a href="#contact" className="bg-blue-600 text-white px-10 py-4 rounded-full font-black hover:bg-blue-700 transition-all shadow-lg inline-flex items-center gap-2">{t.about.more} <ArrowRight /></a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-blue-600 border-y border-blue-500">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl md:text-6xl font-black text-white mb-8 font-display">{t.cta.title}</h3>
          <p className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto">{t.cta.p}</p>
          <div className="flex justify-center">
            <a href="#contact" className="px-12 py-5 bg-white text-blue-600 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl active:scale-95">
              {t.nav.offer} <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-40 transition-colors bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-4">{t.contact.badge}</h2>
            <h3 className="text-4xl md:text-6xl font-black mb-8 font-display text-slate-900 dark:text-white">{t.contact.title}</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400">{t.contact.desc}</p>
          </div>
          
          <div className="w-full">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border-slate-50 dark:border-slate-800 border-2 p-10 md:p-16 rounded-[4rem] space-y-10 shadow-2xl shadow-slate-100 dark:shadow-none transition-colors">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">{t.contact.labelName}</label>
                  <input name="name" required type="text" className="w-full bg-transparent border-b-2 border-slate-50 dark:border-slate-800 focus:border-blue-600 py-4 transition-all outline-none font-bold text-xl text-slate-900 dark:text-white" />
                </div>
                <MailInput name="email" label={t.contact.labelEmail} required />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">{t.contact.labelSubject}</label>
                <input name="subject" required type="text" className="w-full bg-transparent border-b-2 border-slate-50 dark:border-slate-800 focus:border-blue-600 py-4 transition-all outline-none font-bold text-xl text-slate-900 dark:text-white" />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">{t.contact.labelMsg}</label>
                <textarea name="message" required rows={4} className="w-full bg-transparent border-b-2 border-slate-50 dark:border-slate-800 focus:border-blue-600 py-4 transition-all outline-none font-bold text-xl text-slate-900 dark:text-white resize-none" />
              </div>

              {/* Turnstile Captcha - Inconspicuous container */}
              <div className="flex justify-center py-2 h-16">
                <Turnstile
                  sitekey={turnstileSiteKey}
                  onVerify={(token) => setTurnstileToken(token)}
                  theme={theme}
                  appearance="interaction-only"
                />
              </div>

              <button 
                type="submit" 
                disabled={messageCount >= 2}
                className="w-full bg-blue-600 text-white font-black py-6 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 text-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {messageCount >= 2 ? t.contact.limitReached : <>{t.contact.send} <Send size={20} /></>}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="transition-colors bg-white dark:bg-slate-900 border-t border-slate-50 dark:border-slate-800 text-slate-900 dark:text-slate-100 py-32 rounded-t-[5rem]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-24 mb-24">
            <div className="space-y-8">
               <a href="#home" className="flex items-center gap-3 group">
                <div className="bg-blue-600 overflow-hidden rounded-xl w-[60px] h-[60px]">
                  <img src="https://i.ibb.co/dwKTmdHD/Logo-arkaplanl-Photoroom.png" alt="Eker Bilişim" className="w-full h-full object-cover" />
                </div>
                <span className="text-3xl font-black tracking-tighter underline decoration-blue-600 decoration-4 underline-offset-[12px] text-slate-900 dark:text-white">Eker <span className="text-blue-600">Bilişim</span></span>
              </a>
              <p className="text-lg font-medium leading-relaxed max-w-sm text-slate-500 dark:text-slate-400">{t.footer.desc}</p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all text-slate-400 hover:text-white shadow-sm hover:shadow-lg"><Facebook size={20}/></a>
                <a href="#" className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all text-slate-400 hover:text-white shadow-sm hover:shadow-lg"><Twitter size={20}/></a>
                <a href="#" className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all text-slate-400 hover:text-white shadow-sm hover:shadow-lg"><Instagram size={20}/></a>
              </div>
            </div>
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-10">{t.footer.quickLinks}</h5>
              <ul className="grid grid-cols-2 gap-y-6 gap-x-12 text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {Object.entries(t.nav).slice(0, 4).map(([key, name]) => (
                  <li key={key}><a href={`#${key}`} className="hover:text-blue-600 transition-colors">{name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-10">{t.footer.subscribe}</h5>
              <div className="relative group">
                <input type="email" placeholder={t.footer.placeholder} className="w-full bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 border-2 rounded-[1.5rem] px-8 py-5 text-sm focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 font-bold text-slate-900 dark:text-white" />
                <button className="absolute right-3 top-3 bg-blue-600 p-2.5 rounded-[1rem] shadow-xl hover:bg-blue-700 transition-all text-white"><ArrowRight size={22}/></button>
              </div>
            </div>
          </div>
          <div className="pt-16 border-t border-slate-200 dark:border-slate-800 flex flex-col md:row justify-between items-center gap-8 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
            <p className="opacity-80">{t.footer.rights}</p>
            <div className="flex gap-12">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Legal Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-blue-600 transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="p-12 md:p-16 text-slate-900 dark:text-white">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-10 shadow-xl bg-blue-600 text-white">
                  {React.cloneElement(selectedService.icon as React.ReactElement, { className: "w-10 h-10" })}
                </div>
                
                <h4 className="text-3xl md:text-5xl font-black mb-8 tracking-tight font-display">
                  {selectedService.title}
                </h4>
                
                <div className="space-y-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                  {selectedService.fullDesc.split('\n').map((para: string, idx: number) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                <div className="mt-12 pt-12 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-6">
                  <a 
                    href="#contact" 
                    onClick={() => setSelectedService(null)}
                    className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-center hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
                  >
                    {t.nav.offer}
                  </a>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-10 py-5 rounded-2xl font-black hover:bg-slate-100 dark:hover:bg-slate-700 transition-all active:scale-95 text-center"
                  >
                    {lang === 'tr' ? 'Kapat' : lang === 'en' ? 'Close' : 'Schließen'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
