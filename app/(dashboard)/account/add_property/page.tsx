"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FormAddPropertyField from "@/components/FormAddPropertyField";
import ListingTypeSelector from "@/components/ListingTypeSelector";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type PropertyFormData = {
  title: string;
  address: string;
  price: string;
  bedNumber: string;
  bathNumber: string;
  area: string;
  description: string;
  property_type: string;
  type: string;
  listed_in: string;
  images: File[];
  floor_plan: string;
};

export default function AddPropertyPage() {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    address: "",
    price: "",
    bedNumber: "",
    bathNumber: "",
    area: "",
    description: "",
    property_type: "",
    type: "sale",
    listed_in: new Date().toISOString(),
    images: [],
    floor_plan: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, images: files }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting:", formData);
  };

  return (
    <Card className="mb-[150px] h-full w-full rounded-none p-4 shadow-none">
      <CardHeader className="pb-5 text-[28px] font-semibold text-shades-black">
        <p>Add New Property</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormAddPropertyField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <FormAddPropertyField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <FormAddPropertyField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <FormAddPropertyField
              label="Bedrooms"
              name="bedNumber"
              type="number"
              value={formData.bedNumber}
              onChange={handleChange}
              required
            />
            <FormAddPropertyField
              label="Bathrooms"
              name="bathNumber"
              type="number"
              value={formData.bathNumber}
              onChange={handleChange}
              required
            />
            <FormAddPropertyField
              label="Area (sq ft)"
              name="area"
              type="number"
              value={formData.area}
              onChange={handleChange}
              required
            />
            <FormAddPropertyField
              label="Property Type"
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              required
            />

            <div className="space-y-1">
              <Label className="text-base font-medium">Listing Type</Label>
              <ListingTypeSelector
                value={formData.type}
                onChange={(val) => setFormData({ ...formData, type: val })}
              />
            </div>

            <div className="md:col-span-2">
              <FormAddPropertyField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                isTextArea
                rows={4}
                className="resize-none rounded-xl border-amber-100 px-4 py-3 !text-lg shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
              />
            </div>

            <div className="md:col-span-2">
              <Label>Images</Label>
              <Input
                type="file"
                name="images"
                onChange={handleImageChange}
                multiple
                accept="image/*"
              />
            </div>

            <FormAddPropertyField
              label="Floor Plan URL"
              name="floor_plan"
              value={formData.floor_plan}
              onChange={handleChange}
              className="md:col-span-2"
            />
          </div>

          <div className="text-right">
            <Button type="submit" className="h-[50px] px-6">
              Add Property
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
