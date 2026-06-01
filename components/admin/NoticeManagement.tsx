"use client"

import { Search, Pin, Plus, Trash2 } from "lucide-react"
import { useAdminNotices } from "@/hooks/useAdminNotices"

export function NoticeManagement() {
  const {
    sortedAndFiltered,
    searchTerm,
    setSearchTerm,
    isWriting,
    setIsWriting,
    title,
    setTitle,
    content,
    setContent,
    isPinned,
    setIsPinned,
    error,
    handleCreateNotice,
    handleDeleteNotice,
  } = useAdminNotices()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card p-4 rounded-2xl border">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="공지사항 제목 또는 내용 검색..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-lg border bg-background py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <button onClick={() => setIsWriting(!isWriting)} className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          {isWriting ? "목록 보기" : <><Plus className="h-4 w-4" /> 새 공지 작성</>}
        </button>
      </div>

      {error && <div className="p-4 text-sm text-destructive bg-destructive/5 text-center">{error}</div>}

      {isWriting ? (
        <form onSubmit={handleCreateNotice} className="rounded-2xl bg-card border p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold">새 공지사항 등록</h3>
          <div>
            <label className="block text-sm font-medium mb-1">제목</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="공지사항 제목을 입력하세요" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">내용</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="w-full rounded-lg border bg-background p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="공지할 내용을 작성하세요..." required />
          </div>
          <div className="flex items-center gap-2 py-2">
            <input type="checkbox" id="pin" checked={isPinned} onChange={(e) => setIsPinned(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
            <label htmlFor="pin" className="text-sm font-medium flex items-center gap-1 text-amber-600"><Pin className="h-3.5 w-3.5" /> 최상단에 고정하기 (중요공지)</label>
          </div>
          <div className="flex gap-3 justify-end">
            <button type="button" onClick={() => setIsWriting(false)} className="rounded-lg border px-4 py-2 text-sm hover:bg-muted">취소</button>
            <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">공지 등록</button>
          </div>
        </form>
      ) : (
        <div className="rounded-2xl bg-card border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted text-muted-foreground font-medium border-b">
                <tr>
                  <th className="p-4 w-20 text-center">구분</th>
                  <th className="p-4">제목</th>
                  <th className="p-4 w-32">작성자</th>
                  <th className="p-4 w-32">등록일</th>
                  <th className="p-4 w-20 text-center">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sortedAndFiltered.length > 0 ? (
                  sortedAndFiltered.map((notice) => (
                    <tr key={notice.id} className={`hover:bg-muted/30 transition-colors ${notice.isPinned ? "bg-amber-50/40" : ""}`}>
                      <td className="p-4 text-center">
                        {notice.isPinned ? (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800"><Pin className="h-3 w-3 fill-amber-800" /> 중요</span>
                        ) : (
                          <span className="text-muted-foreground">{notice.id.toString().slice(-4)}</span>
                        )}
                      </td>
                      <td className="p-4 font-medium">
                        <div className="text-foreground">{notice.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1 mt-1 font-normal">{notice.content}</div>
                      </td>
                      <td className="p-4 text-muted-foreground">{notice.author}</td>
                      <td className="p-4 text-muted-foreground">{notice.createdAt}</td>
                      <td className="p-4 text-center">
                        <button onClick={() => handleDeleteNotice(notice.id)} className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"><Trash2 className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">등록된 공지사항이 없습니다.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}