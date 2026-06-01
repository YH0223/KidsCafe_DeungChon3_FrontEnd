"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
  reply?: string
  repliedAt?: string
}

export function useInquiryDetail(id: string | undefined) {
  const router = useRouter()
  
  const [inquiry, setInquiry] = useState<Inquiry | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [modalAction, setModalAction] = useState<"view" | "edit" | "delete">("view")
  const [isVerified, setIsVerified] = useState(false)

  // 🌟 인라인 수정을 위한 상태 추가
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")
  const [editCategory, setEditCategory] = useState("")

  // 1. 일반 사용자용 엔드포인트 조회 (GET)
  useEffect(() => {
    if (!id) return

    const fetchInquiryDetail = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await customFetch(`http://localhost:8080/api/inquiries/${id}`)
        
        if (!response.ok) {
          if (response.status === 404) throw new Error("존재하지 않는 문의사항입니다.")
          throw new Error("데이터를 불러오는 데 실패했습니다.")
        }
        
        const data = await response.json()
        setInquiry(data)
        
        // 초기 수정 폼 데이터 바인딩 준비
        setEditTitle(data.title)
        setEditContent(data.content)
        setEditCategory(data.category)
        
        if (data.isSecret && !isVerified) {
          setModalAction("view")
          setShowPasswordModal(true)
        }
      } catch (err: any) {
        setError(err.message || "오류가 발생했습니다.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchInquiryDetail()
  }, [id, isVerified])

  // 2. 패스워드 검증 (POST)
  const handlePasswordSubmit = async () => {
    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해 주세요.")
      return
    }

    try {
      const response = await customFetch(`http://localhost:8080/api/inquiries/${id}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      })

      const isValid = await response.json()

      if (isValid) {
        setIsVerified(true)
        setShowPasswordModal(false)
        setPasswordError("")

        if (modalAction === "delete") {
          if (confirm("정말 이 문의글을 삭제하시겠습니까?")) {
            const deleteResponse = await customFetch(`http://localhost:8080/api/inquiries/${id}?password=${encodeURIComponent(password)}`, {
              method: "DELETE"
            })
            if (deleteResponse.ok) {
              alert("삭제되었습니다.")
              router.push("/inquiry")
            }
          }
        } else if (modalAction === "edit") {
          // 🌟 새 페이지로 안 가고 수정 상태 활성화!
          setIsEditing(true)
        }
      } else {
        setPasswordError("비밀번호가 일치하지 않습니다.")
      }
    } catch (err) {
      setPasswordError("통신 중 오류가 발생했습니다.")
    }
  }

  // 🌟 3. 수정 완료 요청 제출 (PUT)
  const handleUpdateSubmit = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert("제목과 내용을 모두 입력해 주세요.")
      return
    }

    try {
      // @PutMapping("/{id}")에 RequestParam인 password와 RequestBody 데이터를 실어 보냅니다.
      const response = await customFetch(
        `http://localhost:8080/api/inquiries/${id}?password=${encodeURIComponent(password)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: editTitle,
            content: editContent,
            category: editCategory,
            isSecret: inquiry?.isSecret // 기존 설정 유지
          })
        }
      )

      if (response.ok) {
        alert("수정되었습니다.")
        setIsEditing(false)
        // 화면 상태 업데이트
        setInquiry((prev) => prev ? { ...prev, title: editTitle, content: editContent, category: editCategory } : null)
      } else {
        const errData = await response.json()
        alert(errData.error || "수정에 실패했습니다.")
      }
    } catch (err) {
      alert("통신 중 오류가 발생했습니다.")
    }
  }

  const openEditModal = () => { setModalAction("edit"); setShowPasswordModal(true); }
  const openDeleteModal = () => { setModalAction("delete"); setShowPasswordModal(true); }
  const closePasswordModal = () => { setShowPasswordModal(false); setPassword(""); setPasswordError(""); }

  return {
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
  }
}