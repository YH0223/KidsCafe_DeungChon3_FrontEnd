import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { Clock, Wallet, Users, AlertCircle, CheckCircle } from "lucide-react"

export default function InfoPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      
      <main className="lg:pl-72">
        {/* Header */}
        <div className="relative bg-slate-950 py-16 overflow-hidden">
          
          {/* 🌟 1. 실제 배경 이미지 레이어 */}
          {/* public/images/info-bg.jpg 경로에 이용 안내에 어울리는 이미지를 배치해 주세요. */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
            style={{ backgroundImage: "url('/images/info-bg.jpg')" }}
          />

          {/* 🌟 2. 텍스트 가독성을 위한 블랙 그라데이션 오버레이 가림막 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40" />

          {/* Content (z-10을 주어 오버레이 위로 콘텐츠를 올리고, text-center 유지) */}
          <div className="relative mx-auto max-w-4xl px-6 text-center text-primary-foreground z-10">
            <h1 className="text-4xl font-bold text-white drop-shadow-md tracking-tight">이용 안내</h1>
            <p className="mt-4 text-lg text-white/90 drop-shadow-sm font-medium max-w-2xl mx-auto leading-relaxed">
              서울형 키즈카페 등촌3동점 이용 방법을 안내해 드립니다
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-6 py-12">
          {/* 이용시간 */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <Clock className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">이용시간</h2>
            </div>
            <div className="rounded-2xl bg-card p-6 shadow-md">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-muted p-4">
                  <h3 className="mb-2 font-semibold text-foreground">평일</h3>
                  <p className="text-2xl font-bold text-primary">10:00 - 20:00</p>
                </div>
                <div className="rounded-xl bg-muted p-4">
                  <h3 className="mb-2 font-semibold text-foreground">주말/공휴일</h3>
                  <p className="text-2xl font-bold text-primary">09:00 - 21:00</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                * 마지막 입장은 마감 1시간 전까지입니다
              </p>
            </div>
          </section>

          {/* 이용요금 */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <Wallet className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">이용요금</h2>
            </div>
            <div className="overflow-hidden rounded-2xl bg-card shadow-md">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="px-6 py-4 text-left font-semibold">구분</th>
                    <th className="px-6 py-4 text-left font-semibold">평일</th>
                    <th className="px-6 py-4 text-left font-semibold">주말/공휴일</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-6 py-4 font-medium">기본 2시간</td>
                    <td className="px-6 py-4">15,000원</td>
                    <td className="px-6 py-4">18,000원</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="px-6 py-4 font-medium">추가 30분</td>
                    <td className="px-6 py-4">3,000원</td>
                    <td className="px-6 py-4">4,000원</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">종일권</td>
                    <td className="px-6 py-4">25,000원</td>
                    <td className="px-6 py-4">30,000원</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="px-6 py-4 font-medium">보호자</td>
                    <td className="px-6 py-4" colSpan={2}>무료 (음료 1잔 제공)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 이용대상 */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">이용대상</h2>
            </div>
            <div className="rounded-2xl bg-card p-6 shadow-md">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                  <span>12세 이하 어린이 (초등학생 이하)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                  <span>보호자 동반 필수 (어린이 1인당 보호자 1인 이상)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                  <span>36개월 미만 영유아 전용 공간 별도 운영</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 주의사항 */}
          <section>
            <div className="mb-6 flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">이용 주의사항</h2>
            </div>
            <div className="rounded-2xl bg-card p-6 shadow-md">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>외부 음식물 반입은 제한됩니다 (이유식 및 분유 제외)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>시설 내에서는 반드시 양말을 착용해 주세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>안전을 위해 보호자께서는 아이들을 지속적으로 보살펴 주세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>예약 취소는 방문 2시간 전까지 가능합니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>분실물에 대한 책임은 지지 않습니다</span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <Footer />
      </main>
    </div>
  )
}
