import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { ArrowLeft, ArrowRight, Siren, ShieldCheck } from "lucide-react";
import { Stepper } from "../components/ui/Stepper";
import { Button } from "../components/ui/Button";
import { Input, Select, TextArea } from "../components/ui/Input";
import { ServiceCard } from "../components/booking/ServiceCard";
import { homeVisitServices } from "../data/services";
import { stateEmergencyData } from "../data/stateEmergencyData";
import { homeVisitSchema, homeVisitStepFields, type HomeVisitFormValues } from "../utils/bookingSchemas";
import { useAutosave, readDraft, clearDraft } from "../hooks/useAutosave";
import { formatCurrency, generateReference } from "../utils/format";

const STEPS = ["Service", "Details", "Review", "Confirmed"];
const DRAFT_KEY = "wisecare:home-visit-draft";

const defaultValues: HomeVisitFormValues = {
  serviceId: "",
  isEmergency: false,
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  visitFor: "Myself",
  address: "",
  area: "",
  state: "",
  zip: "",
  timing: "asap",
  scheduledFor: "",
  specialty: "",
  providerSexPreference: "No preference",
  complaint: "",
};

export default function HomeVisitBookingPage() {
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
  } = useForm<HomeVisitFormValues>({
    resolver: zodResolver(homeVisitSchema),
    defaultValues: readDraft<HomeVisitFormValues>(DRAFT_KEY) ?? defaultValues,
    mode: "onBlur",
  });

  const values = watch();
  useAutosave(DRAFT_KEY, values);

  useEffect(() => {
    if (locationState?.serviceId) setValue("serviceId", locationState.serviceId);
  }, [locationState, setValue]);

  const selectedService = homeVisitServices.find((s) => s.id === values.serviceId);
  const progressPercent = ((step + 1) / STEPS.length) * 100;

  async function goNext() {
    const fields = homeVisitStepFields[step];
    const valid = fields.length === 0 || (await trigger(fields));
    if (!valid) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function onSubmit(data: HomeVisitFormValues) {
    const ref = generateReference("WC-D2D");
    setReference(ref);
    clearDraft(DRAFT_KEY);
    setStep(3);
    toast.success("Booking confirmed — a provider is being dispatched.");
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
        {step < 3 && <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-brand-green-light">
          <motion.div className="h-full bg-brand-green" animate={{ width: `${progressPercent}%` }} />
        </div>}
      </div>

      <button
        type="button"
        onClick={() => {
          setValue("isEmergency", true);
          toast("Emergency mode activated — we'll prioritise the fastest available provider.", { icon: "🚨" });
        }}
        className="mb-4 flex w-full items-center gap-3 rounded-lg bg-brand-red px-4 py-3 text-left text-white hover:bg-red-700"
      >
        <Siren className="h-5 w-5 shrink-0" />
        <span>
          <span className="block text-sm font-medium">Need urgent priority dispatch?</span>
          <span className="block text-xs opacity-80">Tap to flag this booking as urgent (not for 112 emergencies)</span>
        </span>
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
              <h2 className="mb-3 font-display text-2xl font-semibold text-brand-dark">Choose a service</h2>
              <div className="flex flex-col gap-3">
                {homeVisitServices.map((s) => (
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
            <motion.div key="step1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
              <h2 className="mb-4 font-display text-2xl font-semibold text-brand-dark">Patient & visit details</h2>

              <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                <Input id="firstName" label="First name" required {...register("firstName")} error={errors.firstName?.message} />
                <Input id="lastName" label="Last name" required {...register("lastName")} error={errors.lastName?.message} />
                <Input id="phone" label="Phone number" required type="tel" {...register("phone")} error={errors.phone?.message} />
                <Input id="email" label="Email" required type="email" {...register("email")} error={errors.email?.message} />
              </div>

              <Select id="visitFor" label="Booking for" required {...register("visitFor")}>
                <option>Myself</option>
                <option>Someone else</option>
              </Select>

              <Input id="address" label="Home address" required hint="street & house number" {...register("address")} error={errors.address?.message} />
              <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-3">
                <Input id="area" label="City / area" required {...register("area")} error={errors.area?.message} />
                <Select id="state" label="State" required {...register("state")} error={errors.state?.message}>
                  <option value="">Select state</option>
                  {stateEmergencyData.map((s) => (
                    <option key={s.state} value={s.state}>
                      {s.state}
                    </option>
                  ))}
                </Select>
                <Input id="zip" label="Postal code" hint="optional" {...register("zip")} error={errors.zip?.message} />
              </div>

              <fieldset className="mb-4">
                <legend className="mb-1.5 text-sm font-medium text-brand-text">
                  Timing <span className="text-brand-red">*</span>
                </legend>
                <div className="flex gap-5">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" value="asap" {...register("timing")} className="h-4 w-4 accent-brand-green" />
                    As soon as possible
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

              <Input id="specialty" label="Specialty needed" hint="optional" {...register("specialty")} />

              <Select id="providerSexPreference" label="Provider sex preference" {...register("providerSexPreference")}>
                <option>No preference</option>
                <option>Male</option>
                <option>Female</option>
              </Select>

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
            <motion.div key="step2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
              <h2 className="mb-4 font-display text-2xl font-semibold text-brand-dark">Review your booking</h2>
              <div className="rounded-xl border border-brand-border bg-white p-5">
                <dl className="divide-y divide-brand-green-light text-sm">
                  {[
                    ["Service", selectedService.title + (values.isEmergency ? " (Priority)" : "")],
                    ["Patient", `${values.firstName} ${values.lastName}`],
                    ["Phone", values.phone],
                    ["Visit address", `${values.address}, ${values.area}, ${values.state}${values.zip ? " " + values.zip : ""}`],
                    ["Timing", values.timing === "asap" ? "As soon as possible" : values.scheduledFor || "Scheduled"],
                    ["Provider preference", values.providerSexPreference],
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
              <p className="mt-3 flex items-center gap-1.5 text-xs text-brand-muted">
                <ShieldCheck className="h-3.5 w-3.5" /> Payment is processed securely; your provider is dispatched immediately after confirmation.
              </p>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-brand-border bg-white p-8 text-center"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-green bg-brand-green-light text-2xl">
                ✓
              </div>
              <h2 className="mb-2 font-display text-2xl font-semibold text-brand-dark">Booking confirmed</h2>
              <p className="mx-auto mb-5 max-w-sm text-sm text-brand-muted">
                Your provider is being matched now. You'll get live tracking as soon as they're on the way.
              </p>
              <div className="mb-6 inline-block rounded-lg bg-brand-green-pale px-5 py-3">
                <p className="text-xs text-brand-muted">Booking reference</p>
                <p className="font-display text-xl font-bold text-brand-green">{reference}</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                <Button onClick={() => navigate("/track/home-visit", { state: { reference } })}>
                  Track my provider
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
