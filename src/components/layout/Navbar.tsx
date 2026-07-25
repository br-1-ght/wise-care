import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Siren, CalendarPlus } from "lucide-react";
import { Drawer } from "../ui/Drawer";
import { Button } from "../ui/Button";
import { NAV_LINKS } from "../../constants";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-white/10 bg-brand-dark px-4 sm:px-6">
      <div className="container-page flex h-16 items-center justify-between px-0">
        <Link to="/" className="font-display text-xl font-bold text-white" aria-label="Wise Care home">
          Wise<span className="text-brand-gold">Care</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-7">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `text-sm text-white/70 transition-colors hover:text-white ${isActive ? "text-white" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => navigate("/emergency")}
            className="hidden items-center gap-1.5 rounded-full bg-brand-red px-3.5 py-1.5 text-xs font-medium text-white hover:bg-red-700 sm:inline-flex"
          >
            <Siren className="h-3.5 w-3.5" aria-hidden="true" />
            Emergency
          </button>
          <Button size="sm" onClick={() => navigate("/book/home-visit")} className="hidden sm:inline-flex">
            <CalendarPlus className="h-4 w-4" aria-hidden="true" />
            Book Now
          </Button>
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="rounded-md p-2 text-white lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} side="right">
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-brand-text hover:bg-brand-green-pale"
            >
              {link.label}
            </Link>
          ))}
          <hr className="my-2 border-brand-border" />
          <Button
            variant="danger"
            onClick={() => {
              setMenuOpen(false);
              navigate("/emergency");
            }}
          >
            <Siren className="h-4 w-4" /> Emergency Numbers
          </Button>
          <Button
            onClick={() => {
              setMenuOpen(false);
              navigate("/book/home-visit");
            }}
          >
            Book Now
          </Button>
        </nav>
      </Drawer>
    </header>
  );
}
