import Link from "next/link"
import { ChevronRight, Bell } from "lucide-react"

const notices = [
  {
    id: 1,
    title: "2024년 설 연휴 운영 안내",
    date: "2024-02-05",
    isNew: true,
  },
  {
    id: 2,
    title: "신규 체험 프로그램 오픈 안내",
    date: "2024-02-01",
    isNew: true,
  },
  {
    id: 3,
    title: "겨울방학 특별 이벤트 진행 중",
    date: "2024-01-25",
    isNew: false,
  },
  {
    id: 4,
    title: "시설 리뉴얼 완료 안내",
    date: "2024-01-15",
    isNew: false,
  },
]

export function NoticePreview() {
  return (
    <section className="bg-muted py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-7 w-7 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">공지사항</h2>
          </div>
          <Link
            href="/notice"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            전체 보기
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-2xl bg-card shadow-md">
          <ul className="divide-y divide-border">
            {notices.map((notice) => (
              <li key={notice.id}>
                <Link
                  href={`/notice/${notice.id}`}
                  className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted"
                >
                  <div className="flex items-center gap-3">
                    {notice.isNew && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                        NEW
                      </span>
                    )}
                    <span className="font-medium text-foreground">{notice.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{notice.date}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
