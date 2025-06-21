// "use client";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Form } from "@/components/ui/form";
// import { insertProperty } from "@/lib/actions";
// import { useUser } from "@clerk/nextjs";
// import { useForm } from "react-hook-form";
// import PropertyFeaturesSection from "./PropertyFeaturesSection";
// import UploadImages from "./UploadImages";
// import { useDropzoneContext } from "./ui/Dropzone";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import PropertyInputs from "./PropertyInputs";
// import { formSchema } from "@/schemas/propertySchemas";
// import { features, PropertyFormData } from "@/types/types";

// interface CreateEditPropertyFormCardProps {
//   propertyId?: string;
// }

// export default function CreateEditPropertyFormCard({
//   propertyId,
// }: CreateEditPropertyFormCardProps) {
//   const { user } = useUser();
//   const propertyProps = useDropzoneContext("property");
//   const floorPlanProps = useDropzoneContext("floorPlan");
//   const router = useRouter();

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       address: "",
//       description: "",
//       price: 1500_000,
//       is_furnished: false,
//       deposit_amount: 100,
//       expected_roi: 1,
//       minimum_investment: 10_000,
//       monthly_rent: 100,
//       area: 100,
//       bed_number: 1,
//       bath_number: 1,
//       property_type: "",
//       category: "sale",
//       listed_in: new Date().toISOString(),
//       images: [],
//       floor_plan: "",
//       state: "",
//       lease_term: "6",
//       investment_term: "12",
//       investment_type: "rental_income",
//       exterior: [],
//       interior: [],
//     },
//   });

//   console.log(form.getValues());

//   function isFileLengthValid(props: typeof propertyProps) {
//     const length = props.files?.length;
//     return length >= props.minFiles && length <= props.maxFiles;
//   }

//   function formatFeatures(data: features) {
//     return data.map((section) => ({
//       ...section,
//       points: section.points.map((p) => `${p.Key}:${p.Value}`),
//     }));
//   }

//   function extractImages() {
//     const BASE_URL = `https://cayrxqnmmwbndtdlturc.supabase.co/storage/v1/object/public/properties-images/${user?.id}/${propertyId}`;
//     const images = propertyProps?.files?.map(
//       (file) => `${BASE_URL}/${file?.name}`,
//     );
//     const floorFile = floorPlanProps?.files?.at(0);
//     const floor_plan = floorFile ? `${BASE_URL}/${floorFile?.name}` : "";
//     return { images, floor_plan };
//   }

//   async function onSubmit(data: PropertyFormData) {
//     try {
//       if (!user?.id) {
//         console.error("User ID is missing");
//         return;
//       }

//       const propertyPropsFilesLength = propertyProps?.files?.length;
//       const floorPlanPropsFilesLength = floorPlanProps?.files?.length;

//       if (
//         !isFileLengthValid(propertyProps) ||
//         !isFileLengthValid(floorPlanProps)
//       ) {
//         console.error("Invalid file count.");
//         return;
//       }

//       const [uploadedPropertyImages, uploadedFloorPlan] = await Promise.all([
//         propertyProps?.onUpload(),
//         floorPlanProps?.onUpload(),
//       ]);

//       const isUploadSuccessful =
//         uploadedPropertyImages.length === propertyPropsFilesLength &&
//         uploadedFloorPlan.length === floorPlanPropsFilesLength;

//       if (!isUploadSuccessful) {
//         console.error("Upload failed or not all files uploaded successfully.");
//         return;
//       }

//       const { images, floor_plan } = extractImages();
//       const transformedExterior = formatFeatures(data.exterior);
//       const transformedInterior = formatFeatures(data.interior);

//       const propertyData = {
//         ...data,
//         exterior: transformedExterior,
//         interior: transformedInterior,
//         images,
//         floor_plan,
//         user_id: user.id,
//         id: propertyId,
//       };

//       console.log(propertyData, "SSSSSSSSSSSS");
//       // await insertProperty(propertyData);
//       toast.success("Property is Added Successfully");
//       form.reset();
//       router.push("/account/properties");
//     } catch (error) {
//       console.error("Submission failed:", error);
//     }
//   }

//   return (
//     <>
//       <Card className="mb-[150px] h-full w-full rounded-none p-0 !px-4 !py-6 shadow-none md:!p-10">
//         <CardHeader className="p-0 pb-5 text-[28px] font-semibold text-shades-black">
//           <p>Add New Property</p>
//         </CardHeader>
//         <CardContent className="p-0">
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
//                 <PropertyInputs />
//                 <PropertyFeaturesSection />
//                 <UploadImages contextType={"property"} title={"Images"} />
//                 <UploadImages contextType={"floorPlan"} title={"Floor Image"} />
//               </div>
//               <div className="text-right">
//                 <Button type="submit" className="h-[50px] px-6">
//                   {propertyProps?.loading || floorPlanProps?.loading
//                     ? "loading..."
//                     : "Add Property"}
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </>
//   );
// }
