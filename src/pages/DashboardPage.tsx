import { motion } from "framer-motion";
import {
  CalendarCheck,
  Home,
  PhoneCall,
  Wallet,
  Users,
  UserCheck2,
  MapPin,
  Bell,
} from "lucide-react";
import { dashboardStats, recentBookings, upcomingVisits } from "../data/dashboard";
import { formatCurrency, formatRelativeTime } from "../utils/format";
import { cn } from "../utils/cn";

const statCards = [
  { key: "totalBookings", label: "Total Bookings", icon: CalendarCheck, format: (v: number) => v.toLocaleString() },
  { key: "todaysVisits", label: "Today's Visits", icon: Home, format: (v: number) => v.toString() },
  { key: "phoneConsultations", label: "Phone Consultations", icon: PhoneCall, format: (v: number) => v.toString() },
  { key: "revenue", label: "Revenue", icon: Wallet, format: (v: number) => formatCurrency(v) },
  { key: "patients", label: "Patients", icon: Users, format: (v: number) => v.toLocaleString() },
  { key: "providersOnline", label: "Providers Online", icon: UserCheck2, format: (v: number) => v.toString() },
] as const;

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-brand-amber",
  confirmed: "bg-blue-50 text-brand-blue",
  "en-route": "bg-brand-green-light text-brand-green",
  "in-progress": "bg-brand-green-light text-brand-green",
  completed: "bg-gray-100 text-brand-muted",
  cancelled: "bg-red-50 text-brand-red",
};

export default function DashboardPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-brand-dark sm:text-3xl">Operations Dashboard</h1>
        <button
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-brand-border text-brand-muted hover:text-brand-green"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-red" />
        </button>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {statCards.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-brand-border bg-white p-4"
          >
            <card.icon className="mb-2 h-5 w-5 text-brand-green" />
            <p className="font-display text-xl font-bold text-brand-dark">
              {card.format(dashboardStats[card.key])}
            </p>
            <p className="text-xs text-brand-muted">{card.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-3 font-medium text-brand-dark">Recent Bookings</h2>
          <div className="overflow-hidden rounded-xl border border-brand-border bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-green-pale text-xs uppercase tracking-wide text-brand-muted">
                <tr>
                  <th className="px-4 py-2.5">Reference</th>
                  <th className="px-4 py-2.5">Patient</th>
                  <th className="px-4 py-2.5">Service</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {recentBookings.map((b) => (
                  <tr key={b.id}>
                    <td className="px-4 py-3 font-medium text-brand-dark">{b.reference}</td>
                    <td className="px-4 py-3 text-brand-muted">{b.patientName}</td>
                    <td className="px-4 py-3 text-brand-muted">{b.serviceName}</td>
                    <td className="px-4 py-3">
                      <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium capitalize", statusStyles[b.status])}>
                        {b.status.replace("-", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-brand-dark">
                      {formatCurrency(b.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mb-3 mt-8 font-medium text-brand-dark">Map (live provider positions)</h2>
          <div className="flex h-48 items-center justify-center rounded-xl border border-brand-border bg-[linear-gradient(135deg,#E8F5EE,#F7FDF9)]">
            <MapPin className="h-6 w-6 text-brand-green" />
            <span className="ml-2 text-sm text-brand-muted">Map placeholder</span>
          </div>
        </div>

        <div>
          <h2 className="mb-3 font-medium text-brand-dark">Upcoming Visits</h2>
          <ul className="space-y-3">
            {upcomingVisits.map((v) => (
              <li key={v.id} className="rounded-xl border border-brand-border bg-white p-4">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium text-brand-dark">{v.patientName}</span>
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium capitalize", statusStyles[v.status])}>
                    {v.status.replace("-", " ")}
                  </span>
                </div>
                <p className="text-xs text-brand-muted">{v.serviceName}</p>
                <p className="mt-1 text-xs text-brand-muted">{formatRelativeTime(v.createdAt)}</p>
              </li>
            ))}
            {upcomingVisits.length === 0 && <p className="text-sm text-brand-muted">No upcoming visits.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
}
