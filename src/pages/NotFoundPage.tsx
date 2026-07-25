import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="container-narrow flex flex-col items-center py-24 text-center">
      <p className="font-display text-6xl font-bold text-brand-green">404</p>
      <h1 className="mt-2 text-xl font-medium text-brand-dark">Page not found</h1>
      <p className="mt-2 text-brand-muted">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
