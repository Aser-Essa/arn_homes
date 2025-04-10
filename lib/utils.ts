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
