"use client"

import { useState, useEffect } from "react"
import { Shield, Lock, LogOut, Calendar, MessageSquare, Megaphone, CheckCircle, Clock } from "lucide-react"
import { ReservationManagement } from "@/components/admin/ReservationManagement"
import { InquiryManagement } from "@/components/admin/InquiryManagement"
import { NoticeManagement } from "@/components/admin/NoticeManagement"
import { customFetch } from "@/lib/api"

const ADMIN_CREDENTIALS = { username: "admin", password: "admin" }

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  
  const [activeTab, setActiveTab] = useState<"reservations" | "inquiries" | "notices">("reservations")

  // 통계 집계용 가벼운 상태풀
  const [counts, setCounts] = useState({
    totalReservations: 0,
    pendingReservations: 0,
    totalInquiries: 0,
    pendingInquiries: 0
  })

  // 대시보드 통계 실시간 동기화
  useEffect(() => {
    if (!isAuthenticated) return

    const fetchCounts = async () => {
      try {
        const [resRes, inqRes] = await Promise.all([
          customFetch("/api/reservations"),
          customFetch("/api/inquiries")
        ])
        
        if (resRes.ok && inqRes.ok) {
          const resData = await resRes.json()
          const inqData = await inqRes.json()
          
          setCounts({
            totalReservations: resData.length,
            pendingReservations: resData.filter((r: any) => r.status === 'pending').length,
            totalInquiries: inqData.length,
            pendingInquiries: inqData.filter((i: any) => !i.isReplied).length
          })
        }
      } catch (err) {
        console.error("통계 산출 실패", err)
      }
    }
    fetchCounts()
  }, [isAuthenticated, activeTab]) // 탭 전환 시 카운트 리프레시

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
        <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-lg border">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary"><Lock className="h-8 w-8 text-primary-foreground" /></div>
            <h1 className="text-2xl font-bold">관리자 로그인</h1>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault()
            if (loginUsername === ADMIN_CREDENTIALS.username && loginPassword === ADMIN_CREDENTIALS.password) { setIsAuthenticated(true); setLoginError("") }
            else { setLoginError("아이디 또는 비밀번호가 올바르지 않습니다.") }
          }} className="space-y-4">
            <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} className="w-full rounded-lg border bg-background px-4 py-3" placeholder="아이디" required />
            <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full rounded-lg border bg-background px-4 py-3" placeholder="비밀번호" required />
            {loginError && <p className="text-sm text-destructive">{loginError}</p>}
            <button type="submit" className="w-full rounded-lg bg-primary py-3 font-medium text-primary-foreground">로그인</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30 text-foreground">
      <header className="sticky top-0 z-40 border-b bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary"><Shield className="h-5 w-5 text-primary-foreground" /></div>
            <h1 className="font-bold">관리자 대시보드</h1>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive hover:bg-destructive/20 transition-colors"><LogOut className="h-4 w-4" /> 로그아웃</button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* 상단 탭 셀렉터 */}
        <div className="mb-8 flex gap-2 border-b pb-px">
          <button onClick={() => setActiveTab("reservations")} className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${activeTab === "reservations" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}><Calendar className="h-4 w-4" /> 예약 관리</button>
          <button onClick={() => setActiveTab("inquiries")} className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${activeTab === "inquiries" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}><MessageSquare className="h-4 w-4" /> 문의 관리</button>
          <button onClick={() => setActiveTab("notices")} className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${activeTab === "notices" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}><Megaphone className="h-4 w-4" /> 공지사항 관리</button>
        </div>

        {/* 상단 스태츠 위젯 대시보드 동적 반영 */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-card p-6 shadow-sm flex justify-between items-center border">
            <div>
              <p className="text-sm text-muted-foreground">처리가 필요한 작업</p>
              <p className="mt-1 text-3xl font-bold text-amber-600">
                {activeTab === "reservations" ? counts.pendingReservations : counts.pendingInquiries} 건
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100"><Clock className="h-6 w-6 text-amber-600" /></div>
          </div>
          <div className="rounded-2xl bg-card p-6 shadow-sm flex justify-between items-center border">
            <div>
              <p className="text-sm text-muted-foreground">총 누적 수치</p>
              <p className="mt-1 text-3xl font-bold">
                {activeTab === "reservations" ? counts.totalReservations : counts.totalInquiries} 건
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              {activeTab === "reservations" ? <Calendar className="h-6 w-6 text-primary" /> : <MessageSquare className="h-6 w-6 text-primary" />}
            </div>
          </div>
        </div>

        {/* 대시보드 뷰 스위처 */}
        <div className="mt-6">
          {activeTab === "reservations" && <ReservationManagement />}
          {activeTab === "inquiries" && <InquiryManagement />}
          {activeTab === "notices" && <NoticeManagement />}
        </div>
      </div>
    </div>
  )
}