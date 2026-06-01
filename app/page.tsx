import { Sidebar } from "@/components/layout/sidebar"
import { HeroBanner } from "@/components/home/hero-banner"
import { QuickInfo } from "@/components/home/quick-info"
import { FacilitiesPreview } from "@/components/home/facilities-preview"
import { NoticePreview } from "@/components/home/notice-preview"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      
      {/* Main Content */}
      <main className="lg:pl-72">
        <HeroBanner />
        <QuickInfo />
        <FacilitiesPreview />
        <NoticePreview />
        <Footer />
      </main>
    </div>
  )
}
