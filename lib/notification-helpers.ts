import { createNotification } from "./actions/notifications";

/* ---------------------- Type Definitions ---------------------- */

export type MessageNotificationData = {
  recipientUserId: string;
  senderName: string;
  messagePreview: string;
  messageId?: string;
};

export type PropertyStatusNotificationData = {
  userId: string;
  propertyTitle: string;
  status: "approved" | "rejected" | "pending";
  propertyId?: string;
};

export type TourRequestNotificationData = {
  owner_id: string;
  visitorName: string;
  propertyTitle: string;
  tourDate: string;
  tourId?: string;
};

export type TourConfirmationNotificationData = {
  visitorUserId: string;
  propertyTitle: string;
  tourDate: string;
  status: "confirmed" | "cancelled";
  tourId?: string;
};

export type SavedPropertyUpdateNotificationData = {
  userId: string;
  propertyTitle: string;
  updateType: "price_drop" | "sold" | "removed";
  propertyId?: string;
};

export type SystemNotificationData = {
  userId: string;
  title: string;
  description: string;
};

export type BulkSystemNotificationData = {
  userIds: string[];
  title: string;
  description: string;
};

/* ---------------------- Notification Functions ---------------------- */

export async function createMessageNotification({
  recipientUserId,
  senderName,
  messagePreview,
  messageId,
}: MessageNotificationData) {
  return createNotification({
    userId: recipientUserId,
    title: `New message from ${senderName}`,
    description: messagePreview,
    type: "message",
    relatedId: messageId,
  });
}

export async function createTourRequestNotification({
  owner_id,
  visitorName,
  propertyTitle,
  tourDate,
  tourId,
}: TourRequestNotificationData) {
  return createNotification({
    userId: owner_id,
    title: `New tour request from ${visitorName}`,
    description: `Tour requested for "${propertyTitle}" on ${tourDate}`,
    type: "tour",
    relatedId: tourId,
  });
}

export async function createTourConfirmationNotification({
  visitorUserId,
  propertyTitle,
  tourDate,
  status,
  tourId,
}: TourConfirmationNotificationData) {
  const statusMessages = {
    confirmed: "Your tour has been confirmed",
    cancelled: "Your tour has been cancelled",
  };

  const descriptions = {
    confirmed: `Your tour for "${propertyTitle}" on ${tourDate} has been confirmed.`,
    cancelled: `Your tour for "${propertyTitle}" on ${tourDate} has been cancelled.`,
  };

  return createNotification({
    userId: visitorUserId,
    title: statusMessages[status],
    description: descriptions[status],
    type: "tour",
    relatedId: tourId,
  });
}

// ###########

export async function createSavedPropertyUpdateNotification({
  userId,
  propertyTitle,
  updateType,
  propertyId,
}: SavedPropertyUpdateNotificationData) {
  const updateMessages = {
    price_drop: "Price drop on saved property",
    sold: "Saved property has been sold",
    removed: "Saved property no longer available",
  };

  const descriptions = {
    price_drop: `The price for "${propertyTitle}" has been reduced.`,
    sold: `"${propertyTitle}" has been sold.`,
    removed: `"${propertyTitle}" is no longer available.`,
  };

  return createNotification({
    userId,
    title: updateMessages[updateType],
    description: descriptions[updateType],
    type: "saved_property",
    relatedId: propertyId,
  });
}

export async function createSystemNotification({
  userId,
  title,
  description,
}: SystemNotificationData) {
  return createNotification({
    userId,
    title,
    description,
    type: "system",
  });
}
