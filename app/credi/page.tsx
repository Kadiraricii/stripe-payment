'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';


interface LoanCalculatorProps {}

const LoanCalculator: React.FC<LoanCalculatorProps> = () => {
  const [currentAmount, setCurrentAmount] = useState<number>(50000);
  const [currentTerm, setCurrentTerm] = useState<number>(36);
  const [currentLoanType, setCurrentLoanType] = useState<string>('ihtiyac');
  const [showPaymentPlan, setShowPaymentPlan] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<'tr' | 'en'>('tr');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState<boolean>(false);

  const getText = (tr: string, en: string): string => {
    return currentLanguage === 'tr' ? tr : en;
  };

  const changeLanguage = (lang: 'tr' | 'en'): void => {
    setCurrentLanguage(lang);
    setShowLanguageDropdown(false);
  };

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getInterestRate = (): number => {
    switch(currentLoanType) {
      case 'ihtiyac':
        return 3.79;
      case 'konut':
        return 2.89;
      case 'tasit':
        return 3.29;
      default:
        return 3.79;
    }
  };

  const calculateLoan = (): { monthlyPayment: number; interestRate: number } => {
    const interestRate = getInterestRate();
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = (currentAmount * monthlyRate * Math.pow(1 + monthlyRate, currentTerm)) / 
                         (Math.pow(1 + monthlyRate, currentTerm) - 1);
    
    return { monthlyPayment, interestRate };
  };

  const { monthlyPayment, interestRate } = calculateLoan();

  const updateAmount = (value: number): void => {
    setCurrentAmount(value);
  };

  const selectTerm = (months: number): void => {
    setCurrentTerm(months);
  };

  const selectLoanType = (type: string): void => {
    setCurrentLoanType(type);
  };

  const applyNow = (): void => {
    setShowSuccessMessage(true);
  };

  const toggleFAQ = (id: number): void => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const getLoanTypeColor = (type: string): string => {
    if (type === currentLoanType) {
      switch(type) {
        case 'ihtiyac':
          return 'border-blue-500 bg-blue-50';
        case 'konut':
          return 'border-green-500 bg-green-50';
        case 'tasit':
          return 'border-gray-500 bg-gray-50';
        default:
          return 'border-gray-200';
      }
    }
    return 'border-gray-200 hover:border-gray-300';
  };

  const getLoanTypeTextColor = (type: string): string => {
    if (type === currentLoanType) {
      switch(type) {
        case 'ihtiyac':
          return 'text-blue-700';
        case 'konut':
          return 'text-green-700';
        case 'tasit':
          return 'text-gray-700';
        default:
          return 'text-gray-600';
      }
    }
    return 'text-gray-600';
  };

  const PaymentPlanModal: React.FC = () => {
    const monthlyRate = getInterestRate() / 100 / 12;
    const totalPayment = monthlyPayment * currentTerm;
    const totalInterest = totalPayment - currentAmount;
    
    const generatePaymentSchedule = () => {
      const schedule = [];
      let remainingBalance = currentAmount;
      
      for (let i = 1; i <= Math.min(6, currentTerm); i++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        remainingBalance -= principalPayment;
        
        schedule.push({
          month: i,
          monthlyPayment: Math.round(monthlyPayment),
          principal: Math.round(principalPayment),
          interest: Math.round(interestPayment),
          remaining: Math.round(remainingBalance)
        });
      }
      return schedule;
    };

    const paymentSchedule = generatePaymentSchedule();

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">{getText('Ödeme Planı ve Masraflar', 'Payment Plan and Costs')}</h3>
            <button 
              onClick={() => setShowPaymentPlan(false)} 
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">{getText('Kredi Özeti', 'Loan Summary')}</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">{getText('Kredi Tutarı', 'Loan Amount')}</p>
                <p className="font-semibold text-lg">{formatNumber(currentAmount)} TL</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{getText('Vade', 'Term')}</p>
                <p className="font-semibold text-lg">{currentTerm} {getText('Ay', 'Months')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{getText('Aylık Taksit', 'Monthly Installment')}</p>
                <p className="font-semibold text-lg">{formatNumber(Math.round(monthlyPayment))} TL</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{getText('Toplam Geri Ödeme', 'Total Repayment')}</p>
                <p className="font-semibold text-lg">{formatNumber(Math.round(totalPayment))} TL</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">{getText('Masraflar ve Ücretler', 'Costs and Fees')}</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">{getText('Dosya Masrafı', 'File Fee')}</span>
                <span className="font-semibold">150 TL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{getText('Ekspertiz Ücreti', 'Expertise Fee')}</span>
                <span className="font-semibold">0 TL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{getText('Sigorta Primi (Opsiyonel)', 'Insurance Premium (Optional)')}</span>
                <span className="font-semibold">{Math.round(currentAmount * 0.002)} TL</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-600">{getText('Toplam Faiz', 'Total Interest')}</span>
                <span className="font-semibold text-red-600">{formatNumber(Math.round(totalInterest))} TL</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">{getText('Ödeme Takvimi (İlk 6 Ay)', 'Payment Schedule (First 6 Months)')}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-2 text-center">{getText('Taksit No', 'Installment No')}</th>
                    <th className="py-3 px-2 text-center">{getText('Taksit Tutarı', 'Installment Amount')}</th>
                    <th className="py-3 px-2 text-center">{getText('Ana Para', 'Principal')}</th>
                    <th className="py-3 px-2 text-center">{getText('Faiz', 'Interest')}</th>
                    <th className="py-3 px-2 text-center">{getText('Kalan Bakiye', 'Remaining Balance')}</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentSchedule.map((payment) => (
                    <tr key={payment.month} className="border-b border-gray-200">
                      <td className="py-2 text-center">{payment.month}</td>
                      <td className="py-2 text-center">{formatNumber(payment.monthlyPayment)}</td>
                      <td className="py-2 text-center">{formatNumber(payment.principal)}</td>
                      <td className="py-2 text-center">{formatNumber(payment.interest)}</td>
                      <td className="py-2 text-center">{formatNumber(payment.remaining)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {currentTerm > 6 && <p className="text-sm text-gray-500 mt-2">{getText('* Sadece ilk 6 ay gösterilmektedir', '* Only first 6 months are shown')}</p>}
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">{getText('Önemli Notlar', 'Important Notes')}</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>{getText('• Faiz oranları değişken olup, piyasa koşullarına göre güncellenebilir', '• Interest rates are variable and may be updated according to market conditions')}</li>
              <li>{getText('• Erken ödeme durumunda kalan faizlerden muaf olursunuz', '• In case of early payment, you are exempt from remaining interest')}</li>
              <li>{getText('• Geciken ödemeler için gecikme faizi uygulanır', '• Delay interest is applied for delayed payments')}</li>
              <li>{getText('• Tüm tutarlar yaklaşık değerlerdir, kesin tutarlar sözleşmede belirtilir', '• All amounts are approximate, exact amounts are specified in the contract')}</li>
            </ul>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={() => setShowPaymentPlan(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              {getText('Kapat', 'Close')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SuccessModal: React.FC = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{getText('Başvurunuz Alındı!', 'Your Application Has Been Received!')}</h3>
        <div className="text-gray-600 mb-6">
          <p className="mb-2">
            <strong>{getText('Kredi Türü:', 'Loan Type:')}</strong> {
              currentLoanType === 'ihtiyac' ? getText('İhtiyaç Kredisi', 'Personal Loan') : 
              currentLoanType === 'konut' ? getText('Konut Kredisi', 'Housing Loan') : 
              getText('Taşıt Kredisi', 'Vehicle Loan')
            }
          </p>
          <p className="mb-2"><strong>{getText('Tutar:', 'Amount:')}</strong> {formatNumber(currentAmount)} TL</p>
          <p className="mb-4"><strong>{getText('Vade:', 'Term:')}</strong> {currentTerm} {getText('ay', 'months')}</p>
          <p className="text-sm text-gray-500">
            {getText('Başvurunuz değerlendirmeye alınmıştır. En geç 24 saat içinde sizinle iletişime geçeceğiz.', 'Your application has been taken for evaluation. We will contact you within 24 hours at the latest.')}
          </p>
        </div>
        <button 
          onClick={() => setShowSuccessMessage(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
        >
          {getText('Tamam', 'OK')}
        </button>
      </div>
    </div>
  );

  const faqData = [
    {
      question: getText('Kredi başvurum ne kadar sürede sonuçlanır?', 'How long does my loan application take to finalize?'),
      answer: getText('Kredi başvurunuz genellikle 24-48 saat içinde değerlendirilir. Eksik belge durumunda süre uzayabilir. Onay sonrası kredi tutarı hesabınıza 1-2 iş günü içinde aktarılır.', 'Your loan application is usually evaluated within 24-48 hours. The duration may extend if documents are missing. After approval, the loan amount is transferred to your account within 1-2 business days.')
    },
    {
      question: getText('Hangi belgeler gerekli?', 'What documents are required?'),
      answer: getText('• Kimlik fotokopisi\n• Son 3 aylık maaş bordrosu\n• SGK hizmet dökümü\n• İkametgah belgesi\n• Varsa ek gelir belgeleri', '• ID photocopy\n• Last 3 months payroll\n• SGK service statement\n• Residence certificate\n• Additional income documents if any')
    },
    {
      question: getText('Faiz oranları nasıl belirlenir?', 'How are interest rates determined?'),
      answer: getText('Faiz oranları; kredi türü, vade, tutar, gelir durumu ve kredi notu gibi faktörlere göre belirlenir. Mevcut kampanyalardan da yararlanabilirsiniz.', 'Interest rates are determined based on factors such as loan type, term, amount, income status, and credit score. You can also benefit from current campaigns.')
    },
    {
      question: getText('Erken ödeme yapabilir miyim?', 'Can I make early payment?'),
      answer: getText('Evet, kredinizi istediğiniz zaman erken kapatabilirsiniz. Erken ödeme durumunda kalan faiz tutarından muaf olursunuz. Herhangi bir erken ödeme cezası yoktur.', 'Yes, you can close your loan early at any time. In case of early payment, you are exempt from the remaining interest amount. There is no early payment penalty.')
    },
    {
      question: getText('Kredi notum düşükse başvurabilir miyim?', 'Can I apply if my credit score is low?'),
      answer: getText('Kredi notu düşük olsa bile başvuru yapabilirsiniz. Gelir durumunuz, iş güvenceniz ve bankamızla olan ilişkiniz değerlendirmeye alınır. Alternatif çözümler sunabiliriz.', 'You can apply even if your credit score is low. Your income status, job security, and relationship with our bank are taken into evaluation. We can offer alternative solutions.')
    },
    {
      question: getText('Taksit ödememi geciktirirsem ne olur?', 'What happens if I delay my installment payment?'),
      answer: getText('Geciken ödemeler için gecikme faizi uygulanır ve kredi notunuz olumsuz etkilenir. Ödeme güçlüğü yaşarsanız mutlaka bizimle iletişime geçin, çözüm bulabiliriz.', 'Delay interest is applied for delayed payments and your credit score is negatively affected. If you experience payment difficulties, please contact us, we can find a solution.')
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <link href="/">
                  <img
                    src="/logoo.jpg"
                    alt="KLY-BANK Logo"
                    className="h-10 w-auto"
                  />
                </link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors" data-tr="Ana Sayfa" data-en="Home">
                  {getText("Ana Sayfa", "Home")}
                </link>
                <link href="/urunler" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors" data-tr="Hizmetler" data-en="Services">
                  {getText("Hizmetler", "Services")}
                </link>
                <link href="/credi" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors" data-tr="Krediler" data-en="Loans">
                  {getText("Krediler", "Loans")}
                </link>
                <link href="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors" data-tr="İletişim" data-en="Contact">
                  {getText("İletişim", "Contact")}
                </link>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 pt-20"> {/* Added pt-20 to account for fixed nav */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Input Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            {/* Loan Type Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">{getText('Ne İçin Kredi Almak İstiyorsunuz?', 'What Do You Want to Get a Loan For?')}</h3>
              <div className="flex space-x-4">
                <button 
                  onClick={() => selectLoanType('ihtiyac')}
                  className={`flex-1 p-4 border-2 rounded-xl text-center transition-all duration-200 ${getLoanTypeColor('ihtiyac')}`}
                >
                  <div className="text-3xl mb-2">🛋️</div>
                  <div className={`font-medium ${getLoanTypeTextColor('ihtiyac')}`}>{getText('İhtiyaç', 'Personal')}</div>
                </button>
                <button 
                  onClick={() => selectLoanType('konut')}
                  className={`flex-1 p-4 border-2 rounded-xl text-center transition-all duration-200 ${getLoanTypeColor('konut')}`}
                >
                  <div className="text-3xl mb-2">🏠</div>
                  <div className={`font-medium ${getLoanTypeTextColor('konut')}`}>{getText('Konut', 'Housing')}</div>
                </button>
                <button 
                  onClick={() => selectLoanType('tasit')}
                  className={`flex-1 p-4 border-2 rounded-xl text-center transition-all duration-200 ${getLoanTypeColor('tasit')}`}
                >
                  <div className="text-3xl mb-2">🚗</div>
                  <div className={`font-medium ${getLoanTypeTextColor('tasit')}`}>{getText('Taşıt', 'Vehicle')}</div>
                </button>
              </div>
            </div>

            {/* Loan Amount */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{getText('Ne Kadar İhtiyacınız Var?', 'How Much Do You Need?')}</h3>
                <div className="ml-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">i</div>
              </div>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-gray-900">{formatNumber(currentAmount)}</span>
                <span className="text-2xl text-gray-500 ml-2">TL</span>
              </div>
              <input 
                type="range" 
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                min="1000" 
                max="450000" 
                value={currentAmount} 
                step="1000" 
                onChange={(e) => updateAmount(parseInt(e.target.value))}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>1.000 TL</span>
                <span>450.000 TL</span>
              </div>
            </div>

            {/* Loan Term */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{getText('Kaç Ayda Ödemeyi Planlıyorsunuz?', 'How Many Months Do You Plan to Pay?')}</h3>
              <div className="flex flex-wrap gap-3 mb-4">
                {[3, 6, 9, 12, 36].map((months) => (
                  <button 
                    key={months}
                    onClick={() => selectTerm(months)}
                    className={`px-4 py-2 border-2 rounded-lg transition-all duration-200 ${
                      currentTerm === months 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-blue-500'
                    }`}
                  >
                    {months} {getText('Ay', 'Months')} {months === 36 ? '▼' : ''}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                {getText('1.000-125.000 TL aralığındaki krediler için seçilebilecek maksimum vade 36 ay olabilir.', 'For loans between 1,000-125,000 TL, the maximum selectable term may be 36 months.')}
              </p>
            </div>
          </div>

          {/* Right Panel - Calculation Results */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="mb-6">
              <p className="text-blue-100 mb-2">
                <span>{formatNumber(currentAmount)}</span> TL {getText('tutarında', 'amount')} <span>{currentTerm}</span> {getText('ay geri ödemeli krediniz için hesaplamanız:', 'months repayment calculation for your loan:')}
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <div className="text-sm text-blue-200 mb-1">{getText('Taksit Tutarı', 'Installment Amount')}</div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{formatNumber(Math.round(monthlyPayment * 100) / 100)}</span>
                  <span className="text-xl text-blue-200 ml-2">TL/{getText('AY', 'MONTH')}</span>
                </div>
              </div>

              <div>
                <div className="text-sm text-blue-200 mb-1">{getText('Faiz Oranı', 'Interest Rate')}</div>
                <div className="flex items-baseline">
                  <span className="text-xl text-blue-200">%</span>
                  <span className="text-4xl font-bold ml-1">{interestRate.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <button 
                onClick={() => setShowPaymentPlan(true)}
                className="text-blue-200 text-sm underline hover:text-white transition-colors"
              >
                {getText('Ödeme Planı ve Masraflar', 'Payment Plan and Costs')}
              </button>
            </div>

            <button 
              onClick={applyNow}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {getText('Hemen Başvur', 'Apply Now')}
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{getText('Sıkça Sorulan Sorular', 'Frequently Asked Questions')}</h2>
            <p className="text-gray-600">{getText('Kredi başvurunuz hakkında merak ettikleriniz', 'What you wonder about your loan application')}</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <div key={index + 1} className="border border-gray-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => toggleFAQ(index + 1)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <span className="text-2xl text-gray-500">
                    {openFAQ === index + 1 ? '−' : '+'}
                  </span>
                </button>
                {openFAQ === index + 1 && (
                  <div className="px-6 py-4 text-gray-600">
                    <p style={{whiteSpace: 'pre-line'}}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{getText('Daha Fazla Bilgi İçin', 'For More Information')}</h2>
          <p className="text-gray-300 mb-8">{getText('Uzman ekibimiz size yardımcı olmaya hazır', 'Our expert team is ready to help you')}</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="font-semibold mb-2">{getText('Telefon', 'Phone')}</h3>
              <p className="text-gray-300">444 0 333</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-semibold mb-2">{getText('Canlı Destek', 'Live Support')}</h3>
              <p className="text-gray-300">7/24 Online</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="font-semibold mb-2">{getText('Şube', 'Branch')}</h3>
              <p className="text-gray-300">{getText('En yakın şube', 'Nearest branch')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showPaymentPlan && <PaymentPlanModal />}
      {showSuccessMessage && <SuccessModal />}
    </div>
  );
};

export default LoanCalculator;