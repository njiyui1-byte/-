import React, { useState } from "react";
import { Phone, CheckCircle, MessageSquare, Award, Shield, Sparkles, Navigation as NavIcon, Copy, Check } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onExploreHosts: () => void;
  onGoToBooking: () => void;
}

export default function HeroSection({ onExploreHosts, onGoToBooking }: HeroSectionProps) {
  const [copiedText, setCopiedText] = useState("");

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2200);
  };

  const USPs = [
    {
      icon: <Award className="w-6 h-6 text-brand-gold" />,
      title: "엄선된 에이스 선수단",
      desc: "평균 신장 182cm+, 패션 모델 비율의 스타일리시한 최상급 비주얼과 위트 있는 대화 매너를 갖춘 인재만을 고집합니다."
    },
    {
      icon: <Shield className="w-6 h-6 text-brand-purple-glow" />,
      title: "완벽한 프라이버시 보장",
      desc: "지하 주차장 직통 VIP 전용 통로 및 철저한 방음 개별 럭셔리 룸 구성으로, 고객님의 사생활과 방문을 안전하게 보호합니다."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-yellow-500" />,
      title: "속임수 없는 투명 정찰제",
      desc: "불투명한 임의 요금 청구 방식과 결탁하지 않습니다. 명확한 프리미엄 단품 주류 세트 및 시간 서비스 정가를 엄격히 준수합니다."
    },
    {
      icon: <NavIcon className="w-6 h-6 text-emerald-400" />,
      title: "무상 스마트 에스코트",
      desc: "고객님의 기대를 소중히 받듭니다. 부천 전철역 및 인근 지역 내에서 연락 주시면, 최고급 세단으로 안전하게 픽업해 드립니다."
    }
  ];

  return (
    <div className="relative overflow-hidden bg-radial-luxury">
      
      {/* Visual background accents */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-purple/15 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-purple-900/20 rounded-full filter blur-[120px] pointer-events-none" />
      
      {/* Decorative top grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,10,33,0.15)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(18,10,33,0.15)_1.5px,transparent_1.5px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />

      {/* Hero Outer Wrapper */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 lg:pt-20 lg:pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Visual copy column (Left) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-purple-glow text-xs font-bold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
              여성시대 공식 No.1 호스트클럽 파트너십
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight"
            >
              당신의 소중한 시간을<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-glow to-brand-gold text-glow-purple">
                가장 찬란하게 빛나는 순간
              </span>
              으로
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-base sm:text-lg max-w-2xl font-light leading-relaxed font-sans"
            >
              여성시대 프리미엄은 최고만을 고집하시는 귀하를 위해 탄생한 프리미엄 컴패니언 공간입니다.
              기품 넘치는 에이스 매니저들의 세심한 케어와 엄선된 명품 보틀, 최고 수준의 VIP 독립 룸에서 잊지 못할 밤의 예술을 향유해 보세요.
            </motion.p>

            {/* Direct Call to Action Blocks */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <a
                id="hero-main-call"
                href="tel:010-3608-8908"
                className="px-8 py-5 rounded-xl bg-gradient-to-r from-brand-purple via-purple-700 to-purple-900 text-white font-extrabold text-sm tracking-wider shadow-[0_4px_25px_rgba(168,85,247,0.4)] hover:shadow-[0_4px_35px_rgba(168,85,247,0.6)] flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-5 h-5 animate-pulse text-brand-gold" />
                24시 대표 직통 연결 (클릭)
              </a>
              
              <button
                id="hero-main-explore"
                onClick={onExploreHosts}
                className="px-8 py-5 rounded-xl bg-zinc-950/80 hover:bg-zinc-900 border border-brand-purple/40 hover:border-brand-purple text-brand-purple-glow font-bold text-sm tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
              >
                선수단 전원 보기
              </button>
            </motion.div>

            {/* Instant Social Channels Grid with Copy Utility */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-6 border-t border-purple-950/40 max-w-xl"
            >
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                실시간 1:1 온라인 상담 창구
              </h3>
              <div className="grid grid-cols-1 gap-3 max-w-sm">
                {/* Kakao contact */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#Fee500]/5 border border-[#Fee500]/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#Fee500] flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-[#191919] fill-[#191919]" />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-550">카카오톡 ID</div>
                      <div className="text-xs font-bold text-gray-300">njio1</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy("njio1", "카카오 ID")}
                    className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors cursor-pointer"
                    title="ID 복사하기"
                  >
                    {copiedText === "카카오 ID" ? <Check className="w-3.5 h-3.5 text-brand-gold" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              {copiedText && (
                <p className="text-xs text-brand-gold text-right mt-1.5 font-medium">
                  ✓ {copiedText}가 클립보드에 성공적으로 복사되었습니다.
                </p>
              )}
            </motion.div>
          </div>

          {/* Luxury Promotional Card Widget (Right) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-md bg-radial-card border border-purple-900/40 rounded-2xl p-6 sm:p-8 relative shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              {/* Premium Glow Edge */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-purple via-brand-gold to-purple-900" />
              
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white text-glow-purple">
                      VIP PREMIUM PLAN
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 font-light">당신만을 위한 맞춤형 힐링 세트</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-brand-gold/15 text-brand-gold text-[10px] uppercase font-bold tracking-widest border border-brand-gold/30">
                    SPECIAL OFFERS
                  </span>
                </div>

                <div className="space-y-4 pt-1">
                  <div className="flex justify-between items-center py-2.5 border-b border-purple-950/50">
                    <span className="text-xs text-gray-400">골드 프리미엄 세트</span>
                    <span className="text-xs sm:text-sm font-bold text-white">업계 최저 정찰제 적용</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-purple-950/50">
                    <span className="text-xs text-gray-400">초이스 무제한 서비스</span>
                    <span className="text-xs sm:text-sm font-bold text-brand-purple-glow">고객 대기실 항시 대원 30명+</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-purple-950/50">
                    <span className="text-xs text-gray-400">인근 전지역 리무진 픽업</span>
                    <span className="text-xs sm:text-sm font-bold text-green-400">초대 프리 무료</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5">
                    <span className="text-xs text-gray-400">주차 시설 관리 데스크</span>
                    <span className="text-xs sm:text-sm font-bold text-white">발렛 파킹 100% 무상</span>
                  </div>
                </div>

                {/* Direct quick action */}
                <button
                  id="hero-quick-book"
                  onClick={onGoToBooking}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-gold/10 to-brand-purple/20 border border-brand-gold/40 hover:border-brand-purple text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-brand-purple/20 cursor-pointer shadow-[inset_0_0_10px_rgba(212,175,55,0.1)] flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-brand-gold" />
                  실시간 간편 부킹 신청
                </button>

                <div className="text-center">
                  <p className="text-[10px] text-gray-500">
                    * 저희 플랫폼은 100% 신뢰할 수 있는 투명안심 운영을 원칙으로 삼고 있습니다.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Unique Selling Points Grid */}
        <div id="usp-section" className="mt-28 lg:mt-36">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-extrabold tracking-tight">
              WHY YEOSEONGSIDAE PREMIUM?
            </h2>
            <div className="w-12 h-0.5 bg-brand-purple mx-auto my-4 shadow-[0_0_8px_#a855f7]" />
            <p className="text-xs sm:text-sm text-gray-400 font-light">
              부천 일대에서 차별화된 압도적 규모와 우아한 신사 제휴 시스템을 제안합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {USPs.map((usp, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-zinc-950/60 border border-zinc-900/80 hover:border-purple-900/40 relative shadow-sm group hover:scale-[1.02] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-zinc-900/60 flex items-center justify-center mb-5 border border-zinc-800">
                  {usp.icon}
                </div>
                <h4 className="text-sm font-bold text-white tracking-wide mb-2.5">
                  {usp.title}
                </h4>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {usp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
