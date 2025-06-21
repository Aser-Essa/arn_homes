import NotificationFilterCard from "./NotificationFilterCard";

interface NotificationFiltersProps {
  notification_type: string;
}

const filters = [
  "all",
  "message",
  "property",
  "tour",
  "saved_property",
  "system",
] as const;

export default function NotificationFilters({
  notification_type,
}: NotificationFiltersProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="mb-3 text-sm font-semibold text-gray-900">Filter by type</p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {filters.map((filter) => {
          return (
            <NotificationFilterCard
              key={filter}
              filter={filter}
              notification_type={notification_type}
            />
          );
        })}
      </div>
    </div>
  );
}
