"use client";

import { Card } from "@/components/ui/card";
import { Property } from "@/types/types";
import { MapPin } from "lucide-react";
import Image from "next/image";
import PropertyInfoCards from "./PropertyInfoCards";
import { motion } from "motion/react";
import CardHeader from "./CardHeader";

export default function ScheduledTourPropertyCard({
  property,
}: {
  property: Property;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className="box-shadow w-full border-none p-6">
        <div className="space-y-6">
          <CardHeader
            icon={<MapPin className="h-5 w-5 text-purple-600" />}
            title="Property Details"
            colorClass="bg-purple-50"
          />

          {property.images && property.images.length > 0 && (
            <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={property.images[0]}
                alt={property.title || "Property image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h4 className="text-xl font-semibold text-gray-900">
                {property.title}
              </h4>
              <p className="text-gray-600">{property.address}</p>
            </div>

            <PropertyInfoCards property={property} />

            {property.description && (
              <div>
                <p className="mb-2 text-sm text-gray-500">Description</p>
                <p className="line-clamp-4 leading-relaxed text-gray-700">
                  {property.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
