"use client"

import { useState, useEffect } from "react"
import { customFetch } from "@/lib/api"
export interface Inquiry {
  id: number
  title: string
  author: string
  category: string
  createdAt: string
  isReplied: boolean
  isSecret: boolean
}

export function useInquiries(itemsPerPage: number = 10) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 1. 백엔드 API로부터 문의 목록 데이터 불러오기
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // TODO: 실제 스프링부트 또는 백엔드 API 엔드포인트 주소로 변경하세요.
        const response = await customFetch("/api/inquiries")
        
        if (!response.ok) {
          throw new Error("데이터를 불러오는 데 실패했습니다.")
        }
        
        const data = await response.json()
        setInquiries(data)
      } catch (err: any) {
        setError(err.message || "알 수 없는 에러가 발생했습니다.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchInquiries()
  }, [])

  // 검색어 입력 시 페이지를 다시 1페이지로 리셋
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  // 2. 검색어 필터링 로직
  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      inquiry.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 3. 페이지네이션 계산 로직
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage)
  const paginatedInquiries = filteredInquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return {
    inquiries: paginatedInquiries, // 현재 페이지에 보여줄 문의글 목록
    searchTerm,
    setSearchTerm: handleSearchChange,
    currentPage,
    setCurrentPage,
    totalPages,
    isLoading,
    error,
  }
}