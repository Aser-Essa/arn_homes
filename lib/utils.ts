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

export function parseFormattedPrice(formatted: string): number {
  const numericString = formatted.replace(/[^0-9.]/g, "");
  return Number(numericString);
}

export function formatPercentage(percentage: number) {
  return `%${percentage}`;
}

export function formatArea(area: number) {
  return `${area} sq ft`;
}

export const getCurrentTime = (): string => {
  const now = new Date();
  let hours = now.getHours();
  let minutes: string | number = now.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`; // Ensuring minutes are string
  return `${hours}:${minutes}${ampm}`;
};

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

export function formatTo12HourTime(isoString: string): string {
  const date = new Date(isoString.endsWith("Z") ? isoString : isoString + "Z");
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatTime(timeString: string) {
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
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

export function formatLeaseTerm(months: number): string {
  if (months <= 0) return "0 months";
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const yearPart = years > 0 ? `${years} year${years > 1 ? "s" : ""}` : "";
  const monthPart =
    remainingMonths > 0
      ? `${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`
      : "";
  if (yearPart && monthPart) return `${yearPart} ${monthPart}`;
  return yearPart || monthPart;
}

export function formatDateLong(isoString: string): string {
  const date = new Date(isoString?.endsWith("Z") ? isoString : isoString + "Z");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", // full month name like "May"
    day: "numeric", // no leading zero, e.g., "21"
  });
}

export function formatDateTime(dateTimeString: string) {
  return new Date(dateTimeString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function convertToMonthly(value: number, duration: string | undefined) {
  switch (duration) {
    case "weekly":
      return value * 4.33;
    case "yearly":
      return value / 12;
    case "monthly":
    default:
      return value;
  }
}
