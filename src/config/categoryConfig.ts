import { BusinessCategory } from '@/types/api';
import { 
  Utensils, 
  Home, 
  Ticket, 
  MapPin, 
  Hotel as HotelIcon, 
  Wrench,
  LucideIcon
} from 'lucide-react';

export interface CategoryConfig {
  id: BusinessCategory;
  label: string;
  icon: LucideIcon;
  color: string;
  dashboardName: string;
  productLabel: string;
  productLabelPlural: string;
  sections: string[];
  statsCards: Array<{
    id: string;
    label: string;
    icon: LucideIcon;
  }>;
  productFields: Array<{
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'select' | 'multiselect' | 'image' | 'time' | 'variant-builder';
    required: boolean;
    options?: string[];
    placeholder?: string;
    description?: string;
  }>;
}

export const CATEGORY_CONFIGS: Record<BusinessCategory, CategoryConfig> = {
  kuliner: {
    id: 'kuliner',
    label: 'Kuliner',
    icon: Utensils,
    color: 'orange',
    dashboardName: 'Dashboard Kuliner',
    productLabel: 'Menu',
    productLabelPlural: 'Menu',
    sections: ['menu_management', 'orders', 'reviews'],
    statsCards: [
      { id: 'today_sales', label: 'Penjualan Hari Ini', icon: Utensils },
      { id: 'popular_menu', label: 'Menu Terlaris', icon: Utensils },
      { id: 'rating', label: 'Rating Pelanggan', icon: Utensils },
    ],
    productFields: [
      { name: 'name', label: 'Nama Menu', type: 'text', required: true, placeholder: 'Nasi Goreng Spesial' },
      { name: 'description', label: 'Deskripsi', type: 'textarea', required: true, placeholder: 'Nasi goreng dengan telur, ayam, dan sayuran' },
      { name: 'price', label: 'Harga', type: 'number', required: true, placeholder: '25000' },
      { 
        name: 'category', 
        label: 'Kategori Menu', 
        type: 'select', 
        required: true,
        options: ['Makanan', 'Minuman', 'Snack', 'Dessert']
      },
      { name: 'images', label: 'Foto Menu', type: 'image', required: true },
      { 
        name: 'spicyLevel', 
        label: 'Level Pedas', 
        type: 'select', 
        required: false,
        options: ['Tidak Pedas', 'Pedas Sedang', 'Pedas', 'Extra Pedas']
      },
      { name: 'preparationTime', label: 'Waktu Persiapan (menit)', type: 'number', required: false, placeholder: '15' },
      { name: 'stock', label: 'Stok Harian', type: 'number', required: false, placeholder: '50', description: 'Kosongkan jika unlimited' },
      { name: 'variants', label: 'Varian Menu', type: 'variant-builder', required: false, description: 'Tambahkan ukuran, level pedas, atau extras' },
    ],
  },

  kos: {
    id: 'kos',
    label: 'Kos-Kosan',
    icon: Home,
    color: 'blue',
    dashboardName: 'Dashboard Kos',
    productLabel: 'Kamar',
    productLabelPlural: 'Kamar',
    sections: ['room_management', 'tenants', 'payments', 'maintenance'],
    statsCards: [
      { id: 'total_rooms', label: 'Total Kamar', icon: Home },
      { id: 'occupied_rooms', label: 'Kamar Terisi', icon: Home },
      { id: 'monthly_revenue', label: 'Pendapatan Bulanan', icon: Home },
    ],
    productFields: [
      { name: 'name', label: 'Nomor/Nama Kamar', type: 'text', required: true, placeholder: 'Kamar 101' },
      { name: 'description', label: 'Deskripsi Kamar', type: 'textarea', required: true, placeholder: 'Kamar luas dengan AC dan kamar mandi dalam' },
      { name: 'price', label: 'Harga per Bulan', type: 'number', required: true, placeholder: '1500000' },
      { 
        name: 'category', 
        label: 'Tipe Kamar', 
        type: 'select', 
        required: true,
        options: ['Single', 'Double', 'VIP', 'Suite']
      },
      { name: 'images', label: 'Foto Kamar', type: 'image', required: true },
      { 
        name: 'facilities', 
        label: 'Fasilitas', 
        type: 'multiselect', 
        required: true,
        options: ['AC', 'Kasur', 'Lemari', 'Meja Belajar', 'Kamar Mandi Dalam', 'WiFi', 'Jendela']
      },
      { name: 'capacity', label: 'Kapasitas (orang)', type: 'number', required: true, placeholder: '1' },
      { name: 'duration', label: 'Luas Kamar (m²)', type: 'number', required: false, placeholder: '12' },
    ],
  },

  event_ticket: {
    id: 'event_ticket',
    label: 'Event & Tiket',
    icon: Ticket,
    color: 'purple',
    dashboardName: 'Dashboard Event',
    productLabel: 'Tiket',
    productLabelPlural: 'Tiket',
    sections: ['ticket_types', 'sales', 'scanner', 'attendees'],
    statsCards: [
      { id: 'tickets_sold', label: 'Tiket Terjual', icon: Ticket },
      { id: 'remaining_capacity', label: 'Kapasitas Tersisa', icon: Ticket },
      { id: 'revenue', label: 'Total Pendapatan', icon: Ticket },
    ],
    productFields: [
      { name: 'name', label: 'Nama Tiket', type: 'text', required: true, placeholder: 'Tiket VIP' },
      { name: 'description', label: 'Deskripsi', type: 'textarea', required: true, placeholder: 'Akses VIP dengan fasilitas premium' },
      { name: 'price', label: 'Harga', type: 'number', required: true, placeholder: '150000' },
      { 
        name: 'category', 
        label: 'Tipe Tiket', 
        type: 'select', 
        required: true,
        options: ['Early Bird', 'Regular', 'VIP', 'VVIP', 'Presale']
      },
      { name: 'images', label: 'Gambar Tiket', type: 'image', required: false },
      { name: 'stock', label: 'Kuota Tiket', type: 'number', required: true, placeholder: '100' },
      { 
        name: 'facilities', 
        label: 'Benefit/Fasilitas', 
        type: 'multiselect', 
        required: false,
        options: ['Meet & Greet', 'Merchandise', 'Free Snack', 'Priority Entry', 'Front Row', 'Backstage Access']
      },
      { name: 'duration', label: 'Tanggal Valid', type: 'text', required: false, placeholder: '2025-12-31', description: 'Format: YYYY-MM-DD' },
    ],
  },

  wisata: {
    id: 'wisata',
    label: 'Wisata',
    icon: MapPin,
    color: 'green',
    dashboardName: 'Dashboard Wisata',
    productLabel: 'Paket Wisata',
    productLabelPlural: 'Paket Wisata',
    sections: ['packages', 'bookings', 'schedule'],
    statsCards: [
      { id: 'visitors_today', label: 'Pengunjung Hari Ini', icon: MapPin },
      { id: 'revenue', label: 'Pendapatan', icon: MapPin },
      { id: 'popular_packages', label: 'Paket Populer', icon: MapPin },
    ],
    productFields: [
      { name: 'name', label: 'Nama Paket', type: 'text', required: true, placeholder: 'Paket Wisata Pantai' },
      { name: 'description', label: 'Deskripsi', type: 'textarea', required: true, placeholder: 'Jelajahi keindahan pantai dengan guide berpengalaman' },
      { name: 'price', label: 'Harga per Orang', type: 'number', required: true, placeholder: '200000' },
      { 
        name: 'category', 
        label: 'Jenis Paket', 
        type: 'select', 
        required: true,
        options: ['Wisata Alam', 'Wisata Budaya', 'Wisata Kuliner', 'Adventure', 'Family Package']
      },
      { name: 'images', label: 'Foto Wisata', type: 'image', required: true },
      { name: 'duration', label: 'Durasi', type: 'text', required: true, placeholder: '1 Hari / 2 Hari 1 Malam' },
      { name: 'capacity', label: 'Kapasitas Maksimal', type: 'number', required: true, placeholder: '20' },
      { 
        name: 'facilities', 
        label: 'Fasilitas Termasuk', 
        type: 'multiselect', 
        required: true,
        options: ['Transportasi', 'Pemandu Wisata', 'Makan', 'Snack', 'Foto', 'Asuransi', 'Dokumentasi']
      },
    ],
  },

  hotel: {
    id: 'hotel',
    label: 'Hotel',
    icon: HotelIcon,
    color: 'pink',
    dashboardName: 'Dashboard Hotel',
    productLabel: 'Kamar',
    productLabelPlural: 'Kamar',
    sections: ['rooms', 'reservations', 'housekeeping', 'revenue_management'],
    statsCards: [
      { id: 'occupancy_rate', label: 'Tingkat Hunian', icon: HotelIcon },
      { id: 'revenue_per_room', label: 'Revenue per Kamar', icon: HotelIcon },
      { id: 'checkin_today', label: 'Check-in Hari Ini', icon: HotelIcon },
    ],
    productFields: [
      { name: 'name', label: 'Tipe Kamar', type: 'text', required: true, placeholder: 'Deluxe Room' },
      { name: 'description', label: 'Deskripsi', type: 'textarea', required: true, placeholder: 'Kamar luas dengan pemandangan kota' },
      { name: 'price', label: 'Harga per Malam', type: 'number', required: true, placeholder: '500000' },
      { 
        name: 'category', 
        label: 'Kategori Kamar', 
        type: 'select', 
        required: true,
        options: ['Standard', 'Deluxe', 'Suite', 'Presidential Suite', 'Family Room']
      },
      { name: 'images', label: 'Foto Kamar', type: 'image', required: true },
      { 
        name: 'facilities', 
        label: 'Amenitas', 
        type: 'multiselect', 
        required: true,
        options: ['WiFi', 'AC', 'TV', 'Minibar', 'Coffee Maker', 'Bathtub', 'Balcony', 'City View', 'Ocean View']
      },
      { name: 'capacity', label: 'Kapasitas Tamu', type: 'number', required: true, placeholder: '2' },
      { name: 'stock', label: 'Jumlah Kamar', type: 'number', required: true, placeholder: '10' },
      { name: 'duration', label: 'Tipe Kasur', type: 'text', required: false, placeholder: 'King Bed / Twin Bed' },
    ],
  },

  jasa: {
    id: 'jasa',
    label: 'Jasa',
    icon: Wrench,
    color: 'cyan',
    dashboardName: 'Dashboard Jasa',
    productLabel: 'Layanan',
    productLabelPlural: 'Layanan',
    sections: ['services', 'appointments', 'clients'],
    statsCards: [
      { id: 'appointments_today', label: 'Janji Temu Hari Ini', icon: Wrench },
      { id: 'revenue', label: 'Pendapatan', icon: Wrench },
      { id: 'client_satisfaction', label: 'Kepuasan Klien', icon: Wrench },
    ],
    productFields: [
      { name: 'name', label: 'Nama Layanan', type: 'text', required: true, placeholder: 'Service AC' },
      { name: 'description', label: 'Deskripsi', type: 'textarea', required: true, placeholder: 'Servis AC lengkap dengan pengecekan dan pembersihan' },
      { name: 'price', label: 'Harga', type: 'number', required: true, placeholder: '150000' },
      { 
        name: 'category', 
        label: 'Kategori Layanan', 
        type: 'select', 
        required: true,
        options: ['Perbaikan', 'Maintenance', 'Konsultasi', 'Instalasi', 'Cleaning']
      },
      { name: 'images', label: 'Foto Layanan', type: 'image', required: false },
      { name: 'duration', label: 'Durasi Estimasi', type: 'text', required: true, placeholder: '2 jam' },
      { 
        name: 'facilities', 
        label: 'Yang Termasuk', 
        type: 'multiselect', 
        required: false,
        options: ['Spare Parts', 'Garansi', 'Konsultasi Gratis', 'Free Check-up', 'After Service']
      },
    ],
  },
};

export const getCategoryConfig = (category: BusinessCategory): CategoryConfig => {
  return CATEGORY_CONFIGS[category];
};

export const getCategoryLabel = (category: BusinessCategory): string => {
  return CATEGORY_CONFIGS[category]?.label || category;
};

export const getCategoryColor = (category: BusinessCategory): string => {
  return CATEGORY_CONFIGS[category]?.color || 'gray';
};
