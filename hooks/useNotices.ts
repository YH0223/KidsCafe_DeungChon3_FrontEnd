"use client"

import { useState, useEffect } from "react"
import { customFetch } from "@/lib/api"

// 🌟 백엔드 Notice 엔티티와 완전 일치하도록 인터페이스 수정
export interface Notice {
  id: number
  title: string
  content: string
  category: string   // "중요", "안내", "이벤트" 등
  isActive: boolean
  createdAt: string  // 🌟 백엔드의 LocalDateTime 포맷 반영
  updatedAt?: string
}

export function useNotices() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await customFetch("/api/notices")
        
        if (!response.ok) {
          throw new Error("공지사항 목록을 가져오는 데 실패했습니다.")
        }
        
        const data = await response.json()
        setNotices(data)
      } catch (err: any) {
        setError(err.message || "알 수 없는 에러가 발생했습니다.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotices()
  }, [])

  return {
    notices,
    isLoading,
    error,
  }
}