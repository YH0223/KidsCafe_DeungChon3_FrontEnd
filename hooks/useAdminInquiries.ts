"use client"

import { useState, useEffect } from "react"
import { customFetch } from "@/lib/api"

export interface Inquiry {
  id: number
  title: string
  author: string
  category: string
  content: string
  createdAt: string
  isReplied: boolean
  isSecret: boolean
  phone?: string
  email?: string
  reply?: string 
  repliedAt?: string
}

export function useAdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"all" | "pending" | "replied">("all")
  const [selected, setSelected] = useState<Inquiry | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 1. 관리자용 전체 문의 목록 Fetch (백엔드 경로 /api/admin/inquiries 로 정확히 싱크)
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setError(null)
        const response = await customFetch("/api/admin/inquiries") // 🌟 /admin 추가 완료!
        if (!response.ok) throw new Error("문의 목록을 가져오지 못했습니다.")
        const data = await response.json()
        setInquiries(data)
      } catch (err: any) {
        setError(err.message)
      }
    }
    fetchInquiries()
  }, [])

  // 2. 답변 등록 처리 핸들러 수정
  const handleReplySubmit = async () => {
    if (!selected || !replyContent.trim()) return
    setIsSubmitting(true)

    try {
      // 백엔드 경로 /api/admin/inquiries/{id}/reply 로 정확히 매핑
      const response = await customFetch(`/api/admin/inquiries/${selected.id}/reply`, { // 🌟 /admin 추가 완료!
        method: "POST",
        body: JSON.stringify({ content: replyContent }), 
      })

      if (!response.ok) throw new Error("답변 등록에 실패했습니다.")
      
      // 🌟 백엔드가 Inquiry 객체가 아니라 Map.of("message", ...)를 주므로 직접 로컬 상태를 가공해 줍니다.
      const now = new Date().toISOString().slice(0, 16).replace("T", " ") // 현재 시간 포맷 가공 "yyyy-MM-dd HH:mm"
      
      const updatedInquiry: Inquiry = {
        ...selected,
        isReplied: true,
        reply: replyContent,
        repliedAt: now
      }

      // 실시간 클라이언트 상태 동기화 및 렌더링 리프레시
      setInquiries((prev) => prev.map((item) => (item.id === selected.id ? updatedInquiry : item)))
      setSelected(updatedInquiry)
      setReplyContent("")
      alert("답변이 정상적으로 처리되었습니다.")
    } catch (err: any) {
      alert(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const filtered = inquiries.filter((inquiry) => {
    const matchesSearch = inquiry.title.includes(searchTerm) || inquiry.author.includes(searchTerm) || inquiry.content.includes(searchTerm)
    const matchesFilter = filter === "all" || (filter === "pending" && !inquiry.isReplied) || (filter === "replied" && inquiry.isReplied)
    return matchesSearch && matchesFilter
  })

  return {
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
  }
}