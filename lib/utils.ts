import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function PriceAbbreviation(amount: number) {
  if (amount >= 1_000_000) {
    const val = (amount / 1_000_000).toFixed(1);
    return `£${parseFloat(val)}M`;
  } else if (amount >= 1_000) {
    const val = (amount / 1_000).toFixed(1);
    return `£${parseFloat(val)}K`;
  } else {
    return `£${amount}`;
  }
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatTimeCounter(days: number): string {
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (Number.isNaN(days)) return "Anytime";

  if (months >= 1) {
    return months == 1 ? "Last Month" : `Last ${months} Months`;
  } else if (weeks >= 1) {
    return weeks == 1 ? "Last Week" : `Last ${weeks} Weeks`;
  } else {
    return days == 1 ? "Last Day" : `Last ${days} Days`;
  }
}

export function formatTimeAgo(dateString: string): string {
  const inputDate = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - inputDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    return "Today";
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }
}

export function formatTimestamptzToReadable(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
