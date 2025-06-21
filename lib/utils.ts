import {
  commonFields,
  investmentFields,
  rentFields,
  saleFields,
} from "@/components/PropertyInputs";
import { features, PropertyFormData } from "@/types/types";
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

export function transformPropertyDataForSubmit({
  data,
  category,
  userId,
  propertyId,
}: {
  data: PropertyFormData;
  category: string;
  userId: string;
  propertyId: string;
}) {
  const allFields = {
    common: commonFields,
    sale: saleFields,
    rent: rentFields,
    investment: investmentFields,
  };

  type CategoryKey = keyof typeof allFields;
  const isCategory = (key: string): key is CategoryKey => key in allFields;
  const selectedFields = isCategory(category) ? allFields[category] : [];

  // Format features
  const formatFeatures = (features: features) =>
    features.map((section) => ({
      title: section.title,
      points: section.points.map((p) => `${p.Key}:${p.Value}`),
    }));

  // Filter extras
  const extrasObject = data.extras ?? {};
  const filteredExtras = Object.fromEntries(
    Object.entries(extrasObject).filter(([key]) =>
      selectedFields.includes(key),
    ),
  );

  // Final formatted data
  return {
    ...data,
    extras: filteredExtras,
    interior: formatFeatures(data.interior),
    exterior: formatFeatures(data.exterior),
    user_id: userId,
    id: propertyId,
    status: "reviewing",
  };
}

type RawSection = {
  title: string;
  points: string[];
};

const defaultExtras = {
  is_furnished: false,
  price: 1_500_000,
  deposit_amount: 250,
  expected_roi: 1,
  minimum_investment: 10_000,
  monthly_rent: 120,
  lease_term: "6",
  investment_term: "12",
  investment_type: "rental_income",
};

export function reverseTransformedPropertyData({
  property,
}: {
  property: Omit<PropertyFormData, "interior" | "exterior"> & {
    interior: RawSection[];
    exterior: RawSection[];
  };
}): PropertyFormData {
  const parseSections = (
    sections: RawSection[],
  ): PropertyFormData["interior"] => {
    const parsed = sections.map((section) => ({
      title: section.title,
      isOpen: false,
      points: section.points.map((p) => {
        const [Key, Value] = p.split(":");
        return {
          Key: Key?.trim() ?? "",
          Value: Value?.trim() ?? "",
        };
      }),
    }));

    if (parsed.length === 0) {
      return [
        {
          title: "",
          isOpen: false,
          points: [],
        },
      ];
    }

    return parsed as PropertyFormData["interior"];
  };

  return {
    title: property.title || "",
    address: property.address || "",
    description: property.description || "",
    area: property.area || 100,
    bed_number: property.bed_number || 1,
    bath_number: property.bath_number || 1,
    property_type: property.property_type || "",
    category: property.category || "sale",
    listed_in: property.listed_in || new Date().toISOString(),
    state: property.state || "",
    interior: parseSections(property.interior),
    exterior: parseSections(property.exterior),
    extras: {
      is_furnished: property.extras?.is_furnished ?? defaultExtras.is_furnished,
      price: property.extras?.price ?? defaultExtras.price,
      deposit_amount:
        property.extras?.deposit_amount ?? defaultExtras.deposit_amount,
      expected_roi: property.extras?.expected_roi ?? defaultExtras.expected_roi,
      minimum_investment:
        property.extras?.minimum_investment ?? defaultExtras.minimum_investment,
      monthly_rent: property.extras?.monthly_rent ?? defaultExtras.monthly_rent,
      lease_term: property.extras?.lease_term ?? defaultExtras.lease_term,
      investment_term:
        property.extras?.investment_term ?? defaultExtras.investment_term,
      investment_type:
        property.extras?.investment_type ?? defaultExtras.investment_type,
    },
  };
}

export async function urlToFile(url: string, fileName: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  const mimeType = blob.type || "image/jpeg";
  return new File([blob], fileName, { type: mimeType });
}

export function fileToDropzoneFormat(file: File) {
  return Object.assign(file, {
    preview: URL.createObjectURL(file),
    errors: [],
  });
}
