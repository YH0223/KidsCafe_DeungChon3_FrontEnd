"use client"

import { useState, useEffect } from "react"
import { customFetch } from "@/lib/api"

// 백엔드 Notice 엔티티 구조와 1:1 매핑되는 인터페이스 정의
export interface NoticeDetail {
  id: number
  title: string
  content: string
  category: string   // "공지", "이벤트", "안내"
  isActive: boolean
  createdAt: string  // 🌟 백엔드의 LocalDateTime은 string으로 넘어옵니다.
  updatedAt?: string
}

export function useNoticeDetail(id: string | undefined) {
  const [notice, setNotice] = useState<NoticeDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchNoticeDetail = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // 백엔드: @GetMapping("/{id}") public ResponseEntity<Notice> getNotice(@PathVariable Long id)
        const response = await customFetch(`/api/notices/${id}`)

        if (!response.ok) {
          if (response.status === 404) throw new Error("존재하지 않는 공지사항입니다.")
          throw new Error("공지사항을 가져오는 데 실패했습니다.")
        }

        const data = await response.json()
        setNotice(data)
      } catch (err: any) {
        setError(err.message || "오류가 발생했습니다.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNoticeDetail()
  }, [id])

  return { notice, isLoading, error }
}