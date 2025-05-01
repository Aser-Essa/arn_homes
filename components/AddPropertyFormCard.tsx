"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { insertProperty } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PropertyBasicDetailsInputs from "./PropertyBasicDetailsInputs";
import PropertyFeaturesSection from "./PropertyFeaturesSection";
import UploadImages from "./UploadImages";
import { useDropzoneContext } from "./ui/Dropzone";
import { zodResolver } from "@hookform/resolvers/zod";

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

const formSchema = z
  .object({
    title: z.string().min(5, "Title must be at least 5 characters long"),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters long")
      .max(100, "Address must be at most 100 characters long"),
    bed_number: z.coerce.number().min(1, "Bedrooms required").optional(),
    bath_number: z.coerce.number().min(1, "Bathrooms required").optional(),
    area: z.coerce
      .number()
      .min(100, "Area must be at least 100 sq ft")
      .optional(),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters long")
      .max(1000, "Description must be at most 1000 characters long"),
    is_furnished: z.boolean().default(false),
    property_type: z
      .string()
      .min(3, "Property type must be at least 3 characters")
      .refine((val) => isNaN(Number(val)), {
        message: "Property type cannot be a number",
      }),
    category: z.string(),
    listed_in: z.string(),
    floor_plan: z.string(),
    images: z.array(z.string()),
    state: z.string().min(3, "State must be at least 3 characters"),
    price: z.coerce
      .number()
      .min(100000, "Minimum price is £100,000")
      .optional(),

    monthly_rent: z.coerce
      .number()
      .min(100, "Monthly rent must be at least £100")
      .optional(),
    deposit_amount: z.coerce
      .number()
      .min(100, "Deposit rent must be at least £100")
      .optional(),
    lease_term: z.string().optional(),
    expected_roi: z.coerce
      .number()
      .min(1, "Expected ROI must be at least 1%")
      .max(100, "Expected ROI must not exceed 100%")
      .optional(),
    minimum_investment: z.coerce
      .number()
      .min(10000, "Minimum Investment must be at least £10,000")
      .optional(),
    investment_term: z.string().optional(),
    investmentTypeOptions: z.string().optional(),
    exterior: z.array(sectionSchema).nonempty("Exterior sections are required"),
    interior: z.array(sectionSchema).nonempty("Interior sections are required"),
  })
  .refine(
    (data) =>
      (data.category !== "sale" && data.category !== "investment") ||
      (data.price !== undefined && !isNaN(data.price)),
    {
      message: `Price is required for sale or investment`,
      path: ["price"],
    },
  )
  .refine(
    (data) =>
      data.category !== "rent" ||
      (data.monthly_rent !== undefined && !isNaN(data.monthly_rent)),
    {
      message: `Monthly Rent is required for rent`,
      path: ["monthly_rent"],
    },
  )
  .refine(
    (data) =>
      data.category !== "rent" ||
      (data.deposit_amount !== undefined && !isNaN(data.deposit_amount)),
    {
      message: `Deposit Amount is required for rent`,
      path: ["deposit_amount"],
    },
  )
  .refine((data) => data.category !== "rent" || !!data.lease_term, {
    message: `Lease Term is required for rent`,
    path: ["lease_term"],
  })
  .refine(
    (data) =>
      data.category !== "investment" ||
      (data.expected_roi !== undefined && !isNaN(data.expected_roi)),
    {
      message: `Expected ROI is required for investment`,
      path: ["expected_roi"],
    },
  )
  .refine(
    (data) =>
      data.category !== "investment" ||
      (data.minimum_investment !== undefined &&
        !isNaN(data.minimum_investment)),
    {
      message: `Minimum Investment is required for investment`,
      path: ["minimum_investment"],
    },
  )
  .refine((data) => data.category !== "investment" || !!data.investment_term, {
    message: `Investment Term is required for investment`,
    path: ["investment_term"],
  })
  .refine(
    (data) => data.category !== "investment" || !!data.investmentTypeOptions,
    {
      message: `Investment Type is required for investment`,
      path: ["investmentTypeOptions"],
    },
  );

export type PropertyFormData = z.infer<typeof formSchema>;
type features = z.infer<typeof sectionSchema>[];

export default function AddPropertyFormCard({
  propertyId,
}: AddPropertyFormCardProps) {
  const { user } = useUser();
  const propertyProps = useDropzoneContext("property");
  const floorPlanProps = useDropzoneContext("floorPlan");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      address: "",
      bed_number: 0,
      bath_number: 0,
      area: 0,
      description: "",
      is_furnished: false,
      property_type: "",
      category: "sale",
      listed_in: new Date().toISOString(),
      images: [],
      floor_plan: "",
      state: "",
      price: 0,
      monthly_rent: 0,
      deposit_amount: 0,
      lease_term: "6",
      expected_roi: 0,
      minimum_investment: 0,
      investment_term: "12",
      investmentTypeOptions: "rental_income",
    },
  });

  function isFileLengthValid(props: typeof propertyProps) {
    const length = props.files?.length;
    return length >= props.minFiles && length <= props.maxFiles;
  }

  function formatFeatures(data: features) {
    return data.map((section) => ({
      ...section,
      points: section.points.map((p) => `${p.Key}:${p.Value}`),
    }));
  }

  function extractImages() {
    const BASE_URL = `https://cayrxqnmmwbndtdlturc.supabase.co/storage/v1/object/public/properties-images/${user?.id}/${propertyId}`;
    const images = propertyProps?.files?.map(
      (file) => `${BASE_URL}/${file?.name}`,
    );
    const floorFile = floorPlanProps?.files?.at(0);
    const floor_plan = floorFile ? `${BASE_URL}/${floorFile?.name}` : "";
    return { images, floor_plan };
  }

  async function onSubmit(data: PropertyFormData) {
    try {
      console.log(data);
      if (!user?.id) {
        console.error("User ID is missing");
        return;
      }

      const propertyPropsFilesLength = propertyProps?.files?.length;
      const floorPlanPropsFilesLength = floorPlanProps?.files?.length;

      if (
        !isFileLengthValid(propertyProps) ||
        !isFileLengthValid(floorPlanProps)
      ) {
        console.error("Invalid file count.");
        return;
      }

      const [uploadedPropertyImages, uploadedFloorPlan] = await Promise.all([
        propertyProps?.onUpload(),
        floorPlanProps?.onUpload(),
      ]);

      const isUploadSuccessful =
        uploadedPropertyImages.length === propertyPropsFilesLength &&
        uploadedFloorPlan.length === floorPlanPropsFilesLength;

      if (!isUploadSuccessful) {
        console.error("Upload failed or not all files uploaded successfully.");
        return;
      }

      const { images, floor_plan } = extractImages();
      const transformedExterior = formatFeatures(data.exterior);
      const transformedInterior = formatFeatures(data.interior);

      const propertyData = {
        ...data,
        exterior: transformedExterior,
        interior: transformedInterior,
        images,
        floor_plan,
        user_id: user.id,
        id: propertyId,
      };

      await insertProperty(propertyData);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  }

  return (
    <>
      <Card className="mb-[150px] h-full w-full rounded-none p-0 !px-4 !py-6 shadow-none md:!p-10">
        <CardHeader className="p-0 pb-5 text-[28px] font-semibold text-shades-black">
          <p>Add New Property</p>
        </CardHeader>
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
                <PropertyBasicDetailsInputs />
                <PropertyFeaturesSection />
                <UploadImages contextType={"property"} title={"Images"} />
                <UploadImages contextType={"floorPlan"} title={"Floor Image"} />
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
