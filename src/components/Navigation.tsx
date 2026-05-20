import React, { useState } from "react";
import { Phone, Calendar, ShieldCheck, Menu, X, MessageSquare, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isAdmin: boolean;
}

export default function Navigation({ currentTab, setCurrentTab, isAdmin }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Phone click handler - direct dial simulation with visual response
  const handlePhoneCall = () => {
    window.location.href = "tel:010-3608-8908";
  };

  const navItems = [
    { id: "home", label: "HOME (소개)" },
    { id: "hosts", label: "MEMBER (선수단)" },
    { id: "booking", label: "RESERVATION (실시간 예약)" },
    { id: "board", label: "BOARD (공지&이벤트)" },
    { id: "location", label: "LOCATION (오시는 길)" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-glass border-b border-purple-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <button 
            id="nav-logo"
            onClick={() => setCurrentTab("home")}
            className="flex flex-col items-start cursor-pointer text-left"
          >
            <span className="font-serif text-xl sm:text-2xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-glow via-white to-brand-purple text-glow-purple">
              여성시대 <span className="text-xs tracking-normal font-sans text-brand-gold ml-1 font-medium bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/30">PREMIUM</span>
            </span>
            <span className="text-[9px] font-serif tracking-[0.35em] text-gray-550 uppercase">
              Luxury Executive Club
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`relative px-4 py-2 rounded-md text-sm font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? "text-brand-purple-glow font-bold text-glow-purple" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-line" 
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-brand-purple shadow-[0_0_10px_#a855f7]"
                    />
                  )}
                </button>
              );
            })}
            
            {/* Admin Dashboard Trigger */}
            <button
              id="nav-item-admin"
              onClick={() => setCurrentTab("admin")}
              className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 border transition-all duration-300 cursor-pointer ml-4 ${
                currentTab === "admin"
                  ? "bg-brand-purple/20 text-brand-purple-glow border-brand-purple"
                  : isAdmin
                    ? "border-brand-purple/50 text-brand-purple hover:bg-brand-purple/10"
                    : "border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-700"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              {isAdmin ? "ADMIN (관리중)" : "ADMIN LOGIN"}
            </button>
          </nav>

          {/* Call-to-action Contacts (Desktop) */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              id="header-call-btn"
              onClick={handlePhoneCall}
              className="px-4 py-2 bg-gradient-to-r from-brand-purple to-purple-900 border border-brand-purple/50 rounded-full text-xs font-bold shadow-neon-purple hover:shadow-neon-purple-hover text-white flex items-center gap-2 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 animate-bounce" />
              010-3608-8908
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={handlePhoneCall}
              className="p-2 bg-brand-purple/20 text-brand-purple-glow rounded-full border border-brand-purple/40 hover:bg-brand-purple/30 cursor-pointer"
              title="대표전화 바로연결"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-zinc-900/80 rounded-md border border-zinc-800 text-gray-400 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed top-20 left-0 w-full z-40 bg-black/95 backdrop-blur-xl border-b border-purple-950/50 py-6 px-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full py-3 px-4 rounded-lg text-left text-sm font-semibold tracking-wider transition-colors border-l-2 ${
                    currentTab === item.id
                      ? "bg-brand-purple/10 border-brand-purple text-brand-purple-glow font-bold text-glow-purple"
                      : "border-transparent text-gray-300 hover:bg-zinc-900/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => {
                  setCurrentTab("admin");
                  setMobileMenuOpen(false);
                }}
                className={`w-full py-3 px-4 rounded-lg text-left text-xs font-semibold tracking-wider transition-colors flex items-center gap-2 border-l-2 ${
                  currentTab === "admin"
                    ? "bg-brand-purple/10 border-brand-purple text-brand-purple-glow font-bold"
                    : "border-transparent text-gray-400 hover:bg-zinc-900/50"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                {isAdmin ? "ADMIN CONTROL DASHBOARD" : "ADMINISTRATOR LOGIN"}
              </button>

              {/* Direct mobile call link */}
              <div className="pt-4 border-t border-zinc-900 grid grid-cols-2 gap-3">
                <a
                  href="tel:010-3608-8908"
                  className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-brand-purple to-purple-900 rounded-xl text-xs font-extrabold text-white shadow-neon-purple"
                >
                  <Phone className="w-3.5 h-3.5" />
                  대표전화 연결
                </a>
                <a
                  href="https://open.kakao.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-[#Fee500] text-[#191919] rounded-xl text-xs font-extrabold"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-[#191919]" />
                  카톡 njio1 상담
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Contact Bar (Mobile Only) */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40 bg-zinc-950/90 backdrop-blur-md rounded-2xl border border-purple-950/80 p-3 grid grid-cols-3 gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <a
          id="float-call-btn"
          href="tel:010-3608-8908"
          className="flex flex-col items-center justify-center py-2 bg-gradient-to-b from-purple-800 to-brand-purple text-white rounded-xl text-[10px] font-bold"
        >
          <Phone className="w-4 h-4 mb-1" />
          유선 상담
        </a>
        <a
          id="float-kakao-btn"
          href="https://open.kakao.com/"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-2 bg-[#Fee500] text-[#191919] rounded-xl text-[10px] font-extrabold"
        >
          <MessageSquare className="w-4 h-4 mb-1 fill-[#191919]" />
          카톡: njio1
        </a>
        <button
          id="float-booking-btn"
          onClick={() => setCurrentTab("booking")}
          className="flex flex-col items-center justify-center py-2 bg-zinc-900 hover:bg-zinc-800 border border-purple-900/60 text-brand-purple-glow rounded-xl text-[10px] font-bold cursor-pointer"
        >
          <Calendar className="w-4 h-4 mb-1" />
          예약 접수
        </button>
      </div>
    </>
  );
}
