import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

type PropertyStatusCardType = {
  text: string;
  icon: string;
  href: string;
  count: number;
};

export default function PropertyStatusCard({
  text,
  icon,
  href,
  count,
}: PropertyStatusCardType) {
  return (
    <>
      <Link
        href={href}
        className="box-shadow flex h-20 items-center justify-between rounded-xl p-4 transition-all hover:bg-shades-off-white"
      >
        <div className="flex items-center gap-4">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-shades-black">
            <Image src={icon} width={32} height={32} alt={"active icon"} />
          </div>
          <p className="text-lg font-medium">{text}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-shades-black text-sm text-shades-white">
            {count}
          </div>
          <IoIosArrowForward className="h-6 w-6" />
        </div>
      </Link>
    </>
  );
}
