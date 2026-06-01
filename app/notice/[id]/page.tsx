"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { ArrowLeft, Bell, Calendar, Tag, Loader2 } from "lucide-react"
import { useNoticeDetail } from "@/hooks/useNoticeDetail"

export default function NoticeDetailPage() {
  const params = useParams()
  // URL 경로 세그먼트에서 id 추출 (예: /notice/5 일 때 "5")
  const id = params?.id as string

  const { notice, isLoading, error } = useNoticeDetail(id)

  // 1. 로딩 상태 뷰
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Sidebar />
        <main className="lg:pl-72">
          <div className="flex min-h-screen flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium text-muted-foreground">내용을 불러오는 중입니다...</p>
          </div>
        </main>
      </div>
    )
  }

  // 2. 에러 또는 데이터를 찾을 수 없는 상태 뷰
  if (error || !notice) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Sidebar />
        <main className="lg:pl-72">
          <div className="flex min-h-screen flex-col items-center justify-center px-6">
            <h1 className="text-2xl font-bold text-destructive">
              {error || "공지사항을 찾을 수 없습니다"}
            </h1>
            <Link href="/notice" className="mt-4 text-sm font-medium text-primary hover:underline">
              목록으로 돌아가기
            </Link>
          </div>
        </main>
      </div>
    )
  }

  // 🌟 백엔드에서 내려온 LocalDateTime(예: "2026-05-29T21:00:00") 문자열을 목록과 동일하게 "2026-05-29" 포맷으로 안전하게 가공합니다.
  const formattedDate = notice.createdAt ? notice.createdAt.split("T")[0] : ""

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="lg:pl-72">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary py-16">
          <div className="mx-auto max-w-4xl px-6 text-center text-primary-foreground">
            <Bell className="mx-auto mb-4 h-12 w-12" />
            <h1 className="text-4xl font-bold">공지사항</h1>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Link 
            href="/notice"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            목록으로 돌아가기
          </Link>

          <article className="rounded-2xl bg-card p-6 shadow-md md:p-8 border border-border/40">
            {/* Title */}
            <header className="mb-6 border-b border-border pb-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  notice.category === "이벤트" 
                    ? "bg-secondary text-secondary-foreground" 
                    : notice.category === "안내"
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary text-primary-foreground"
                }`}>
                  <Tag className="mr-1 inline h-3 w-3" />
                  {notice.category || "공지"}
                </span>
              </div>
              <h1 className="mb-4 text-2xl font-bold text-foreground md:text-3xl leading-snug">
                {notice.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {/* 🌟 기존 notice.date 대신 백엔드 스키마 컬럼인 formattedDate(createdAt)로 싱크 완료 */}
                {formattedDate}
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-gray max-w-none">
              {/* 🌟 notice.content 가 존재할 때만 split을 실행하도록 안전장치(Optional Chaining) 추가 */}
              {notice.content?.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 whitespace-pre-wrap text-foreground leading-relaxed text-sm md:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Navigation */}
          <div className="mt-6 flex justify-between">
            <Link
              href="/notice"
              className="rounded-xl bg-muted px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
            >
              목록보기
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}