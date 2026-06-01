"use client"

import { useState, useEffect } from "react"
import { customFetch } from "@/lib/api"
import { Notice } from "@/types/Notice"

export function useAdminNotices() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isWriting, setIsWriting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // 작성 폼 상태
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isPinned, setIsPinned] = useState(false)

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setError(null)
        const response = await customFetch("/api/notices")
        if (!response.ok) throw new Error("공지사항 목록을 가져오지 못했습니다.")
        const data = await response.json()
        setNotices(data)
      } catch (err: any) {
        setError(err.message)
      }
    }
    fetchNotices()
  }, [])

  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    try {
      const response = await customFetch("/api/notices", {
        method: "POST",
        body: JSON.stringify({ title, content, isPinned }),
      })

      if (!response.ok) throw new Error("공지사항 등록에 실패했습니다.")
      const newNotice = await response.json()

      setNotices((prev) => [newNotice, ...prev])
      setTitle("")
      setContent("")
      setIsPinned(false)
      setIsWriting(false)
      alert("공지사항이 등록되었습니다.")
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleDeleteNotice = async (id: number) => {
    if (!confirm("해당 공지사항을 삭제하시겠습니까?")) return

    try {
      const response = await customFetch(`/api/notices/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("공지사항 삭제에 실패했습니다.")
      
      setNotices((prev) => prev.filter((n) => n.id !== id))
      alert("삭제되었습니다.")
    } catch (err: any) {
      alert(err.message)
    }
  }

  const sortedAndFiltered = notices
    .filter((n) => n.title.includes(searchTerm) || n.content.includes(searchTerm))
    .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))

  return {
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
  }
}