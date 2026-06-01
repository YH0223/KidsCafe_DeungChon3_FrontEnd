import { Clock, Wallet, MapPin, Phone } from "lucide-react"

const infoCards = [
  {
    icon: Clock,
    title: "이용시간",
    content: ["평일 10:00 - 20:00", "주말/공휴일 09:00 - 21:00"],
  },
  {
    icon: Wallet,
    title: "이용요금",
    content: ["2시간 기준 15,000원", "추가 30분당 3,000원"],
  },
  {
    icon: MapPin,
    title: "위치",
    content: ["서울특별시 강서구 화곡로63길 19", "경향교회 교육관 1층"],
  },
  {
    icon: Phone,
    title: "문의전화",
    content: ["02-1234-5678", "카카오톡: happykidsland"],
  },
]

export function QuickInfo() {
  return (
    <section className="bg-muted py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-center text-3xl font-bold text-foreground">
          이용 안내
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {infoCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="group rounded-2xl bg-card p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-foreground">{card.title}</h3>
                {card.content.map((line, index) => (
                  <p key={index} className="text-sm text-muted-foreground">
                    {line}
                  </p>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
