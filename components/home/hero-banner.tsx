"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const bannerSlides = [
  {
    title: "아이들의 꿈이 자라는 곳",
    subtitle: "서울형 키즈카페에서 특별한 추억을 만들어보세요",
    cta: "예약하기",
    href: "/reservation",
    // 🌟 public/images/ 폴더 안에 넣어둔 이미지 경로를 적어주세요. 외부 URL도 가능합니다.
    bgImage: "/images/hero-bg-1.jpg" 
  },
  {
    title: "안전하고 깨끗한 프리미엄 시설",
    subtitle: "위생과 안전을 최우선으로 생각합니다",
    cta: "시설 둘러보기",
    href: "/facilities",
    bgImage: "/images/hero-bg-2.jpg"
  },
  {
    title: "매월 새로운 이벤트",
    subtitle: "다양한 체험 프로그램과 이벤트가 기다리고 있습니다",
    cta: "공지사항 보기",
    href: "/notice",
    bgImage: "/images/hero-bg-3.jpg"
  }
]

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    // 🌟 배경 이미지를 레이어로 분리하기 위해 컨테이너를 relative로 유지합니다.
    <section className="relative overflow-hidden bg-slate-900 py-20 md:py-32">
      
      {/* 🌟 1. 슬라이드별 배경 이미지 레이어 (페이드 전환 효과 적용) */}
      {bannerSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide.bgImage})` }}
        />
      ))}

      {/* 🌟 2. 텍스트 가독성을 위한 어두운 그라데이션 오버레이 가림막 */}
      {/* 이미지 때문에 흰색 글씨가 안 보이는 현상을 완벽하게 방지합니다. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-secondary/40" />

      {/* Background Pattern (기존 기하학 그래픽 유지 - 오버레이 위로 얹음) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-secondary-foreground" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-secondary-foreground" />
        <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-foreground" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-6 text-center text-primary-foreground z-10">
        <div className="min-h-[200px]">
          <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white drop-shadow-md">
            {bannerSlides[currentSlide].title}
          </h1>
          <p className="mb-8 text-pretty text-lg text-white/90 md:text-xl drop-shadow">
            {bannerSlides[currentSlide].subtitle}
          </p>
          <Link
            href={bannerSlides[currentSlide].href}
            className="inline-flex items-center gap-2 rounded-full bg-card px-8 py-4 text-lg font-semibold text-primary shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {bannerSlides[currentSlide].cta}
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Slide Indicators */}
        <div className="mt-12 flex justify-center gap-3">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "w-8 bg-white" 
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}