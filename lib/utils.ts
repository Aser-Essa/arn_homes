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

// Example:
console.log(formatPrice(1195000)); // "£1,195,000"
