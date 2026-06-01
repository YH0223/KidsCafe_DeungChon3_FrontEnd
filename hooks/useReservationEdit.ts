"use client"

import { useState } from "react"
import { customFetch } from "@/lib/api"

// 🌟 백엔드 엔티티 JSON 응답 스펙과 1:1 일치화
interface Reservation {
  id: number
  name: string
  phone: string
  email?: string
  reservationDate: string // yyyy-MM-dd
  reservationTime: string // hh:mm:ss
  childCount: number
  adultCount: number
  memo?: string
  status: string
}

export function useReservationEdit() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [reservation, setReservation] = useState<Reservation | null>(null)

  const [authName, setAuthName] = useState("")
  const [authPhone, setAuthPhone] = useState("")

  const [editDate, setEditDate] = useState("")
  const [editTime, setEditTime] = useState("")
  const [editGuests, setEditGuests] = useState(1)

  // 1. 예약자 인증 (POST)
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!authName.trim() || !authPhone.trim()) {
      setError("예약자명과 전화번호를 모두 입력해 주세요.")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await customFetch("http://localhost:8080/api/reservations/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: authName, phone: authPhone })
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || "예약 정보를 찾을 수 없습니다.")
      }

      const data: Reservation = await response.json()
      setReservation(data)
      
      // 🌟 백엔드 엔티티 실제 필드명을 매핑하여 폼 초기값 설정
      setEditDate(data.reservationDate)
      setEditTime(data.reservationTime.slice(0, 5)) // "14:00:00" -> "14:00" 포맷팅 자르기
      setEditGuests(data.adultCount) // 성인 인원 기준으로 매핑
      
      setIsAuthenticated(true)
    } catch (err: any) {
      setError(err.message || "오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  // 2. 예약 수정 (PUT)
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reservation) return

    try {
      setIsLoading(true)
      const response = await customFetch(`http://localhost:8080/api/reservations/${reservation.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: editDate,
          time: editTime,
          guests: editGuests
        })
      })

      if (!response.ok) throw new Error("예약 변경에 실패했습니다.")

      alert("예약이 성공적으로 변경되었습니다.")
      
      // 화면 상태 실시간 동기화
      setReservation((prev) => prev ? { 
        ...prev, 
        reservationDate: editDate, 
        reservationTime: editTime + ":00", 
        adultCount: editGuests 
      } : null)
      
      setIsAuthenticated(false)
      setAuthName("")
      setAuthPhone("")
    } catch (err: any) {
      alert(err.message || "통신 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    isAuthenticated,
    reservation,
    authName,
    setAuthName,
    authPhone,
    setAuthPhone,
    editDate,
    setEditDate,
    editTime,
    setEditTime,
    editGuests,
    setEditGuests,
    handleAuthSubmit,
    handleUpdateSubmit,
    setIsAuthenticated
  }
}