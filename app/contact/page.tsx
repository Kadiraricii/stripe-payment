'use client';

import React, { useState, useEffect } from 'react';

// Type definitions
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface Branch {
  name: string;
  address: string;
  phone: string;
  distance: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

const KlyBankContact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [consent, setConsent] = useState<boolean>(false);
  const [showBranchModal, setShowBranchModal] = useState<boolean>(false);
  const [showKVKKModal, setShowKVKKModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<'tr' | 'en'>('tr');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState<boolean>(false);
  
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: 1,
      question: "Müşteri hizmetlerine nasıl ulaşabilirim?",
      answer: "444 0 888 numaralı telefonu arayarak 7/24 müşteri hizmetlerimize ulaşabilirsiniz. Ayrıca mobil uygulama ve internet bankacılığı üzerinden de destek alabilirsiniz.",
      isOpen: false
    },
    {
      id: 2,
      question: "En yakın şubeyi nasıl bulabilirim?",
      answer: "Mobil uygulamamızdan veya web sitemizden \"Şube Bul\" özelliğini kullanarak size en yakın şube ve ATM'leri bulabilirsiniz.",
      isOpen: false
    },
    {
      id: 3,
      question: "İnternet bankacılığı şifremi unuttum, ne yapmalıyım?",
      answer: "Giriş sayfasında \"Şifremi Unuttum\" linkine tıklayarak yeni şifre oluşturabilir veya 444 0 888'i arayarak destek alabilirsiniz.",
      isOpen: false
    }
  ]);

  const branches: Branch[] = [
    {
      name: "Levent Şubesi",
      address: "Büyükdere Cad. No:185 Levent/İstanbul",
      phone: "0212 318 18 18",
      distance: "2.3 km"
    },
    {
      name: "Maslak Şubesi",
      address: "Maslak Mah. Büyükdere Cad. No:255 Maslak/İstanbul",
      phone: "0212 335 45 67",
      distance: "3.1 km"
    },
    {
      name: "Beşiktaş Şubesi",
      address: "Barbaros Bulvarı No:145 Beşiktaş/İstanbul",
      phone: "0212 227 89 90",
      distance: "4.2 km"
    },
    {
      name: "Kadıköy Şubesi",
      address: "Bağdat Cad. No:312 Kadıköy/İstanbul",
      phone: "0216 348 76 54",
      distance: "5.8 km"
    },
    {
      name: "Ankara Kızılay Şubesi",
      address: "Atatürk Bulvarı No:98 Kızılay/Ankara",
      phone: "0312 418 23 45",
      distance: "450 km"
    },
    {
      name: "İzmir Alsancak Şubesi",
      address: "Cumhuriyet Bulvarı No:142 Alsancak/İzmir",
      phone: "0232 464 78 90",
      distance: "340 km"
    }
  ];

  // Enhanced language function with more translations
  const getText = (tr: string, en: string) => {
    return currentLanguage === 'tr' ? tr : en;
  };

  // FAQ translations based on language
  const getFAQs = () => {
    if (currentLanguage === 'en') {
      return [
        {
          id: 1,
          question: "How can I reach customer service?",
          answer: "You can reach our 24/7 customer service by calling 444 0 888. You can also get support through mobile app and internet banking.",
          isOpen: false
        },
        {
          id: 2,
          question: "How can I find the nearest branch?",
          answer: "You can find the nearest branches and ATMs using the \"Find Branch\" feature from our mobile app or website.",
          isOpen: false
        },
        {
          id: 3,
          question: "I forgot my internet banking password, what should I do?",
          answer: "You can create a new password by clicking the \"Forgot Password\" link on the login page or call 444 0 888 for support.",
          isOpen: false
        }
      ];
    }
    return [
      {
        id: 1,
        question: "Müşteri hizmetlerine nasıl ulaşabilirim?",
        answer: "444 0 888 numaralı telefonu arayarak 7/24 müşteri hizmetlerimize ulaşabilirsiniz. Ayrıca mobil uygulama ve internet bankacılığı üzerinden de destek alabilirsiniz.",
        isOpen: false
      },
      {
        id: 2,
        question: "En yakın şubeyi nasıl bulabilirim?",
        answer: "Mobil uygulamamızdan veya web sitemizden \"Şube Bul\" özelliğini kullanarak size en yakın şube ve ATM'leri bulabilirsiniz.",
        isOpen: false
      },
      {
        id: 3,
        question: "İnternet bankacılığı şifremi unuttum, ne yapmalıyım?",
        answer: "Giriş sayfasında \"Şifremi Unuttum\" linkine tıklayarak yeni şifre oluşturabilir veya 444 0 888'i arayarak destek alabilirsiniz.",
        isOpen: false
      }
    ];
  };

  const changeLanguage = (lang: 'tr' | 'en') => {
    setCurrentLanguage(lang);
    setShowLanguageDropdown(false);
    // Update FAQs when language changes
    const updatedFAQs = getFAQs();
    setFaqs(updatedFAQs);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Phone number validation - only numbers, max 11 digits
      const numericValue = value.replace(/[^0-9]/g, '').slice(0, 11);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (!formData.message.trim()) {
      alert(getText('Lütfen mesajınızı yazınız. Bu alan boş bırakılamaz.', 'Please write your message. This field cannot be left empty.'));
      return;
    }
    
    if (!consent) {
      alert(getText('KVKK onayı vermeden form gönderilemez.', 'Form cannot be submitted without GDPR consent.'));
      return;
    }

    setShowSuccessModal(true);
    
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setConsent(false);
  };

  const toggleFAQ = (id: number): void => {
    setFaqs(prev => prev.map(faq => 
      faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq
    ));
  };

  const selectBranch = (branchName: string): void => {
    alert(getText(`${branchName} seçildi! Yol tarifi için harita uygulamanız açılacak.`, `${branchName} selected! Your map application will open for directions.`));
    setShowBranchModal(false);
  };

  const openApp = (type: 'mobile' | 'internet'): void => {
    if (type === 'mobile') {
      alert(getText('Mobil uygulamamızı App Store veya Google Play\'den indirebilirsiniz.', 'You can download our mobile app from App Store or Google Play.'));
    } else {
      alert(getText('İnternet bankacılığına yönlendiriliyorsunuz...', 'You are being redirected to internet banking...'));
    }
  };

  // Modal component
  const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-3xl w-full max-h-96 overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 ml-auto">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
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
                <a href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  {getText("Ana Sayfa", "Home")}
                </a>
                <a href="/urunler" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  {getText("Hizmetler", "Services")}
                </a>
                <a href="/credi" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  {getText("Krediler", "Loans")}
                </a>
                <a href="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
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
                <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                  {getText("Giriş Yap", "Login")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Header - Added top padding for fixed nav */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16 pt-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            {getText("İletişim", "Contact")}
          </h1>
          <p className="text-xl opacity-90">
            {getText("Size nasıl yardımcı olabiliriz?", "How can we help you?")}
          </p>
        </div>
      </header>

      {/* Quick Contact Cards */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Phone Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-phone text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">
                {getText("Telefon Desteği", "Phone Support")}
              </h3>
              <p className="text-gray-600 mb-4">
                {getText("7/24 müşteri hizmetleri", "24/7 customer service")}
              </p>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-blue-600">444 0 888</p>
                <p className="text-sm text-gray-500">
                  {getText("Yurt içi ücretsiz", "Domestic free")}
                </p>
                <p className="text-lg font-semibold">+90 212 318 18 18</p>
                <p className="text-sm text-gray-500">
                  {getText("Yurt dışından", "From abroad")}
                </p>
              </div>
            </div>

            {/* Branch Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-map-marker-alt text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">
                {getText("Şube Ağımız", "Our Branch Network")}
              </h3>
              <p className="text-gray-600 mb-4">
                {getText("Türkiye genelinde", "Throughout Turkey")}
              </p>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-green-600">850+</p>
                <p className="text-sm text-gray-500">
                  {getText("Şube", "Branches")}
                </p>
                <p className="text-lg font-semibold">2500+</p>
                <p className="text-sm text-gray-500">ATM</p>
              </div>
              <button 
                onClick={() => setShowBranchModal(true)} 
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                {getText("Şube Bul", "Find Branch")}
              </button>
            </div>

            {/* Digital Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-mobile-alt text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">
                {getText("Dijital Kanallar", "Digital Channels")}
              </h3>
              <p className="text-gray-600 mb-4">
                {getText("Mobil ve internet bankacılığı", "Mobile and internet banking")}
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => openApp('mobile')} 
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <i className="fas fa-mobile-alt mr-2"></i>
                  {getText("Mobil Uygulama", "Mobile App")}
                </button>
                <button 
                  onClick={() => openApp('internet')} 
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <i className="fas fa-laptop mr-2"></i>
                  {getText("İnternet Bankacılığı", "Internet Banking")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {getText("Bize Ulaşın", "Contact Us")}
              </h2>
              <p className="text-gray-600">
                {getText("Sorularınız için formu doldurun, size en kısa sürede dönüş yapalım", "Fill out the form for your questions, we will get back to you as soon as possible")}
              </p>
            </div>

            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl p-8">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {getText("Ad Soyad *", "Full Name *")}
                    </label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {getText("E-posta *", "Email *")}
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {getText("Telefon", "Phone")}
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="5XX XXX XX XX" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {getText("Konu *", "Subject *")}
                    </label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">
                        {getText("Konu seçiniz", "Select subject")}
                      </option>
                      <option value="hesap">
                        {getText("Hesap İşlemleri", "Account Operations")}
                      </option>
                      <option value="kredi">
                        {getText("Kredi ve Finansman", "Credit and Finance")}
                      </option>
                      <option value="kart">
                        {getText("Kart İşlemleri", "Card Operations")}
                      </option>
                      <option value="sikayet">
                        {getText("Şikayet", "Complaint")}
                      </option>
                      <option value="oneri">
                        {getText("Öneri", "Suggestion")}
                      </option>
                      <option value="diger">
                        {getText("Diğer", "Other")}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getText("Mesajınız *", "Your Message *")}
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required 
                    rows={5} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                    placeholder={getText("Lütfen detaylı olarak açıklayınız...", "Please explain in detail...")}
                  />
                </div>

                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="consent" className="ml-2 block text-sm text-gray-700">
                    <button 
                      type="button"
                      onClick={() => setShowKVKKModal(true)} 
                      className="text-blue-600 hover:underline"
                    >
                      {getText("Kişisel Verilerin Korunması", "Personal Data Protection")}
                    </button> 
                    {getText(" kapsamında bilgilerimin işlenmesini kabul ediyorum.", " I accept the processing of my information under the scope.")}
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  {getText("Gönder", "Send")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Contact Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-building text-blue-600"></i>
              </div>
              <h4 className="font-bold mb-2">
                {getText("Genel Müdürlük", "Headquarters")}
              </h4>
              <p className="text-gray-600 text-sm">
                {getText("Sabancı Center\n4. Levent, İstanbul\n34330 Türkiye", "Sabancı Center\n4. Levent, Istanbul\n34330 Turkey")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-envelope text-green-600"></i>
              </div>
              <h4 className="font-bold mb-2">
                {getText("E-posta", "Email")}
              </h4>
              <p className="text-gray-600 text-sm">info@klybank.com.tr<br />destek@klybank.com.tr</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-share-alt text-purple-600"></i>
              </div>
              <h4 className="font-bold mb-2">
                {getText("Sosyal Medya", "Social Media")}
              </h4>
              <div className="flex justify-center space-x-3 mt-2">
                <a href="#" className="text-blue-600 hover:text-blue-800"><i className="fab fa-facebook text-xl"></i></a>
                <a href="#" className="text-blue-400 hover:text-blue-600"><i className="fab fa-twitter text-xl"></i></a>
                <a href="#" className="text-pink-600 hover:text-pink-800"><i className="fab fa-instagram text-xl"></i></a>
                <a href="#" className="text-blue-700 hover:text-blue-900"><i className="fab fa-linkedin text-xl"></i></a>
              </div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-clock text-orange-600"></i>
              </div>
              <h4 className="font-bold mb-2">
                {getText("Çalışma Saatleri", "Working Hours")}
              </h4>
              <p className="text-gray-600 text-sm">
                {getText("Telefon Desteği: 7/24\nŞubeler: 09:00-17:00\nHafta içi", "Phone Support: 24/7\nBranches: 09:00-17:00\nWeekdays")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {getText("Sık Sorulan Sorular", "Frequently Asked Questions")}
            </h2>
            
            <div className="space-y-4">
              {getFAQs().map(faq => (
                <div key={faq.id} className="bg-white rounded-lg shadow-sm">
                  <button 
                    onClick={() => toggleFAQ(faq.id)} 
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold">{faq.question}</span>
                    <i className={`fas fa-chevron-down transform transition-transform ${faq.isOpen ? 'rotate-180' : ''}`}></i>
                  </button>
                  {faq.isOpen && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Branch Modal */}
      <Modal isOpen={showBranchModal} onClose={() => setShowBranchModal(false)}>
        <h3 className="text-xl font-bold mb-6">
          {getText("Şube ve ATM Lokasyonları", "Branch and ATM Locations")}
        </h3>
        <div className="grid md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
          {branches.map((branch, index) => (
            <div 
              key={index}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer" 
              onClick={() => selectBranch(branch.name)}
            >
              <div className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt text-green-600 mt-1"></i>
                <div>
                  <h4 className="font-semibold">{branch.name}</h4>
                  <p className="text-sm text-gray-600">{branch.address}</p>
                  <p className="text-xs text-blue-600 mt-1">📞 {branch.phone}</p>
                  <p className="text-xs text-gray-500">
                    {getText("Mesafe: ", "Distance: ")}{branch.distance}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-4">
            {getText("Daha fazla şube için mobil uygulamamızı kullanabilirsiniz", "You can use our mobile app for more branches")}
          </p>
          <button 
            onClick={() => setShowBranchModal(false)} 
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            {getText("Kapat", "Close")}
          </button>
        </div>
      </Modal>

      {/* KVKK Modal */}
      <Modal isOpen={showKVKKModal} onClose={() => setShowKVKKModal(false)}>
        <h3 className="text-xl font-bold mb-4">
          {getText("Kişisel Verilerin Korunması Hakkında Bilgilendirme", "Personal Data Protection Information")}
        </h3>
        <div className="text-sm text-gray-700 space-y-3 max-h-64 overflow-y-auto">
          <p>
            <strong>{getText("Veri Sorumlusu:", "Data Controller:")}</strong> KlyBank A.Ş.
          </p>
          <p>
            <strong>{getText("İletişim Bilgileri:", "Contact Information:")}</strong> 
            {getText("Sabancı Center, 4. Levent, İstanbul", "Sabancı Center, 4. Levent, Istanbul")}
          </p>
          <p>
            <strong>{getText("Kişisel Verilerin İşlenme Amacı:", "Purpose of Personal Data Processing:")}</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>{getText("Müşteri hizmetleri sunmak", "Providing customer services")}</li>
            <li>{getText("Talep ve şikayetleri değerlendirmek", "Evaluating requests and complaints")}</li>
            <li>{getText("İletişim kurmak ve geri dönüş yapmak", "Establishing communication and providing feedback")}</li>
            <li>{getText("Yasal yükümlülükleri yerine getirmek", "Fulfilling legal obligations")}</li>
          </ul>
          <p>
            <strong>{getText("Veri Saklama Süresi:", "Data Retention Period:")}</strong> 
            {getText("Yasal zorunluluklar ve işleme amaçları doğrultusunda gerekli süre boyunca saklanacaktır.", "Will be stored for the necessary period in accordance with legal obligations and processing purposes.")}
          </p>
          <p>
            <strong>{getText("Haklarınız:", "Your Rights:")}</strong> 
            {getText("KVKK kapsamında bilgi talep etme, düzeltme, silme ve işleme itiraz etme haklarınız bulunmaktadır.", "Under GDPR, you have the right to request information, correction, deletion and object to processing.")}
          </p>
          <p className="text-xs text-gray-500 mt-4">
            {getText("Detaylı bilgi için web sitemizden KVKK Aydınlatma Metni'ni inceleyebilirsiniz.", "For detailed information, you can review the GDPR Clarification Text on our website.")}
          </p>
        </div>
        <div className="mt-6 text-center">
          <button 
            onClick={() => setShowKVKKModal(false)} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {getText("Anladım", "I Understand")}
          </button>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-check text-green-600 text-2xl"></i>
          </div>
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            {getText("Mesajınız Başarıyla Gönderildi!", "Your Message Has Been Sent Successfully!")}
          </h3>
          <div className="text-gray-600 space-y-2 mb-6">
            <p>{getText("Talebiniz alınmıştır ve değerlendirmeye alınmıştır.", "Your request has been received and is being evaluated.")}</p>
            <p>
              <strong>{getText("Dönüş Süresi:", "Response Time:")}</strong> 
              {getText("En geç 2 iş günü içinde", "Within 2 business days at most")}
            </p>
            <p>
              <strong>{getText("İletişim:", "Contact:")}</strong> 
              {getText("Kayıtlı e-posta adresinize", "To your registered email address")}
            </p>
            <p className="text-sm text-blue-600">
              {getText("Acil durumlar için 444 0 888'i arayabilirsiniz.", "For emergencies, you can call 444 0 888.")}
            </p>
          </div>
          <button 
            onClick={() => setShowSuccessModal(false)} 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            {getText("Tamam", "OK")}
          </button>
        </div>
      </Modal>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default KlyBankContact;