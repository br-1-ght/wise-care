import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { ArrowLeft, ArrowRight, Phone, Video } from "lucide-react";
import { Stepper } from "../components/ui/Stepper";
import { Button } from "../components/ui/Button";
import { Input, TextArea } from "../components/ui/Input";
import { ServiceCard } from "../components/booking/ServiceCard";
import { phoneServices } from "../data/services";
import { providers } from "../data/providers";
import {
  phoneConsultSchema,
  phoneConsultStepFields,
  type PhoneConsultFormValues,
} from "../utils/bookingSchemas";
import { useAutosave, readDraft, clearDraft } from "../hooks/useAutosave";
import { formatCurrency, generateReference } from "../utils/format";

const STEPS = ["Service", "Details", "Review", "Confirmed"];
const DRAFT_KEY = "wisecare:phone-consult-draft";

const defaultValues: PhoneConsultFormValues = {
  serviceId: "",
  mode: "voice",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  specialty: "",
  complaint: "",
  timing: "asap",
  scheduledFor: "",
};

export default function PhoneConsultationBookingPage() {
  const [step, setStep] = useState(0);
  const [reference, setReference] = useState("");
  const navigate = useNavigate();
  const locationState = useLocation().state as { serviceId?: string } | null;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<PhoneConsultFormValues>({
    resolver: zodResolver(phoneConsultSchema),
    defaultValues: readDraft<PhoneConsultFormValues>(DRAFT_KEY) ?? defaultValues,
    mode: "onBlur",
  });

  const values = watch();
  useAutosave(DRAFT_KEY, values);

  useEffect(() => {
    if (locationState?.serviceId) setValue("serviceId", locationState.serviceId);
  }, [locationState, setValue]);

  const selectedService = phoneServices.find((s) => s.id === values.serviceId);
  const onlineProviders = providers.filter((p) => p.online);

  async function goNext() {
    const fields = phoneConsultStepFields[step];
    const valid = fields.length === 0 || (await trigger(fields));
    if (!valid) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function onSubmit(data: PhoneConsultFormValues) {
    const ref = generateReference("WC-PHN");
    setReference(ref);
    clearDraft(DRAFT_KEY);
    setStep(3);
    toast.success("Consultation booked — connecting you with a provider shortly.");
    void data;
  }

  return (
    <div className="container-narrow py-10 sm:py-14">
      {step < 3 && (
        <button
          onClick={() => (step === 0 ? navigate("/") : goBack())}
          className="mb-5 flex items-center gap-1.5 text-sm text-brand-muted hover:text-brand-green"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      )}

      <div className="mb-6 rounded-xl border border-brand-border bg-white p-4">
        <Stepper steps={STEPS} currentStep={step} />
      </div>

      {step === 0 && (
        <div className="mb-5 rounded-xl border border-brand-border bg-brand-green-pale p-4 text-sm text-brand-muted">
          <span className="font-medium text-brand-green">{onlineProviders.length} providers online now</span> —
          estimated wait time under 15 minutes.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
              <h2 className="mb-3 font-display text-2xl font-semibold text-brand-dark">Choose a consultation</h2>
              <div className="mb-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setValue("mode", "voice")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 py-3 text-sm font-medium ${values.mode === "voice" ? "border-brand-green bg-brand-green-light text-brand-green" : "border-brand-border text-brand-muted"}`}
                >
                  <Phone className="h-4 w-4" /> Voice call
                </button>
                <button
                  type="button"
                  onClick={() => setValue("mode", "video")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 py-3 text-sm font-medium ${values.mode === "video" ? "border-brand-green bg-brand-green-light text-brand-green" : "border-brand-border text-brand-muted"}`}
                >
                  <Video className="h-4 w-4" /> Video call
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {phoneServices.map((s) => (
                  <ServiceCard
                    key={s.id}
                    service={s}
                    selected={values.serviceId === s.id}
                    onSelect={(svc) => setValue("serviceId", svc.id, { shouldValidate: true })}
                  />
                ))}
              </div>
              {errors.serviceId && <p className="mt-2 text-sm text-brand-red">{errors.serviceId.message}</p>}
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
              <h2 className="mb-4 font-display text-2xl font-semibold text-brand-dark">Your details</h2>
              <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                <Input id="firstName" label="First name" required {...register("firstName")} error={errors.firstName?.message} />
                <Input id="lastName" label="Last name" required {...register("lastName")} error={errors.lastName?.message} />
                <Input id="phone" label="Phone number" required type="tel" {...register("phone")} error={errors.phone?.message} />
                <Input id="email" label="Email" required type="email" {...register("email")} error={errors.email?.message} />
              </div>
              <Input id="specialty" label="Specialty needed" hint="optional" {...register("specialty")} />
              <fieldset className="mb-4">
                <legend className="mb-1.5 text-sm font-medium text-brand-text">
                  Timing <span className="text-brand-red">*</span>
                </legend>
                <div className="flex gap-5">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" value="asap" {...register("timing")} className="h-4 w-4 accent-brand-green" />
                    Connect now
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" value="scheduled" {...register("timing")} className="h-4 w-4 accent-brand-green" />
                    Schedule for later
                  </label>
                </div>
              </fieldset>
              {values.timing === "scheduled" && (
                <Input id="scheduledFor" label="Preferred date & time" type="datetime-local" {...register("scheduledFor")} />
              )}
              <TextArea
                id="complaint"
                label="Describe your symptoms"
                required
                rows={4}
                {...register("complaint")}
                error={errors.complaint?.message}
              />
            </motion.div>
          )}

          {step === 2 && selectedService && (
            <motion.div key="s2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
              <h2 className="mb-4 font-display text-2xl font-semibold text-brand-dark">Review your booking</h2>
              <div className="rounded-xl border border-brand-border bg-white p-5">
                <dl className="divide-y divide-brand-green-light text-sm">
                  {[
                    ["Service", selectedService.title],
                    ["Mode", values.mode === "voice" ? "Voice call" : "Video call"],
                    ["Patient", `${values.firstName} ${values.lastName}`],
                    ["Phone", values.phone],
                    ["Timing", values.timing === "asap" ? "Connect now" : values.scheduledFor || "Scheduled"],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between gap-4 py-2">
                      <dt className="text-brand-muted">{label}</dt>
                      <dd className="text-right font-medium text-brand-dark">{val}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 pt-3 text-base font-semibold text-brand-green">
                    <dt>Total to pay now</dt>
                    <dd>{formatCurrency(selectedService.price, selectedService.currency)}</dd>
                  </div>
                </dl>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-brand-border bg-white p-8 text-center"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-green bg-brand-green-light text-2xl">
                ✓
              </div>
              <h2 className="mb-2 font-display text-2xl font-semibold text-brand-dark">You're all set</h2>
              <p className="mx-auto mb-5 max-w-sm text-sm text-brand-muted">
                We're connecting you with a provider now.
              </p>
              <div className="mb-6 inline-block rounded-lg bg-brand-green-pale px-5 py-3">
                <p className="text-xs text-brand-muted">Booking reference</p>
                <p className="font-display text-xl font-bold text-brand-green">{reference}</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                <Button onClick={() => navigate("/track/phone-consultation", { state: { reference } })}>
                  Go to waiting room
                </Button>
                <Button variant="secondary" onClick={() => navigate("/")}>
                  Back to home
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {step < 3 && (
          <div className="mt-6 flex gap-3">
            {step > 0 && (
              <Button type="button" variant="secondary" onClick={goBack} className="flex-1">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            )}
            {step < 2 && (
              <Button type="button" onClick={goNext} className="flex-1">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            )}
            {step === 2 && (
              <Button type="submit" className="flex-1">
                Confirm & Pay {selectedService ? formatCurrency(selectedService.price) : ""}
              </Button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
