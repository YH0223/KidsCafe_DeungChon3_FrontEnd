"use client"

import { useState, useEffect } from "react"
import { customFetch } from "@/lib/api"

export function useReservation() {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [childCount, setChildCount] = useState(1)
  const [adultCount, setAdultCount] = useState(1)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [disabledTimes, setDisabledTimes] = useState<string[]>([]) // 이미 예약 마감된 시간대 관리
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    memo: ""
  })

  // 1. 날짜가 선택될 때마다 해당 날짜의 마감된 예약 시간대를 백엔드에서 찔러서 가져옴
  useEffect(() => {
    if (!selectedDate) return

    const fetchReservedSlots = async () => {
      try {
        const formattedDate = selectedDate.toISOString().slice(0, 10) // "yyyy-MM-dd"
        
        // 백엔드: @GetMapping("/api/reservations") public List<ReservationDto> getReservations(@RequestParam LocalDate date)
        const response = await customFetch(`/api/reservations?date=${formattedDate}`)
        
        if (response.ok) {
          const reservedData = await response.json()
          // 취소된 예약을 제외하고, 이미 확정 혹은 대기 상태인 시간대들 추출
          const activeSlots = reservedData
            .filter((res: any) => res.status !== "cancelled")
            .map((res: any) => res.time) // 백엔드 반환 규격 "14:00" 등
            
          setDisabledTimes(activeSlots)
        }
      } catch (err) {
        console.error("해당 날짜의 예약 현황 로드 실패", err)
      }
    }

    fetchReservedSlots()
  }, [selectedDate])

  // 2. 최종 예약하기 제출 (POST)

const submitReservation = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return
  
    setIsSubmitting(true)
  
    try {
      // 백엔드 com.pakit.kidscafe.dto.ReservationRequest 규격에 완벽히 맞춤
      const reservationBody = {
        name: formData.name,                                     // 보낸 값 (NotBlank)
        phone: formData.phone,                                   // '010-1234-5678' 형태로 입력해야 정규식 통과
        email: formData.email || null,
        reservationDate: selectedDate.toISOString().slice(0, 10), // date -> reservationDate 로 변경 (NotNull)
        reservationTime: selectedTime,                           // time -> reservationTime 로 변경 (NotNull)
        childCount: childCount,                                  // guests 합산 대신 각각 분리해서 매핑
        adultCount: adultCount,                                  // guests 합산 대신 각각 분리해서 매핑
        memo: formData.memo || null
      }
  
      // 백엔드 엔드포인트 호출
      const response = await customFetch("/api/reservations", {
        method: "POST",
        body: JSON.stringify(reservationBody)
      })
  
      if (!response.ok) {
        throw new Error("예약 요청 중 오류가 발생했습니다.")
      }
  
      setStep(4) // 예약 완료 단계로 이동
    } catch (err: any) {
      alert(err.message || "오류가 발생했습니다.")
    } finally {
      setIsSubmitting(false)
    }
  }
  const resetReservation = () => {
    setStep(1)
    setSelectedDate(null)
    setSelectedTime(null)
    setChildCount(1)
    setAdultCount(1)
    setFormData({ name: "", phone: "", email: "", memo: "" })
    setDisabledTimes([])
  }

  return {
    step,
    setStep,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    childCount,
    setChildCount,
    adultCount,
    setAdultCount,
    currentMonth,
    setCurrentMonth,
    disabledTimes,
    formData,
    setFormData,
    isSubmitting,
    submitReservation,
    resetReservation
  }
}