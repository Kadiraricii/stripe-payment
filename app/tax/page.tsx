"use client";

import React, { useEffect, useState } from "react";
import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Checkout() {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartData = sessionStorage.getItem("cartData");
      if (cartData) {
        const parsed = JSON.parse(cartData);
        setAmount(parsed.total || 0);
      }
    }
  }, []);

  if (amount === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Sepet boş veya toplam tutar bulunamadı.</p>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes float1 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(30px, -20px) rotate(90deg) scale(1.1);
          }
          50% {
            transform: translate(-20px, -40px) rotate(180deg) scale(0.9);
          }
          75% {
            transform: translate(-40px, 10px) rotate(270deg) scale(1.05);
          }
        }

        @keyframes float2 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          33% {
            transform: translate(-40px, 30px) rotate(120deg) scale(1.2);
          }
          66% {
            transform: translate(20px, -30px) rotate(240deg) scale(0.8);
          }
        }

        @keyframes float3 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          20% {
            transform: translate(25px, -15px) rotate(72deg) scale(1.1);
          }
          40% {
            transform: translate(-15px, -30px) rotate(144deg) scale(0.9);
          }
          60% {
            transform: translate(-35px, 20px) rotate(216deg) scale(1.15);
          }
          80% {
            transform: translate(10px, 35px) rotate(288deg) scale(0.95);
          }
        }

        @keyframes float4 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          50% {
            transform: translate(-50px, -50px) rotate(180deg) scale(1.3);
          }
        }

        @keyframes float5 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(60px, 20px) rotate(90deg) scale(1.4);
          }
          50% {
            transform: translate(40px, -40px) rotate(180deg) scale(0.7);
          }
          75% {
            transform: translate(-20px, -20px) rotate(270deg) scale(1.2);
          }
        }

        @keyframes float6 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          30% {
            transform: translate(-30px, -25px) rotate(108deg) scale(1.1);
          }
          60% {
            transform: translate(35px, 15px) rotate(216deg) scale(0.85);
          }
        }

        @keyframes particle1 {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100vh) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes particle2 {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100vh) translateX(-30px) rotate(-360deg);
            opacity: 0;
          }
        }

        @keyframes particle3 {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100vh) translateX(80px) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes particle4 {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100vh) translateX(-60px) rotate(-720deg);
            opacity: 0;
          }
        }

        @keyframes particle5 {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100vh) translateX(20px) rotate(540deg);
            opacity: 0;
          }
        }

        @keyframes lightBeam1 {
          0%,
          100% {
            opacity: 0;
            transform: translateX(-50px) skewX(-10deg);
          }
          50% {
            opacity: 0.6;
            transform: translateX(50px) skewX(10deg);
          }
        }

        @keyframes lightBeam2 {
          0%,
          100% {
            opacity: 0;
            transform: translateX(30px) skewX(15deg);
          }
          50% {
            opacity: 0.4;
            transform: translateX(-30px) skewX(-15deg);
          }
        }

        @keyframes rotate1 {
          from {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
          }
          to {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes rotate2 {
          from {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(0.8);
          }
          to {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes wave {
          0%,
          100% {
            clip-path: polygon(0 50%, 100% 80%, 100% 100%, 0% 100%);
          }
          50% {
            clip-path: polygon(0 80%, 100% 50%, 100% 100%, 0% 100%);
          }
        }
      `}</style>

      <div
        className="min-h-screen relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #f0fdf4 0%, #dbeafe 25%, #faf5ff 50%, #fdf2f8 75%, #f0fdf4 100%)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 15s ease infinite",
        }}
      >
        {/* Floating Elements */}
        <div
          className="absolute w-20 h-20 rounded-full opacity-60 blur-sm top-[10%] left-[10%]"
          style={{
            background: "linear-gradient(135deg, #10b981, #34d399)",
            animation: "float1 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-30 h-30 rounded-full opacity-60 blur-sm top-[20%] right-[15%]"
          style={{
            background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
            animation: "float2 10s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-15 h-15 rounded-full opacity-60 blur-sm bottom-[30%] left-[20%]"
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
            animation: "float3 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-25 h-25 rounded-full opacity-60 blur-sm bottom-[15%] right-[25%]"
          style={{
            background: "linear-gradient(135deg, #ec4899, #f472b6)",
            animation: "float4 9s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-10 h-10 rounded-full opacity-60 blur-sm top-[50%] left-[5%]"
          style={{
            background: "linear-gradient(135deg, #06b6d4, #67e8f9)",
            animation: "float5 7s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[90px] h-[90px] rounded-full opacity-60 blur-sm top-[70%] right-[10%]"
          style={{
            background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
            animation: "float6 11s ease-in-out infinite",
          }}
        />

        {/* Particles */}
        <div
          className="absolute w-1 h-1 bg-emerald-500 rounded-full opacity-70 top-[20%] left-[30%]"
          style={{ animation: "particle1 6s linear infinite" }}
        />
        <div
          className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-70 top-[60%] left-[70%]"
          style={{ animation: "particle2 8s linear infinite" }}
        />
        <div
          className="absolute w-1 h-1 bg-purple-500 rounded-full opacity-70 top-[80%] left-[20%]"
          style={{ animation: "particle3 5s linear infinite" }}
        />
        <div
          className="absolute w-1 h-1 bg-pink-500 rounded-full opacity-70 top-[40%] left-[80%]"
          style={{ animation: "particle4 7s linear infinite" }}
        />
        <div
          className="absolute w-1 h-1 bg-cyan-500 rounded-full opacity-70 top-[10%] left-[60%]"
          style={{ animation: "particle5 9s linear infinite" }}
        />

        {/* Light Beams */}
        <div
          className="absolute w-0.5 h-screen left-[25%] opacity-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)",
            animation: "lightBeam1 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-0.5 h-screen left-[75%] opacity-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)",
            animation: "lightBeam2 15s ease-in-out infinite",
          }}
        />

        {/* Rotating Gradients */}
        <div
          className="absolute w-[200px] h-[200px] rounded-full opacity-10 blur-sm top-[30%] left-[40%]"
          style={{
            background:
              "conic-gradient(from 0deg, #10b981, #3b82f6, #8b5cf6, #ec4899, #10b981)",
            animation: "rotate1 20s linear infinite",
          }}
        />
        <div
          className="absolute w-[200px] h-[200px] rounded-full opacity-10 blur-sm bottom-[20%] right-[30%]"
          style={{
            background:
              "conic-gradient(from 0deg, #10b981, #3b82f6, #8b5cf6, #ec4899, #10b981)",
            animation: "rotate2 25s linear infinite reverse",
          }}
        />

        {/* Wave Effect */}
        <div
          className="absolute bottom-0 left-0 w-full h-25 opacity-10"
          style={{
            background: "linear-gradient(to top, rgba(16, 185, 129, 0.1), transparent)",
            clipPath: "polygon(0 50%, 100% 80%, 100% 100%, 0% 100%)",
            animation: "wave 8s ease-in-out infinite",
          }}
        />

        {/* Content */}
        <main className="relative z-10 max-w-2xl mx-auto p-25 text-blue-950 text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500/1 to-purple-500/1 backdrop-blur-sm">
          <div className="mb-10">
            <img  src="/logom.png"></img>
            <h2 className="text-2xl">
              <span className="font-bold"> ${amount.toFixed(2)}</span>
            </h2>
          </div>
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(amount),
              currency: "usd",
            }}
          >
            <CheckoutPage amount={amount} />
          </Elements>
        </main>
      </div>
    </>
  );
}