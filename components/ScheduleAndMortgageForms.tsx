import React from "react";
import MortageForm from "./MortageForm";
import ScheduleForm from "./ScheduleForm";

export default function ScheduleAndMortgageForms() {
  return (
    <>
      <div className="flex flex-col gap-[30px] lg:flex-row">
        <div className="box-shadow min-h-[403px] flex-1 space-y-5 rounded-[20px] font-exo sm:p-6">
          <p className="text-[36px] font-semibold">Schedule a tour</p>
          <ScheduleForm />
        </div>

        <div className="box-shadow min-h-[403px] flex-1 space-y-5 rounded-[20px] font-exo sm:p-6">
          <p className="text-[36px] font-semibold">Mortgage calculator</p>
          <MortageForm />
        </div>
      </div>
    </>
  );
}
