import React, { useState, useEffect } from "react";
import { Host, Announcement, PremiumEvent, Booking } from "./types";
import { DEFAULT_HOSTS, DEFAULT_ANNOUNCEMENTS, DEFAULT_EVENTS, DEFAULT_BOOKINGS } from "./mockData";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import HostList from "./components/HostList";
import BookingForm from "./components/BookingForm";
import AnnouncementBoard from "./components/AnnouncementBoard";
import LocationSection from "./components/LocationSection";
import AdminDashboard from "./components/AdminDashboard";
import { Sparkles, Phone, MessageSquare, ShieldCheck, Heart, Eye, ArrowRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [prefilledHostName, setPrefilledHostName] = useState<string>("");

  // Storage states
  const [hosts, setHosts] = useState<Host[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<PremiumEvent[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Synchronize dynamic LocalStorage persistence
  useEffect(() => {
    // 1. Hosts
    const cachedHosts = localStorage.getItem("yeoseongsidae-premium-hosts-v3");
    if (cachedHosts) {
      setHosts(JSON.parse(cachedHosts));
    } else {
      setHosts(DEFAULT_HOSTS);
      localStorage.setItem("yeoseongsidae-premium-hosts-v3", JSON.stringify(DEFAULT_HOSTS));
    }

    // 2. Announcements
    const cachedAnns = localStorage.getItem("yeoseongsidae-premium-anns-v3");
    if (cachedAnns) {
      setAnnouncements(JSON.parse(cachedAnns));
    } else {
      setAnnouncements(DEFAULT_ANNOUNCEMENTS);
      localStorage.setItem("yeoseongsidae-premium-anns-v3", JSON.stringify(DEFAULT_ANNOUNCEMENTS));
    }

    // 3. Bookings
    const cachedBookings = localStorage.getItem("yeoseongsidae-premium-bookings-v3");
    if (cachedBookings) {
      setBookings(JSON.parse(cachedBookings));
    } else {
      setBookings(DEFAULT_BOOKINGS);
      localStorage.setItem("yeoseongsidae-premium-bookings-v3", JSON.stringify(DEFAULT_BOOKINGS));
    }

    // 4. Events
    setEvents(DEFAULT_EVENTS);
  }, []);

  const updateHostsState = (newHosts: Host[]) => {
    setHosts(newHosts);
    localStorage.setItem("yeoseongsidae-premium-hosts-v3", JSON.stringify(newHosts));
  };

  const updateAnnouncementsState = (newAnns: Announcement[]) => {
    setAnnouncements(newAnns);
    localStorage.setItem("yeoseongsidae-premium-anns-v3", JSON.stringify(newAnns));
  };

  const updateBookingsState = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem("yeoseongsidae-premium-bookings-v3", JSON.stringify(newBookings));
  };

  // Dedicated modifiers
  const handleHostUpdate = (updatedHost: Host) => {
    const updated = hosts.map(h => h.id === updatedHost.id ? updatedHost : h);
    updateHostsState(updated);
  };

  const handleAnnouncementUpdate = (updatedAnn: Announcement) => {
    const updated = announcements.map(a => a.id === updatedAnn.id ? updatedAnn : a);
    updateAnnouncementsState(updated);
  };

  const handleAddBooking = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    updateBookingsState(updated);
  };

  const handleGoToBookingWithHost = (hostName: string) => {
    setPrefilledHostName(hostName);
    setCurrentTab("booking");
  };

  const handleClearPrefilledHost = () => {
    setPrefilledHostName("");
  };

  // Extract Premium top hosts for home landing showcase
  const premiumHosts = hosts.filter(h => h.isPremium).slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col justify-between selection:bg-brand-purple selection:text-white">
      
      {/* Dynamic Header & Navigation */}
      <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} isAdmin={isAdmin} />

      {/* Main Container Workspace */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tab 1: HOME PANEL */}
            {currentTab === "home" && (
              <div className="space-y-16">
                
                {/* Hero deck presentation */}
                <HeroSection
                  onExploreHosts={() => setCurrentTab("hosts")}
                  onGoToBooking={() => setCurrentTab("booking")}
                />

                {/* Sub Showcase: Premium Host Highlight Carousel/Grid */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-[10px] text-brand-gold uppercase tracking-widest font-extrabold bg-brand-gold/15 px-3 py-1 rounded-full border border-brand-gold/30 inline-flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      PREMIUM ACE SPECIAL SHIELD
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-white font-extrabold mt-4 tracking-tight">
                      금주 인기 에이스 쇼케이스
                    </h2>
                    <div className="w-12 h-0.5 bg-brand-purple mx-auto my-3 shadow-[0_0_8px_#a855f7]" />
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      지정 예약 및 초이스 대기율 1위에 빛나는 에이스 매니저들을 미리 만나보세요.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {premiumHosts.map((host) => (
                      <div
                        id={`home-premium-${host.id}`}
                        key={host.id}
                        onClick={() => {
                          setCurrentTab("hosts");
                          // Let them trigger the modal by showing hosts list
                        }}
                        className="group bg-zinc-950/60 border border-zinc-900/80 rounded-xl overflow-hidden cursor-pointer hover:border-brand-purple/40 transition-all duration-300 shadow-md flex flex-col"
                      >
                        <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden">
                          <img
                            referrerPolicy="no-referrer"
                            src={host.imageUrl}
                            alt={host.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                          
                          <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-gradient-to-r from-brand-gold to-yellow-600 text-black text-[9px] font-extrabold uppercase tracking-wide rounded-sm shadow">
                            BEST PREMIUM
                          </span>

                          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                            <div>
                              <div className="text-xs text-brand-purple-glow font-bold uppercase">{host.category} DIVISION</div>
                              <h3 className="font-serif text-lg font-bold text-white mt-0.5">{host.name}</h3>
                            </div>
                            <span className="text-xs font-mono font-bold text-brand-gold flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-brand-gold" />
                              {host.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>

                        <div className="p-4 flex-grow flex flex-col justify-between space-y-3 bg-zinc-950/20">
                          <div className="flex flex-wrap gap-1.5">
                            {host.styleKeywords.slice(0, 3).map((kw, i) => (
                              <span key={i} className="text-[10px] bg-purple-950/20 text-brand-purple-glow font-bold px-2 py-0.5 rounded border border-purple-950/30">
                                #{kw}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed">
                            {host.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-10">
                    <button
                      onClick={() => setCurrentTab("hosts")}
                      className="inline-flex items-center gap-1.5 px-6 py-3 bg-zinc-950 border border-zinc-800 hover:border-brand-purple rounded-lg text-xs font-bold text-gray-300 hover:text-brand-purple-glow transition-all cursor-pointer"
                    >
                      전체 선수단 라인업 및 상세 정보 관람하기
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </section>

                {/* Sub Showcase: Transparent Fair pricing compliance guidelines */}
                <section className="bg-zinc-950/45 border-y border-purple-950/20 py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      <div className="lg:col-span-4 space-y-3">
                        <span className="text-[10px] text-brand-purple-glow uppercase tracking-widest font-extrabold">TRANSPARENT SYSTEM</span>
                        <h3 className="font-serif text-2xl sm:text-3xl text-white font-extrabold">안심 정찰 가이드 수칙</h3>
                        <p className="text-xs text-gray-450 leading-relaxed font-light font-sans">
                          여성시대 프리미엄 공식 보증 파트너는 음색 사설 제도를 전면 거절하며, 
                          투명하고 신뢰성 높은 바 운영 시책을 공수하고 있습니다.
                        </p>
                      </div>

                      <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-5 rounded-lg bg-black/60 border border-zinc-900 text-left space-y-2">
                          <h4 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-zinc-900 pb-2">
                            <ShieldCheck className="w-4.5 h-4.5 text-brand-gold" />
                            추가 거품 일치 상쇄
                          </h4>
                          <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                            정직하고 합리적인 주류 세트 정찰가 시스템을 도입하여, 고객님이 사전에 확인하신 정량 단가 외의 별도 불법 청구 또는 부당 위약금을 청구하지 않습니다.
                          </p>
                        </div>

                        <div className="p-5 rounded-lg bg-black/60 border border-zinc-900 text-left space-y-2">
                          <h4 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-zinc-900 pb-2">
                            <ShieldCheck className="w-4.5 h-4.5 text-brand-purple" />
                            강력 안전 프라이버시 백업
                          </h4>
                          <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                            지하 주차장 입구부터 전용 이동 엘리베이터 동선 확보, 개인 단체 맞춤 방음 부스를 기본 배치하여 고객님의 신상 정보와 출입 상황을 외부 유출 차단 보호해 드립니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            )}

            {/* Tab 2: HOSTS GALLERY */}
            {currentTab === "hosts" && (
              <HostList 
                hosts={hosts} 
                onHostUpdate={handleHostUpdate} 
                onGoToBookingWithHost={handleGoToBookingWithHost} 
              />
            )}

            {/* Tab 3: BOOKING FORM */}
            {currentTab === "booking" && (
              <BookingForm 
                onAddBooking={handleAddBooking} 
                prefilledHostName={prefilledHostName}
                onClearPrefilledHost={handleClearPrefilledHost}
              />
            )}

            {/* Tab 4: BOARD & EVENTS TAB */}
            {currentTab === "board" && (
              <AnnouncementBoard 
                announcements={announcements} 
                events={events} 
                onAnnouncementUpdate={handleAnnouncementUpdate} 
              />
            )}

            {/* Tab 5: LOCATION DETAILS */}
            {currentTab === "location" && (
              <LocationSection />
            )}

            {/* Tab 6: ADMIN CONTROL DASHBOARD */}
            {currentTab === "admin" && (
              <AdminDashboard
                hosts={hosts}
                announcements={announcements}
                events={events}
                bookings={bookings}
                isAdmin={isAdmin}
                onSetIsAdmin={setIsAdmin}
                onUpdateHosts={updateHostsState}
                onUpdateAnnouncements={updateAnnouncementsState}
                onUpdateEvents={setEvents}
                onUpdateBookings={updateBookingsState}
              />
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* Exquisite footer with premium contacts, legal guidelines, and age warnings */}
      <footer className="bg-zinc-950 border-t border-purple-950/40 pt-16 pb-24 sm:pb-12 text-left relative z-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-zinc-900/60">
            
            {/* Logo/Footer copy column (5 columns) */}
            <div className="md:col-span-12 lg:col-span-5 space-y-4">
              <div className="flex flex-col items-start">
                <span className="font-serif text-lg sm:text-xl font-extrabold tracking-widest text-white text-glow-purple">
                  여성시대 <span className="text-xs text-brand-gold font-sans bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/30">PREMIUM</span>
                </span>
                <span className="text-[8.5px] font-serif tracking-[0.35em] text-gray-550 uppercase">
                  VIP EXECUTIVE PRIVATE CLUB
                </span>
              </div>
              <p className="text-xs text-gray-550 max-w-sm font-light leading-relaxed font-sans">
                여성시대 프리미엄 공식 홍보 예약 센터는 부천 지역 최고의 하이클래스 멤버들을 엄선하여 
                당신만을 위한 고결하고 아름다운 휴식 시간을 24시간 책임져 드립니다.
              </p>
            </div>

            {/* Contacts Column (4 columns) */}
            <div className="md:col-span-12 lg:col-span-4 space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                VIP DIRECT CONTACT CARDS
              </h4>
              <ul className="space-y-2 text-xs font-light text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-550 min-w-[70px]">대표 핫라인</span>
                  <a href="tel:010-3608-8908" className="font-bold text-brand-purple-glow hover:underline text-glow-purple">010-3608-8908</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-550 min-w-[70px]">카카오톡 ID</span>
                  <span className="font-mono text-gray-200">njio1 (24시 상시 비밀부킹)</span>
                </li>
              </ul>
            </div>

            {/* Links columns (3 columns) */}
            <div className="md:col-span-12 lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                PREMIUM QUICK DIRECTORY
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button onClick={() => setCurrentTab("home")} className="text-left text-gray-500 hover:text-white transition-colors cursor-pointer">홈 소개</button>
                <button onClick={() => setCurrentTab("hosts")} className="text-left text-gray-500 hover:text-white transition-colors cursor-pointer">선수단 갤러리</button>
                <button onClick={() => setCurrentTab("booking")} className="text-left text-gray-500 hover:text-white transition-colors cursor-pointer">실시간 부킹 폼</button>
                <button onClick={() => setCurrentTab("board")} className="text-left text-gray-500 hover:text-white transition-colors cursor-pointer">이벤트 소식지</button>
                <button onClick={() => setCurrentTab("location")} className="text-left text-gray-500 hover:text-white transition-colors cursor-pointer">오시는 길 약도</button>
                <button onClick={() => setCurrentTab("admin")} className="text-left text-gray-500 hover:text-white transition-colors cursor-pointer">VIP CMS 포털</button>
              </div>
            </div>

          </div>

          {/* Core Critical Warning Frame (Regulatory Warning) */}
          <div className="p-5 rounded-xl bg-red-950/5 border border-red-950/25 space-y-3 select-none text-left">
            <h5 className="text-[10px] sm:text-xs font-extrabold text-red-400 uppercase tracking-widest flex items-center gap-2 leading-none">
              ⚠️ 미성년자(청소년) 출입 및 예약 영구 보장 금지 고지
            </h5>
            <p className="text-[10.5px] text-gray-500 leading-relaxed font-light font-sans">
              여성시대 프리미엄 공식 플랫폼은 <strong>청소년보호법</strong> 규정을 엄격히 준수합니다. 본 웹사이트에서 송출하는 호스트 주류 케어, 테마 정보, 서비스 소개서는 만 19세 이상의 성인을 위한 콘텐츠입니다. 
              미성년자인 19세 미만 청소년은 이용이 전면 제한되며, 매장 부킹 또는 픽업 진행 단계에서 정부 공식 모바일 신분증 검사를 완벽히 요구합니다. 신분증 도용 및 가짜 성인 양식을 제출하시는 경우 고지 없이 즉시 법적 처분 대행될 수 있음을 무겁게 알립니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between items-center text-[10px] text-gray-650 space-y-3 sm:space-y-0 text-gray-600 font-mono">
            <span>© 2026 여성시대 프리미엄 공식 플랫폼. All Rights Secured.</span>
            <span className="hover:text-brand-purple transition-all cursor-pointer" onClick={() => setCurrentTab("admin")}>
              VIP Executive Portal Authorized Entry
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}
