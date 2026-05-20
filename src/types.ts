export interface Host {
  id: string;
  name: string;
  age: number;
  height: number;
  category: "MODEL" | "DANDY" | "CUTE" | "SEXY"; // 모델계, 댄디, 큐트, 섹시
  styleKeywords: string[]; // e.g. ["태평양어깨", "꿀성대", "조각외모"]
  description: string;
  imageUrl: string;
  rating: number; // e.g. 4.9, 5.0
  isPremium: boolean;
  viewCount: number;
  likes: number;
}

export interface Booking {
  id: string;
  guestName: string;
  phone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  partySize: number;
  memo: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  writer: string;
  date: string;
  views: number;
  isImportant: boolean;
}

export interface PremiumEvent {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  period: string;
  bannerUrl?: string;
  content: string;
}
