"use client"

import { use } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { ArrowLeft, Lock, Edit, Trash2, MessageCircle, Calendar, User, Loader2, Check, X } from "lucide-react"
import Link from "next/link"
import { useInquiryDetail } from "@/hooks/useInquiryDetail"

export default function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const {
    inquiry,
    isLoading,
    error,
    showPasswordModal,
    password,
    setPassword,
    passwordError,
    modalAction,
    isVerified,
    isEditing,
    setIsEditing,
    editTitle,
    setEditTitle,
    editContent,
    setEditContent,
    editCategory,
    setEditCategory,
    handlePasswordSubmit,
    handleUpdateSubmit,
    openEditModal,
    openDeleteModal,
    closePasswordModal
  } = useInquiryDetail(id)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="lg:pl-72">
          <div className="flex h-96 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    )
  }

  if (error || !inquiry) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="lg:pl-72">
          <div className="flex h-96 flex-col items-center justify-center px-4 text-center">
            <p className="text-muted-foreground font-medium">{error || "문의를 찾을 수 없습니다."}</p>
            <Link href="/inquiry" className="mt-4 text-sm text-primary hover:underline font-semibold">
              목록으로 돌아가기
            </Link>
          </div>
        </main>
      </div>
    )
  }

  // 비밀글 잠금 처리
  if (inquiry.isSecret && !isVerified) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="lg:pl-72">
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-xl border border-border">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">비밀글 보호</h3>
                  <p className="text-sm text-muted-foreground">작성 시 설정한 비밀번호를 입력하세요.</p>
                </div>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                className="mb-2 w-full rounded-xl border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                placeholder="비밀번호 입력"
                autoFocus
              />
              {passwordError && <p className="mb-4 text-xs font-medium text-destructive">{passwordError}</p>}
              <div className="flex gap-3">
                <Link href="/inquiry" className="flex-1 rounded-xl border bg-card py-3 text-center text-sm font-medium text-foreground hover:bg-muted transition-colors">
                  취소
                </Link>
                <button onClick={handlePasswordSubmit} className="flex-1 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  확인
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="lg:pl-72">
        <div className="bg-gradient-to-r from-primary to-secondary py-12">
          <div className="mx-auto max-w-4xl px-6 text-primary-foreground">
            <Link href="/inquiry" className="mb-4 inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> 목록으로
            </Link>
            <h1 className="text-3xl font-bold">{isEditing ? "문의 수정하기" : "문의 상세"}</h1>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 py-12">
          
          {/* 🌟 수정 모드(isEditing)에 따른 UI 분기처리 */}
          {isEditing ? (
            <article className="rounded-2xl border border-primary/30 bg-card overflow-hidden shadow-md animate-in fade-in-50 duration-200">
              <div className="border-b border-border p-6 bg-muted/20 space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label className="text-xs font-semibold text-muted-foreground w-16">분류</label>
                  <select 
                    value={editCategory} 
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="rounded-lg border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="이용문의">이용문의</option>
                    <option value="예약문의">예약문의</option>
                    <option value="불편사항">불편사항</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label className="text-xs font-semibold text-muted-foreground w-16">제목</label>
                  <input 
                    type="text" 
                    value={editTitle} 
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="flex-1 rounded-lg border bg-background px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="p-6 md:p-8">
                <textarea 
                  value={editContent} 
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={10}
                  className="w-full rounded-xl border bg-background p-4 text-sm md:text-base leading-relaxed focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* 수정 모드 액션 버튼 */}
              <div className="flex justify-end gap-2 border-t border-border p-4 bg-muted/5">
                <button onClick={() => setIsEditing(false)} className="flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-all">
                  <X className="h-4 w-4" /> 취소
                </button>
                <button onClick={handleUpdateSubmit} className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all">
                  <Check className="h-4 w-4" /> 저장하기
                </button>
              </div>
            </article>
          ) : (
            // 기존 상세 보기 화면 카드 코드 그대로 보존
            <article className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="border-b border-border p-6 bg-muted/20">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {inquiry.category}
                  </span>
                  {inquiry.isSecret && (
                    <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground font-medium">
                      <Lock className="h-3 w-3" /> 비밀글
                    </span>
                  )}
                  {inquiry.isReplied ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">답변완료</span>
                  ) : (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">대기중</span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl leading-snug">{inquiry.title}</h2>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="h-4 w-4" />{inquiry.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{inquiry.createdAt}</span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed text-sm md:text-base min-h-[150px]">
                  {inquiry.content}
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-border p-4 bg-muted/5">
                <button onClick={openEditModal} className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition-all">
                  <Edit className="h-4 w-4" /> 수정
                </button>
                <button onClick={openDeleteModal} className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-all">
                  <Trash2 className="h-4 w-4" /> 삭제
                </button>
              </div>
            </article>
          )}

          {/* Reply Section */}
          {!isEditing && inquiry.isReplied && inquiry.reply && (
            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 border-b border-primary/20 bg-primary/10 px-6 py-4">
                <MessageCircle className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground text-sm md:text-base">서울형 키즈카페 등촌3동점 답변</span>
                {inquiry.repliedAt && <span className="ml-auto text-xs text-muted-foreground">{inquiry.repliedAt}</span>}
              </div>
              <div className="p-6 md:p-8">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed text-sm md:text-base">
                  {inquiry.reply}
                </div>
              </div>
            </div>
          )}

          {!isEditing && (
            <div className="mt-8 flex justify-center">
              <Link href="/inquiry" className="rounded-xl border bg-card px-8 py-3 font-medium text-foreground hover:bg-muted transition-colors text-sm">
                목록으로
              </Link>
            </div>
          )}
        </div>

        {/* 수정/삭제 인증용 비밀번호 팝업 모달 */}
        {showPasswordModal && modalAction !== "view" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-xl border border-border animate-in fade-in-50 zoom-in-95">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{modalAction === "delete" ? "삭제 인증" : "수정 인증"}</h3>
                  <p className="text-sm text-muted-foreground">본인 인증을 위해 글 비밀번호를 입력해 주세요.</p>
                </div>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                className="mb-2 w-full rounded-xl border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                placeholder="비밀번호 입력"
                autoFocus
              />
              {passwordError && <p className="mb-4 text-xs font-medium text-destructive">{passwordError}</p>}
              <div className="flex gap-3">
                <button onClick={closePasswordModal} className="flex-1 rounded-xl border bg-card py-3 font-medium text-foreground hover:bg-muted text-sm transition-colors">
                  취소
                </button>
                <button onClick={handlePasswordSubmit} className={`flex-1 rounded-xl py-3 font-medium text-white text-sm transition-colors ${modalAction === "delete" ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"}`}>
                  확인
                </button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </main>
    </div>
  )
}