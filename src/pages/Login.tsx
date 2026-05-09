import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Heart, User as UserIcon, Stethoscope, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

const roleMeta: Record<UserRole, { label: string; icon: any; hint: string }> = {
  patient: { label: "Patient", icon: UserIcon, hint: "Book appointments & track health" },
  doctor: { label: "Doctor", icon: Stethoscope, hint: "Manage your schedule & patients" },
  admin: { label: "Admin", icon: ShieldCheck, hint: "Manage the clinic" },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("patient");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const user = await login(email, password, role);
      toast.success(`Welcome back, ${roleMeta[user.role].label}!`);
      navigate(user.role === "admin" ? "/admin" : user.role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard");
    } catch (err: any) {
      toast.error(err?.message || "Login failed. Check your credentials and that the backend is running.");
    } finally {
      setSubmitting(false);
    }
  };

  const Meta = roleMeta[role];
  const Icon = Meta.icon;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-elevated">
        <div className="mb-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold">MediCare</span>
          </Link>
          <h1 className="mt-4 font-heading text-2xl font-bold">Welcome Back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Choose your role to continue</p>
        </div>

        <Tabs value={role} onValueChange={(v) => setRole(v as UserRole)} className="mb-5">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="patient" className="gap-1.5"><UserIcon className="h-4 w-4" />Patient</TabsTrigger>
            <TabsTrigger value="doctor" className="gap-1.5"><Stethoscope className="h-4 w-4" />Doctor</TabsTrigger>
            <TabsTrigger value="admin" className="gap-1.5"><ShieldCheck className="h-4 w-4" />Admin</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mb-4 flex items-center gap-2 rounded-lg bg-muted/60 p-3 text-sm">
          <Icon className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">{Meta.hint}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1" placeholder="you@example.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1" placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={submitting}>
            {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing in…</> : `Log in as ${Meta.label}`}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <Link to="/forgot-password" className="hover:text-primary">Forgot password?</Link>
        </div>
        <div className="mt-2 text-center text-sm text-muted-foreground">
          Don't have an account? <Link to="/signup" className="font-medium text-primary hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
