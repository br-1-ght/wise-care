import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container-narrow py-12 sm:py-16">
      <h1 className="mb-6 font-display text-3xl font-semibold text-brand-dark">Contact us</h1>
      <div className="space-y-4">
        <p className="flex items-center gap-3 text-brand-muted"><Mail className="h-5 w-5 text-brand-green" /> hello@wisecare.health</p>
        <p className="flex items-center gap-3 text-brand-muted"><Phone className="h-5 w-5 text-brand-green" /> +234 800 000 0000</p>
        <p className="flex items-center gap-3 text-brand-muted"><MapPin className="h-5 w-5 text-brand-green" /> Lagos, Nigeria</p>
      </div>
    </div>
  );
}
