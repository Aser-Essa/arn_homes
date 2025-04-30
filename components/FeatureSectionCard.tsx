"use client";
import { AnimatePresence, motion } from "motion/react";
import { UseFieldArrayRemove, useFormContext } from "react-hook-form";
import FeaturePointsInput from "./FeaturePointsInput";
import FeatureSectionCardHeader from "./FeatureSectionCardHeader";

type FeatureSectionCardType = {
  name: string;
  idx: number;
  remove: UseFieldArrayRemove;
};

export default function FeatureSectionCard({
  name,
  idx,
  remove,
}: FeatureSectionCardType) {
  const { watch } = useFormContext();
  const isOpen = watch(`${name}.${idx}.isOpen`);

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          key="content"
          initial="collapsed"
          animate={isOpen ? "open" : "collapsed"}
          variants={{
            open: { height: "auto" },
            collapsed: { height: "68px" },
          }}
          transition={{ duration: 0.3, ease: "linear" }}
          className="overflow-hidden rounded-lg border"
        >
          <div className="relative space-y-4 p-4">
            <FeatureSectionCardHeader
              name={name}
              idx={idx}
              isOpen={isOpen}
              remove={remove}
            />
            <FeaturePointsInput
              name={`${name}.${idx}.points`}
              isOpen={isOpen}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
