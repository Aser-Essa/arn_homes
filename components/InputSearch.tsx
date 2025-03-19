import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LuSearch } from "react-icons/lu";

export function InputSearch() {
  return (
    <div className="flex h-full flex-1 items-center space-x-2 font-exo">
      <Input
        type="text"
        placeholder="Enter City, Zip, Address"
        className="h-[50px] w-full min-w-[190px] rounded-xl border-amber-200 px-4 py-3 shadow-none !ring-0"
      />
      <Button type="submit" className="h-[50px]">
        <LuSearch className="!h-5 !w-5" />
        <p className="hidden md:block">Search</p>
      </Button>
    </div>
  );
}
