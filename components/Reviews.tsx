import { getReviews } from "@/lib/queries/reviews";
import { params } from "@/types/types";
import Container from "./Container";
import Pagenation from "./Pagenation";
import ReviewCard from "./ReviewCard";

export default async function Reviews({ params }: { params: params }) {
  const { reviews, count } = await getReviews({
    perPage: 10,
    params,
  });

  return (
    <>
      <Container className="mb-[200px] mt-14 space-y-5 font-exo sm:space-y-10">
        <p className="text-4xl font-semibold">Recent Reviews</p>

        <div className="grid gap-[30px] sm:grid-cols-[repeat(auto-fill,_minmax(450px,1fr))]">
          {count > 0 ? (
            <>
              {reviews?.map((reviewData, idx) => (
                <ReviewCard
                  key={`${reviewData?.id}-${idx}`}
                  reviewData={reviewData}
                />
              ))}
            </>
          ) : (
            <div className="col-span-2 flex h-[200px] w-full items-center justify-center">
              <p className="text-shades-gray-500 text-lg font-semibold">
                No Reviews found
              </p>
            </div>
          )}
        </div>
        <Pagenation count={count} perPage={10} />
      </Container>
    </>
  );
}
