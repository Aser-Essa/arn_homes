"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

export default function ScheduledTourHeader() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="mb-4 flex items-center gap-4">
          <Link
            href={"/account/messages?message_category=scheduled_tours"}
            className="flex items-center gap-2"
          >
            <IoIosArrowBack className="min-h-5 min-w-5" />
          </Link>
          <p className="text-[24px] font-semibold leading-none lg:text-[28px]">
            Scheduled Tour Details
          </p>
        </div>
        <p className="mt-2 text-gray-600">
          Review and manage the scheduled property tour
        </p>
      </motion.div>
    </>
  );
}
