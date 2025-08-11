"use client";

import React, { useState, useEffect } from 'react';

const KlyBank = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'tr' | 'en'>('tr');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Number counter animation
  const animateCounter = (elementId: string, targetValue: number, suffix: string = '') => {
    const element = document.getElementById(elementId);
    if (!element) return;

    let currentValue = 0;
    const increment = targetValue / 100;
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(timer);
      }
      element.textContent = Math.floor(currentValue).toLocaleString('tr-TR') + suffix;
    }, 20);
  };

  // Start animations when component loads
  useEffect(() => {
    const timeout = setTimeout(() => {
      animateCounter('customers', 250000, '+');
      animateCounter('branches', 150, '+');
      animateCounter('atms', 500, '+');
      animateCounter('satisfaction', 98, '%');
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  // Add scroll effect to navigation
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        if (window.scrollY > 100) {
          nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
          nav.style.backdropFilter = 'blur(10px)';
        } else {
          nav.style.backgroundColor = 'white';
          nav.style.backdropFilter = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lang: 'tr' | 'en') => {
    setCurrentLanguage(lang);
    const elements = document.querySelectorAll<HTMLElement>('[data-tr][data-en]');

    elements.forEach(element => {
      const trText = element.getAttribute('data-tr');
      const enText = element.getAttribute('data-en');

      if (lang === 'tr' && trText) {
        element.textContent = trText;
      } else if (lang === 'en' && enText) {
        element.textContent = enText;
      }
    });

    setShowLanguageDropdown(false);
  };

  const getText = (tr: string, en: string) => {
    return currentLanguage === 'tr' ? tr : en;
  };

  return (
    <div className="bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
            font-family: 'Inter', sans-serif;
        }
        
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .card-hover {
            transition: all 0.3s ease;
        }
        
        .card-hover:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .float-animation {
            animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        .pulse-animation {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        
        .slide-in {
            animation: slideIn 0.8s ease-out;
        }
        
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .number-counter {
            font-variant-numeric: tabular-nums;
        }
      `}</style>

      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/">
                  <img
                    src="/logoo.jpg"
                    alt="KLY-BANK Logo"
                    className="h-10 w-auto"
                  />
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors" data-tr="Ana Sayfa" data-en="Home">
                  {getText("Ana Sayfa", "Home")}
                </a>
                <a href="/urunler" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors" data-tr="Hizmetler" data-en="Services">
                  {getText("Hizmetler", "Services")}
                </a>
                <a href="/credi" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors" data-tr="Krediler" data-en="Loans">
                  {getText("Krediler", "Loans")}
                </a>
                <a href="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors" data-tr="İletişim" data-en="Contact">
                  {getText("İletişim", "Contact")}
                </a>
                <div className="relative inline-block">
                  <button
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {currentLanguage === 'tr' ? '🇹🇷 TR' : '🇺🇸 EN'}
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  {showLanguageDropdown && (
                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50">
                      <button
                        onClick={() => changeLanguage('tr')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        🇹🇷 Türkçe
                      </button>
                      <button
                        onClick={() => changeLanguage('en')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        🇺🇸 English
                      </button>
                    </div>
                  )}
                </div>
                <button className="gradient-bg text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity" data-tr="Giriş Yap" data-en="Login">
                  {getText("Giriş Yap", "Login")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-bg pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="slide-in">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                <span data-tr="Geleceğin" data-en="Future of">{getText("Geleceğin", "Future of")}</span> <br />
                <span className="text-yellow-300" data-tr="Bankacılığı" data-en="Banking">{getText("Bankacılığı", "Banking")}</span>
              </h1>
              <p className="text-xl text-white/90 mb-8" data-tr="KLY-BANK ile modern bankacılığın keyfini çıkarın. Güvenli, hızlı ve kullanıcı dostu dijital bankacılık deneyimi." data-en="Enjoy modern banking with KLY-BANK. Secure, fast and user-friendly digital banking experience.">
                {getText(
                  "KLY-BANK ile modern bankacılığın keyfini çıkarın. Güvenli, hızlı ve kullanıcı dostu dijital bankacılık deneyimi.",
                  "Enjoy modern banking with KLY-BANK. Secure, fast and user-friendly digital banking experience."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors" data-tr="Hesap Aç" data-en="Open Account">
                  {getText("Hesap Aç", "Open Account")}
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors" data-tr="Daha Fazla Bilgi" data-en="Learn More">
                  {getText("Daha Fazla Bilgi", "Learn More")}
                </button>
              </div>
            </div>
            <div className="float-animation">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="text-6xl mb-4">💳</div>
                  <h3 className="text-2xl font-bold text-white mb-4" data-tr="Dijital Kart" data-en="Digital Card">
                    {getText("Dijital Kart", "Digital Card")}
                  </h3>
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-left">
                    <div className="text-white/80 text-sm mb-2">KLY-BANK</div>
                    <div className="text-white font-mono text-lg mb-4">**** **** **** 1234</div>
                    <div className="flex justify-between text-white/80 text-sm">
                      <span>KADİR ARICI</span>
                      <span>12/28</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 number-counter" id="customers">0</div>
              <div className="text-gray-600 mt-2" data-tr="Müşteri" data-en="Customers">
                {getText("Müşteri", "Customers")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 number-counter" id="branches">0</div>
              <div className="text-gray-600 mt-2" data-tr="Şube" data-en="Branches">
                {getText("Şube", "Branches")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 number-counter" id="atms">0</div>
              <div className="text-gray-600 mt-2" data-tr="ATM" data-en="ATMs">
                {getText("ATM", "ATMs")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 number-counter" id="satisfaction">0</div>
              <div className="text-gray-600 mt-2" data-tr="Memnuniyet" data-en="Satisfaction">
                {getText("Memnuniyet", "Satisfaction")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" data-tr="Hizmetlerimiz" data-en="Our Services">
              {getText("Hizmetlerimiz", "Our Services")}
            </h2>
            <p className="text-xl text-gray-600" data-tr="Size özel bankacılık çözümleri" data-en="Personalized banking solutions for you">
              {getText("Size özel bankacılık çözümleri", "Personalized banking solutions for you")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 card-hover">
              <div className="text-5xl mb-6">🏠</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4" data-tr="Konut Kredisi" data-en="Home Loan">
                {getText("Konut Kredisi", "Home Loan")}
              </h3>
              <p className="text-gray-600 mb-6" data-tr="Hayalinizdeki eve kavuşmanız için uygun faizli konut kredisi seçenekleri." data-en="Affordable home loan options to help you get your dream home.">
                {getText(
                  "Hayalinizdeki eve kavuşmanız için uygun faizli konut kredisi seçenekleri.",
                  "Affordable home loan options to help you get your dream home."
                )}
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors" data-tr="Detayları Gör →" data-en="View Details →">
                {getText("Detayları Gör →", "View Details →")}
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 card-hover">
              <div className="text-5xl mb-6">🚗</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4" data-tr="Taşıt Kredisi" data-en="Auto Loan">
                {getText("Taşıt Kredisi", "Auto Loan")}
              </h3>
              <p className="text-gray-600 mb-6" data-tr="Yeni aracınız için avantajlı faiz oranları ve esnek ödeme seçenekleri." data-en="Advantageous interest rates and flexible payment options for your new vehicle.">
                {getText(
                  "Yeni aracınız için avantajlı faiz oranları ve esnek ödeme seçenekleri.",
                  "Advantageous interest rates and flexible payment options for your new vehicle."
                )}
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors" data-tr="Detayları Gör →" data-en="View Details →">
                {getText("Detayları Gör →", "View Details →")}
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 card-hover">
              <div className="text-5xl mb-6">💰</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4" data-tr="Yatırım" data-en="Investment">
                {getText("Yatırım", "Investment")}
              </h3>
              <p className="text-gray-600 mb-6" data-tr="Paranızı değerlendirin, geleceğinizi güvence altına alın." data-en="Invest your money and secure your future.">
                {getText(
                  "Paranızı değerlendirin, geleceğinizi güvence altına alın.",
                  "Invest your money and secure your future."
                )}
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors" data-tr="Detayları Gör →" data-en="View Details →">
                {getText("Detayları Gör →", "View Details →")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6" data-tr="KLY-BANK Mobil" data-en="KLY-BANK Mobile">
                {getText("KLY-BANK Mobil", "KLY-BANK Mobile")}
              </h2>
              <p className="text-xl text-gray-600 mb-8" data-tr="Bankacılık işlemlerinizi istediğiniz zaman, istediğiniz yerden yapın. Güvenli ve kullanıcı dostu mobil uygulamamızla." data-en="Do your banking transactions anytime, anywhere. With our secure and user-friendly mobile application.">
                {getText(
                  "Bankacılık işlemlerinizi istediğiniz zaman, istediğiniz yerden yapın. Güvenli ve kullanıcı dostu mobil uygulamamızla.",
                  "Do your banking transactions anytime, anywhere. With our secure and user-friendly mobile application."
                )}
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="text-2xl mr-4">✅</div>
                  <span className="text-gray-700" data-tr="7/24 Para Transferi" data-en="24/7 Money Transfer">
                    {getText("7/24 Para Transferi", "24/7 Money Transfer")}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="text-2xl mr-4">✅</div>
                  <span className="text-gray-700" data-tr="Fatura Ödeme" data-en="Bill Payment">
                    {getText("Fatura Ödeme", "Bill Payment")}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="text-2xl mr-4">✅</div>
                  <span className="text-gray-700" data-tr="Yatırım Takibi" data-en="Investment Tracking">
                    {getText("Yatırım Takibi", "Investment Tracking")}
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  📱 App Store
                </button>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  📱 Google Play
                </button>
              </div>
            </div>
            <div className="pulse-animation">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
                <div className="text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <h3 className="text-2xl font-bold mb-4">KLY-BANK</h3>
                  <div className="bg-white/20 rounded-2xl p-6 mb-4">
                    <div className="text-left space-y-3">
                      <div className="flex justify-between">
                        <span data-tr="Hesap Bakiyesi" data-en="Account Balance">
                          {getText("Hesap Bakiyesi", "Account Balance")}
                        </span>
                        <span className="font-bold">₺15,750.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span data-tr="Son İşlem" data-en="Last Transaction">
                          {getText("Son İşlem", "Last Transaction")}
                        </span>
                        <span className="text-green-300">+₺500.00</span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold" data-tr="Para Gönder" data-en="Send Money">
                    {getText("Para Gönder", "Send Money")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">KLY-BANK</h3>
              <p className="text-gray-400" data-tr="Güvenilir bankacılık partnerin" data-en="Your trusted banking partner">
                {getText("Güvenilir bankacılık partnerin", "Your trusted banking partner")}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4" data-tr="Hizmetler" data-en="Services">
                {getText("Hizmetler", "Services")}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors" data-tr="Hesaplar" data-en="Accounts">
                  {getText("Hesaplar", "Accounts")}
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-tr="Krediler" data-en="Loans">
                  {getText("Krediler", "Loans")}
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-tr="Yatırım" data-en="Investment">
                  {getText("Yatırım", "Investment")}
                </a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4" data-tr="Destek" data-en="Support">
                {getText("Destek", "Support")}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors" data-tr="Müşteri Hizmetleri" data-en="Customer Service">
                  {getText("Müşteri Hizmetleri", "Customer Service")}
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-tr="SSS" data-en="FAQ">
                  {getText("SSS", "FAQ")}
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-tr="İletişim" data-en="Contact">
                  {getText("İletişim", "Contact")}
                </a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4" data-tr="İletişim" data-en="Contact">
                {getText("İletişim", "Contact")}
              </h4>
              <div className="space-y-2 text-gray-400">
                <p>📞 0850 222 0 KLY</p>
                <p>✉️ info@kly-bank.com</p>
                <p data-tr="📍 İstanbul, Türkiye" data-en="📍 Istanbul, Turkey">
                  {getText("📍 İstanbul, Türkiye", "📍 Istanbul, Turkey")}
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p data-tr="© 2024 KLY-BANK. Tüm hakları saklıdır." data-en="© 2024 KLY-BANK. All rights reserved.">
              {getText("© 2024 KLY-BANK. Tüm hakları saklıdır.", "© 2024 KLY-BANK. All rights reserved.")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KlyBank;