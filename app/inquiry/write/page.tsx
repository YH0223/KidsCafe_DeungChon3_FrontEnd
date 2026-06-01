"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { ArrowLeft, Lock, Eye, Send } from "lucide-react"
import Link from "next/link"
import { useInquiryWrite } from "@/hooks/useInquiryWrite"

export default function InquiryWritePage() {
  const { formData, setFormData, errors, isSubmitting, submitForm } = useInquiryWrite()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="lg:pl-72">
        <div className="bg-gradient-to-r from-primary to-secondary py-12">
          <div className="mx-auto max-w-4xl px-6 text-primary-foreground">
            <Link
              href="/inquiry"
              className="mb-4 inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              목록으로
            </Link>
            <h1 className="text-3xl font-bold">문의 작성</h1>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 py-12">
          <form onSubmit={submitForm} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="space-y-6">
              {/* 작성자 & 비밀번호 */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    작성자명 <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className={`w-full rounded-xl border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 ${
                      errors.author ? "border-destructive focus:ring-destructive/20" : "border-input focus:border-primary focus:ring-primary/20"
                    }`}
                    placeholder="이름을 입력해 주세요"
                  />
                  {errors.author && <p className="mt-1 text-sm text-destructive">{errors.author}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    비밀번호 <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full rounded-xl border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 ${
                      errors.password ? "border-destructive focus:ring-destructive/20" : "border-input focus:border-primary focus:ring-primary/20"
                    }`}
                    placeholder="글 수정/삭제 시 필요합니다"
                  />
                  {errors.password && <p className="mt-1 text-sm text-destructive">{errors.password}</p>}
                </div>
              </div>

              {/* 비밀번호 확인 & 유형 */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    비밀번호 확인 <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="password"
                    value={formData.passwordConfirm}
                    onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
                    className={`w-full rounded-xl border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 ${
                      errors.passwordConfirm ? "border-destructive focus:ring-destructive/20" : "border-input focus:border-primary focus:ring-primary/20"
                    }`}
                    placeholder="비밀번호를 다시 입력해 주세요"
                  />
                  {errors.passwordConfirm && <p className="mt-1 text-sm text-destructive">{errors.passwordConfirm}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    문의 유형 <span className="text-destructive">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full rounded-xl border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 ${
                      errors.category ? "border-destructive focus:ring-destructive/20" : "border-input focus:border-primary focus:ring-primary/20"
                    }`}
                  >
                    <option value="">선택해 주세요</option>
                    <option value="예약 관련">예약 관련</option>
                    <option value="시설 문의">시설 문의</option>
                    <option value="이용 관련">이용 관련</option>
                    <option value="파티룸 예약">파티룸 예약</option>
                    <option value="건의사항">건의사항</option>
                    <option value="기타">기타</option>
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-destructive">{errors.category}</p>}
                </div>
              </div>

              {/* 제목 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  제목 <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full rounded-xl border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 ${
                    errors.title ? "border-destructive focus:ring-destructive/20" : "border-input focus:border-primary focus:ring-primary/20"
                  }`}
                  placeholder="제목을 입력해 주세요"
                />
                {errors.title && <p className="mt-1 text-sm text-destructive">{errors.title}</p>}
              </div>

              {/* 내용 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  내용 <span className="text-destructive">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  className={`w-full rounded-xl border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 ${
                    errors.content ? "border-destructive focus:ring-destructive/20" : "border-input focus:border-primary focus:ring-primary/20"
                  }`}
                  placeholder="문의 내용을 입력해 주세요 (최소 10자 이상)"
                />
                {errors.content && <p className="mt-1 text-sm text-destructive">{errors.content}</p>}
              </div>

              {/* 비밀글 토글 버튼 */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isSecret: !formData.isSecret })}
                  className={`relative h-6 w-11 rounded-full transition-colors ${formData.isSecret ? "bg-primary" : "bg-muted"}`}
                >
                  <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${formData.isSecret ? "translate-x-5" : "translate-x-0"}`} />
                </button>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  {formData.isSecret ? <Lock className="h-4 w-4 text-primary" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  <span>{formData.isSecret ? "비밀글" : "공개글"}</span>
                </div>
              </div>

              <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
                <p>* 비밀번호는 글 수정 및 삭제, 비밀글 열람 시 필요합니다.</p>
                <p className="mt-1">* 개인정보는 문의 답변 목적으로만 사용되며, 답변 완료 후 30일 뒤 자동 삭제됩니다.</p>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Link href="/inquiry" className="flex-1 rounded-xl border border-border bg-card py-4 text-center font-semibold text-foreground transition-colors hover:bg-muted">
                취소
              </Link>
              <button type="submit" disabled={isSubmitting} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">
                <Send className="h-5 w-5" />
                {isSubmitting ? "등록 중..." : "문의 등록"}
              </button>
            </div>
          </form>
        </div>

        <Footer />
      </main>
    </div>
  )
}