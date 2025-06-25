import { BsArrowUpRight } from "react-icons/bs";
import Stars from "./Stars";
import { Review } from "@/types/types";

type ReviewCardType = {
  reviewData: Review;
};

export default function ReviewCard({ reviewData }: ReviewCardType) {
  const { name, date, review, rating } = reviewData;
  return (
    <>
      <div className="box-shadow space-y-4 rounded-xl bg-shades-white p-4 transition-all hover:bg-shades-off-white">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-scooter-900 text-sm font-bold text-shades-off-white">
            {name.slice(0, 2)}
          </div>
          <div className="text-sm">
            <p className="font-semibold">{name}</p>
            <p>{date}</p>
          </div>
        </div>
        <p className="line-clamp-3 h-[74px] overflow-hidden">{review}</p>
        <div className="flex h-10 items-center justify-between">
          <Stars count={rating} />
          <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-shades-black">
            <BsArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </>
  );
}
