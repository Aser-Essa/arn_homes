import React from "react";
import MortageForm from "./MortgageForm";
import ScheduleForm from "./ScheduleForm";

type ScheduleAndMortgageFormsType = {
  price: number;
  property_id: string;
};

export default function ScheduleAndMortgageForms({
  price,
  property_id,
}: ScheduleAndMortgageFormsType) {
  return (
    <>
      <div className="flex flex-col gap-[30px] lg:flex-row">
        <div className="box-shadow hidden-box-shadow-on-mobile min-h-[403px] flex-1 space-y-5 rounded-[20px] font-exo sm:p-6">
          <p className="text-[36px] font-semibold">Schedule a tour</p>
          <ScheduleForm property_id={property_id} />
        </div>

        <div className="box-shadow hidden-box-shadow-on-mobile min-h-[403px] flex-1 space-y-5 rounded-[20px] font-exo sm:p-6">
          <p className="text-[36px] font-semibold">Mortgage calculator</p>
          <MortageForm price={price} />
        </div>
      </div>
    </>
  );
}
