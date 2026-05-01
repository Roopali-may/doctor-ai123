import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Menu,
  X,
  User,
  LogOut,
  Calendar,
  LayoutDashboard,
  FileText,
  Activity,
  Pill,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/doctors", label: "Doctors" },
    { to: "/online-consultation", label: "Online Consult" },
    { to: "/health-tips", label: "Health Tips" },
    { to: "/contact", label: "Contact" },
  ];

  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.role === "admin") return "/admin";
    if (user.role === "doctor") return "/doctor-dashboard";
    return "/patient-dashboard";
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold text-foreground">MediCare</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <Link to="/my-appointments">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Appointments
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    {user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to={getDashboardLink()} className="flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === "patient" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/health-tracker" className="flex items-center gap-2">
                          <Activity className="h-4 w-4" />
                          Health Tracker
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/prescriptions" className="flex items-center gap-2">
                          <Pill className="h-4 w-4" />
                          Prescriptions
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/medical-records" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Medical Records
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-destructive">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
              <Link to="/signup"><Button size="sm">Sign Up</Button></Link>
            </>
          )}
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t bg-card px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium ${
                  isActive(link.to) ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link to="/my-appointments" onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground">My Appointments</Link>
                <Link to={getDashboardLink()} onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground">Dashboard</Link>
                {user?.role === "patient" && (
                  <>
                    <Link to="/profile" onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground">My Profile</Link>
                    <Link to="/medical-records" onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground">Medical Records</Link>
                  </>
                )}
                <button onClick={() => { logout(); setMobileOpen(false); }} className="rounded-lg px-4 py-2.5 text-left text-sm font-medium text-destructive">Logout</button>
              </>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1"><Button variant="outline" className="w-full" size="sm">Log in</Button></Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="flex-1"><Button className="w-full" size="sm">Sign Up</Button></Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
