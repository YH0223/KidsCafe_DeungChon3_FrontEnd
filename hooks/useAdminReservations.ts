"use client"

import { useState, useEffect } from "react"
import { customFetch } from "@/lib/api"

export type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELLED"

export interface Reservation {
    id: number
    name: string            // name (customerName 아님)
    phone: string
    email?: string          // 이메일 추가
    reservationDate: string // 🌟 date 가 아니라 reservationDate!
    reservationTime: string // 🌟 time 이 아니라 reservationTime!
    childCount: number      // 🌟 guests 가 아니라 childCount!
    adultCount: number      // 🌟 guests 가 아니라 adultCount!
    status: ReservationStatus
    createdAt: string
    memo?: string
  }

export function useAdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"all" | "PENDING" | "CONFIRMED" | "CANCELLED">("all")
  const [selected, setSelected] = useState<Reservation | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setError(null)
        const response = await customFetch("/api/reservations")
        if (!response.ok) throw new Error("예약 목록을 가져오지 못했습니다.")
        const data = await response.json()
        setReservations(data)
      } catch (err: any) {
        setError(err.message)
      }
    }
    fetchReservations()
  }, [])

  const handleUpdateStatus = async (id: number, newStatus: ReservationStatus) => {
    if (!confirm(`예약을 ${newStatus === 'CONFIRMED' ? '확정' : '취소'} 하시겠습니까?`)) return
    setIsSubmitting(true)

    try {
      const response = await customFetch(`/api/reservations/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error("예약 상태 변경에 실패했습니다.")
      
      setReservations(prev => prev.map(res => res.id === id ? { ...res, status: newStatus } : res))
      if (selected?.id === id) {
        setSelected(prev => prev ? { ...prev, status: newStatus } : null)
      }
      alert("상태가 성공적으로 변경되었습니다.")
    } catch (err: any) {
      alert(err.message)
    } {
      setIsSubmitting(false)
    }
  }

  const filtered = reservations.filter((res) => {
    const matchesSearch = res.name.includes(searchTerm) || res.phone.includes(searchTerm)
    const matchesFilter = filter === "all" || res.status === filter
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
    isSubmitting,
    error,
    handleUpdateStatus,
  }
}