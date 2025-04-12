import React, { Fragment } from "react";
import AccordionList from "./AccordionList";

type dataListType = {
  title: string;
  points: string[];
};

type InteriorExteriorPreviewtype = {
  title: string;
  data: dataListType[];
};

export default function InteriorExteriorPreview({
  title,
  data,
}: InteriorExteriorPreviewtype) {
  return (
    <>
      <div className="space-y-6">
        <p className="text-[28px] font-semibold text-scooter-900">{title}</p>
        <ul>
          {data.map(({ title, points }: dataListType) => (
            <AccordionList key={title} title={title} points={points} />
          ))}
        </ul>
      </div>
    </>
  );
}
