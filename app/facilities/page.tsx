import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { Sparkles, Baby, Gamepad2, Utensils, Shirt, PartyPopper } from "lucide-react"

const facilities = [
  {
    icon: Sparkles,
    title: "대형 볼풀 놀이터",
    description: "10만개의 항균 처리된 볼풀에서 아이들이 마음껏 뛰어놀 수 있습니다. 미끄럼틀과 정글짐이 함께 설치되어 있어 다양한 놀이가 가능합니다.",
    features: ["항균 볼풀 10만개", "3단 미끄럼틀", "정글짐", "트램폴린"],
    color: "from-primary to-secondary",
  },
  {
    icon: Baby,
    title: "영유아 전용 공간",
    description: "36개월 미만 영유아를 위한 안전한 놀이 공간입니다. 부드러운 매트와 안전 가드로 보호되어 있습니다.",
    features: ["안전 매트", "소프트 블록", "발달 촉진 장난감", "수유실"],
    color: "from-secondary to-accent",
  },
  {
    icon: Gamepad2,
    title: "체험 놀이존",
    description: "다양한 체험 활동을 통해 아이들의 창의력과 상상력을 키워줍니다. 정기적으로 새로운 프로그램이 업데이트됩니다.",
    features: ["블록 놀이", "역할 놀이", "미술 체험", "음악 놀이"],
    color: "from-accent to-primary",
  },
  {
    icon: Utensils,
    title: "카페테리아",
    description: "보호자를 위한 편안한 휴식 공간입니다. 아이들이 노는 모습을 지켜보며 커피와 간식을 즐기실 수 있습니다.",
    features: ["프리미엄 커피", "어린이 메뉴", "간식 바", "무료 WiFi"],
    color: "from-primary to-secondary",
  },
  {
    icon: Shirt,
    title: "파티룸",
    description: "생일파티, 돌잔치 등 특별한 날을 위한 파티룸입니다. 테마 장식과 케이크 준비가 가능합니다.",
    features: ["테마 장식", "케이크 준비", "음향 시설", "최대 20명"],
    color: "from-secondary to-accent",
  },
  {
    icon: PartyPopper,
    title: "이벤트 공간",
    description: "다양한 이벤트와 프로그램이 진행되는 다목적 공간입니다. 정기적인 공연과 체험 행사가 열립니다.",
    features: ["정기 공연", "체험 행사", "시즌 이벤트", "워크샵"],
    color: "from-accent to-primary",
  },
]

export default function FacilitiesPage() {
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
            <h1 className="text-4xl font-bold text-white drop-shadow-md tracking-tight">시설 소개</h1>
            <p className="mt-4 text-lg text-white/90 drop-shadow-sm font-medium max-w-2xl mx-auto leading-relaxed">
            아이들의 꿈과 상상력이 자라는 공간을 소개합니다
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 md:grid-cols-2">
            {facilities.map((facility) => {
              const Icon = facility.icon
              return (
                <div
                  key={facility.title}
                  className="group overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-300 hover:shadow-xl"
                >
                  <div className={`bg-gradient-to-r ${facility.color} flex h-48 items-center justify-center`}>
                    <Icon className="h-24 w-24 text-primary-foreground transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-3 text-xl font-bold text-foreground">{facility.title}</h3>
                    <p className="mb-4 text-muted-foreground">{facility.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {facility.features.map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Photo Gallery Preview */}
          <section className="mt-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-foreground">시설 사진</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-muted to-muted/50"
                >
                  <div className="flex h-full w-full items-center justify-center text-4xl">
                    {["🎈", "🎪", "🎠", "🧸", "🎨", "🎭", "🎢", "🎡"][i - 1]}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <Footer />
      </main>
    </div>
  )
}
