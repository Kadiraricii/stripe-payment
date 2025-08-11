'use client';
import { useEffect, useState } from 'react';

interface PaymentSuccessProps {
  searchParams: Promise<{
    amount?: string;
  }>;
}

export default function PaymentSuccess({ searchParams }: PaymentSuccessProps) {
  const [amount, setAmount] = useState<string>('0.00');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');

  useEffect(() => {
    // Resolve searchParams
    searchParams.then((params) => {
      setAmount(params.amount ?? '0.00');
    });

    // Set date
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    setCurrentDate(dateStr);

    // Generate random transaction ID
    const transId = Math.floor(Math.random() * 900000) + 100000;
    setTransactionId(transId.toString());
  }, [searchParams]);

  const printReceipt = () => {
    window.print();
  };

  const downloadPDF = (event: React.MouseEvent<HTMLButtonElement>) => {
    // PDF download simulation
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKE9kZW1lIE1ha2J1enUpCi9Qcm9kdWNlciAoU2FtcGxlIFBERikKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDMgMCBSCj4+CmVuZG9iagozIDAgb2JqCjw8Ci9UeXBlIC9QYWdlcwovS2lkcyBbNCAwIFJdCi9Db3VudCAxCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMyAwIFIKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KPj4KZW5kb2JqCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDc0IDAwMDAwIG4gCjAwMDAwMDAxMjEgMDAwMDAgbiAKMDAwMDAwMDE3OCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDUKL1Jvb3QgMiAwIFIKPj4Kc3RhcnR4cmVmCjI3MwolJUVPRg==';
    link.download = 'payment-receipt.pdf';
    link.click();

    // Show success message
    const button = event.target as HTMLButtonElement;
    const originalText = button.innerHTML;
    button.innerHTML = '<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Downloaded!';
    button.classList.add('bg-green-600');
    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove('bg-green-600');
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 min-h-screen relative overflow-x-hidden">
      {/* CSS Animations */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        .success-animation {
          animation: successPulse 2s ease-in-out infinite;
        }
        @keyframes successPulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(-5deg); }
          50% { transform: scale(1.15) rotate(0deg); }
          75% { transform: scale(1.1) rotate(5deg); }
        }
        .fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .fade-in-delayed {
          animation: fadeIn 1.2s ease-out;
        }
        .slide-up {
          animation: slideUp 1s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .receipt-item {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .receipt-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.5s;
        }
        .receipt-item:hover::before {
          left: 100%;
        }
        .receipt-item:hover {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          transform: translateX(8px) scale(1.02);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        .print-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .print-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.6s;
        }
        .print-btn:hover::before {
          left: 100%;
        }
        .print-btn:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }
        .floating {
          animation: floating 3s ease-in-out infinite;
        }
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .glow {
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
          animation: glow 2s ease-in-out infinite alternate;
        }
        @keyframes glow {
          from { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
          to { box-shadow: 0 0 30px rgba(34, 197, 94, 0.6); }
        }
        .gradient-text {
          background: linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease-in-out infinite;
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #10b981;
          border-radius: 50%;
          animation: particle 4s linear infinite;
        }
        @keyframes particle {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-8px) rotateX(5deg);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }
        .step-item {
          transition: all 0.3s ease;
        }
        .step-item:hover {
          transform: translateX(10px);
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 12px;
          padding: 12px;
          margin: -4px;
        }
      `}</style>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 floating"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-30 floating" style={{animationDelay: '-1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-25 floating" style={{animationDelay: '-2s'}}></div>
        <div className="absolute top-1/2 right-10 w-8 h-8 bg-pink-200 rounded-full opacity-20 floating" style={{animationDelay: '-0.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-8 fade-in relative">
          {/* Particle Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="particle" style={{left: '20%', animationDelay: '0s'}}></div>
            <div className="particle" style={{left: '40%', animationDelay: '0.5s'}}></div>
            <div className="particle" style={{left: '60%', animationDelay: '1s'}}></div>
            <div className="particle" style={{left: '80%', animationDelay: '1.5s'}}></div>
          </div>
          
          <div className="success-animation inline-block mb-4 relative">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl glow">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            {/* Ring Effect */}
            <div className="absolute inset-0 w-24 h-24 border-4 border-green-300 rounded-full mx-auto animate-ping opacity-30"></div>
          </div>
          
          <h1 className="text-4xl font-bold gradient-text mb-3">🎉 Payment Successful! 🎉</h1>
          <p className="text-gray-600 text-xl mb-2">Your order has been successfully received and is being processed.</p>
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            Secure Payment Completed
          </div>
        </div>

        {/* Payment Receipt Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 slide-up card-hover relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-100 to-transparent rounded-bl-full opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-transparent rounded-tr-full opacity-50"></div>
          
          <div className="border-b border-gradient-to-r from-green-200 to-blue-200 pb-6 mb-6 relative z-10">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">💳 Payment Receipt</h2>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">📅 Transaction Date: {currentDate}</span>
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium">🔢 Transaction No: #PAY-2024-{transactionId}</span>
            </div>
          </div>

          {/* Receipt Details */}
          <div className="space-y-4 mb-6">
            <div className="receipt-item flex justify-between items-center py-3 px-4 rounded-lg">
              <div>
                <span className="font-medium text-gray-800">Premium products you have</span>
                <div className="text-sm text-gray-500">Digital Product</div>
              </div>
              <span className="font-semibold text-gray-800">${amount}</span>
            </div>
            <div className="receipt-item flex justify-between items-center py-3 px-4 rounded-lg">
              <span className="text-gray-600">VAT (18%)</span>
              <span className="text-gray-600">${(parseFloat(amount) * 0.18).toFixed(2)}</span>
            </div>
            <div className="receipt-item flex justify-between items-center py-3 px-4 rounded-lg">
              <span className="text-gray-600">Discount</span>
              <span className="text-green-600">-$20.00</span>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-800">Total Amount</span>
              <span className="text-2xl font-bold text-green-600">${(parseFloat(amount) * 1.18 - 20).toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Credit Card</div>
                  <div className="text-sm text-gray-500">**** **** **** 1234</div>
                </div>
              </div>
              <span className="text-green-600 font-medium">Approved</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mb-6 fade-in-delayed">
          <button
            onClick={printReceipt}
            className="print-btn flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                </svg>
              </div>
              <span>🖨️ Print Receipt</span>
            </div>
          </button>
          
          <button
            onClick={downloadPDF}
            className="print-btn flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <span>📄 Download PDF</span>
            </div>
          </button>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 fade-in-delayed card-hover">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">⚡ Next Steps</h3>
          </div>
          
          <div className="space-y-4">
            <div className="step-item flex items-start p-4 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-800 text-lg mb-1">📧 Email Confirmation</div>
                <div className="text-gray-600">Your payment confirmation email will be sent within 5 minutes</div>
                <div className="mt-2 inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Processing
                </div>
              </div>
            </div>
            
            <div className="step-item flex items-start p-4 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-800 text-lg mb-1">🚀 Account Activation</div>
                <div className="text-gray-600">Your premium features will be activated within 24 hours</div>
                <div className="mt-2 inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5 9.293 8.207a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 9.586z" clipRule="evenodd"></path>
                  </svg>
                  Pending
                </div>
              </div>
            </div>
            
            <div className="step-item flex items-start p-4 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-800 text-lg mb-1">💬 24/7 Support</div>
                <div className="text-gray-600">Contact our customer support for any questions</div>
                <div className="mt-3 flex gap-2">
                  <button className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm font-medium transition-colors">
                    💬 Live Support
                  </button>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                    📞 Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">This transaction was completed with a secure SSL connection.</p>
          <p className="text-xs mt-2">For questions: destek@sirket.com | 0050 103 00 67</p>
        </div>
      </div>
    </div>
  );
}