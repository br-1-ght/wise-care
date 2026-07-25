import { useState } from "react";
import type { FormEvent } from "react";
import toast from "react-hot-toast";
import { Send } from "lucide-react";
import { Button } from "../ui/Button";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("You're subscribed to Wise Care updates.");
    setEmail("");
  }

  return (
    <section className="container-page py-16">
      <div className="rounded-2xl bg-brand-green-light px-6 py-10 text-center sm:px-12">
        <h2 className="font-display text-2xl font-semibold text-brand-dark sm:text-3xl">
          Stay ahead of your health
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-brand-muted">
          Health tips, new service areas, and provider updates — no spam, unsubscribe anytime.
        </p>
        <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-brand-border bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-green"
          />
          <Button type="submit">
            <Send className="h-4 w-4" /> Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
