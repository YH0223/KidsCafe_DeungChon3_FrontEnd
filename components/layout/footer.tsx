import Link from "next/link"
import { Phone, Mail, MapPin, Instagram, MessageSquareHeart, Compass, } from "lucide-react"

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
                {/* 1. 네이버 지도 (Naver Map) */}
                <a 
                  href="https://naver.me/GuCCsKhG" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors hover:text-background" 
                  aria-label="네이버 지도"
                >
                  <svg className="h-5 w-5 text-stone-400 transition-colors hover:text-stone-600" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
                    {/* 첫 번째 선 요소: 부모의 text-stone-400 색상을 따라감 */}
                    <path 
                      d="M169.982 157.626H67.502l19.43-28.088.03-.042h83.02z" 
                      className="fill-none stroke-current" 
                      strokeWidth="12" 
                      strokeLinecap="butt" 
                      strokeLinejoin="round"
                    />
                    {/* 두 번째 선 요소: 부모의 text-stone-400 색상을 따라감 */}
                    <path 
                      d="M28.685 102.989c-11.64-18.87-7.803-43.408 9.042-57.824 16.846-14.416 41.681-14.416 58.527 0 16.846 14.416 20.683 38.953 9.043 57.824m-76.612 0 37.527 54.455c.086.126.142.182.268.182h.878c.125 0 .27-.182.27-.182l37.669-54.455" 
                      className="fill-none stroke-current" 
                      strokeWidth="12" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    {/* 내부 채워진 글자/문양: fill-current로 변경하여 전체 회색 톤에 맞춤 */}
                    <path 
                      d="M49.869 63.624h11.694l10.963 16.079v-16.08H84.22v31.428H72.526L61.563 78.97v16.08H49.869Z" 
                      className="fill-current"
                    />
                  </svg>
                </a>

                {/* 2. 카카오톡 채널 (KakaoTalk) */}
                <a 
                  href="http://pf.kakao.com/_LDxhxjX" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors hover:text-background" 
                  aria-label="카카오톡 채널"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M12 2C6.477 2 2 5.582 2 10c0 2.894 1.88 5.42 4.722 6.74-.176.61-.573 2.003-.66 2.31-.11.393.136.386.29.284 1.21-.8 2.784-1.922 3.374-2.318.41.057.834.084 1.274.084 5.523 0 10-3.582 10-8s-4.477-8-10-8z" 
                      className="fill-current"
                    />
                  </svg>
                </a>

                {/* 3. 네이버 블로그 (Naver Blog - 밝은 회색 버전) */}
                <a 
                  href="https://m.blog.naver.com/dc3kidscafe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  // 'text-foreground'를 'text-stone-400'(밝은 회색)으로 변경
                  // 호버 시 효과를 'hover:text-stone-600'(약간 더 어두운 회색) 또는 원하시는 효과로 조정 가능
                  className="text-stone-400 transition-colors hover:text-stone-600" 
                  aria-label="네이버 블로그"
                >
                  <svg className="h-5 w-5" viewBox="0 0 142 142" xmlns="http://www.w3.org/2000/svg">
                    {/* 외부 둥근 사각형 테두리 박스: 부모 a 태그의 색상(fill-current)을 따름 */}
                    <path 
                      d="M142 110.222C142 127.773 127.773 142 110.222 142H31.778C14.227 142 0 127.773 0 110.222V31.778C0 14.227 14.227 0 31.778 0h78.444C127.773 0 142 14.227 142 31.778v78.444z" 
                      className="fill-current"
                    />
                    {/* 내부 'b.' 글자 및 점: 흰색(fill-white)으로 고정하여 각인 효과 유지 */}
                    <path 
                      d="M51.98 96.883c16.323 0 25.597-8.995 25.597-22.375 0-9.845-6.046-16.732-15.643-18.026v-.272c7.685-1.905 12.582-7.822 12.582-15.914 0-11.29-9.113-18.435-23.76-18.435H24.37v75.022H51.98zm-15.845-44.41h10.337c7.413 0 11.562 3.197 11.562 8.706 0 5.576-4.42 9.045-11.833 9.045H36.135V52.473zm0 33.46V68.932h11.425c8.23 0 13.058 3.537 13.058 9.725 0 6.325-4.692 11.276-13.397 11.276H36.135zM91.312 85.118c0-7.345 5.922-13.267 13.267-13.267 7.346 0 13.267 5.922 13.267 13.267 0 7.346-5.921 13.267-13.267 13.267-7.345 0-13.267-5.921-13.267-13.267z" 
                      className="fill-white" 
                    />
                  </svg>
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
