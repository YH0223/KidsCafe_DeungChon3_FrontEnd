import Link from "next/link"
import { ChevronRight, Sparkles, Baby, Gamepad2, Utensils } from "lucide-react"

const facilities = [
  {
    icon: Sparkles,
    title: "볼풀 놀이터",
    description: "10만개의 항균 볼풀에서 마음껏 뛰어놀 수 있어요",
    color: "bg-primary",
  },
  {
    icon: Baby,
    title: "유아 전용 공간",
    description: "36개월 미만 영유아를 위한 안전한 놀이 공간",
    color: "bg-secondary",
  },
  {
    icon: Gamepad2,
    title: "체험 놀이존",
    description: "다양한 체험 활동과 창의력 놀이 프로그램",
    color: "bg-accent",
  },
  {
    icon: Utensils,
    title: "카페테리아",
    description: "부모님을 위한 편안한 휴식 공간과 간식 제공",
    color: "bg-primary",
  },
]

export function FacilitiesPreview() {
  return (
    <section className="bg-card py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-foreground">시설 소개</h2>
          <Link
            href="/facilities"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            더 보기
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((facility) => {
            const Icon = facility.icon
            return (
              <div
                key={facility.title}
                className="group cursor-pointer overflow-hidden rounded-2xl bg-muted transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`${facility.color} flex h-32 items-center justify-center`}>
                  <Icon className="h-16 w-16 text-primary-foreground transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-bold text-foreground">{facility.title}</h3>
                  <p className="text-sm text-muted-foreground">{facility.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
