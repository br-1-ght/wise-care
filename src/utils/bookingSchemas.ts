import { z } from "zod";

export const patientDetailsSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(7, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  visitFor: z.enum(["Myself", "Someone else"]),
});

export const homeVisitSchema = z.object({
  serviceId: z.string().min(1, "Please select a service"),
  isEmergency: z.boolean(),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(7, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  visitFor: z.enum(["Myself", "Someone else"]),
  address: z.string().min(5, "Enter your street address"),
  area: z.string().min(2, "Enter your city or area"),
  state: z.string().min(2, "Select your state"),
  zip: z.string().optional(),
  timing: z.enum(["asap", "scheduled"]),
  scheduledFor: z.string().optional(),
  specialty: z.string().optional(),
  providerSexPreference: z.enum(["No preference", "Male", "Female"]),
  complaint: z.string().min(10, "Please describe your symptoms (10+ characters)"),
});
export type HomeVisitFormValues = z.infer<typeof homeVisitSchema>;

export const phoneConsultSchema = z.object({
  serviceId: z.string().min(1, "Please select a service"),
  mode: z.enum(["voice", "video"]),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(7, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  specialty: z.string().optional(),
  complaint: z.string().min(10, "Please describe your symptoms (10+ characters)"),
  timing: z.enum(["asap", "scheduled"]),
  scheduledFor: z.string().optional(),
});
export type PhoneConsultFormValues = z.infer<typeof phoneConsultSchema>;

export const homeVisitStepFields: (keyof HomeVisitFormValues)[][] = [
  ["serviceId"],
  ["firstName", "lastName", "phone", "email", "visitFor", "address", "area", "state", "timing", "complaint"],
  [],
];

export const phoneConsultStepFields: (keyof PhoneConsultFormValues)[][] = [
  ["serviceId", "mode"],
  ["firstName", "lastName", "phone", "email", "complaint", "timing"],
  [],
];
