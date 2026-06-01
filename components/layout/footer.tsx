import Link from "next/link"
import { Phone, Mail, MapPin, Instagram, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-muted">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-background">서울형 키즈카페 등촌3동점</h3>
            <p className="text-sm text-muted/80">
              아이들의 행복한 놀이터, 서울형 키즈카페 등촌3동점입니다.
              <br />
              안전하고 깨끗한 환경에서 소중한 추억을 만들어드립니다.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-background">연락처</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                02-1234-5678
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                contact@happykidsland.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4" />
                서울특별시 강서구 화곡로63길 19 경향교회 교육관 1층
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-background">바로가기</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/info" className="transition-colors hover:text-background">
                  이용안내
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="transition-colors hover:text-background">
                  예약하기
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-background">
                  문의하기
                </Link>
              </li>
            </ul>
            <div className="mt-4 flex gap-4">
              <a href="#" className="transition-colors hover:text-background" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="transition-colors hover:text-background" aria-label="KakaoTalk">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-muted/20 pt-6 text-center text-xs text-muted/60">
          <p>© 2026 서울형 키즈카페 등촌3동점. All rights reserved.</p>
          <p className="mt-1">
            사업자등록번호: 511-82-82473 | 대표: 장미정
          </p>
        </div>
      </div>
    </footer>
  )
}
