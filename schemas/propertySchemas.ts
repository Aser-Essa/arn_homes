import { z } from "zod";

export const pointSchema = z.object({
  Key: z
    .string()
    .min(3, "Key must be at least 3 character")
    .refine((val) => isNaN(Number(val)), {
      message: "Value must not be a number",
    }),
  Value: z.string().min(1, "Value is required"),
});

export const sectionSchema = z.object({
  title: z.string(),
  points: z.array(pointSchema),
  isOpen: z.boolean(),
});

export const formSchema = z
  .object({
    title: z.string().min(5, "Title must be at least 5 characters long"),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters long")
      .max(100, "Address must be at most 100 characters long"),
    bed_number: z.coerce.number().min(1, "Bedrooms required"),
    bath_number: z.coerce.number().min(1, "Bathrooms required"),
    area: z.coerce.number().min(100, "Area must be at least 100 sq ft"),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters long")
      .max(5000, "Description must be at most 1000 characters long"),

    property_type: z
      .string()
      .min(3, "Property type must be at least 3 characters")
      .refine((val) => isNaN(Number(val)), {
        message: "Property type cannot be a number",
      }),
    category: z.string(),
    listed_in: z.string(),
    state: z.string().min(3, "State must be at least 3 characters"),

    extras: z
      .object({
        price: z.coerce
          .number()
          .min(100_000, "Minimum price is £100,000")
          .optional(),

        monthly_rent: z.coerce
          .number()
          .min(120, "Monthly rent must be at least £100")
          .optional(),

        deposit_amount: z.coerce
          .number()
          .min(250, "Deposit rent must be at least £100")
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

        investment_type: z.string().optional(),

        furniture_type: z.string().optional(),
      })
      .optional(),

    exterior: z.array(sectionSchema).nonempty("Exterior sections are required"),
    interior: z.array(sectionSchema).nonempty("Interior sections are required"),
  })
  .refine(
    (data) =>
      (data.category !== "sale" && data.category !== "investment") ||
      (data.extras?.price !== undefined && !isNaN(data.extras.price)),
    {
      message: `Price is required for sale or investment`,
      path: ["extras", "price"],
    },
  )
  .refine(
    (data) =>
      data.category !== "rent" ||
      (data.extras?.monthly_rent !== undefined &&
        !isNaN(data.extras.monthly_rent)),
    {
      message: `Monthly Rent is required for rent`,
      path: ["extras", "monthly_rent"],
    },
  )
  .refine(
    (data) =>
      data.category !== "rent" ||
      (data.extras?.deposit_amount !== undefined &&
        !isNaN(data.extras.deposit_amount)),
    {
      message: `Deposit Amount is required for rent`,
      path: ["extras", "deposit_amount"],
    },
  )
  .refine((data) => data.category !== "rent" || !!data.extras?.lease_term, {
    message: `Lease Term is required for rent`,
    path: ["extras", "lease_term"],
  })
  .refine(
    (data) =>
      data.category !== "investment" ||
      (data.extras?.expected_roi !== undefined &&
        !isNaN(data.extras.expected_roi)),
    {
      message: `Expected ROI is required for investment`,
      path: ["extras", "expected_roi"],
    },
  )
  .refine(
    (data) =>
      data.category !== "investment" ||
      (data.extras?.minimum_investment !== undefined &&
        !isNaN(data.extras.minimum_investment)),
    {
      message: `Minimum Investment is required for investment`,
      path: ["extras", "minimum_investment"],
    },
  )
  .refine(
    (data) => data.category !== "investment" || !!data.extras?.investment_term,
    {
      message: `Investment Term is required for investment`,
      path: ["extras", "investment_term"],
    },
  )
  .refine(
    (data) => data.category !== "investment" || !!data.extras?.investment_type,
    {
      message: `Investment Type is required for investment`,
      path: ["extras", "investment_type"],
    },
  );
