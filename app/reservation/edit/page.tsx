"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { Calendar, User, Phone, Users, Clock, Check, Loader2, ArrowLeft } from "lucide-react"
import { useReservationEdit } from "@/hooks/useReservationEdit"
import Link from "next/link"

export default function ReservationEditPage() {
  const {
    isLoading,
    error,
    isAuthenticated,
    reservation,
    authName,
    setAuthName,
    authPhone,
    setAuthPhone,
    editDate,
    setEditDate,
    editTime,
    setEditTime,
    editGuests,
    setEditGuests,
    handleAuthSubmit,
    handleUpdateSubmit,
    setIsAuthenticated
  } = useReservationEdit()
  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    
    // 숫자가 아닌 문자는 모두 제거
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
  
    // 휴대폰 번호 11자리 규격 대응 (010-1234-5678)
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 8) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="lg:pl-72">
        <div className="bg-gradient-to-r from-primary to-secondary py-16">
          <div className="mx-auto max-w-3xl px-6 text-center text-primary-foreground">
            <Calendar className="mx-auto mb-4 h-12 w-12" />
            <h1 className="text-4xl font-bold">예약 확인 및 변경</h1>
            <p className="mt-4 text-lg text-primary-foreground/90">예약자 정보 확인 후 일정을 변경하실 수 있습니다.</p>
          </div>
        </div>

        <div className="mx-auto max-w-xl px-6 py-12">
          
          {/* 🌟 STEP 1: 예약자 인증 완료 전 내역 조회 스크린 */}
          {!isAuthenticated ? (
            <form onSubmit={handleAuthSubmit} className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm space-y-5">
              <h3 className="text-xl font-bold text-center mb-2">예약 정보 입력</h3>
              
              <div>
                <label className="text-sm font-medium block mb-1">예약자 성함</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input 
                    type="text" 
                    value={authName} 
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="예약자명을 입력하세요" 
                    className="w-full rounded-xl border bg-background py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">전화번호</label>
                <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input 
                    type="tel" 
                    value={authPhone} 
                    // 🌟 가공된 하이픈 포맷 문자열을 상태에 저장합니다.
                    onChange={(e) => setAuthPhone(formatPhoneNumber(e.target.value))}
                    placeholder="010-0000-0000" 
                    maxLength={13} // 🌟 하이픈 포함 최대 13자리 제한 안전장치
                    className="w-full rounded-xl border bg-background py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                />
                </div>
              </div>

              {error && <p className="text-xs font-medium text-destructive text-center">{error}</p>}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "예약 조회하기"}
              </button>
            </form>
          ) : (
            
            /* 🌟 STEP 2: 인증 성공 후 활성화되는 인라인 예약 수정 스크린 */
            <form onSubmit={handleUpdateSubmit} className="rounded-2xl border border-primary/30 bg-card p-6 md:p-8 shadow-md space-y-6 animate-in fade-in-50 duration-200">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-xl font-bold text-foreground">예약 스케줄 수정</h3>
                <button 
                  type="button" 
                  onClick={() => setIsAuthenticated(false)} 
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-3 w-3" /> 다시 조회
                </button>
              </div>

              {/* 고정 정보 표기 */}
              <div className="grid grid-cols-2 gap-4 bg-muted/40 rounded-xl p-4 text-sm text-muted-foreground">
                <div><span className="font-semibold text-foreground">예약자명:</span> {reservation?.name}</div>
                <div><span className="font-semibold text-foreground">연락처:</span> {reservation?.phone}</div>
              </div>

              {/* 날짜 변경 */}
              <div>
                <label className="text-sm font-medium flex items-center gap-1.5 mb-1"><Calendar className="h-4 w-4 text-primary" /> 예약 날짜 변경</label>
                <input 
                  type="date" 
                  value={editDate} 
                  onChange={(e) => setEditDate(e.target.value)}
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              {/* 시간 변경 */}
              <div>
                <label className="text-sm font-medium flex items-center gap-1.5 mb-1"><Clock className="h-4 w-4 text-primary" /> 시간 변경</label>
                <select 
                  value={editTime} 
                  onChange={(e) => setEditTime(e.target.value)}
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="10:00">10:00 (오전)</option>
                  <option value="12:00">12:00 (정오)</option>
                  <option value="14:00">14:00 (오후 2시)</option>
                  <option value="16:00">16:00 (오후 4시)</option>
                  <option value="18:00">18:00 (오후 6시)</option>
                </select>
              </div>

              {/* 인원수 변경 */}
              <div>
                <label className="text-sm font-medium flex items-center gap-1.5 mb-1"><Users className="h-4 w-4 text-primary" /> 방문 인원수 변경</label>
                <input 
                  type="number" 
                  min={1} 
                  max={20}
                  value={editGuests} 
                  onChange={(e) => setEditGuests(Number(e.target.value))}
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsAuthenticated(false)} 
                  className="flex-1 rounded-xl border bg-card py-3.5 text-center text-sm font-medium text-foreground hover:bg-muted"
                >
                  취소
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="flex-1 rounded-xl bg-primary py-3.5 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-1"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Check className="h-4 w-4" /> 변경내용 저장</>}
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 text-center">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              메인 화면으로 가기
            </Link>
          </div>
        </div>
        
        <Footer />
      </main>
    </div>
  )
}