import React, { useState, useEffect } from "react";
import { Booking } from "../types";
import { Calendar, Users, Phone, Smile, Clock, FileText, CheckCircle2, ShieldCheck, Heart, Sparkles, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BookingFormProps {
  onAddBooking: (booking: Booking) => void;
  prefilledHostName?: string;
  onClearPrefilledHost: () => void;
}

export default function BookingForm({ onAddBooking, prefilledHostName, onClearPrefilledHost }: BookingFormProps) {
  const [formData, setFormData] = useState({
    guestName: "",
    phone: "",
    date: "2026-05-20", // default local date
    time: "21:00",
    partySize: 2,
    memo: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");

  // Hook prefilled host name from host list choice
  useEffect(() => {
    if (prefilledHostName) {
      setFormData(prev => ({
        ...prev,
        memo: prev.memo 
          ? `지정 지망 선수: [${prefilledHostName}] - ` + prev.memo
          : `지정 지망 선수: [${prefilledHostName}] 가이드를 요청합니다.`
      }));
    }
  }, [prefilledHostName]);

  // Phone input formatting/auto-hyphenation helper
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    let formatted = rawValue;
    if (rawValue.length > 3 && rawValue.length <= 7) {
      formatted = `${rawValue.slice(0, 3)}-${rawValue.slice(3)}`;
    } else if (rawValue.length > 7) {
      formatted = `${rawValue.slice(0, 3)}-${rawValue.slice(3, 7)}-${rawValue.slice(7, 11)}`;
    }
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    // Simple validations
    if (!formData.guestName.trim()) {
      setValidationError("예약자 성함을 올바르게 입력해 주세요.");
      return;
    }
    if (formData.phone.length < 12) {
      setValidationError("올바른 연락처 휴대전화 번호를 입력해 주세요. (예: 010-0000-0000)");
      return;
    }
    if (!formData.date) {
      setValidationError("방문하실 날짜를 선택해 주세요.");
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury API call persistence
    setTimeout(() => {
      const newBooking: Booking = {
        id: "book-" + Date.now(),
        guestName: formData.guestName,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        partySize: Number(formData.partySize),
        memo: formData.memo,
        status: "PENDING",
        createdAt: new Date().toISOString()
      };

      onAddBooking(newBooking);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      onClearPrefilledHost();

      // Reset form variables
      setFormData({
        guestName: "",
        phone: "",
        date: "2026-05-20",
        time: "21:00",
        partySize: 2,
        memo: ""
      });
    }, 1500);
  };

  return (
    <div className="bg-black py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-brand-purple/10 rounded-full filter blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Banner Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-extrabold tracking-tight">
            BOOKING REQUEST (실시간 사전 예약)
          </h2>
          <div className="w-12 h-0.5 bg-brand-purple mx-auto my-4 shadow-[0_0_8px_#a855f7]" />
          <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            방문 예정 시각, 동반 인원수, 그리고 요청 사항을 남겨주시면 VIP 매칭 담당 직원이 
            5분 이내 전화를 확인하여 가장 신속하고 기품 있는 세팅을 승인 대행해 드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Reservation Instructions Card Block (5 columns) */}
          <div className="md:col-span-5 bg-radial-card border border-purple-900/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-white text-glow-purple flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-gold" />
                  예약 안심 에스코트 규칙
                </h3>
                <p className="text-[11px] text-gray-400 mt-1 font-light leading-relaxed">
                  여성시대 프리미엄 공식 부킹 데스크는 개인 안심 권리를 수호합니다.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-brand-purple/10 border border-brand-purple/30 text-brand-purple-glow flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">1</div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-200">100% 기밀 유지 약속</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-light">고객님의 입력 연락처 및 성함 정보는 예약 연계 및 안내 완료 즉시 복구 불가능하게 철저히 암호화 파기 처리됩니다.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-brand-purple/10 border border-brand-purple/30 text-brand-purple-glow flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">2</div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-200">얼리버드 웰컴 혜택</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-light">오후 7시 이전 및 단독 소규모 테이블 예약 시, 별도 룸 차지 수수료 상쇄 및 웰컴 안주 플래터를 추가 구성해 드립니다.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-brand-purple/10 border border-brand-purple/30 text-brand-purple-glow flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">3</div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-200">초고속 세단 에스코트</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-light">방문 1시간 전, 출발 예정을 예약 담당자 유선 회신으로 확정해주시면 인접역 세단 픽업 조를 즉시 긴급 출동 배치합니다.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-purple-950/40 space-y-2 mt-6">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">대표 비서실 다이렉트 핫라인</div>
              <a
                href="tel:010-3608-8908"
                className="block text-center py-3.5 bg-gradient-to-r from-brand-purple to-purple-900 border border-brand-purple/40 rounded-xl text-xs font-extrabold text-white shadow-neon-purple tracking-widest"
              >
                010-3608-8908 연결
              </a>
            </div>
          </div>

          {/* Interactive Form panel (7 columns) */}
          <div className="md:col-span-7 bg-zinc-950/70 border border-zinc-900 rounded-2xl p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.form
                  key="booking-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-900 pb-3">
                    VIP RESERVATION DETAIL
                  </h3>

                  {/* Name Input */}
                  <div className="space-y-1.5Unique">
                    <label className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider flex items-center gap-1.5">
                      <Smile className="w-3.5 h-3.5 text-brand-purple-glow" />
                      예약자 성함 <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="guestName-input"
                      type="text"
                      name="guestName"
                      required
                      value={formData.guestName}
                      onChange={handleInputChange}
                      placeholder="성함 혹은 닉네임을 입력하세요"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-purple text-xs text-white rounded-xl px-4 py-3.5 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-brand-purple-glow" />
                      휴대폰 번호 (정확히 입력) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone-input"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="010-0000-0000"
                      maxLength={13}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-purple text-xs text-white rounded-xl px-4 py-3.5 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Date & Time Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-purple-glow" />
                        예약 날짜 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="date-input"
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-purple text-xs text-white rounded-xl px-4 py-3 focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand-purple-glow" />
                        도착 예정 시각 <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="time-select"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-purple text-xs text-white rounded-xl px-4 py-3.5 focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="19:00">오후 07:00 (초기 웰컴 타임)</option>
                        <option value="20:00">오후 08:00</option>
                        <option value="21:00">오후 09:00</option>
                        <option value="22:00">오후 10:00</option>
                        <option value="23:00">오후 11:00</option>
                        <option value="00:00">오전 00:00 (피크 타임)</option>
                        <option value="01:00">오전 01:00 (피크 타임)</option>
                        <option value="02:00">오전 02:00</option>
                        <option value="03:00">오전 03:00</option>
                        <option value="04:00">오전 04:00 (올빼미 타임)</option>
                      </select>
                    </div>
                  </div>

                  {/* Party Size Dropdown Selection */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-brand-purple-glow" />
                      총 동반 인원수 (귀하 포함)
                    </label>
                    <select
                      id="partySize-select"
                      name="partySize"
                      value={formData.partySize}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-purple text-xs text-white rounded-xl px-4 py-3.5 focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value={1}>1명 (프라이빗 힐링 싱글 비즈니스)</option>
                      <option value={2}>2명 (지인 스카웃 파트너)</option>
                      <option value={3}>3명 (럭셔리 그룹 소테이블)</option>
                      <option value={4}>4명 (생일 파티 & 기념 특별 석)</option>
                      <option value={5}>5명 이상 (VIP 대형 디럭스 룸 구성)</option>
                    </select>
                  </div>

                  {/* Memo Inputs text area */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-brand-purple-glow" />
                      추가 건의 사항 및 지정 호스트 요구 (선택)
                    </label>
                    <textarea
                      id="memo-input"
                      name="memo"
                      value={formData.memo}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="원하시는 스타일 방향성(예: 키가 큰 댄디남, 위트가 넘치는 남친스타일), 생일 파티 준비, 세단 픽업 요청 지역 등을 솔직하게 기재해 주시면 배정에 적극 반영됩니다."
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-purple text-xs text-white rounded-xl px-4 py-3.5 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Error Notification */}
                  {validationError && (
                    <p className="text-xs text-red-400 font-semibold text-glow-purple">
                      ⚠ {validationError}
                    </p>
                  )}

                  {/* Submit Trigger Button */}
                  <button
                    id="submit-booking-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-purple to-purple-900 hover:from-brand-purple-glow hover:to-purple-800 text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 transform active:scale-95 disabled:opacity-50 cursor-pointer shadow-neon-purple flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4.5 h-4.5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                        VIP 예약 암호 매칭중...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
                        24시간 실시간 부킹 상담 요청하기
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <p className="text-[10px] text-gray-550 font-light mt-1">
                      여성시대 프리미엄 예약 파트는 불법 보증금 및 선수 선입금을 일절 요구하지 않습니다. 안심하십시오.
                    </p>
                  </div>

                </motion.form>
              ) : (
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-purple/10 border border-brand-purple/50 flex items-center justify-center mx-auto text-brand-purple-glow shadow-neon-purple">
                    <CheckCircle2 className="w-8 h-8 text-brand-gold animate-bounce" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white text-glow-purple">
                      VIP 예약 신속 접수 완료!
                    </h3>
                    <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
                      귀하가 제출하신 최고급 예약 템플릿이 내부 비서실 통합 CRM 데스크에 공식 접수되었습니다.
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-900/60 rounded-xl border border-purple-950/40 text-[11px] text-gray-400 max-w-md mx-auto space-y-2 text-left">
                    <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-white">✓ 다음 순서로 연계 에스코트가 제공됩니다:</p>
                    <p className="font-light">1. 담당 전문 픽업 매니저가 기재해주신 번호로 5분 이내 보안 확인 콜을 발신합니다.</p>
                    <p className="font-light">2. 원하시는 주류 플래터 조율과 선호하는 지망 선수 매칭을 최종 승인 조율합니다.</p>
                    <p className="font-light">3. 안전 픽업 세단이 조기 출격 대기 상태를 마칩니다.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 max-w-xs sm:max-w-md mx-auto justify-center">
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-gray-400 hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      새로운 문의 작성
                    </button>
                    <a
                      href="tel:010-3608-8908"
                      className="px-6 py-2.5 bg-gradient-to-r from-brand-purple to-purple-800 hover:shadow-neon-purple-hover text-white rounded-lg text-xs font-bold transition-transform hover:scale-105 flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-gold" />
                      실장 부킹 즉시 독촉하기
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
