import { formatPrice } from "@/lib/utils";
import { Property } from "@/types/types";

type Props = {
  extras: Property["extras"];
  category: string;
};

export default function PropertyExtras({ extras, category }: Props) {
  if (!extras) return null;

  const fieldMap: Record<
    string,
    {
      label: string;
      value: string | number | boolean | undefined;
      formatter?: (val: number) => string;
    }[]
  > = {
    sale: [
      {
        label: "Price",
        value: extras.price,
        formatter: (val) => formatPrice(val || 0),
      },
      {
        label: "Furnishing",
        value: extras.furniture_type, // updated field
      },
    ],
    rent: [
      {
        label: "Monthly Rent",
        value: extras.monthly_rent,
        formatter: (val) => formatPrice(val || 0),
      },
      {
        label: "Deposit",
        value: extras.deposit_amount,
        formatter: (val) => formatPrice(val || 0),
      },
      {
        label: "Lease Term",
        value: extras.lease_term,
      },
      {
        label: "Furnishing",
        value: extras.furniture_type, // updated field
      },
    ],
    investment: [
      {
        label: "Expected ROI",
        value: extras.expected_roi,
        formatter: (val) => `${val}%`,
      },
      {
        label: "Min. Investment",
        value: extras.minimum_investment,
        formatter: (val) => `$${val?.toLocaleString()}`,
      },
      {
        label: "Investment Term",
        value: extras.investment_term,
      },
      {
        label: "Type",
        value: extras.investment_type,
      },
    ],
  };

  const fields = fieldMap[category] || [];

  return (
    <div className="box-shadow space-y-5 rounded-[20px] p-5">
      <p className="text-[36px] font-semibold">Additional Details</p>

      <ul className="">
        {fields.map(({ label, value, formatter }, idx) => (
          <li
            key={idx}
            className="flex items-center justify-start space-x-4 border-b border-gray-100 py-4 last:border-none"
          >
            <p className="w-[150px] font-medium">{label}:</p>
            <span>{formatter ? formatter(Number(value)) : (value ?? "—")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
