"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { customFetch } from "@/lib/api"

export function useInquiryWrite() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    author: "",
    password: "",
    passwordConfirm: "",
    category: "",
    title: "",
    content: "",
    isSecret: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.author.trim()) newErrors.author = "작성자명을 입력해 주세요"
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해 주세요"
    } else if (formData.password.length < 4) {
      newErrors.password = "비밀번호는 4자 이상이어야 합니다"
    }
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다"
    }
    if (!formData.category) newErrors.category = "문의 유형을 선택해 주세요"
    if (!formData.title.trim()) newErrors.title = "제목을 입력해 주세요"
    if (!formData.content.trim()) {
      newErrors.content = "내용을 입력해 주세요"
    } else if (formData.content.length < 10) {
      newErrors.content = "내용은 10자 이상이어야 합니다"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      const { passwordConfirm, ...requestBody } = formData

      // 백엔드 엔티티와 동일한 /api/inquiries 엔드포인트로 전송
      const response = await customFetch("/api/inquiries", {
        method: "POST",
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error("문의 사항 등록에 실패했습니다.")
      }

      alert("문의가 정상적으로 등록되었습니다.")
      router.push("/inquiry") // 주소 이동 경로 변경
    } catch (err: any) {
      alert(err.message || "오류가 발생했습니다.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    setFormData,
    errors,
    isSubmitting,
    submitForm,
  }
}