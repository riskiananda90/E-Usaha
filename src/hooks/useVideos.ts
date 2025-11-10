import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient, { handleApiError } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

export interface Video {
  _id: string;
  businessId: {
    _id: string;
    name: string;
    address: string;
    category: string;
    thumbnail?: string;
  };
  ownerId: {
    _id: string;
    name: string;
    profilePicture?: string;
  };
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

interface VideoFilters {
  category?: string;
  businessId?: string;
  page?: number;
  limit?: number;
  sort?: 'newest' | 'popular' | 'trending';
}

interface VideosResponse {
  videos: Video[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalVideos: number;
    hasMore: boolean;
  };
}

export const useVideos = (filters?: VideoFilters) => {
  return useQuery<VideosResponse>({
    queryKey: ['videos', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.category) params.append('category', filters.category);
      if (filters?.businessId) params.append('businessId', filters.businessId);
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.sort) params.append('sort', filters.sort);

      const { data } = await apiClient.get(`/videos?${params.toString()}`);
      return data.data;
    },
    staleTime: 1000 * 60 * 2, 
  });
};

export const useVideo = (videoId: string) => {
  return useQuery<Video>({
    queryKey: ['video', videoId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/videos/${videoId}`);
      return data.data;
    },
    enabled: !!videoId,
  });
};

export const useIncrementView = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (videoId: string) => {
      await apiClient.post(`/videos/${videoId}/view`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
};

export const useIncrementShare = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (videoId: string) => {
      await apiClient.post(`/videos/${videoId}/share`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      toast({
        title: "Berhasil!",
        description: "Link telah disalin ke clipboard",
      });
    },
    onError: (error) => {
      toast({
        title: "Gagal",
        description: handleApiError(error),
        variant: "destructive",
      });
    },
  });
};
