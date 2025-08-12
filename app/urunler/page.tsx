
'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: { en: string; tr: string };
  price: number;
  image: string;
  description: { en: string; tr: string };
}

interface CartItem extends Product {
  quantity: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'tr' | 'en'>('tr');

  const router = useRouter();

  useEffect(() => {
    fetch('/products.json')
      .then((res) => res.json())
      .then((data) =>
        setProducts(
          data.map((product: any) => ({
            ...product,
            price: parseFloat(product.price), // String fiyatı number'a çevir
          }))
        )
      )
      .catch((error) => console.error('Ürün verisi alınamadı:', error));
  }, []);

  useEffect(() => {
    // Dil değiştiğinde tüm data-tr ve data-en özniteliklerini güncelle
    const elements = document.querySelectorAll<HTMLElement>('[data-tr][data-en]');
    elements.forEach(element => {
      const trText = element.getAttribute('data-tr');
      const enText = element.getAttribute('data-en');
      if (currentLanguage === 'tr' && trText) {
        element.textContent = trText;
      } else if (currentLanguage === 'en' && enText) {
        element.textContent = enText;
      }
    });
  }, [currentLanguage]);

  const changeLanguage = (lang: 'tr' | 'en') => {
    setCurrentLanguage(lang);
    setShowLanguageDropdown(false);
  };

  const getText = (trText: string, enText: string) => {
    return currentLanguage === 'tr' ? trText : enText;
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    const totalAmount = getTotalPrice();
    const cartData = {
      items: cart,
      total: totalAmount,
      timestamp: new Date().toISOString(),
    };

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('cartData', JSON.stringify(cartData));
    }

    router.push(`/tax?amount=${totalAmount}`);
  };

  return (
    <>
      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/">
                  <img src="/logoo.jpg" alt="KLY-BANK Logo" className="h-10 w-auto" />
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="/"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  data-tr="Ana Sayfa"
                  data-en="Home"
                >
                  {getText("Ana Sayfa", "Home")}
                </a>
                <a
                  href="/urunler"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  data-tr="Hizmetler"
                  data-en="Services"
                >
                  {getText("Hizmetler", "Services")}
                </a>
                <a
                  href="/credi"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  data-tr="Krediler"
                  data-en="Loans"
                >
                  {getText("Krediler", "Loans")}
                </a>
                <a
                  href="/contact"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  data-tr="İletişim"
                  data-en="Contact"
                >
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
                <button
                  className="gradient-bg text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                  data-tr="Giriş Yap"
                  data-en="Login"
                >
                  {getText("Giriş Yap", "Login")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-6xl mx-auto p-10 bg-gray-100 min-h-screen pt-20">
        {/* Header with cart button */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold" data-tr="Ürünlerimiz" data-en="Our Products">
            {getText("Ürünlerimiz", "Our Products")}
          </h1>
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <ShoppingCart size={20} />
            <span data-tr="Sepet" data-en="Cart">{getText("Sepet", "Cart")}</span>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name[currentLanguage]}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{product.name[currentLanguage]}</h2>
                <p className="text-gray-700 mb-4">{product.description[currentLanguage]}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold text-green-600">{product.price.toLocaleString('tr-TR')}$</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Plus size={20} />
                    <span data-tr="Sepete Ekle" data-en="Add to Cart">
                      {getText("Sepete Ekle", "Add to Cart")}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Modal */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold" data-tr="Sepetim" data-en="My Cart">
                  {getText("Sepetim", "My Cart")}
                </h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-8" data-tr="Sepetiniz boş" data-en="Your cart is empty">
                  {getText("Sepetiniz boş", "Your cart is empty")}
                </p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name[currentLanguage]}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name[currentLanguage]}</h3>
                          <p className="text-green-600 font-bold">{item.price.toLocaleString('tr-TR')}$</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-200 hover:bg-gray-300 p-1 rounded"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="mx-2 font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-200 hover:bg-gray-300 p-1 rounded"
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-4 text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold" data-tr="Toplam" data-en="Total">
                        {getText("Toplam", "Total")}
                      </span>
                      <span className="text-xl font-bold text-green-600">{getTotalPrice().toLocaleString('tr-TR')}$</span>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setShowCart(false)}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                        data-tr="Alışverişe Devam Et"
                        data-en="Continue Shopping"
                      >
                        {getText("Alışverişe Devam Et", "Continue Shopping")}
                      </button>
                      <button
                        onClick={handleCheckout}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                        disabled={cart.length === 0}
                        data-tr="Sipariş Ver"
                        data-en="Place Order"
                      >
                        {getText("Sipariş Ver", "Place Order")}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
