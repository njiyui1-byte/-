import { Host, Announcement, PremiumEvent, Booking } from "./types";

// Unsplash high quality fashion/portrait images for premium aesthetic (East Asian/Korean model aesthetics)
export const DEFAULT_HOSTS: Host[] = [
  {
    id: "host-1",
    name: "현우",
    age: 26,
    height: 185,
    category: "MODEL",
    styleKeywords: ["모델피지컬", "남친룩", "꿀성대", "스위트함"],
    description: "서울 패션위크 런웨이 경력의 탁월한 비율과 부드러운 매너를 겸비하였습니다. 조용하면서도 깊이 있는 대화로 당신의 특별한 밤을 한층 더 우아하게 만들어 드립니다.",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=500",
    rating: 4.9,
    isPremium: true,
    viewCount: 1240,
    likes: 421
  },
  {
    id: "host-2",
    name: "민준",
    age: 25,
    height: 182,
    category: "DANDY",
    styleKeywords: ["슈트장인", "조각외모", "센스만점", "유머러스"],
    description: "완벽한 슈트핏과 위트 있는 깔끔한 리드로 어떤 모임도 가장 화려한 파티로 변모시킵니다. 트렌디한 감각과 편안한 입담으로 지루할 틈 없는 유쾌한 시간을 약속합니다.",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=500",
    rating: 5.0,
    isPremium: true,
    viewCount: 1580,
    likes: 512
  },
  {
    id: "host-3",
    name: "태하",
    age: 27,
    height: 180,
    category: "SEXY",
    styleKeywords: ["치명적인눈빛", "옴므파탈", "차도남", "무대매너"],
    description: "깊고 그윽한 눈빛 속에 감춰진 젠틀하고 섹시한 매력. 오직 깊이 있는 감정의 소통과 세심한 케어로 지친 일상에 가장 감각적인 휴식을 선사합니다.",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&h=500",
    rating: 4.8,
    isPremium: true,
    viewCount: 940,
    likes: 318
  },
  {
    id: "host-4",
    name: "준수",
    age: 24,
    height: 178,
    category: "CUTE",
    styleKeywords: ["심쿵미소", "애교만점", "댕댕이미", "러블리"],
    description: "보고만 있어도 온 세상이 환해지는 무공해 눈웃음의 주인공입니다. 활기차고 밝은 에너지를 가득 불어넣어 드리는 분위기 메이커를 자처합니다.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=500",
    rating: 4.9,
    isPremium: false,
    viewCount: 710,
    likes: 215
  },
  {
    id: "host-5",
    name: "진호",
    age: 28,
    height: 183,
    category: "DANDY",
    styleKeywords: ["젠틀맨", "리더십", "프로페셔널", "수준높은케어"],
    description: "다년간의 정통 에스코트 경력으로 완성된 독보적인 기품과 엘리트 대화 매너. 최고의 품격과 VIP 대우를 지향하시는 고객분들께 단 하나의 선택이 되어 드립니다.",
    imageUrl: "https://images.unsplash.com/photo-1542156822-6924d1a71aba?auto=format&fit=crop&q=80&w=400&h=500",
    rating: 5.0,
    isPremium: false,
    viewCount: 890,
    likes: 299
  },
  {
    id: "host-6",
    name: "우빈",
    age: 25,
    height: 181,
    category: "SEXY",
    styleKeywords: ["남성미", "운동선수비주얼", "리듬감", "심쿵보이스"],
    description: "탄탄한 체격 조건과 우수에 찬 목소리로 특별한 무드를 완성하는 아티스트입니다. 귀를 매료시키는 감미로운 보이스와 탁월한 경청으로 마음의 안도감을 드립니다.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500",
    rating: 4.7,
    isPremium: false,
    viewCount: 620,
    likes: 180
  }
];

export const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "✨ [공식] 여성시대 프리미엄 럭셔리 라운지 리뉴얼 오픈 안내",
    content: "안녕하세요. 부천 최고의 명소, 여성시대 프리미엄 공식 플랫폼입니다.\n\n고객님들의 아낌없는 성원에 힘입어 당 라운지가 완전히 새로워진 VIP 인테리어와 최첨단 음향 기기를 탑재해 그랜드 오프닝 리뉴얼을 마쳤습니다.\n\n더욱 프라이빗하고 고급화된 분위기에서 품격 있는 시간을 약속드리겠습니다. 예약 대란이 예상되오니 주말 방문 예정이신 고객님들께서는 유선 또는 간편 예약 폼을 통해 밀착 예약을 서둘러 주시기 바랍니다.",
    writer: "VIP 총괄운영실",
    date: "2026-05-18",
    views: 485,
    isImportant: true
  },
  {
    id: "ann-2",
    title: "🚨 안심 케어 서비스 제도를 전면 실시합니다 (정찰제 안내)",
    content: "당 라운지는 거품 없고 투명한 매장 운영을 약속드립니다.\n\n일부 불법 사설 업체의 부당한 추가 요금 청구 조치를 원천 차단하고, 방문 즉시 정직한 주류 단가 및 케어 비용을 준수하는 정찰제를 고수하고 있습니다.\n\n불편을 겪으시는 경우 관리실 직통 무료 핫라인으로 24시간 피드백 가능하며, 완벽한 프라이버시 안심 귀가 케어가 보장됩니다. 처음 방문하시는 고객님이라도 편안하고 즐겁게 힐링하실 수 있도록 최선을 다하겠습니다.",
    writer: "CS 대표이사",
    date: "2026-05-15",
    views: 312,
    isImportant: true
  },
  {
    id: "ann-3",
    title: "📅 주말 조기 예약 프로모션 및 상시 픽업 이벤트 시책",
    content: "금요일, 토요일 오후 7시 이전 예약 방문해주시는 얼리버드 고객님들을 대상으로 샴페인 웰컴 드링크(1 Bottle)가 무상 제공됩니다.\n\n아울러, 부천 및 인근 지역(상동, 중동, 송내 등)에서 방문을 희망하시는 경우, 전문 드라이버의 세단 픽업 서비스를 무료로 받아보실 수 있습니다.\n\n자세한 상담은 상담 실장 대표 직통 전화 또는 1:1 예약 플러그인을 적극 이용해주시기 바랍니다.",
    writer: "마케팅팀",
    date: "2026-05-10",
    views: 298,
    isImportant: false
  }
];

export const DEFAULT_EVENTS: PremiumEvent[] = [
  {
    id: "evt-1",
    title: "Early Bird Welcome Cocktail Event",
    subtitle: "7시 이전 사전 예약 고객 골드 웰컴 샴페인 세트 증정",
    badge: "웰컴 혜택",
    period: "2026년 05월 01일 ~ 상시 진행",
    content: "오후 7시 전에 미리 연락을 주신 후 매장에 한 분 이상 내방 예정이신 지정 고객님들께, 깊은 풍미를 자랑하는 프렌치 브루 프리미엄 웰컴 샴페인 '골든 바론 1병'을 테이블 안주 플래터와 함께 무상 세팅해 드립니다."
  },
  {
    id: "evt-2",
    title: "VIP 무료 세단 에스코트 가이드",
    subtitle: "부천 전 지역 안전하고 편안하게 모시는 에스코트 리무진 서비스",
    badge: "무료 픽업",
    period: "2026년 05월 12일 ~ 06월 30일",
    content: "부천역, 상동역, 중동역, 송내역 등 인근 모든 전철역 또는 숙소 근교에서 매장까지 품격 있는 세단 차량으로 안전하게 왕복 픽업해 드립니다. 늦은 시간 퇴근길이나 무더운 외부 환경 속에서도 상쾌하고 보장받는 VIP 서비스를 그대로 유지하십시오."
  },
  {
    id: "evt-3",
    title: "특별 생일 & 기념일 럭셔리 스테이지 케어",
    subtitle: "생일을 맞이한 테이블에 생일 축하 전용 레터링 전광판 및 폭죽 쇼 서비스",
    badge: "스페셜 데이",
    period: "고객 생일 및 기념일 당일",
    content: "당일 생일이시거나 기념일을 맞아 찾아와 주시는 소중한 밤, 에이스 호스트들과 스태프진 전체가 참여하는 축하 세레머니 가이드를 지원합니다. 실내 맞춤 레터링 미디어 아트 연출과 기념 홀 케익 커팅 서비스로 세상에서 가장 뜻깊은 하루를 만들어 보세요."
  }
];

export const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: "book-1",
    guestName: "김지민",
    phone: "010-1234-5678",
    date: "2026-05-22",
    time: "21:00",
    partySize: 3,
    memo: "처음 방문인데, 목소리 좋고 키 크신 현우 씨와 민준 씨 배정에 우선적으로 신경 써 주실 수 있나요? 테이블 자리는 스피커 앞 말고 안쪽 조용한 개별 룸 부킹 희망합니다.",
    status: "CONFIRMED",
    createdAt: "2026-05-19T22:30:00.000Z"
  },
  {
    id: "book-2",
    guestName: "이지혜",
    phone: "010-8765-4321",
    date: "2026-05-23",
    time: "22:30",
    partySize: 4,
    memo: "친구 생일 파티 예정이라서 케이크 준비하고 케어 세레머니 신청하고 싶습니다! 에이스 스쿼드로 강력 추천 부탁드려요.",
    status: "PENDING",
    createdAt: "2026-05-20T08:15:00.000Z"
  }
];
