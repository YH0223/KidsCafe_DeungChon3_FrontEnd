"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { Calendar, Clock, Users, ChevronLeft, ChevronRight, Check, Loader2, Search, ArrowRight, Phone } from "lucide-react"
import { useReservation } from "@/hooks/useReservation"
import Link from "next/link"

const timeSlots = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00"
]

const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
const weekDays = ["일", "월", "화", "수", "목", "금", "토"]

// 🌟 휴대폰 번호 하이픈 자동 포맷터 함수
const formatPhoneNumber = (value: string) => {
  if (!value) return value
  
  // 숫자가 아닌 문자는 모두 제거
  const phoneNumber = value.replace(/[^\d]/g, "")
  const phoneNumberLength = phoneNumber.length

  // 휴대폰 번호 규격 대응 (010-XXXX-XXXX)
  if (phoneNumberLength < 4) return phoneNumber
  if (phoneNumberLength < 8) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`
}

export default function ReservationPage() {
  const {
    step,
    setStep,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    childCount,
    setChildCount,
    adultCount,
    setAdultCount,
    currentMonth,
    setCurrentMonth,
    disabledTimes,
    formData,
    setFormData,
    isSubmitting,
    submitReservation,
    resetReservation
  } = useReservation()

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const days = []
    for (let i = 0; i < startingDay; i++) { days.push(null) }
    for (let i = 1; i <= daysInMonth; i++) { days.push(new Date(year, month, i)) }
    return days
  }

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${weekDays[date.getDay()]})`
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="lg:pl-72">
        {/* Header */}
        <div className="relative bg-slate-950 py-16 overflow-hidden">
          
          {/* 🌟 1. 실제 배경 이미지 레이어 */}
          {/* public/images/reservation-bg.jpg 경로에 원하는 이미지를 배치해 주세요. */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
            style={{ backgroundImage: "url('/images/reservation-bg.jpg')" }}
          />

          {/* 🌟 2. 글자 및 버튼 가독성을 위한 블랙 그라데이션 오버레이 가림막 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-secondary/30" />

          {/* Content (z-10을 주어 오버레이 위로 콘텐츠를 올립니다) */}
          <div className="relative mx-auto max-w-4xl px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-primary-foreground z-10">
            <div className="text-left flex-1">
              <h1 className="text-4xl font-bold text-white drop-shadow-md">예약하기</h1>
              <p className="mt-4 text-lg text-white/90 drop-shadow-sm font-medium">
                원하시는 날짜와 시간을 선택해 주세요
              </p>
            </div>
            
            {/* 우측 상단 퀵 버튼 (배경 글래스모피즘 효과가 이미지 위에서 더욱 예쁘게 살아납니다) */}
            <div className="flex-shrink-0">
              <Link 
                href="/reservation/edit" 
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white text-sm font-semibold px-5 py-3 rounded-xl border border-white/20 transition-all shadow-sm"
              >
                <Search className="h-4 w-4 text-white" /> 기존 예약 확인 / 변경
              </Link>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {step > s ? <Check className="h-5 w-5" /> : s}
                </div>
                {s < 4 && <div className={`h-1 w-12 sm:w-20 ${step > s ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-center gap-8 text-xs text-muted-foreground sm:gap-16">
            <span>날짜 선택</span><span>시간 선택</span><span>정보 입력</span><span>예약 완료</span>
          </div>
        </div>

        {/* Content Box */}
        <div className="mx-auto max-w-4xl px-6 pb-12">
          
          {/* Step 1: Date Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-card p-6 shadow-md border border-border/40">
                <div className="mb-6 flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold">날짜를 선택해 주세요</h2>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="rounded-lg p-2 hover:bg-muted"><ChevronLeft className="h-5 w-5" /></button>
                  <h3 className="text-lg font-semibold">{currentMonth.getFullYear()}년 {months[currentMonth.getMonth()]}</h3>
                  <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="rounded-lg p-2 hover:bg-muted"><ChevronRight className="h-5 w-5" /></button>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {weekDays.map((day) => <div key={day} className="py-2 text-center text-sm font-medium text-muted-foreground">{day}</div>)}
                  {getDaysInMonth(currentMonth).map((date, index) => (
                    <div key={index} className="aspect-square p-1">
                      {date && (
                        <button onClick={() => { setSelectedDate(date); setStep(2); }} disabled={isDateDisabled(date)} className={`flex h-full w-full items-center justify-center rounded-lg text-sm transition-all ${isDateDisabled(date) ? "cursor-not-allowed text-muted-foreground/30" : selectedDate?.getTime() === date.getTime() ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-primary/10"}`}>
                          {date.getDate()}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-muted/40 border p-5 flex items-center justify-between gap-4 animate-in fade-in duration-300">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-foreground">이미 키즈카페 예약을 완료하셨나요?</h4>
                  <p className="text-xs text-muted-foreground">방문 일정을 변경하거나 예약 내역 조회가 필요하시면 아래 버튼을 이용해 주세요.</p>
                </div>
                <Link 
                  href="/reservation/edit" 
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors whitespace-nowrap bg-background px-4 py-2.5 rounded-xl border border-border shadow-sm hover:shadow-inner"
                >
                  내 예약 관리 <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Step 2: Time Selection */}
          {step === 2 && selectedDate && (
            <div className="rounded-2xl bg-card p-6 shadow-md border border-border/40">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold">시간을 선택해 주세요</h2>
                </div>
                <button onClick={() => setStep(1)} className="text-sm text-primary hover:underline font-medium">날짜 다시 선택</button>
              </div>
              <p className="mb-6 text-sm text-muted-foreground">선택한 날짜: <span className="font-semibold text-foreground">{formatDate(selectedDate)}</span></p>

              <div className="mb-8 grid grid-cols-3 gap-3 sm:grid-cols-5">
                {timeSlots.map((time) => {
                  const isReserved = disabledTimes.includes(time);
                  return (
                    <button
                      key={time}
                      disabled={isReserved}
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-lg py-3 text-sm font-medium transition-all ${isReserved ? "bg-muted text-muted-foreground/30 cursor-not-allowed line-through" : selectedTime === time ? "bg-primary text-primary-foreground font-semibold" : "bg-muted/60 hover:bg-primary/10"}`}
                    >
                      {time} {isReserved && "(마감)"}
                    </button>
                  )
                })}
              </div>

              <div className="mb-8 flex items-center gap-3 border-t pt-6"><Users className="h-6 w-6 text-primary" /><h3 className="text-lg font-semibold">인원 선택</h3></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-xl bg-muted/60 p-4">
                  <span className="font-medium text-sm">어린이 (만 12세 이하)</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setChildCount(Math.max(0, childCount - 1))} className="flex h-8 w-8 items-center justify-center rounded-full bg-card shadow-sm font-bold">-</button>
                    <span className="w-8 text-center font-semibold text-sm">{childCount}</span>
                    <button onClick={() => setChildCount(Math.min(10, childCount + 1))} className="flex h-8 w-8 items-center justify-center rounded-full bg-card shadow-sm font-bold">+</button>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-muted/60 p-4">
                  <span className="font-medium text-sm">보호자</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setAdultCount(Math.max(1, adultCount - 1))} className="flex h-8 w-8 items-center justify-center rounded-full bg-card shadow-sm font-bold">-</button>
                    <span className="w-8 text-center font-semibold text-sm">{adultCount}</span>
                    <button onClick={() => setAdultCount(Math.min(10, adultCount + 1))} className="flex h-8 w-8 items-center justify-center rounded-full bg-card shadow-sm font-bold">+</button>
                  </div>
                </div>
              </div>

              <button onClick={() => setStep(3)} disabled={!selectedTime} className="mt-8 w-full rounded-xl bg-primary py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed">다음 단계</button>
            </div>
          )}

          {/* Step 3: Information Form */}
          {step === 3 && (
            <div className="rounded-2xl bg-card p-6 shadow-md border border-border/40">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">예약 정보 입력</h2>
                <button onClick={() => setStep(2)} className="text-sm text-primary hover:underline font-medium">이전 단계</button>
              </div>
              <div className="mb-6 rounded-xl bg-muted/60 p-4">
                <h3 className="mb-1 text-sm font-semibold">선택 내역 확인</h3>
                <p className="text-sm text-muted-foreground">{selectedDate && formatDate(selectedDate)} {selectedTime} | 어린이 {childCount}명, 보호자 {adultCount}명</p>
              </div>

              <form onSubmit={submitReservation}>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">예약자명 *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-xl border px-4 py-3 bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm" placeholder="이름을 입력해 주세요" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">연락처 *</label>
                    <div className="relative">
                      {/* 🌟 포맷 필터 및 패턴 마스크 추가 */}
                      <input 
                        type="tel" 
                        required 
                        value={formData.phone} 
                        onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })} 
                        maxLength={13}
                        className="w-full rounded-xl border px-4 py-3 bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm" 
                        placeholder="010-0000-0000" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">이메일</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-xl border px-4 py-3 bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm" placeholder="email@example.com" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">요청사항</label>
                    <textarea value={formData.memo} onChange={(e) => setFormData({ ...formData, memo: e.target.value })} rows={3} className="w-full rounded-xl border px-4 py-3 bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm" placeholder="요청사항이 있으시면 입력해 주세요" />
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="mt-8 w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-4 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50">
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isSubmitting ? "예약 요청 중..." : "예약 확정하기"}
                </button>
              </form>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="rounded-2xl bg-card p-8 text-center shadow-md border border-border/40">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"><Check className="h-10 w-10 text-green-600" /></div>
              <h2 className="mb-4 text-2xl font-bold text-foreground">예약 신청이 완료되었습니다!</h2>
              <p className="mb-6 text-sm text-muted-foreground">관리자 확인 후 예약 승인 안내 문자가 발송될 예정입니다.</p>
              <div className="mx-auto max-w-sm rounded-xl bg-muted/60 p-5 text-left border">
                <h3 className="mb-3 font-semibold text-sm border-b pb-2">최종 예약 내역</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>일시:</strong> {selectedDate && formatDate(selectedDate)} {selectedTime}<br />
                  <strong>인원:</strong> 어린이 {childCount}명, 보호자 {adultCount}명<br />
                  <strong>예약자:</strong> {formData.name}<br />
                  <strong>연락처:</strong> {formData.phone}
                </p>
              </div>
              <button onClick={resetReservation} className="mt-8 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">새로운 예약하기</button>
            </div>
          )}
        </div>

        <Footer />
      </main>
    </div>
  )
}