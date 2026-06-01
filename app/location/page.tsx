import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { MapPin, Phone, Clock, Car, Train, Bus } from "lucide-react"
import { KakaoMap } from "@/components/map/kakaomap"
export default function LocationPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      
      <main className="lg:pl-72">
              {/* Header */}
              <div className="relative bg-slate-950 py-20 md:py-24 overflow-hidden">
        
        {/* 🌟 1. 실제 배경 이미지 레이어 */}
        {/* public/images/location-bg.jpg 경로에 원하는 이미지를 넣어두고 매핑하세요. */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
          style={{ backgroundImage: "url('/images/location-bg.jpg')" }}
        />

        {/* 🌟 2. 텍스트 가독성을 위한 블랙 그라데이션 오버레이 가림막 */}
        {/* 이 레이어가 이미지를 은은하게 눌러주어 흰색 글씨가 무조건 선명하게 보입니다. */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-secondary/30" />

        {/* Content (z-10을 주어 오버레이 위로 글씨를 올립니다) */}
        <div className="relative mx-auto max-w-4xl px-6 text-center text-primary-foreground z-10">
          <MapPin className="mx-auto mb-4 h-12 w-12 text-white drop-shadow-sm animate-bounce" />
          <h1 className="text-4xl font-bold text-white drop-shadow-md tracking-tight">
            오시는 길
          </h1>
          <p className="mt-4 text-lg text-white/95 font-medium drop-shadow-sm max-w-xl mx-auto leading-relaxed">
            서울형 키즈카페 등촌3동점 오시는 방법을 상세히 안내해 드립니다.
          </p>
        </div>
      </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-6 py-12">
          
          {/* 변경된 부분: 실제 카카오맵 연동 컴포넌트 적용 */}
          <div className="mb-8 overflow-hidden rounded-2xl bg-muted shadow-md relative w-full h-[400px]">
            <KakaoMap address="서울특별시 강서구 화곡로63길 19" placeName="서울형 키즈카페 등촌3동점" /> 
          </div>

          {/* Location Info */}
          <div className="mb-8 rounded-2xl bg-card p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-foreground">기본 정보</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">주소</p>
                  <p className="text-sm text-muted-foreground">
                    서울특별시 강서구 화곡로63길 19<br /> 경향교회 교육관 1층
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">전화번호</p>
                  <p className="text-sm text-muted-foreground">02-1234-5678</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">운영시간</p>
                  <p className="text-sm text-muted-foreground">
                    평일 10:00 - 20:00<br />주말 09:00 - 21:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className="mb-8 rounded-2xl bg-card p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-foreground">기본 정보</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">주소</p>
                  <p className="text-sm text-muted-foreground">
                    서울특별시 강서구 화곡로63길 19<br />경향교회 교육관 1층
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">전화번호</p>
                  <p className="text-sm text-muted-foreground">02-1234-5678</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">운영시간</p>
                  <p className="text-sm text-muted-foreground">
                    평일 10:00 - 20:00<br />주말 09:00 - 21:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Transportation */}
          <div className="space-y-4">
            {/* Subway */}
            <div className="rounded-2xl bg-card p-6 shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Train className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">지하철</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded bg-green-500 px-2 py-0.5 text-xs font-semibold text-white">2호선</span>
                  <span>강남역 3번 출구에서 도보 5분</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded bg-orange-500 px-2 py-0.5 text-xs font-semibold text-white">9호선</span>
                  <span>신논현역 1번 출구에서 도보 7분</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded bg-yellow-500 px-2 py-0.5 text-xs font-semibold text-foreground">분당선</span>
                  <span>선릉역 10번 출구에서 도보 10분</span>
                </li>
              </ul>
            </div>

            {/* Bus */}
            <div className="rounded-2xl bg-card p-6 shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Bus className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">버스</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">간선</span>
                  <span>140, 144, 145, 340, 420 (강남역 정류장 하차)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded bg-green-500 px-2 py-0.5 text-xs font-semibold text-white">지선</span>
                  <span>3412, 4412 (테헤란로 정류장 하차)</span>
                </li>
              </ul>
            </div>

            {/* Car */}
            <div className="rounded-2xl bg-card p-6 shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Car className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">자가용</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>건물 지하 주차장 이용</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>네비게이션: &quot;경향교회&quot; 또는 &quot;서울특별시 강서구 화곡로63길 19&quot; 검색</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>주차 공간이 협소할 수 있으니 대중교통 이용을 권장합니다</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}
