import { triggerRealtimeNotification } from '@/hooks/useRealtimeNotifications';

// Trigger order status change notification
export const notifyOrderStatusChange = (orderId: string, status: string, orderNumber: string) => {
  triggerRealtimeNotification({
    type: 'order:status_changed',
    data: { orderId, status, orderNumber },
  });
};

// Trigger payment confirmation notification
export const notifyPaymentConfirmed = (orderId: string, orderNumber: string) => {
  triggerRealtimeNotification({
    type: 'order:payment_confirmed',
    data: { orderId, orderNumber },
  });
};

// Trigger new comment notification
export const notifyNewComment = (businessId: string, businessName: string, userName: string) => {
  triggerRealtimeNotification({
    type: 'comment:new',
    data: { businessId, businessName, userName },
  });
};

// Trigger comment reply notification
export const notifyCommentReply = (commentId: string, businessName: string, userName: string) => {
  triggerRealtimeNotification({
    type: 'comment:reply',
    data: { commentId, businessName, userName },
  });
};

// Trigger trending bookmark notification
export const notifyTrendingBookmark = (businessId: string, businessName: string, bookmarkCount: number) => {
  triggerRealtimeNotification({
    type: 'bookmark:trending',
    data: { businessId, businessName, bookmarkCount },
  });
};
