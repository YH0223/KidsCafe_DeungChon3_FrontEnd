"use client"

import { Search, Calendar, Check, X } from "lucide-react"
import { useAdminReservations } from "@/hooks/useAdminReservations"

export function ReservationManagement() {
  const {
    filtered,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    selected,
    setSelected,
    isSubmitting,
    error,
    handleUpdateStatus,
  } = useAdminReservations()

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl bg-card shadow-sm border border-border">
        <div className="border-b border-border p-4">
          <h2 className="mb-4 font-semibold">예약 목록</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="예약자명 또는 연락처 검색..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-lg border bg-background px-9 py-2 text-sm focus:border-primary focus:outline-none" />
            </div>
            <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="rounded-lg border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none">
              <option value="all">전체</option>
              <option value="pending">대기중</option>
              <option value="confirmed">확정됨</option>
              <option value="cancelled">취소됨</option>
            </select>
          </div>
        </div>

        {error && <div className="p-4 text-sm text-destructive bg-destructive/5 text-center">{error}</div>}

        <div className="max-h-[600px] overflow-y-auto divide-y divide-border">
        {filtered.length > 0 ? (
            filtered.map((res) => (
              <button key={res.id} onClick={() => setSelected(res)} className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${selected?.id === res.id ? "bg-primary/5" : ""}`}>
                <div className="mb-2 flex items-center gap-2">
                  {res.status === 'CONFIRMED' && <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">예약확정</span>}
                  {res.status === 'PENDING' && <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">확정대기</span>}
                  {res.status === 'CANCELLED' && <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">취소됨</span>}
                </div>
                {/* 🌟 res.customerName -> res.name | guests -> childCount + adultCount */}
                <p className="font-medium text-foreground">{res.name} <span className="text-sm font-normal text-muted-foreground">({res.childCount + res.adultCount}명)</span></p>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  {/* 🌟 res.date, res.time -> res.reservationDate, res.reservationTime */}
                  <span>{res.reservationDate} {res.reservationTime}</span>
                  <span>{res.phone}</span>
                </div>
              </button>
            ))
          ) :(
            <div className="p-8 text-center text-muted-foreground">검색 결과가 없습니다.</div>
          )}
        </div>
      </div>

      <div className="rounded-2xl bg-card shadow-sm border border-border p-0">
        {selected ? (
          <div className="p-6">
          <h3 className="mb-6 text-xl font-bold border-b pb-4">예약 상세 정보</h3>
            <div className="space-y-4 text-sm">
              {/* 🌟 selected.customerName -> selected.name */}
              <div className="grid grid-cols-3 py-2 border-b"><span className="text-muted-foreground">예약자명</span><span className="col-span-2 font-medium text-foreground">{selected.name}</span></div>
              <div className="grid grid-cols-3 py-2 border-b"><span className="text-muted-foreground">연락처</span><span className="col-span-2 text-foreground">{selected.phone}</span></div>
              {/* 🌟 selected.date, selected.time -> selected.reservationDate, selected.reservationTime */}
              <div className="grid grid-cols-3 py-2 border-b"><span className="text-muted-foreground">이용일시</span><span className="col-span-2 text-primary font-bold">{selected.reservationDate} {selected.reservationTime}</span></div>
              {/* 🌟 상세 인원 분리 노출 */}
              <div className="grid grid-cols-3 py-2 border-b"><span className="text-muted-foreground">이용인원</span><span className="col-span-2 text-foreground">어린이 {selected.childCount}명, 어른 {selected.adultCount}명</span></div>
              <div className="grid grid-cols-3 py-2 border-b"><span className="text-muted-foreground">현재 상태</span>
                <span className="col-span-2">
                  {selected.status === 'PENDING' && <span className="text-amber-600 font-bold">확정 대기중</span>}
                  {selected.status === 'CONFIRMED' && <span className="text-green-600 font-bold">예약 확정됨</span>}
                  {selected.status === 'CANCELLED' && <span className="text-red-600 font-bold">취소됨</span>}
                </span>
              </div>
              {selected.memo && (
                <div className="grid grid-cols-3 py-2"><span className="text-muted-foreground">요청사항</span><span className="col-span-2 bg-muted/50 p-3 rounded-lg whitespace-pre-wrap text-foreground">{selected.memo}</span></div>
              )}
            </div>
            <div className="mt-8 flex gap-3">
              {/* 백엔드 상태값이 대문자 'CONFIRMED'가 아닐 때만 확정 버튼 노출 */}
              {selected.status !== 'CONFIRMED' && (
                  <button 
                    onClick={() => handleUpdateStatus(selected.id, 'CONFIRMED')} // 대문자로 변경
                    disabled={isSubmitting} 
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-green-600 py-3 text-white font-medium hover:bg-green-700 disabled:opacity-50"
                  >
                    <Check className="h-4 w-4" /> 예약 확정하기
                  </button>
                )}
                
                {/* 백엔드 상태값이 대문자 'CANCELLED'가 아닐 때만 취소 버튼 노출 */}
                {selected.status !== 'CANCELLED' && (
                  <button 
                    onClick={() => handleUpdateStatus(selected.id, 'CANCELLED')} // 대문자로 변경
                    disabled={isSubmitting} 
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-red-100 text-red-700 py-3 font-medium hover:bg-red-200 disabled:opacity-50"
                  >
                    <X className="h-4 w-4" /> 예약 취소하기
                  </button>
                )}
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-[500px] flex-col items-center justify-center text-muted-foreground">
            <Calendar className="mb-4 h-12 w-12 opacity-30" />
            <p>예약을 선택하세요</p>
          </div>
        )}
      </div>
    </div>
  )
}