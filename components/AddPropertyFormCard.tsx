"use client";
import ListingTypeSelector from "@/components/ListingTypeSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { insertProperty } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PropertyBasicDetailsInputs from "./PropertyBasicDetailsInputs";
import PropertyFeaturesSection from "./PropertyFeaturesSection";
import UploadImages from "./UploadImages";
import { useDropzoneContext } from "./ui/Dropzone";

interface AddPropertyFormCardProps {
  propertyId?: string;
}

const pointSchema = z.object({
  Key: z.string(),
  Value: z.string(),
});

const sectionSchema = z.object({
  title: z.string(),
  points: z.array(pointSchema),
  isOpen: z.boolean(),
});

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  address: z.string().min(1, "Address is required"),
  price: z.string().min(1, "Price is required"),
  bed_number: z.string().min(1, "Bedrooms required"),
  bath_number: z.string().min(1, "Bathrooms required"),
  area: z.string().min(1, "Area is required"),
  description: z.string().min(1, "Description is required"),
  property_type: z.string().min(1, "Property type required"),
  category: z.string(),
  listed_in: z.string(),
  floor_plan: z.string().optional(),
  images: z.any().optional(),
  state: z.string(),
  exterior: z.array(sectionSchema),
  interior: z.array(sectionSchema),
});

export type PropertyFormData = z.infer<typeof formSchema>;

export default function AddPropertyFormCard({
  propertyId,
}: AddPropertyFormCardProps) {
  const { user } = useUser();
  const propertyProps = useDropzoneContext("property");
  const floorPlanProps = useDropzoneContext("floorPlan");

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      address: "",
      price: "",
      bed_number: "",
      bath_number: "",
      area: "",
      description: "",
      property_type: "",
      category: "sale",
      listed_in: new Date().toISOString(),
      images: [],
      floor_plan: "",
      state: "",
    },
  });

  function extractImages() {
    const images = propertyProps?.files.map(
      (file) =>
        `https://cayrxqnmmwbndtdlturc.supabase.co/storage/v1/object/public/properties-images/${user?.id}/${propertyId}/${file?.name}`,
    );
    const floor_plan = `https://cayrxqnmmwbndtdlturc.supabase.co/storage/v1/object/public/properties-images/${user?.id}/${propertyId}/${floorPlanProps?.files?.at(0)?.name}`;
    return { images, floor_plan };
  }

  function formatFeatures(data: PropertyFormData) {
    const transformedExterior = data.exterior.map((section) => ({
      ...section,
      points: section.points.map((p) => `${p.Key}:${p.Value}`),
    }));
    const transformedInterior = data.interior.map((section) => ({
      ...section,
      points: section.points.map((p) => `${p.Key}:${p.Value}`),
    }));
    return { transformedExterior, transformedInterior };
  }

  async function onSubmit(data: PropertyFormData) {
    try {
      const propertyPropsFilesLength = propertyProps?.files?.length;
      const floorPlanPropsFilesLength = floorPlanProps?.files?.length;

      const isFilesLengthCorrect =
        propertyProps.maxFiles >= propertyPropsFilesLength &&
        propertyPropsFilesLength >= propertyProps.minFiles &&
        floorPlanProps.maxFiles >= floorPlanPropsFilesLength &&
        floorPlanPropsFilesLength >= floorPlanProps.minFiles;

      if (isFilesLengthCorrect) {
        const [successfulPropertyFiles, successfulFloorPlanPropsFiles] =
          await Promise.all([
            propertyProps?.onUpload(),
            floorPlanProps?.onUpload(),
          ]);

        const isUploadSuccessful =
          successfulPropertyFiles.length === propertyPropsFilesLength &&
          successfulFloorPlanPropsFiles.length === floorPlanPropsFilesLength;

        const { images, floor_plan } = extractImages();

        const { transformedExterior, transformedInterior } =
          formatFeatures(data);

        if (isUploadSuccessful) {
          const propertyData = {
            ...data,
            exterior: transformedExterior,
            interior: transformedInterior,
            images,
            floor_plan,
            user_id: user?.id,
            id: propertyId,
          };

          await insertProperty(propertyData);
        } else {
          console.log("ERROR");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Card className="mb-[150px] h-full w-full rounded-none p-4 shadow-none">
        <CardHeader className="pb-5 text-[28px] font-semibold text-shades-black">
          <p>Add New Property</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-x-4 gap-y-6 md:grid-cols-2">
                <PropertyBasicDetailsInputs />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium capitalize">
                        Listing Type
                      </FormLabel>
                      <FormControl>
                        <ListingTypeSelector
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <PropertyFeaturesSection />
                <UploadImages contextType={"property"} title={"Images"} />
                <UploadImages contextType={"floorPlan"} title={"Floor Image"} />

                {/* <UploadFloorPlan /> */}
              </div>

              <div className="text-right">
                <Button type="submit" className="h-[50px] px-6">
                  {propertyProps?.loading || floorPlanProps?.loading
                    ? "loading..."
                    : "Add Property"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
