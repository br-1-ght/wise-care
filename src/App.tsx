import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { queryClient } from "./services/queryClient";
import { router } from "./routes/router";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: { fontFamily: "'DM Sans', sans-serif", fontSize: "14px" },
          success: { iconTheme: { primary: "#0A5C36", secondary: "#fff" } },
        }}
      />
    </QueryClientProvider>
  );
}
