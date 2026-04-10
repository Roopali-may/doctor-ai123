import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, CheckCircle, Wallet } from "lucide-react";
import { toast } from "sonner";

interface PaymentFormProps {
  amount: number;
  doctorName: string;
  onPaymentComplete: () => void;
  onBack: () => void;
}

const PaymentForm = ({ amount, doctorName, onPaymentComplete, onBack }: PaymentFormProps) => {
  const [method, setMethod] = useState<"card" | "upi" | "wallet">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const handlePay = () => {
    if (method === "card" && (!cardNumber || !expiry || !cvv || !cardName)) {
      toast.error("Please fill in all card details.");
      return;
    }
    if (method === "upi" && !upiId) {
      toast.error("Please enter your UPI ID.");
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onPaymentComplete();
    }, 2000);
  };

  const paymentMethods = [
    { id: "card" as const, label: "Credit/Debit Card", icon: CreditCard },
    { id: "upi" as const, label: "UPI Payment", icon: Wallet },
    { id: "wallet" as const, label: "Digital Wallet", icon: Wallet },
  ];

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="rounded-xl border bg-accent/30 p-5">
        <h3 className="font-heading font-semibold">Payment Summary</h3>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Consultation Fee</span><span>${amount}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Platform Fee</span><span>$2.00</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>${(amount * 0.05).toFixed(2)}</span></div>
          <div className="border-t pt-2 mt-2 flex justify-between font-heading font-bold text-base">
            <span>Total</span><span>${(amount + 2 + amount * 0.05).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment Method Selector */}
      <div>
        <h3 className="font-heading font-semibold">Select Payment Method</h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {paymentMethods.map((pm) => (
            <button
              key={pm.id}
              onClick={() => setMethod(pm.id)}
              className={`flex items-center gap-2 rounded-lg border p-3 text-sm font-medium transition-all ${
                method === pm.id ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              <pm.icon className="h-4 w-4" />
              {pm.label}
            </button>
          ))}
        </div>
      </div>

      {/* Card Form */}
      {method === "card" && (
        <div className="space-y-4 rounded-xl border bg-card p-5 shadow-card">
          <div>
            <Label>Cardholder Name</Label>
            <Input value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="John Doe" className="mt-1" />
          </div>
          <div>
            <Label>Card Number</Label>
            <div className="relative">
              <Input
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                className="mt-1 pl-10"
                maxLength={19}
              />
              <CreditCard className="absolute left-3 top-1/2 mt-0.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Expiry Date</Label>
              <Input value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" className="mt-1" maxLength={5} />
            </div>
            <div>
              <Label>CVV</Label>
              <Input type="password" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="•••" className="mt-1" maxLength={4} />
            </div>
          </div>
        </div>
      )}

      {/* UPI Form */}
      {method === "upi" && (
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <Label>UPI ID</Label>
          <Input value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="yourname@upi" className="mt-1" />
          <p className="mt-2 text-xs text-muted-foreground">Enter your UPI ID linked with any bank account</p>
        </div>
      )}

      {/* Wallet */}
      {method === "wallet" && (
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <div className="space-y-2">
            {["Google Pay", "Apple Pay", "PayPal"].map((w) => (
              <button key={w} className="flex w-full items-center gap-3 rounded-lg border p-3 text-sm font-medium transition-all hover:border-primary/50 hover:bg-primary/5">
                <Wallet className="h-4 w-4 text-primary" />
                {w}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Security Note */}
      <div className="flex items-center gap-2 rounded-lg bg-success/5 p-3 text-sm text-success">
        <Lock className="h-4 w-4" />
        <span>Your payment is secured with 256-bit SSL encryption</span>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={handlePay} disabled={processing} className="flex-1">
          {processing ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Processing...
            </span>
          ) : (
            <>Pay ${(amount + 2 + amount * 0.05).toFixed(2)}</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PaymentForm;
