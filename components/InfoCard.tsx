interface InfoCardProps {
  label: string;
  value: string | number | React.ReactNode;
}

export default function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
}
