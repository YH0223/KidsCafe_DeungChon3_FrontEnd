"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { Bell, Search, ChevronLeft, ChevronRight, Loader2, Pin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useNotices } from "@/hooks/useNotices"

export default function NoticePage() {
  const { notices, isLoading, error } = useNotices()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // 1. 검색 필터링 로직
  const filteredNotices = notices.filter((notice) => {
    const title = notice.title || ""
    const content = notice.content || ""
    return title.includes(searchTerm) || content.includes(searchTerm)
  })

  // 2. 중요 공지(카테고리가 "중요")를 무조건 상단으로 올리는 정렬 로직
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    const aPinned = a.category === "중요" ? 1 : 0
    const bPinned = b.category === "중요" ? 1 : 0
    return bPinned - aPinned
  })

  // 3. 페이지네이션 연산
  const totalPages = Math.ceil(sortedNotices.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedNotices.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="lg:pl-72">
        {/* Header */}
        <div className="relative bg-slate-950 py-16 overflow-hidden">
          
          {/* 🌟 1. 실제 배경 이미지 레이어 */}
          {/* public/images/notice-bg.jpg 경로에 원하는 이미지를 배치해 주세요. */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
            style={{ backgroundImage: "url('/images/notice-bg.jpg')" }}
          />

          {/* 🌟 2. 텍스트와 아이콘 가독성을 위한 블랙 그라데이션 오버레이 가림막 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40" />

          {/* Content (z-10을 주어 오버레이 위로 콘텐츠를 올리고, text-center 유지) */}
          <div className="relative mx-auto max-w-5xl px-6 text-center text-primary-foreground z-10">
            <Bell className="mx-auto mb-4 h-12 w-12 text-white drop-shadow-md animate-pulse" />
            <h1 className="text-4xl font-bold text-white drop-shadow-md tracking-tight">공지사항</h1>
            <p className="mt-4 text-lg text-white/90 drop-shadow-sm font-medium max-w-2xl mx-auto leading-relaxed">
              서울형 키즈카페 등촌3동점의 새로운 소식을 전해드립니다
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="mb-6 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="제목, 내용 검색" 
                value={searchTerm} 
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1) // 검색 시 1페이지로 리셋
                }} 
                className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" 
              />
            </div>
          </div>

          {/* Table Area */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            {/* Desktop Table Header */}
            <div className="hidden sm:grid sm:grid-cols-12 gap-4 bg-muted px-6 py-4 text-sm font-semibold text-muted-foreground">
              <div className="col-span-2 text-center">구분</div>
              <div className="col-span-7">제목</div>
              <div className="col-span-2 text-center">등록일</div>
            </div>

            <div className="divide-y divide-border">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm">공지사항 목록을 불러오는 중입니다...</p>
                </div>
              ) : error ? (
                <div className="px-6 py-12 text-center text-destructive bg-destructive/5 font-medium">{error}</div>
              ) : currentItems.length > 0 ? (
                currentItems.map((notice) => {
                  // 🌟 백엔드의 createdAt 필드를 안전하게 가공 ("2026-05-29T20:00" -> "2026-05-29")
                  const formattedDate = notice.createdAt ? notice.createdAt.split("T")[0] : ""
                  const isPinned = notice.category === "중요"

                  return (
                    <Link key={notice.id} href={`/notice/${notice.id}`} className="block px-6 py-4 transition-colors hover:bg-muted/50">
                      <div className="sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center">
                        
                        {/* Mobile View */}
                        <div className="sm:hidden">
                          <div className="flex items-center gap-2 mb-2">
                            {isPinned ? (
                              <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                                <Pin className="h-3 w-3 fill-amber-800" /> 중요
                              </span>
                            ) : (
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                {notice.category || "안내"}
                              </span>
                            )}
                          </div>
                          <p className="font-medium text-foreground">{notice.title}</p>
                          <div className="mt-2 text-sm text-muted-foreground">{formattedDate}</div>
                        </div>

                        {/* Desktop View */}
                        <div className="hidden sm:block sm:col-span-2 text-center">
                          {isPinned ? (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                              <Pin className="h-3 w-3 fill-amber-800" /> 중요
                            </span>
                          ) : (
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                              {notice.category || "안내"}
                            </span>
                          )}
                        </div>
                        <div className="hidden sm:block sm:col-span-7">
                          <span className="font-medium text-foreground block truncate">{notice.title}</span>
                          <span className="text-xs text-muted-foreground block truncate mt-0.5 font-normal">{notice.content}</span>
                        </div>
                        {/* 🌟 notice.date 대신 변환한 날짜 매핑 */}
                        <div className="hidden sm:block sm:col-span-2 text-center text-sm text-muted-foreground">{formattedDate}</div>
                      </div>
                    </Link>
                  )
                })
              ) : (
                <div className="px-6 py-12 text-center text-muted-foreground">등록된 공지사항이 없습니다.</div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {!isLoading && !error && totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="flex h-10 w-10 items-center justify-center rounded-lg border bg-card text-foreground transition-colors hover:bg-muted disabled:opacity-50"><ChevronLeft className="h-5 w-5" /></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${currentPage === page ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-muted"}`}>{page}</button>
              ))}
              <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="flex h-10 w-10 items-center justify-center rounded-lg border bg-card text-foreground transition-colors hover:bg-muted disabled:opacity-50"><ChevronRight className="h-5 w-5" /></button>
            </div>
          )}
        </div>
        <Footer />
      </main>
    </div>
  )
}