"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { MessageSquare, Plus, Lock, Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useInquiries } from "@/hooks/useInquiries"

export default function InquiryPage() {
  const itemsPerPage = 10
  const { inquiries, searchTerm, setSearchTerm, currentPage, setCurrentPage, totalPages, isLoading, error } = useInquiries(itemsPerPage)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="lg:pl-72">

      <div className="relative bg-slate-950 py-16 overflow-hidden">
          
          {/* 🌟 1. 실제 배경 이미지 레이어 */}
          {/* public/images/info-bg.jpg 경로에 이용 안내에 어울리는 이미지를 배치해 주세요. */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
            style={{ backgroundImage: "url('/images/info-bg.jpg')" }}
          />

          {/* 🌟 2. 텍스트 가독성을 위한 블랙 그라데이션 오버레이 가림막 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40" />

          {/* Content (z-10을 주어 오버레이 위로 콘텐츠를 올리고, text-center 유지) */}
          <div className="relative mx-auto max-w-4xl px-6 text-center text-primary-foreground z-10">
            <MessageSquare className="mx-auto mb-4 h-12 w-12" />
            <h1 className="text-4xl font-bold">문의게시판</h1>
            <p className="mt-4 text-lg text-primary-foreground/90">궁금한 점이 있으시면 언제든지 문의해 주세요</p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="제목, 작성자 검색" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <Link href="/inquiry/write" className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              <Plus className="h-5 w-5" /> 문의하기
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="hidden sm:grid sm:grid-cols-12 gap-4 bg-muted px-6 py-4 text-sm font-semibold text-muted-foreground">
              <div className="col-span-1 text-center">번호</div>
              <div className="col-span-2">분류</div>
              <div className="col-span-5">제목</div>
              <div className="col-span-2 text-center">작성자</div>
              <div className="col-span-1 text-center">날짜</div>
              <div className="col-span-1 text-center">상태</div>
            </div>

            <div className="divide-y divide-border">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm">문의 목록을 불러오는 중입니다...</p>
                </div>
              ) : error ? (
                <div className="px-6 py-12 text-center text-destructive bg-destructive/5 font-medium">{error}</div>
              ) : inquiries.length > 0 ? (
                inquiries.map((inquiry) => (
                  <Link key={inquiry.id} href={`/inquiry/${inquiry.id}`} className="block px-6 py-4 transition-colors hover:bg-muted/50">
                    <div className="sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center">
                      {/* Mobile View */}
                      <div className="sm:hidden">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{inquiry.category}</span>
                          {inquiry.isSecret && <Lock className="h-4 w-4 text-muted-foreground" />}
                          {inquiry.isReplied ? <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">답변완료</span> : <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">대기중</span>}
                        </div>
                        <p className="font-medium text-foreground">{inquiry.title}</p>
                        <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground"><span>{inquiry.author}</span><span>{inquiry.createdAt}</span></div>
                      </div>

                      {/* Desktop View */}
                      <div className="hidden sm:block sm:col-span-1 text-center text-muted-foreground">{inquiry.id}</div>
                      <div className="hidden sm:block sm:col-span-2"><span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">{inquiry.category}</span></div>
                      <div className="hidden sm:block sm:col-span-5 sm:items-center gap-2">
                        <span className="font-medium text-foreground truncate">{inquiry.title}</span>
                        {inquiry.isSecret && <Lock className="h-4 w-4 flex-shrink-0 text-muted-foreground" />}
                      </div>
                      <div className="hidden sm:block sm:col-span-2 text-center text-muted-foreground">{inquiry.author}</div>
                      <div className="hidden sm:block sm:col-span-1 text-center text-sm text-muted-foreground">{inquiry.createdAt}</div>
                      <div className="hidden sm:block sm:col-span-1 text-center">
                        {inquiry.isReplied ? <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">답변완료</span> : <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">대기중</span>}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="px-6 py-12 text-center text-muted-foreground">등록된 문의가 없습니다.</div>
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