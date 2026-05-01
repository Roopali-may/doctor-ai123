import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Send, MessageSquare, HelpCircle, ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Message sent! We'll get back to you shortly.");
  };

  const faqs = [
    { q: "How do I book an appointment?", a: "Browse our doctors page, select a doctor, choose an available time slot, and fill in your details." },
    { q: "Can I cancel my appointment?", a: "Yes, you can cancel any pending appointment from the My Appointments page." },
    { q: "Is online consultation available?", a: "Yes, many of our doctors offer video consultations. Look for the 'Online Care' badge." },
    { q: "What payment methods are accepted?", a: "We accept credit cards, debit cards, insurance, and digital wallets." },
    { q: "How do I contact my doctor?", a: "After booking, you can message your doctor through the patient dashboard." },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="font-heading text-3xl font-bold">Contact Us</h1>
        <p className="mt-2 text-muted-foreground">We'd love to hear from you. Reach out anytime.</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6 shadow-card">
              <div>
                <Label>Name</Label>
                <Input required className="mt-1" placeholder="Your name" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" required className="mt-1" placeholder="your@email.com" />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea required className="mt-1" rows={5} placeholder="How can we help?" />
              </div>
              <Button type="submit" className="w-full gap-2">
                <Send className="h-4 w-4" /> Send Message
              </Button>
              {submitted && <p className="text-sm text-success">Thank you! We'll respond within 24 hours.</p>}
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <h2 className="font-heading text-xl font-semibold">Get in Touch</h2>
              <div className="mt-4 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">contact@medicare.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">123 Health Avenue, Medical City, MC 12345</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-card">
              <h2 className="font-heading text-xl font-semibold">Working Hours</h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Monday - Friday</span><span className="font-medium">8:00 AM - 8:00 PM</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Saturday</span><span className="font-medium">9:00 AM - 5:00 PM</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Sunday</span><span className="font-medium">10:00 AM - 2:00 PM</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Emergency</span><span className="font-medium text-destructive">24/7 Available</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-center font-heading text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="mx-auto mt-8 max-w-2xl">
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-heading">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
