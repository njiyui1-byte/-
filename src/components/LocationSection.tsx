import React, { useState } from "react";
import { Navigation, MapPin, Train, Bus, Car, Copy, Check, Info, Phone, MessageSquare } from "lucide-react";
import { motion } from "motion/react";

export default function LocationSection() {
  const [copied, setCopied] = useState(false);
  const fullAddress = "상동역 3번출구 길주로 80 로얄타워 2층 여성시대";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-black py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-1/2 left-2/3 w-80 h-80 bg-brand-purple/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-extrabold tracking-tight">
            LOCATION (오시는 길)
          </h2>
          <div className="w-12 h-0.5 bg-brand-purple mx-auto my-4 shadow-[0_0_8px_#a855f7]" />
          <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            상동역 번화가 중심지에 인접하여 교통이 매우 편리합니다. 
            처음 내방하시는 고객님이더라도 전철 출구를 나오시자마자 손쉽게 찾아오실 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Coordinates and detailed transport guidelines (5 columns) */}
          <div className="lg:col-span-5 bg-radial-card border border-purple-900/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Address details */}
              <div className="space-y-3">
                <div className="text-[10px] text-gray-550 uppercase tracking-widest font-semibold">VIP 룸 및 예약 데스크 주소</div>
                <div className="text-sm font-bold text-white leading-relaxed text-left">
                  {fullAddress}
                </div>
                
                {/* Copy CTA Button */}
                <button
                  id="copy-addr-btn"
                  onClick={handleCopyAddress}
                  className="px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-gray-300 hover:text-white text-[11px] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer mt-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-brand-gold" />
                      복사 완료!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      주소 텍스트 복사 (택시/네비 기재용)
                    </>
                  )}
                </button>
              </div>

              {/* Transit Guideline List */}
              <div className="space-y-4 border-t border-purple-950/40 pt-5 text-left">
                
                {/* Subway */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#3F582B]/10 border border-[#3F582B]/30 text-[#6FAF44] flex items-center justify-center flex-shrink-0">
                    <Train className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-200">지하철 이용 시 (7호선)</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed font-light">
                      상동역(7호선) <strong>3번 출구</strong>로 나오시면 바로 앞 로얄타워 2층에 위치하고 있습니다. 최고의 역세권으로 진입이 가장 수월합니다.
                    </p>
                  </div>
                </div>

                {/* Car/Parking */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400 flex items-center justify-center flex-shrink-0">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-200 font-sans">고객 차량 & 주차 지원</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed font-light">
                      로얄타워 건물 지하 주차장에 안전하고 넉넉한 공간이 완비되어 있으며, 방문 즉시 무료 주차권 제공 및 완벽 배려 케어가 이어집니다.
                    </p>
                  </div>
                </div>

                {/* Bus lines */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-brand-purple/10 border border-brand-purple/30 text-brand-purple-glow flex items-center justify-center flex-shrink-0">
                    <Bus className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-200">광역 및 지선 버스</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed font-light">
                      상동역3번출구.홈플러스 정류소 하차 (5-3, 23-2, 52, 50-1번 및 광역버스 노선 다수) 도보 1분 거리에 위치하고 있습니다.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Visual Free Sedan Escort Banner */}
            <div className="mt-8 bg-zinc-950 p-4 rounded-xl border border-purple-900/40 text-left space-y-1">
              <span className="text-[9px] bg-brand-gold/15 text-brand-gold border border-brand-gold/30 px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wide">
                VIP FREE ECO SERVICE
              </span>
              <h5 className="text-xs font-bold text-white pt-1">
                상동 및 부천 인근 무상 픽업 안심 에스코트
              </h5>
              <p className="text-[10px] text-gray-500 font-light leading-relaxed">
                대표 핫라인 유선 문의 시 탑승 희망하시는 출발 지점(상동역, 중동, 송내 등)을 말씀해 주시면 전용 세단으로 가볍게 모시러 가겠습니다.
              </p>
            </div>

          </div>

          {/* Right panel: High Quality Specially Designed Vector Map (7 columns) */}
          <div className="lg:col-span-7 bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-brand-purple-glow" />
                  PREMIUM VIP MAP (자체 제작 안심 약도)
                </h3>
                <span className="flex items-center gap-1 text-[9.5px] text-zinc-500">
                  <Info className="w-3 h-3 text-brand-gold" />
                  실시간 위치 가이드 작동중
                </span>
              </div>

              {/* Vector SVG Map Container with pulsating focal glow */}
              <div className="relative aspect-video w-full bg-zinc-950 rounded-xl border border-purple-950/45 p-1 overflow-hidden shadow-inner flex items-center justify-center">
                
                {/* Simulated Grid overlay lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

                {/* Styled Map SVG Graphic design */}
                <svg viewBox="0 0 400 220" className="w-full h-full relative z-10 text-gray-400">
                  {/* Styled roads (Slate-neon purple layout) */}
                  <path d="M 0,110 L 400,110" stroke="#1d1330" strokeWidth="24" strokeLinecap="round" fill="none" />
                  <path d="M 0,110 L 400,110" stroke="#4a154b" strokeWidth="2" strokeLinecap="round" strokeDasharray="3,3" fill="none" />
                  
                  <path d="M 120,0 L 120,220" stroke="#1d1330" strokeWidth="20" strokeLinecap="round" fill="none" />
                  <path d="M 280,0 L 280,220" stroke="#1d1330" strokeWidth="20" strokeLinecap="round" fill="none" />
                  
                  {/* Diagonal alleyways */}
                  <path d="M 120,110 Q 200,140 280,110" stroke="#100b1d" strokeWidth="12" fill="none" />

                  {/* Landmark nodes / shapes */}
                  {/* Sangdong station Exit 3 */}
                  <rect x="80" y="30" width="80" height="36" rx="4" fill="#080410" stroke="#251a3d" strokeWidth="1" />
                  <text x="120" y="52" fill="#888" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">상동역 사거리</text>
                  <circle cx="120" cy="110" r="4" fill="#6FAF44" />
                  <text x="120" y="125" fill="#6FAF44" fontSize="7" fontWeight="bold" textAnchor="middle">상동역 3번출구</text>

                  {/* Savezone landmark */}
                  <rect x="230" y="30" width="70" height="36" rx="4" fill="#080410" stroke="#251a3d" strokeWidth="1" />
                  <text x="265" y="52" fill="#555" fontSize="8" textAnchor="middle" fontFamily="sans-serif">세이브존 상동</text>
                  <circle cx="280" cy="110" r="3.5" fill="#555" />

                  {/* Sangdong Food Street Terminal */}
                  <rect x="40" y="150" width="80" height="36" rx="4" fill="#080410" stroke="#181126" strokeWidth="1" />
                  <text x="80" y="172" fill="#555" fontSize="8" textAnchor="middle" fontFamily="sans-serif">상동 먹자골목</text>

                  {/* OUR PRESTIGE TARGET LOUNGE: Pulsating spot */}
                  <g transform="translate(210, 110)">
                    {/* Pulsating back circle animation */}
                    <circle cx="0" cy="-20" r="14" fill="#a855f7" opacity="0.2" className="animate-ping" />
                    <circle cx="0" cy="-20" r="8" fill="#d4af37" opacity="0.3" className="animate-pulse" />
                    <path d="M -8,-20 Q 0,-36 8,-20 A 8 8 0 0 1 -8,-20" fill="url(#vipGradient)" />
                    <circle cx="0" cy="-20" r="4" fill="#a855f7" />
                    
                    {/* SVG Gradients definitions */}
                    <defs>
                      <linearGradient id="vipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d4af37" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </g>

                  {/* Brand Tag popup text on map */}
                  <rect x="160" y="65" width="105" height="18" rx="3" fill="#130a21" stroke="#a855f7" strokeWidth="1" />
                  <text x="212.5" y="77" fill="#c084fc" fontSize="7.5" fontWeight="extrabold" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.05em">여성시대 PREMIUM 2F</text>
                  <line x1="212.5" y1="83" x2="212.5" y2="90" stroke="#a855f7" strokeWidth="1" />

                </svg>

                {/* Legend panel inside map overlay */}
                <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur border border-purple-950/50 p-2 rounded-lg text-[9px] text-gray-400 space-y-1 relative z-20">
                  <div className="flex items-center gap-1.5">
                     <span className="inline-block w-2.5 h-2.5 bg-brand-purple rounded-full animate-pulse" />
                     <strong className="text-white">여성시대 프리미엄 VIP라운지</strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 bg-[#6FAF44] rounded-full" />
                    <span>상동역 3번출구 바로 앞 2층</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Consultation footer button inside route section */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-purple-950/20 mt-4">
              <a
                href="tel:010-3608-8908"
                className="py-3.5 bg-zinc-900 border border-purple-950/40 text-gray-300 font-extrabold text-xs text-center rounded-xl transition-all hover:bg-brand-purple/10 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-brand-purple-glow" />
                도착 직전 안내전화
              </a>
              <a
                className="py-3.5 bg-gradient-to-r from-brand-purple to-purple-900 text-white font-extrabold text-xs text-center rounded-xl shadow-neon-purple flex items-center justify-center gap-1.5 hover:scale-105 transition-transform"
                href="https://open.kakao.com/"
                target="_blank"
                rel="noreferrer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                카톡 픽업 지시하기
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
