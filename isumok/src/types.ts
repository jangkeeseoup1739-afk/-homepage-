export type ServiceCategory = 
  | '열펌' 
  | '일반펌' 
  | '링거펌' 
  | '매직/볼륨매직' 
  | '커트' 
  | '스타일링'
  | '두피/모발케어';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  highlight?: string;
  estimatedTime: string;
  recommendedFor: string[];
  isSignature?: boolean;
  imageUrl?: string;
  styleExampleLabel?: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: ServiceCategory;
  beforeImage: string;
  afterImage: string;
  clientProblem: string;
  solutionKey: string;
  naturalCareUsed: string;
  procedureTime: string;
  date: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: ServiceCategory;
  imageUrl: string;
  tags: string[];
  description: string;
  designerNote?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  treatment: string;
  comment: string;
  verifiedVisit: boolean;
  replyFromOwner?: string;
  likes?: number;
}

export interface BookingRequest {
  id: string;
  customerName: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  serviceCategory: string;
  hairConcerns: string[];
  notes?: string;
  privacyAgreed: boolean;
  createdAt: string;
  status: '접수완료' | '예약확정' | '시술완료' | '취소됨';
}

export interface SalonPhotoItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  tag?: string;
  isCustom?: boolean;
}

export interface SalonInfo {
  name: string;
  tagline: string;
  address: string;
  detailAddress: string;
  phonePrimary: string;
  phoneSecondary: string;
  weekdayHours: string;
  closedDays: string[];
  staff: string;
  specialty: string;
  parking: string;
  naverBookingUrl: string;
  naverMapUrl: string;
  kakaoMapUrl: string;
}
