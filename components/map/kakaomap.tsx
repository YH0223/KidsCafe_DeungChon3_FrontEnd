"use client"

import { useEffect, useRef } from "react"

// Typescript 에러 방지
declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  address: string;      // 검색할 주소
  placeName?: string;   // 마커 위에 띄울 텍스트 (선택사항)
}

export function KakaoMap({ address, placeName }: KakaoMapProps) {
    console.log("지도 컴포넌트 실행 중!!!!"); // 이 로그가 콘솔에 뜨는지 확인!
    const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const loadKakaoMap = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return

        // 1. 지도 초기 생성 (처음에는 임시 좌표로 생성)
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(37.566826, 126.978656), // 임시 좌표(서울시청)
          level: 3,
        })

        // 2. 주소-좌표 변환 객체를 생성합니다
        const geocoder = new window.kakao.maps.services.Geocoder()

        // 3. 주소로 좌표를 검색합니다
        geocoder.addressSearch(address, function (result: any, status: any) {
          // 정상적으로 검색이 완료됐으면
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x)

            // 결과값으로 받은 위치를 마커로 표시합니다
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
            })

            // 장소명이 전달되었다면 인포윈도우(말풍선)를 띄웁니다
            if (placeName) {
              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="width:150px;text-align:center;padding:6px 0;border-radius:8px;font-size:14px;color:#333;">${placeName}</div>`,
              })
              infowindow.open(map, marker)
            }

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords)
          } else {
            console.error("주소를 찾을 수 없습니다:", address)
          }
        })
      })
    }

    const existingScript = document.getElementById("kakao-map-script")

    if (!existingScript) {
      const script = document.createElement("script")
      script.id = "kakao-map-script"
      // ★ 중요: URL 끝에 &libraries=services 를 반드시 추가해야 주소 검색(Geocoder)이 가능합니다.
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false&libraries=services`
      document.head.appendChild(script)

      script.onload = () => loadKakaoMap()
    } else {
      if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
        loadKakaoMap()
      }
    }
  }, [address, placeName]) // 주소나 이름이 바뀌면 다시 렌더링

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: '400px', /* %나 full 대신 무조건 400px로 쾅 박아줍니다 */
        backgroundColor: '#f3f4f6' /* 회색 배경: 지도가 안 떠도 이 영역이 보이면 크기 문제는 해결된 것 */
      }} 
    />
  )
}