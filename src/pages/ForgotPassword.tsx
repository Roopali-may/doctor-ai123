import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const ForgotPassword = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Reset link sent to your email!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-elevated">
        <div className="mb-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold">MediCare</span>
          </Link>
          <h1 className="mt-4 font-heading text-2xl font-bold">Reset Password</h1>
          <p className="mt-1 text-sm text-muted-foreground">Enter your email to receive a reset link</p>
        </div>
        {sent ? (
          <div className="text-center">
            <p className="text-sm text-success">Check your email for the reset link.</p>
            <Link to="/login"><Button className="mt-4" variant="outline">Back to Login</Button></Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input type="email" required className="mt-1" placeholder="you@example.com" />
            </div>
            <Button type="submit" className="w-full" size="lg">Send Reset Link</Button>
            <div className="text-center">
              <Link to="/login" className="text-sm text-muted-foreground hover:text-primary">Back to Login</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
