"use client"

import { Search, Filter, Eye, Send, Loader2 } from "lucide-react"
import { useAdminInquiries } from "@/hooks/useAdminInquiries"

export function InquiryManagement() {
  const {
    filtered,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    selected,
    setSelected,
    replyContent,
    setReplyContent,
    isSubmitting,
    error,
    handleReplySubmit,
  } = useAdminInquiries()

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl bg-card shadow-sm border border-border">
        <div className="border-b border-border p-4">
          <h2 className="mb-4 font-semibold text-foreground">문의 목록</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="제목, 내용 검색..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-lg border bg-background py-2 pl-9 pr-4 text-sm focus:border-primary focus:outline-none" />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="rounded-lg border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none">
                <option value="all">전체</option>
                <option value="pending">답변 대기</option>
                <option value="replied">답변 완료</option>
              </select>
            </div>
          </div>
        </div>
        
        {error && <div className="p-4 text-sm text-destructive bg-destructive/5 text-center">{error}</div>}
        
        <div className="max-h-[600px] overflow-y-auto divide-y divide-border">
          {filtered.length > 0 ? (
            filtered.map((inquiry) => (
              <button key={inquiry.id} onClick={() => { setSelected(inquiry); setReplyContent(inquiry.reply || ""); }} className={`w-full p-4 text-left transition-colors hover:bg-muted/50 ${selected?.id === inquiry.id ? "bg-primary/5" : ""}`}>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{inquiry.category}</span>
                  {inquiry.isReplied ? <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">답변완료</span> : <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">대기중</span>}
                </div>
                <p className="font-medium text-foreground line-clamp-1">{inquiry.title}</p>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground"><span>{inquiry.author}</span><span>{inquiry.createdAt}</span></div>
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">검색 결과가 없습니다.</div>
          )}
        </div>
      </div>

      <div className="rounded-2xl bg-card shadow-sm border border-border">
        {selected ? (
          <>
            <div className="border-b border-border p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{selected.category}</span>
                {selected.isSecret && <span className="text-xs text-muted-foreground">(비밀글)</span>}
              </div>
              <h3 className="font-semibold text-foreground">{selected.title}</h3>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span>작성자: {selected.author}</span><span>작성일: {selected.createdAt}</span>
                {selected.phone && <span>연락처: {selected.phone}</span>}{selected.email && <span>이메일: {selected.email}</span>}
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto border-b border-border p-4">
              <p className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">{selected.content}</p>
            </div>
            <div className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-medium text-foreground">답변 작성</h4>
                {selected.isReplied && <span className="text-xs text-green-600 font-medium">답변완료 ({selected.repliedAt})</span>}
              </div>
              <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} rows={6} className="mb-3 w-full rounded-lg border bg-background p-3 text-sm text-foreground focus:border-primary focus:outline-none" placeholder="답변 내용을 입력하세요..." />
              <button onClick={handleReplySubmit} disabled={isSubmitting || !replyContent.trim()} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {isSubmitting ? "저장 중..." : selected.isReplied ? "답변 수정" : "답변 등록"}
              </button>
            </div>
          </>
        ) : (
          <div className="flex h-full min-h-[500px] flex-col items-center justify-center text-muted-foreground"><Eye className="mb-4 h-12 w-12 opacity-30" /><p>문의를 선택하세요</p></div>
        )}
      </div>
    </div>
  )
}