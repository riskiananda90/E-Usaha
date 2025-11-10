// API Types for Backend Integration

export type UserRole = 'guest' | 'user' | 'business_owner';
export type BusinessCategory = 'kuliner' | 'kos' | 'wisata' | 'event_ticket' | 'hotel' | 'jasa';

export interface User {
  _id: string;
  email: string;
  role: UserRole;
  businessCategory?: BusinessCategory;
  businessId?: string; // Reference to Business._id for business owners
  profile?: {
    name?: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role?: UserRole;
  businessCategory?: BusinessCategory;
  businessData?: {
    name: string;
    description: string;
    category: BusinessCategory;
    location: {
      lat: number;
      lng: number;
      address: string;
    };
    hours: {
      open: string;
      close: string;
    };
    contact: {
      phone: string;
      whatsapp?: string;
      email?: string;
    };
    thumbnail: string;
    submittedDocuments?: Array<{
      type: 'business_photo' | 'id_card' | 'license';
      url: string;
      uploadedAt: Date;
    }>;
  };
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Hours {
  open: string;
  close: string;
}

export interface Contact {
  phone: string;
  whatsapp?: string;
  email?: string;
}

export interface Business {
  _id: string;
  ownerId: string;
  businessSlug: string;
  name: string;
  description: string;
  category: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  submittedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  submittedDocuments?: Array<{
    type: 'business_photo' | 'id_card' | 'license';
    url: string;
    uploadedAt: string;
  }>;
  location: Location;
  hours: Hours;
  contact: Contact;
  thumbnail: string;
  videoUrl?: string;
  isVerified: boolean;
  isOpen: boolean;
  rating: number;
  reviewCount: number;
  bookmarkCount: number;
  viewCount: number;
  shareCount: number;
  comments: number;
  businessMode: 'online' | 'offline' | 'hybrid';
  enabledFeatures: {
    bookingSystem: boolean;
    onlinePayment: boolean;
    productCatalog: boolean;
    menuDisplay: boolean;
    facilitiesDisplay: boolean;
    servicesDisplay: boolean;
    reviewsDisplay: boolean;
  };
  paymentMethods: {
    cash: boolean;
    onlineTransfer: boolean;
    qris: boolean;
    eWallet: boolean;
  };
  displaySections: string[];
  distance?: string;
  calculatedDistance?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Video {
  _id: string;
  businessId: string;
  ownerId: string;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  category: string;
  views: number;
  bookmarkCount: number;
  likeCount: number;
  shareCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  videoId: string;
  businessId?: string;
  userId: string;
  userName?: string;
  text: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Bookmark {
  _id: string;
  userId: string;
  businessId: string;
  createdAt: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  nextPage?: number;
}

export interface BusinessFilters {
  category?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  isOpen?: boolean;
  minRating?: number;
  page?: number;
  limit?: number;
  sort?: 'newest' | 'popular' | 'rating' | 'distance';
}

export interface BusinessConfiguration {
  businessMode: 'online' | 'offline' | 'hybrid';
  enabledFeatures: {
    bookingSystem: boolean;
    onlinePayment: boolean;
    productCatalog: boolean;
    menuDisplay: boolean;
    facilitiesDisplay: boolean;
    servicesDisplay: boolean;
    reviewsDisplay: boolean;
  };
  paymentMethods: {
    cash: boolean;
    onlineTransfer: boolean;
    qris: boolean;
    eWallet: boolean;
  };
  displaySections: string[];
}

export interface VariantOption {
  name: string;
  priceModifier: number;
}

export interface ProductVariant {
  name: string;
  type: 'single' | 'multiple';
  required: boolean;
  options: VariantOption[];
}

export interface Product {
  _id: string;
  businessId: string;
  productSlug: string;
  name: string;
  description: string;
  category: 'menu' | 'ticket' | 'room' | 'service' | 'product';
  price: number;
  images: string[];
  isAvailable: boolean;
  variants?: ProductVariant[];
  metadata: {
    tier?: string;
    capacity?: number;
    duration?: string;
    facilities?: string[];
    stock?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  selectedVariants?: {
    variantName: string;
    optionName: string;
    priceModifier: number;
  }[];
}

export interface Order {
  _id: string;
  orderNumber: string;
  userId: string;
  businessId: string;
  items: OrderItem[];
  subtotal: number;
  adminFee: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentUrl?: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}
