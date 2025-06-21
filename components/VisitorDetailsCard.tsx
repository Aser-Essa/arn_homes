"use client";
import { ScheduledTourData } from "@/types/types";
import { Card } from "./ui/card";
import { User } from "lucide-react";
import VisitorDetailsInfo from "./VisitorDetailsInfo";
import ScheduledTourActions from "./ScheduledTourActions";
import { motion } from "motion/react";
import CardHeader from "./CardHeader";
import { useUser } from "@clerk/nextjs";

export default function VisitorDetailsCard({
  scheduledTour,
}: {
  scheduledTour: ScheduledTourData;
}) {
  const { owner_id } = scheduledTour;
  const { user } = useUser();
  const isOwner = user?.id === owner_id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className="box-shadow w-full border-none p-6">
        <div className="space-y-6">
          <CardHeader
            icon={<User className="h-5 w-5 text-blue-600" />}
            title=" Visitor Information"
            colorClass="bg-blue-50"
          />
          <VisitorDetailsInfo scheduledTour={scheduledTour} />
          {scheduledTour.status === "pending" && isOwner && (
            <ScheduledTourActions
              scheduledTour={scheduledTour}
              isOwner={isOwner}
            />
          )}
        </div>
      </Card>
    </motion.div>
  );
}
