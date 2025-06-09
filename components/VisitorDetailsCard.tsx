"use client";
import { ScheduledTourData } from "@/types/types";
import { Card } from "./ui/card";
import { User } from "lucide-react";
import VisitorDetailsInfo from "./VisitorDetailsInfo";
import ScheduledTourActions from "./ScheduledTourActions";
import ScheduledTourCardHeader from "./ScheduledTourCardHeader";
import { motion } from "motion/react";

export default function VisitorDetailsCard({
  scheduledTour,
}: {
  scheduledTour: ScheduledTourData;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className="box-shadow w-full border-none p-6">
        <div className="space-y-6">
          <ScheduledTourCardHeader
            icon={<User className="h-5 w-5 text-blue-600" />}
            title=" Visitor Information"
            colorClass="bg-blue-50"
          />
          <VisitorDetailsInfo scheduledTour={scheduledTour} />
          {scheduledTour.status === "pending" && (
            <ScheduledTourActions scheduledTour={scheduledTour} />
          )}
        </div>
      </Card>
    </motion.div>
  );
}
