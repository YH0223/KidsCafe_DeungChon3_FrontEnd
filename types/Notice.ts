export interface Notice {
    id: number
    title: string
    content: string
    author: string
    createdAt: string
    isPinned: boolean // 중요 공지 상단 고정 여부
    views: number
  }
  