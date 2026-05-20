import React, { useState } from "react";
import { Host } from "../types";
import { Star, Eye, Heart, ArrowUpDown, ChevronRight, X, Phone, MessageSquare, Award, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HostListProps {
  hosts: Host[];
  onHostUpdate: (updatedHost: Host) => void;
  onGoToBookingWithHost: (hostName: string) => void;
}

export default function HostList({ hosts, onHostUpdate, onGoToBookingWithHost }: HostListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [sortOption, setSortOption] = useState<string>("POPULARITY");
  const [selectedHost, setSelectedHost] = useState<Host | null>(null);

  const categories = [
    { id: "ALL", label: "전체 선수단" },
    { id: "MODEL", label: "MODEL (모델계)" },
    { id: "DANDY", label: "DANDY (댄디 슈트)" },
    { id: "SEXY", label: "SEXY (옴므파탈)" },
    { id: "CUTE", label: "CUTE (심쿵 미소)" }
  ];

  const handleHostClick = (host: Host) => {
    // Increment view count dynamically
    const updated = { ...host, viewCount: host.viewCount + 1 };
    onHostUpdate(updated);
    setSelectedHost(updated);
  };

  const handleLikeClick = (host: Host, e: React.MouseEvent) => {
    e.stopPropagation();
    // Increment likes
    const updated = { ...host, likes: host.likes + 1 };
    onHostUpdate(updated);
    if (selectedHost?.id === host.id) {
      setSelectedHost(updated);
    }
  };

  // Filter and sort mechanism
  const processedHosts = React.useMemo(() => {
    let filtered = [...hosts];
    if (selectedCategory !== "ALL") {
      filtered = filtered.filter(h => h.category === selectedCategory);
    }

    if (sortOption === "POPULARITY") {
      filtered.sort((a, b) => (b.viewCount + b.likes * 2) - (a.viewCount + a.likes * 2));
    } else if (sortOption === "HEIGHT") {
      filtered.sort((a, b) => b.height - a.height);
    } else if (sortOption === "AGE") {
      filtered.sort((a, b) => a.age - b.age);
    } else if (sortOption === "LIKES") {
      filtered.sort((a, b) => b.likes - a.likes);
    }

    return filtered;
  }, [hosts, selectedCategory, sortOption]);

  return (
    <div className="bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-extrabold tracking-tight">
            MEMBER LIST (선수단 소개)
          </h2>
          <div className="w-12 h-0.5 bg-brand-purple mx-auto my-4 shadow-[0_0_8px_#a855f7]" />
          <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            프리미엄 퀄리티를 최우선으로 엄선된 에이스 라인업을 상시 공개합니다. 
            원하시는 무드와 비주얼에 맞춘 밀착 매칭 상담도 24시간 지원해 드립니다.
          </p>
        </div>

        {/* Filter and Sorting Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-10 border-b border-purple-950/40">
          
          {/* Categories Tab list */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                id={`cat-filter-${cat.id}`}
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer border ${
                  selectedCategory === cat.id
                    ? "bg-brand-purple text-white border-brand-purple shadow-neon-purple"
                    : "bg-zinc-950/80 text-gray-400 border-zinc-900 hover:text-white hover:border-zinc-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort selection drop dropdown */}
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="w-4 h-4 text-brand-purple-glow" />
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-zinc-950 text-gray-300 text-xs font-bold rounded-lg border border-purple-900/40 py-2 pl-3 pr-8 focus:outline-none focus:border-brand-purple cursor-pointer"
            >
              <option value="POPULARITY">추천 인기순</option>
              <option value="HEIGHT">신장(키) 높은순</option>
              <option value="AGE">나이 젊은순</option>
              <option value="LIKES">좋아요 많은순</option>
            </select>
          </div>
        </div>

        {/* Members Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <AnimatePresence>
            {processedHosts.map((host) => (
              <motion.div
                layout
                id={`host-card-${host.id}`}
                key={host.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleHostClick(host)}
                className="group relative rounded-xl bg-zinc-950/60 border border-zinc-900 overflow-hidden cursor-pointer hover:border-brand-purple/50 transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] flex flex-col"
              >
                {/* Image & Badges box */}
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 flex-shrink-0">
                  <img
                    referrerPolicy="no-referrer"
                    src={host.imageUrl}
                    alt={host.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Backdrop vignette shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {host.isPremium && (
                      <span className="px-2.5 py-0.5 rounded-sm bg-gradient-to-r from-brand-gold to-yellow-600 text-black text-[9px] font-extrabold tracking-widest uppercase shadow">
                        PREMIUM 에이스
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-sm bg-black/70 backdrop-blur-sm text-brand-purple-glow text-[9px] font-bold border border-brand-purple/30">
                      {host.category === "MODEL" ? "모델 피지컬" : host.category === "DANDY" ? "젠틀 댄디" : host.category === "SEXY" ? "치명적 임팩트" : "애교 큐트"}
                    </span>
                  </div>

                  {/* Likes counter bubble top-right */}
                  <button
                    id={`like-btn-${host.id}`}
                    onClick={(e) => handleLikeClick(host, e)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-zinc-800 text-gray-300 hover:text-red-500 hover:bg-black/95 transition-colors cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </button>

                  {/* Visual key metrics block bottom line overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs text-gray-300 bg-black/45 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/5">
                    <span className="font-mono text-gray-400">키: <strong className="text-white">{host.height}cm</strong></span>
                    <span className="font-mono text-gray-400">나이: <strong className="text-white">{host.age}세</strong></span>
                    <span className="flex items-center gap-1 font-mono text-brand-gold">
                      <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
                      {host.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Info summary */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-brand-purple-glow transition-colors">
                        {host.name}
                      </h3>
                    </div>
                    
                    {/* Style tags list */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {host.styleKeywords.map((tag, i) => (
                        <span key={i} className="text-[10px] bg-purple-950/30 text-brand-purple-glow font-medium px-2 py-0.5 rounded border border-purple-950/50">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-gray-400 font-light line-clamp-2 mt-3 leading-relaxed">
                      {host.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-purple-950/20 flex items-center justify-between text-[10px] text-gray-500">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {host.viewCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5" />
                        {host.likes}
                      </span>
                    </div>
                    <span className="text-brand-purple-glow font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                      상세보기 <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {processedHosts.length === 0 && (
          <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl mt-12">
            <p className="text-sm text-gray-500">지정된 분류 항목에 해당되는 멤버가 없습니다.</p>
          </div>
        )}

        {/* Member Detail Presentation Modal */}
        <AnimatePresence>
          {selectedHost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Blur backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedHost(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
              />

              {/* Modal window */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="relative bg-zinc-950 border border-purple-900/60 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
              >
                {/* Close handle button */}
                <button
                  id="close-host-modal"
                  onClick={() => setSelectedHost(null)}
                  className="absolute top-4 right-4 z-20 p-2 bg-black/60 rounded-full text-gray-400 hover:text-white border border-zinc-800 hover:bg-black transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12">
                  
                  {/* Poster Image block (Left panel) */}
                  <div className="relative md:col-span-5 aspect-[4/5] md:aspect-auto md:h-full bg-zinc-900 min-h-[300px]">
                    <img
                      referrerPolicy="no-referrer"
                      src={selectedHost.imageUrl}
                      alt={selectedHost.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent md:bg-gradient-to-r md:from-transparent md:to-zinc-950/80" />
                    
                    {/* Likes/Views info left corner */}
                    <div className="absolute bottom-4 left-4 flex gap-3 text-xs text-white bg-black/70 backdrop-blur px-3 py-1.5 rounded-lg border border-white/5">
                      <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {selectedHost.viewCount} 조회</span>
                      <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> {selectedHost.likes} 추천</span>
                    </div>
                  </div>

                  {/* Profile data and intro statement panels (Right) */}
                  <div className="p-6 sm:p-8 md:col-span-7 space-y-6 flex flex-col justify-between">
                    <div>
                      {/* Top luxury badge line */}
                      <div className="flex gap-2">
                        {selectedHost.isPremium && (
                          <span className="px-2.5 py-0.5 rounded bg-brand-gold/20 text-brand-gold text-[9px] font-extrabold tracking-widest uppercase border border-brand-gold/30">
                            SPECIAL ACE
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded bg-brand-purple/20 text-brand-purple-glow text-[9px] font-bold uppercase tracking-wider border border-brand-purple/20">
                          {selectedHost.category} DIVISION
                        </span>
                      </div>

                      {/* Name & Basic metrics */}
                      <div className="mt-4 flex items-baseline gap-4">
                        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                          {selectedHost.name}
                        </h1>
                        <span className="text-brand-purple-glow text-sm font-semibold">{selectedHost.age}세 · {selectedHost.height}cm</span>
                      </div>

                      {/* Ratings star */}
                      <div className="flex items-center gap-1 mt-1.5">
                        <div className="flex text-brand-gold">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4.5 h-4.5 ${i < Math.floor(selectedHost.rating) ? "fill-brand-gold" : "opacity-30"}`} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400 font-bold ml-1">({selectedHost.rating.toFixed(1)} / 5.0)</span>
                      </div>

                      {/* Style characteristics */}
                      <div className="mt-5 space-y-1.5">
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Style Keywords</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedHost.styleKeywords.map((word, i) => (
                            <span key={i} className="text-xs bg-purple-950/20 text-brand-purple-glow font-semibold px-3 py-1 rounded-md border border-brand-purple/10">
                              #{word}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Personal Description */}
                      <div className="mt-6 space-y-2">
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">호스트 인사말</div>
                        <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed bg-zinc-900/40 p-3 rounded-lg border border-purple-950/20 italic">
                          "{selectedHost.description}"
                        </p>
                      </div>
                    </div>

                    {/* Booking CTAs and Action paths */}
                    <div className="pt-6 border-t border-purple-950/30 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          id="modal-quick-reserve"
                          onClick={() => {
                            onGoToBookingWithHost(selectedHost.name);
                            setSelectedHost(null);
                          }}
                          className="py-3.5 bg-brand-purple text-white rounded-xl text-xs font-bold shadow-neon-purple hover:shadow-neon-purple-hover tracking-wider text-center transition-all cursor-pointer"
                        >
                          {selectedHost.name} 지정 예약하기
                        </button>
                        <a
                          href="tel:010-3608-8908"
                          className="py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-purple-900/40 text-brand-purple-glow text-xs font-bold rounded-xl tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-brand-gold" />
                          실장 다이렉트 유선
                        </a>
                      </div>
                      
                      {/* Social 1:1 backup */}
                      <div className="flex justify-between items-center bg-black/60 p-2.5 rounded-lg border border-zinc-900/80">
                        <span className="text-[10px] text-gray-400">카카오톡 비밀 상담 ID : <strong className="text-white">njio1</strong></span>
                        <a
                          href="https://open.kakao.com/"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 px-2 py-1 bg-[#Fee500] text-[#191919] rounded font-extrabold text-[9px]"
                        >
                          <MessageSquare className="w-3 h-3 fill-[#191919]" />
                          빠른상담
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
