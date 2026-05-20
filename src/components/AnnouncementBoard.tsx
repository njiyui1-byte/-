import React, { useState } from "react";
import { Announcement, PremiumEvent } from "../types";
import { Calendar, User, Eye, ArrowRight, ShieldAlert, Gift, Tag, ChevronDown, ChevronUp, Sparkles, Phone, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AnnouncementBoardProps {
  announcements: Announcement[];
  events: PremiumEvent[];
  onAnnouncementUpdate: (updatedAnn: Announcement) => void;
}

export default function AnnouncementBoard({ announcements, events, onAnnouncementUpdate }: AnnouncementBoardProps) {
  const [activeSubTab, setActiveSubTab] = useState<"NOTICE" | "EVENT">("NOTICE");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const handleAnnouncementClick = (ann: Announcement) => {
    // Increase view count dynamically and save to state
    const updated = { ...ann, views: ann.views + 1 };
    onAnnouncementUpdate(updated);
    setSelectedAnnouncement(updated);
  };

  const toggleEventDetail = (id: string) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  return (
    <div className="bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Board Main Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-extrabold tracking-tight">
            BOARD & EVENT (공지사항 및 특별 제택)
          </h2>
          <div className="w-12 h-0.5 bg-brand-purple mx-auto my-4 shadow-[0_0_8px_#a855f7]" />
          <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            여성시대 프리미엄 공식 플랫폼의 공정 안심 규칙, 위생 안내문, 주류 정가 제도를 공개하고, 
            내방 고객님들이 누리실 수 있는 상시 이벤트 시그널을 안내해 드립니다.
          </p>
        </div>

        {/* Board Sub Tabs Row */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl p-1 bg-zinc-950/90 border border-purple-950/50">
            <button
              id="subtab-notice"
              onClick={() => setActiveSubTab("NOTICE")}
              className={`px-6 sm:px-8 py-3 rounded-lg text-xs sm:text-sm font-extrabold tracking-widest transition-all duration-300 cursor-pointer ${
                activeSubTab === "NOTICE"
                  ? "bg-brand-purple text-white shadow-neon-purple"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              공지사항 (ANNOUNCEMENTS)
            </button>
            <button
              id="subtab-event"
              onClick={() => setActiveSubTab("EVENT")}
              className={`px-6 sm:px-8 py-3 rounded-lg text-xs sm:text-sm font-extrabold tracking-widest transition-all duration-300 cursor-pointer ${
                activeSubTab === "EVENT"
                  ? "bg-brand-purple text-white shadow-neon-purple"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              상시 혜택 (VIP EVENTS)
            </button>
          </div>
        </div>

        {/* Dynamic Display Panel */}
        <AnimatePresence mode="wait">
          {activeSubTab === "NOTICE" ? (
            <motion.div
              key="notice-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Notice Table Headers (Desktop) */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-zinc-950/80 rounded-t-xl border-b border-purple-950/40 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <div className="col-span-1 text-center">분류</div>
                <div className="col-span-7">글 제목 및 공정 안내</div>
                <div className="col-span-2 text-center">게시처 부서</div>
                <div className="col-span-1 text-center">등록일</div>
                <div className="col-span-1 text-center">조회수</div>
              </div>

              {/* Announcements rendering */}
              <div className="divide-y divide-purple-950/20 bg-zinc-950/20 border border-zinc-900 rounded-b-xl overflow-hidden">
                {announcements.map((ann) => (
                  <div
                    id={`ann-row-${ann.id}`}
                    key={ann.id}
                    onClick={() => handleAnnouncementClick(ann)}
                    className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-5 sm:px-6 py-5 hover:bg-brand-purple/5 transition-colors cursor-pointer items-center text-left"
                  >
                    {/* Badge classification column */}
                    <div className="col-span-1 text-left md:text-center">
                      {ann.isImportant ? (
                        <span className="inline-block px-2 py-0.5 rounded bg-red-950/50 text-red-400 text-[10px] font-extrabold border border-red-900/40 tracking-wider">
                          중요필독
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded bg-zinc-900 text-gray-500 text-[10px] tracking-wider">
                          일반공지
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div className="col-span-1 md:col-span-7 space-y-1">
                      <h4 className={`text-xs sm:text-sm font-bold tracking-wide transition-colors ${ann.isImportant ? "text-white text-glow-purple" : "text-gray-300"}`}>
                        {ann.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 line-clamp-1 font-light">
                        {ann.content}
                      </p>
                    </div>

                    {/* Writer Department */}
                    <div className="col-span-1 md:col-span-2 text-left md:text-center text-[10px] font-semibold text-gray-400 flex items-center md:justify-center gap-1">
                      <User className="w-3 h-3 text-brand-purple-glow md:hidden" />
                      {ann.writer}
                    </div>

                    {/* Registration Date */}
                    <div className="col-span-1 md:col-span-1 text-left md:text-center text-[10px] font-mono text-gray-500 flex items-center md:justify-center gap-1">
                      <Calendar className="w-3 h-3 md:hidden" />
                      {ann.date}
                    </div>

                    {/* Views counter */}
                    <div className="col-span-1 md:col-span-1 text-left md:text-center text-[10px] font-mono text-gray-500 flex items-center md:justify-center gap-1">
                      <Eye className="w-3 h-3 md:hidden" />
                      {ann.views} 회
                    </div>
                  </div>
                ))}
              </div>

              {announcements.length === 0 && (
                <div className="text-center py-12 text-xs text-gray-500 bg-zinc-950/40 border border-zinc-900 rounded-xl">
                  아직 게시된 공지사항 목록이 비어 있습니다.
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="event-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Event card grid render */}
              {events.map((evt) => {
                const isExpanded = expandedEventId === evt.id;
                return (
                  <div
                    id={`evt-card-${evt.id}`}
                    key={evt.id}
                    className="p-6 rounded-2xl bg-radial-card border border-zinc-900 hover:border-purple-900/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Badge and schedule period */}
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded bg-brand-gold/15 text-brand-gold text-[10px] font-extrabold border border-brand-gold/30 uppercase tracking-widest flex items-center gap-1">
                          <Gift className="w-3 h-3" />
                          {evt.badge}
                        </span>
                        <span className="text-[10px] font-mono text-gray-500">{evt.period}</span>
                      </div>

                      {/* Header title */}
                      <h3 className="font-serif text-base sm:text-lg font-bold text-white mt-4 text-glow-purple">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-brand-purple-glow mt-1.5 font-medium">
                        {evt.subtitle}
                      </p>

                      {/* Content expansion */}
                      <div className="mt-4 pt-4 border-t border-purple-950/20">
                        <p className={`text-xs text-gray-400 font-light leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}>
                          {evt.content}
                        </p>
                      </div>
                    </div>

                    {/* Expand CTA button */}
                    <div className="pt-4 mt-6 flex justify-between items-center bg-zinc-950/30 -mx-6 -mb-6 p-4 rounded-b-2xl border-t border-purple-950/10">
                      <button
                        onClick={() => toggleEventDetail(evt.id)}
                        className="text-xs text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        {isExpanded ? (
                          <>접기 <ChevronUp className="w-4 h-4" /></>
                        ) : (
                          <>자세히 보기 <ChevronDown className="w-4 h-4" /></>
                        )}
                      </button>
                      <span className="text-[9px] text-gray-600">실시간 프로모션 적용중</span>
                    </div>

                  </div>
                );
              })}

              {events.length === 0 && (
                <div className="col-span-2 text-center py-12 text-xs text-gray-500 bg-zinc-950/40 border border-zinc-900 rounded-xl">
                  아직 제안된 특별 혜택 이벤트 리스트가 비어 있습니다.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notice Reader Overlay Modal */}
        <AnimatePresence>
          {selectedAnnouncement && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Screen overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedAnnouncement(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />

              {/* Document pop card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-zinc-950 border border-purple-900/60 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl z-10 p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto"
              >
                <div className="flex justify-between items-start border-b border-purple-950/30 pb-4">
                  <div className="space-y-1.5 text-left">
                    {/* Badge */}
                    <span className={`inline-block px-2 text-[10px] font-bold rounded ${selectedAnnouncement.isImportant ? "bg-red-950 text-red-400 border border-red-900/30" : "bg-zinc-900 text-gray-400"}`}>
                      {selectedAnnouncement.isImportant ? "VIP 필독사항" : "안내 공지문"}
                    </span>
                    <h2 className="font-serif text-lg sm:text-xl font-extrabold text-white text-glow-purple leading-snug">
                      {selectedAnnouncement.title}
                    </h2>
                  </div>
                </div>

                {/* Sub Metadata line */}
                <div className="flex justify-between text-[11px] text-gray-500 font-mono bg-zinc-900/50 p-3 rounded-lg border border-zinc-900">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-brand-purple" /> {selectedAnnouncement.writer}</span>
                  <div className="flex space-x-4">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedAnnouncement.date}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {selectedAnnouncement.views}회 조회</span>
                  </div>
                </div>

                {/* Article Main Text Content */}
                <div className="text-sm text-gray-300 font-light leading-relaxed whitespace-pre-line text-left py-2 border-b border-zinc-900 font-sans">
                  {selectedAnnouncement.content}
                </div>

                {/* Dialog trigger buttons */}
                <div className="pt-2 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
                  <div className="text-[10.5px] text-gray-500 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-brand-purple-glow" />
                    당 플랫폼은 24시간 언제라도 VIP 고객님의 기밀 보호를 대행하고 있습니다.
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedAnnouncement(null)}
                      className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs font-bold text-gray-400 hover:text-white transition-colors w-full sm:w-auto cursor-pointer"
                    >
                      목록으로 돌아가기
                    </button>
                    <a
                      href="tel:010-3608-8908"
                      className="px-5 py-2 bg-brand-purple hover:bg-brand-purple-glow text-white rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1"
                    >
                      핫라인 문의
                    </a>
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
