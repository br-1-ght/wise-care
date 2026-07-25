import { lazy, Suspense } from "react";
import type { ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { Loader } from "../components/ui/Loader";

const HomePage = lazy(() => import("../pages/HomePage"));
const EmergencyDirectoryPage = lazy(() => import("../pages/EmergencyDirectoryPage"));
const HomeVisitBookingPage = lazy(() => import("../pages/HomeVisitBookingPage"));
const PhoneConsultationBookingPage = lazy(() => import("../pages/PhoneConsultationBookingPage"));
const HomeVisitTrackingPage = lazy(() => import("../pages/HomeVisitTrackingPage"));
const PhoneWaitingRoomPage = lazy(() => import("../pages/PhoneWaitingRoomPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const ProvidersPage = lazy(() => import("../pages/ProvidersPage"));
const FaqPage = lazy(() => import("../pages/FaqPage"));
const PrivacyPage = lazy(() => import("../pages/PrivacyPage"));
const TermsPage = lazy(() => import("../pages/TermsPage"));
const CookiesPage = lazy(() => import("../pages/CookiesPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const CareersPage = lazy(() => import("../pages/CareersPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

function withSuspense(node: ReactNode) {
  return <Suspense fallback={<Loader label="Loading page" />}>{node}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: "emergency", element: withSuspense(<EmergencyDirectoryPage />) },
      { path: "book/home-visit", element: withSuspense(<HomeVisitBookingPage />) },
      { path: "book/phone-consultation", element: withSuspense(<PhoneConsultationBookingPage />) },
      { path: "track/home-visit", element: withSuspense(<HomeVisitTrackingPage />) },
      { path: "track/phone-consultation", element: withSuspense(<PhoneWaitingRoomPage />) },
      { path: "dashboard", element: withSuspense(<DashboardPage />) },
      { path: "providers", element: withSuspense(<ProvidersPage />) },
      { path: "faq", element: withSuspense(<FaqPage />) },
      { path: "privacy", element: withSuspense(<PrivacyPage />) },
      { path: "terms", element: withSuspense(<TermsPage />) },
      { path: "cookies", element: withSuspense(<CookiesPage />) },
      { path: "contact", element: withSuspense(<ContactPage />) },
      { path: "about", element: withSuspense(<AboutPage />) },
      { path: "careers", element: withSuspense(<CareersPage />) },
      { path: "*", element: withSuspense(<NotFoundPage />) },
    ],
  },
]);
