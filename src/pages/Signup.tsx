import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, User as UserIcon, Stethoscope, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("patient");
  const [submitting, setSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signup(name, email, password, role);
      toast.success("Account created successfully!");
      navigate(role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard");
    } catch (err: any) {
      toast.error(err?.message || "Signup failed. Make sure the backend is running.");
    } finally {
      setSubmitting(false);
    }
  };

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
          <h1 className="mt-4 font-heading text-2xl font-bold">Create Account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Join MediCare today</p>
        </div>

        <Tabs value={role} onValueChange={(v) => setRole(v as UserRole)} className="mb-5">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="patient" className="gap-1.5"><UserIcon className="h-4 w-4" />Patient</TabsTrigger>
            <TabsTrigger value="doctor" className="gap-1.5"><Stethoscope className="h-4 w-4" />Doctor</TabsTrigger>
          </TabsList>
        </Tabs>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1" placeholder="John Doe" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1" placeholder="you@example.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1" placeholder="At least 6 characters" minLength={6} />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={submitting}>
            {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating…</> : "Create Account"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
