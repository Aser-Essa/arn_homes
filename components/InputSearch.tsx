import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function InputSearch() {
  return (
    <div className="font-exo flex h-full flex-1 items-center space-x-2">
      <Input
        type="text"
        placeholder="Enter City, Zip, Address"
        className="h-[50px] w-full rounded-xl border-amber-200 px-4 py-3 shadow-none !ring-0"
      />
      <Button type="submit" className="h-[50px]">
        Search
      </Button>
    </div>
  );
}
