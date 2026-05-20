import React, { useState } from "react";
import { Host, Announcement, PremiumEvent, Booking } from "../types";
import { Lock, LogOut, Plus, Edit2, Trash2, Check, X, ShieldAlert, Users, Calendar, AlertTriangle, FileText, ChevronRight, Award, Key, Grid } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AdminDashboardProps {
  hosts: Host[];
  announcements: Announcement[];
  events: PremiumEvent[];
  bookings: Booking[];
  isAdmin: boolean;
  onSetIsAdmin: (val: boolean) => void;
  onUpdateHosts: (hosts: Host[]) => void;
  onUpdateAnnouncements: (anns: Announcement[]) => void;
  onUpdateEvents: (evts: PremiumEvent[]) => void;
  onUpdateBookings: (books: Booking[]) => void;
}

export default function AdminDashboard({
  hosts,
  announcements,
  events,
  bookings,
  isAdmin,
  onSetIsAdmin,
  onUpdateHosts,
  onUpdateAnnouncements,
  onUpdateEvents,
  onUpdateBookings,
}: AdminDashboardProps) {
  // Login State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Sub Tab Control
  const [adminSubTab, setAdminSubTab] = useState<"BOOKINGS" | "HOSTS" | "BOARD" | "GUIDE">("BOOKINGS");

  // Host Modifiers
  const [editingHost, setEditingHost] = useState<Host | null>(null);
  const [isAddingHost, setIsAddingHost] = useState(false);
  const [hostForm, setHostForm] = useState({
    name: "",
    age: 25,
    height: 182,
    category: "MODEL" as Host["category"],
    styleKeywords: "",
    description: "",
    imageUrl: "",
    isPremium: false
  });

  // Announcement Modifiers
  const [editingAnn, setEditingAnn] = useState<Announcement | null>(null);
  const [isAddingAnn, setIsAddingAnn] = useState(false);
  const [annForm, setAnnForm] = useState({
    title: "",
    content: "",
    writer: "VIP 총괄운영실",
    isImportant: false
  });

  // Authentication logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin1234") {
      onSetIsAdmin(true);
      setLoginError("");
    } else {
      setLoginError("계정 아이디 혹은 비밀번호가 틀립니다. (안내: admin / admin1234)");
    }
  };

  const handleLogout = () => {
    onSetIsAdmin(false);
    setUsername("");
    setPassword("");
  };

  // Booking controls
  const handleUpdateBookingStatus = (id: string, nextStatus: Booking["status"]) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: nextStatus } : b);
    onUpdateBookings(updated);
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm("정말로 이 예약을 목록에서 삭제하시겠습니까?")) {
      onUpdateBookings(bookings.filter(b => b.id !== id));
    }
  };

  // Host CRUD controls
  const handleOpenEditHost = (host: Host) => {
    setEditingHost(host);
    setHostForm({
      name: host.name,
      age: host.age,
      height: host.height,
      category: host.category,
      styleKeywords: host.styleKeywords.join(", "),
      description: host.description,
      imageUrl: host.imageUrl,
      isPremium: host.isPremium
    });
    setIsAddingHost(false);
  };

  const handleOpenAddHost = () => {
    setIsAddingHost(true);
    setEditingHost(null);
    setHostForm({
      name: "",
      age: 26,
      height: 183,
      category: "MODEL",
      styleKeywords: "에이스, 젠틀맨, 다정다감",
      description: "",
      imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=500",
      isPremium: false
    });
  };

  const handleSaveHost = (e: React.FormEvent) => {
    e.preventDefault();
    const keywordsArray = hostForm.styleKeywords
      .split(",")
      .map(k => k.trim())
      .filter(k => k.length > 0);

    if (editingHost) {
      // Modify existing host data
      const updated = hosts.map(h => h.id === editingHost.id ? {
        ...h,
        name: hostForm.name,
        age: Number(hostForm.age),
        height: Number(hostForm.height),
        category: hostForm.category,
        styleKeywords: keywordsArray,
        description: hostForm.description,
        imageUrl: hostForm.imageUrl,
        isPremium: hostForm.isPremium
      } : h);
      onUpdateHosts(updated);
      setEditingHost(null);
    } else if (isAddingHost) {
      // Add new host data
      const newHost: Host = {
        id: "host-" + Date.now(),
        name: hostForm.name,
        age: Number(hostForm.age),
        height: Number(hostForm.height),
        category: hostForm.category,
        styleKeywords: keywordsArray,
        description: hostForm.description,
        imageUrl: hostForm.imageUrl,
        isPremium: hostForm.isPremium,
        rating: 4.9,
        viewCount: 15,
        likes: 1
      };
      onUpdateHosts([newHost, ...hosts]);
      setIsAddingHost(false);
    }
  };

  const handleDeleteHost = (id: string, name: string) => {
    if (confirm(`정말로 호스트 [${name}] 프로필을 영구히 삭제하시겠습니까?`)) {
      onUpdateHosts(hosts.filter(h => h.id !== id));
    }
  };

  // Announcements CRUD controls
  const handleOpenEditAnn = (ann: Announcement) => {
    setEditingAnn(ann);
    setAnnForm({
      title: ann.title,
      content: ann.content,
      writer: ann.writer,
      isImportant: ann.isImportant
    });
    setIsAddingAnn(false);
  };

  const handleOpenAddAnn = () => {
    setIsAddingAnn(true);
    setEditingAnn(null);
    setAnnForm({
      title: "",
      content: "",
      writer: "VIP 총괄운영실",
      isImportant: false
    });
  };

  const handleSaveAnn = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];

    if (editingAnn) {
      const updated = announcements.map(a => a.id === editingAnn.id ? {
        ...a,
        title: annForm.title,
        content: annForm.content,
        writer: annForm.writer,
        isImportant: annForm.isImportant
      } : a);
      onUpdateAnnouncements(updated);
      setEditingAnn(null);
    } else if (isAddingAnn) {
      const newAnn: Announcement = {
        id: "ann-" + Date.now(),
        title: annForm.title,
        content: annForm.content,
        writer: annForm.writer,
        date: today,
        views: 1,
        isImportant: annForm.isImportant
      };
      onUpdateAnnouncements([newAnn, ...announcements]);
      setIsAddingAnn(false);
    }
  };

  const handleDeleteAnn = (id: string) => {
    if (confirm("정말로 이 공지사항 게시글을 즉시 삭제 처리하시겠습니까?")) {
      onUpdateAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  // Login Form Panel
  if (!isAdmin) {
    return (
      <div className="bg-black min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="absolute top-20 left-1/3 w-80 h-80 bg-brand-purple/10 rounded-full filter blur-[100px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-radial-card border border-purple-900/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10"
        >
          {/* Top border decoration */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-purple to-brand-gold" />

          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-brand-purple/40 flex items-center justify-center mx-auto text-brand-purple-glow shadow-neon-purple">
              <Lock className="w-6 h-6 text-brand-gold animate-pulse" />
            </div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wider uppercase">
              VIP CMS Login (관리 포털)
            </h2>
            <p className="text-xs text-gray-500 font-light">
              통합 데이터 시스템 및 예약 신청 목록 관리를 대행하는 보안 터미널입니다.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">
                관리자 아이디
              </label>
              <input
                id="admin-username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin 입력"
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-purple text-xs text-white rounded-xl px-4 py-3.5 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">
                비밀번호
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin1234 입력"
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-purple text-xs text-white rounded-xl px-4 py-3.5 focus:outline-none transition-colors"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-400 font-semibold text-glow-purple">
                ⚠ {loginError}
              </p>
            )}

            <button
              id="admin-login-btn"
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-brand-purple to-purple-900 hover:from-brand-purple-glow hover:to-purple-800 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-neon-purple cursor-pointer flex items-center justify-center gap-2"
            >
              <Key className="w-3.5 h-3.5" />
              보안 게이트 접속 승인
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-purple-950/30 text-center">
            <span className="text-[10px] text-gray-600 block">
              Authorized admin portal · Bucheon Premium CMS v4.0
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  // Admin control panel layout (Authenticated state)
  return (
    <div className="bg-black py-12 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* Dynamic header row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-8 border-b border-purple-950/40 gap-6">
          <div className="space-y-1">
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white text-glow-purple flex items-center gap-3">
              <ShieldAlert className="w-7 h-7 text-brand-gold" />
              여성시대 프리미엄 CMS
            </h1>
            <p className="text-xs text-gray-400 font-light">
              VIP 선수단 로스터 실시간 편집, 안전 공지 수정, 예약 신청 승인 여부 관리를 실현합니다.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="px-2.5 py-1 rounded bg-green-950/30 text-green-400 text-[10px] font-bold border border-green-900/50 uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
              ● EXECUTIVE ONLINE
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-gray-400 hover:text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              로그아웃
            </button>
          </div>
        </div>

        {/* Admin Navigation Options */}
        <div className="flex flex-wrap gap-2 py-6 border-b border-purple-950/10">
          <button
            onClick={() => setAdminSubTab("BOOKINGS")}
            className={`px-4 py-2.5 rounded-lg text-xs font-extrabold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              adminSubTab === "BOOKINGS"
                ? "bg-brand-purple text-white shadow-neon-purple border border-brand-purple"
                : "bg-zinc-950 text-gray-400 border border-zinc-900 hover:text-white"
            }`}
          >
            <Calendar className="w-4 h-4" />
            실시간 부킹 신청함 ({bookings.length}건)
          </button>
          <button
            onClick={() => setAdminSubTab("HOSTS")}
            className={`px-4 py-2.5 rounded-lg text-xs font-extrabold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              adminSubTab === "HOSTS"
                ? "bg-brand-purple text-white shadow-neon-purple border border-brand-purple"
                : "bg-zinc-950 text-gray-400 border border-zinc-900 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            선수단 모듈 관리 ({hosts.length}명)
          </button>
          <button
            onClick={() => setAdminSubTab("BOARD")}
            className={`px-4 py-2.5 rounded-lg text-xs font-extrabold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              adminSubTab === "BOARD"
                ? "bg-brand-purple text-white shadow-neon-purple border border-brand-purple"
                : "bg-zinc-950 text-gray-400 border border-zinc-900 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            안내 공지사항 관리 ({announcements.length}건)
          </button>
          <button
            onClick={() => setAdminSubTab("GUIDE")}
            className={`px-4 py-2.5 rounded-lg text-xs font-extrabold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              adminSubTab === "GUIDE"
                ? "bg-brand-purple text-white shadow-neon-purple border border-brand-purple"
                : "bg-zinc-950 text-gray-400 border border-zinc-900 hover:text-white"
            }`}
          >
            <Grid className="w-4 h-4" />
            Premium 브랜드 가이드
          </button>
        </div>

        {/* Tab Body contents rendering */}
        <div className="py-8">
          
          {/* TAB 1: RESERVATIONS INBOX */}
          {adminSubTab === "BOOKINGS" && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-gray-450 uppercase tracking-wider">
                실시간 예약 내역 리스트 (INCOMING REQUESTS)
              </h3>

              <div className="space-y-4">
                {bookings.map((book) => (
                  <div
                    id={`admin-booking-row-${book.id}`}
                    key={book.id}
                    className="p-5 rounded-xl bg-zinc-950/70 border border-zinc-900 hover:border-purple-950/50 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-sm font-bold text-white">{book.guestName} 고객님</span>
                        <span className="text-xs font-mono text-brand-gold font-bold">{book.phone}</span>
                        {/* Status tag */}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                          book.status === "PENDING"
                            ? "bg-yellow-950/50 text-yellow-500 border border-yellow-900/30"
                            : book.status === "CONFIRMED"
                              ? "bg-green-950/50 text-green-400 border border-green-905/30"
                              : book.status === "COMPLETED"
                                ? "bg-zinc-900 text-gray-500"
                                : "bg-red-950/50 text-red-400 border border-red-900/40"
                        }`}>
                          {book.status === "PENDING" ? "승인대기" : book.status === "CONFIRMED" ? "예약확정" : book.status === "COMPLETED" ? "완료됨" : "전면취소"}
                        </span>
                      </div>

                      {/* Detail specifics */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-gray-400 font-mono">
                        <div>방문 일자: <strong className="text-white">{book.date}</strong></div>
                        <div>도착 시간: <strong className="text-white">{book.time}</strong></div>
                        <div>방문 인원: <strong className="text-white">{book.partySize}명</strong></div>
                      </div>

                      {book.memo && (
                        <p className="text-xs text-gray-300 italic bg-black/40 p-3 rounded-lg border border-purple-950/20 leading-relaxed font-sans mt-2">
                          "추가 기재 사항: {book.memo}"
                        </p>
                      )}
                    </div>

                    {/* Manage actions buttons */}
                    <div className="flex flex-wrap gap-2.5 self-end md:self-auto">
                      {book.status === "PENDING" && (
                        <button
                          onClick={() => handleUpdateBookingStatus(book.id, "CONFIRMED")}
                          className="px-3 py-1.5 bg-green-850 hover:bg-green-700 bg-green-900 text-green-300 hover:text-white rounded text-[11px] font-extrabold transition-colors cursor-pointer"
                        >
                          예약 승인 확정
                        </button>
                      )}
                      {book.status !== "COMPLETED" && book.status !== "CANCELLED" && (
                        <button
                          onClick={() => handleUpdateBookingStatus(book.id, "COMPLETED")}
                          className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-gray-300 rounded text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          정산 완료 처리
                        </button>
                      )}
                      {book.status !== "CANCELLED" && (
                        <button
                          onClick={() => handleUpdateBookingStatus(book.id, "CANCELLED")}
                          className="px-3 py-1.5 bg-red-950 hover:bg-red-900 text-red-400 hover:text-white rounded text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          예약 거절/취소
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDeleteBooking(book.id)}
                        className="p-1.5 border border-zinc-900 hover:border-red-500 rounded text-gray-600 hover:text-red-500 transition-colors cursor-pointer"
                        title="예약기록 영구삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {bookings.length === 0 && (
                  <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl bg-zinc-950/30">
                    <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto opacity-50 mb-3" />
                    <p className="text-sm text-gray-500 font-light">아직 수집된 VIP 폰트 예약 내역이 존재하지 않습니다.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: HOST ROSTER MANAGEMENT */}
          {adminSubTab === "HOSTS" && (
            <div className="space-y-6">
              <div className="flex sm:items-center sm:justify-between flex-wrap gap-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  선수단 프로필 및 정예 관리 보드
                </h3>
                <button
                  id="admin-add-host-btn"
                  onClick={handleOpenAddHost}
                  className="px-4 py-2 bg-brand-purple hover:bg-brand-purple-glow text-white text-xs font-bold rounded-lg transition-all shadow-neon-purple flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  새로운 호스트 등록
                </button>
              </div>

              {/* Add/Edit Host Sliding Form Drawer */}
              <AnimatePresence>
                {(isAddingHost || editingHost) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 bg-zinc-950 border border-purple-900/40 rounded-xl space-y-4 mb-6 overflow-hidden"
                  >
                    <h4 className="text-xs font-extrabold text-brand-purple-glow uppercase tracking-wider flex items-center gap-2 border-b border-purple-950/30 pb-2">
                      <Award className="w-4 h-4 text-brand-gold" />
                      {editingHost ? `[${editingHost.name}] 프로필 편집` : "새로운 VIP 에스코터 선수 수동 등록"}
                    </h4>

                    <form onSubmit={handleSaveHost} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-400 uppercase font-semibold">이름 (필수)</label>
                        <input
                          id="form-host-name"
                          type="text"
                          required
                          value={hostForm.name}
                          onChange={(e) => setHostForm({ ...hostForm, name: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 text-white rounded px-3 py-2.5 outline-none focus:border-brand-purple"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-gray-400 uppercase font-semibold">나이</label>
                          <input
                            type="number"
                            required
                            value={hostForm.age}
                            onChange={(e) => setHostForm({ ...hostForm, age: Number(e.target.value) })}
                            className="w-full bg-zinc-900 border border-zinc-800 text-white rounded px-3 py-2.5 outline-none focus:border-brand-purple"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-gray-400 uppercase font-semibold">신장 (Height cm)</label>
                          <input
                            type="number"
                            required
                            value={hostForm.height}
                            onChange={(e) => setHostForm({ ...hostForm, height: Number(e.target.value) })}
                            className="w-full bg-zinc-900 border border-zinc-800 text-white rounded px-3 py-2.5 outline-none focus:border-brand-purple"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-400 uppercase font-semibold">카테고리 구분</label>
                        <select
                          value={hostForm.category}
                          onChange={(e) => setHostForm({ ...hostForm, category: e.target.value as Host["category"] })}
                          className="w-full bg-zinc-900 border border-zinc-800 text-white rounded px-3 py-2.5 focus:border-brand-purple outline-none cursor-pointer"
                        >
                          <option value="MODEL">MODEL (스타일리시 모델)</option>
                          <option value="DANDY">DANDY (단정 젠틀 슈트핏)</option>
                          <option value="SEXY">SEXY (치명적 눈빛 옴므파탈)</option>
                          <option value="CUTE">CUTE (러블리 훈훈한 미소)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5 flex items-center pt-6 pl-2">
                        <label className="flex items-center space-x-2 text-gray-300 font-bold cursor-pointer">
                          <input
                            type="checkbox"
                            checked={hostForm.isPremium}
                            onChange={(e) => setHostForm({ ...hostForm, isPremium: e.target.checked })}
                            className="accent-brand-purple w-4.5 h-4.5 rounded border-zinc-800"
                          />
                          <span>지정 프리미엄 에이스 승급 부여하기</span>
                        </label>
                      </div>

                      <div className="col-span-1 md:col-span-2 space-y-1.5">
                        <label className="text-[10px] text-gray-400 uppercase font-semibold">강조 해시태그 키워드 (쉼표로 구분)</label>
                        <input
                          type="text"
                          value={hostForm.styleKeywords}
                          onChange={(e) => setHostForm({ ...hostForm, styleKeywords: e.target.value })}
                          placeholder="태평양어깨, 꿀성대, 수트핏처럼 단어를 쉼표로 작성해 주세요."
                          className="w-full bg-zinc-900 border border-zinc-800 text-white rounded px-3 py-2.5 outline-none focus:border-brand-purple"
                        />
                      </div>

                      <div className="col-span-1 md:col-span-2 space-y-1.5">
                        <label className="text-[10px] text-gray-400 uppercase font-semibold">고해상도 프로필 Portrait 이미지 주소 (HTTP URL)</label>
                        <input
                          type="text"
                          value={hostForm.imageUrl}
                          onChange={(e) => setHostForm({ ...hostForm, imageUrl: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 text-white rounded px-3 py-2.5 outline-none focus:border-brand-purple"
                        />
                      </div>

                      <div className="col-span-1 md:col-span-2 space-y-1.5">
                        <label className="text-[10px] text-gray-400 uppercase font-semibold">호스트 상세 자기소개문</label>
                        <textarea
                          rows={3}
                          value={hostForm.description}
                          onChange={(e) => setHostForm({ ...hostForm, description: e.target.value })}
                          placeholder="매너 있고 화려한 대화 스킬에 관한 소개문을 기재해 주세요"
                          className="w-full bg-zinc-900 border border-zinc-800 text-white rounded px-3 py-2.5 outline-none focus:border-brand-purple resize-none"
                        />
                      </div>

                      <div className="col-span-1 md:col-span-2 flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingHost(false);
                            setEditingHost(null);
                          }}
                          className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-gray-400 rounded-lg font-bold cursor-pointer"
                        >
                          취소
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-brand-purple hover:bg-brand-purple-glow text-white rounded-lg font-bold shadow-neon-purple cursor-pointer flex items-center gap-1.5"
                        >
                          <Check className="w-4.5 h-4.5" />
                          저장 완료
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hosts Table roster */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {hosts.map((host) => (
                  <div
                    key={host.id}
                    className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-purple-950/30 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Avatar preview and basic indicators */}
                      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-zinc-900 border border-zinc-900">
                        <img
                          referrerPolicy="no-referrer"
                          src={host.imageUrl}
                          alt={host.name}
                          className="w-full h-full object-cover"
                        />
                        {host.isPremium && (
                          <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-brand-gold text-black text-[8px] font-extrabold uppercase tracking-wide">
                            ACE
                          </span>
                        )}
                        <span className="absolute bottom-2 right-2 bg-black/75 px-1.5 py-0.5 rounded text-[9px] text-gray-300 font-mono">
                          {host.age}세 · {host.height}cm
                        </span>
                      </div>

                      <div>
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-xs font-bold text-white uppercase">{host.name}</h4>
                          <span className="text-[10px] text-brand-purple-glow font-extrabold uppercase">{host.category}</span>
                        </div>
                        {/* Commas keywords */}
                        <p className="text-[9.5px] text-gray-500 font-semibold mt-1 truncate">
                          Tags: {host.styleKeywords.join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-1.5 mt-4 pt-3 border-t border-zinc-900">
                      <button
                        onClick={() => handleOpenEditHost(host)}
                        className="py-1 px-3 bg-zinc-900 hover:bg-zinc-800 text-[10.5px] font-semibold text-gray-300 hover:text-white border border-zinc-800 rounded flex-grow flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteHost(host.id, host.name)}
                        className="p-1 border border-zinc-900 hover:border-red-500 rounded text-gray-600 hover:text-red-500 transition-colors cursor-pointer"
                        title="영구 삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ANNOUNCEMENT BOARD MANAGMENT */}
          {adminSubTab === "BOARD" && (
            <div className="space-y-6">
              <div className="flex sm:items-center sm:justify-between flex-wrap gap-4">
                <h3 className="text-sm font-bold text-gray-450 uppercase tracking-widest">
                  안전 가이드 및 공지 관리 센터
                </h3>
                <button
                  id="admin-add-ann-btn"
                  onClick={handleOpenAddAnn}
                  className="px-4 py-2 bg-brand-purple hover:bg-brand-purple-glow text-white text-xs font-bold rounded-lg transition-all shadow-neon-purple flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  새로운 공지사항 등록
                </button>
              </div>

              {/* Add/Edit Notice Drawer Form */}
              <AnimatePresence>
                {(isAddingAnn || editingAnn) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 bg-zinc-950 border border-purple-900/40 rounded-xl space-y-4 mb-6 overflow-hidden"
                  >
                    <h4 className="text-xs font-extrabold text-brand-purple-glow uppercase tracking-wider flex items-center gap-2 border-b border-purple-950/30 pb-2">
                      <FileText className="w-4 h-4 text-brand-gold" />
                      {editingAnn ? "기존 공지 공문글 수정" : "신규 공식 아티클 등록"}
                    </h4>

                    <form onSubmit={handleSaveAnn} className="space-y-4 text-xs font-sans">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="col-span-1 sm:col-span-2 space-y-1.5">
                          <label className="text-[10px] text-gray-400 uppercase font-semibold">공지글 제목 (필수)</label>
                          <input
                            id="form-ann-title"
                            type="text"
                            required
                            value={annForm.title}
                            onChange={(e) => setAnnForm({ ...annForm, title: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 text-white rounded px-3 py-2.5 outline-none focus:border-brand-purple"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] text-gray-400 uppercase font-semibold">게시 저자</label>
                          <input
                            type="text"
                            required
                            value={annForm.writer}
                            onChange={(e) => setAnnForm({ ...annForm, writer: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 text-white rounded px-3 py-2.5 outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5 pl-1">
                        <label className="flex items-center space-x-2 text-gray-300 font-bold cursor-pointer">
                          <input
                            type="checkbox"
                            checked={annForm.isImportant}
                            onChange={(e) => setAnnForm({ ...annForm, isImportant: e.target.checked })}
                            className="accent-brand-purple w-4.5 h-4.5"
                          />
                          <span>이 글을 중요필독 상단 고정 표식 적용하기</span>
                        </label>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-400 uppercase font-semibold">본문 내용 기재</label>
                        <textarea
                          rows={6}
                          required
                          value={annForm.content}
                          onChange={(e) => setAnnForm({ ...annForm, content: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 text-white rounded px-3 py-2.5 outline-none focus:border-brand-purple font-sans leading-relaxed"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingAnn(false);
                            setEditingAnn(null);
                          }}
                          className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-gray-400 rounded-lg font-bold cursor-pointer"
                        >
                          취소
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-brand-purple hover:bg-brand-purple-glow text-white rounded-lg font-bold shadow-neon-purple cursor-pointer flex items-center gap-1.5"
                        >
                          <Check className="w-4.5 h-4.5" />
                          공지글 발행하기
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* List notice rules */}
              <div className="space-y-3">
                {announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 flex justify-between items-center gap-4 text-left"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        {ann.isImportant && (
                          <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-400 text-[8px] font-extrabold uppercase">
                            필독
                          </span>
                        )}
                        <h4 className="text-xs font-bold text-white">{ann.title}</h4>
                      </div>
                      <p className="text-[10px] text-gray-500 font-mono mt-1">
                        작성자: {ann.writer} · 등록일시: {ann.date} · 조회: {ann.views}회
                      </p>
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleOpenEditAnn(ann)}
                        className="p-2 border border-zinc-900 hover:border-brand-purple rounded text-gray-400 hover:text-brand-purple-glow transition-colors cursor-pointer"
                        title="글 수정"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteAnn(ann.id)}
                        className="p-2 border border-zinc-900 hover:border-red-500 rounded text-gray-600 hover:text-red-500 transition-colors cursor-pointer"
                        title="글 영구삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BRAND GUIDELINES (색상 코드 및 사용된 폰트 설명) */}
          {adminSubTab === "GUIDE" && (
            <div className="space-y-8 bg-zinc-950/70 border border-zinc-900 p-6 sm:p-8 rounded-2xl">
              <h3 className="font-serif text-lg font-bold text-white text-glow-purple border-b border-zinc-900 pb-3">
                여성시대 프리미엄 스타일 디자인 가이드 (DESIGN MANUAL)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed text-gray-300">
                
                {/* Palette */}
                <div className="space-y-4 text-left">
                  <h4 className="font-serif text-sm font-bold text-brand-purple-glow flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-pulse" />
                    Color Palette (엄선된 브랜드 색상 체계)
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-[#000000] border border-purple-950 flex-shrink-0" />
                      <div>
                        <strong className="text-white block font-mono">Deep Black (#000000)</strong>
                        <span className="text-[10px] text-gray-500">배경 및 메인 외각을 감싸는 밤의 중후하고 이지적인 럭셔리 질감.</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-[#a855f7] flex-shrink-0" />
                      <div>
                        <strong className="text-white block font-mono">Neon Royal Purple (#a855f7)</strong>
                        <span className="text-[10px] text-gray-500">핵심 포인트, 그라데이션, 세련된 하이 텐션의 무드를 가리키는 시그니처 램프광.</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-[#d4af37] flex-shrink-0 animate-pulse" />
                      <div>
                        <strong className="text-white block font-mono">Baron Gold (#d4af37)</strong>
                        <span className="text-[10px] text-gray-500">웰컴 혜택, 에이스 표식, 스페셜 바 칭호용 정통 골드 앰버 색상.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typography pairing */}
                <div className="space-y-4 text-left">
                  <h4 className="font-serif text-sm font-bold text-brand-purple-glow flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-purple animate-pulse" />
                    Typography Pairing (지정 럭셔리 서체 라인)
                  </h4>

                  <div className="space-y-3.5">
                    <div>
                      <strong className="text-white block">Pretendard (디폴트 국문 본문 진)</strong>
                      <p className="text-[10px] text-gray-500">
                        가장 현대적이고 왜곡 없는 최고의 한글 가독성 서체. 럭셔리 라운지 세부 설명글, 공지글, 인쇄 양식 전체에 엄치 규격 결합.
                      </p>
                    </div>

                    <div>
                      <strong className="text-white block font-serif">Cinzel Pro (영문 브랜드 로고 전용 조각)</strong>
                      <p className="text-[10px] text-gray-500 font-serif">
                        정통 로마 석비 스타일의 극도 기품을 연상케 하는 클래시 패션 폰트. 'BUCHEON EXECUTIVE CLUB' 에 적격 사용.
                      </p>
                    </div>

                    <div>
                      <strong className="text-white block font-mono">Space Grotesk (데이터 매트릭스 보조)</strong>
                      <p className="text-[10px] text-gray-500 font-mono">
                        신장 수치, 조회수, 버튼 레이블 등 기술 통계 표현용 우주적 무드의 디스플레이 폰트.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="p-4 bg-purple-950/10 rounded-xl border border-purple-900/20 text-[10.5px] text-gray-400 text-left leading-relaxed mt-4">
                <strong>✓ 스타일 편집 제안</strong>: 이 구조는 완벽히 변수화되어, 클래스 전체가 <code>src/index.css</code> 내의 <code>@theme</code> 변환 레이어로 동작합니다. 로고, 폰트, 무드 테마, 세금 정찰제 표 등을 추가 수정하기에 몹시 유리합니다.
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
