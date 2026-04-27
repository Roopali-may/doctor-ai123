import {
  Stethoscope,
  HeartPulse,
  Video,
  ShieldCheck,
  Microscope,
  Pill,
  Ambulance,
  Baby,
  Brain,
  Activity,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  long: string;
  features: string[];
  benefits: string[];
  color: string;
}

export const services: Service[] = [
  {
    slug: "consultation",
    icon: Stethoscope,
    title: "Consultation",
    desc: "Expert doctors available for in-person and virtual consultations.",
    long: "Get personalized medical advice from board-certified specialists across 12+ specializations. Book in-clinic visits or video consultations at your convenience.",
    features: ["500+ verified specialists", "Same-day appointments", "Detailed medical history review", "Follow-up care included"],
    benefits: ["Save travel time", "Choose your preferred doctor", "Digital prescription delivery", "Insurance accepted"],
    color: "from-primary/20 to-primary/5",
  },
  {
    slug: "emergency-care",
    icon: HeartPulse,
    title: "Emergency Care",
    desc: "24/7 emergency services with rapid response medical teams.",
    long: "Round-the-clock emergency care backed by trauma specialists, advanced life support ambulances, and fully equipped emergency rooms.",
    features: ["24/7 availability", "Average 8-minute response", "Trauma certified staff", "Advanced ICU backup"],
    benefits: ["Life-saving intervention", "Direct ER admission", "Family notification system", "Continuous monitoring"],
    color: "from-destructive/20 to-destructive/5",
  },
  {
    slug: "telemedicine",
    icon: Video,
    title: "Online Care",
    desc: "Connect with doctors from home through secure video calls.",
    long: "Secure HIPAA-compliant video consultations from any device. Perfect for follow-ups, minor concerns, prescription renewals, and second opinions.",
    features: ["HD video & audio", "End-to-end encrypted", "Multi-device support", "Recorded for your records"],
    benefits: ["No travel required", "Lower consultation fees", "Reduce exposure risk", "Available evenings & weekends"],
    color: "from-primary/20 to-primary/5",
  },
  {
    slug: "health-checkup",
    icon: ShieldCheck,
    title: "Health Checkup",
    desc: "Comprehensive health screening and preventive care packages.",
    long: "Catch health issues early with full-body screening packages tailored to your age, gender, and risk factors.",
    features: ["50+ test parameters", "Same-day reports", "Specialist consultation", "Personalized health report"],
    benefits: ["Early disease detection", "Custom health roadmap", "Family packages available", "Annual reminders"],
    color: "from-success/20 to-success/5",
  },
  {
    slug: "diagnostics",
    icon: Microscope,
    title: "Lab & Diagnostics",
    desc: "NABL-accredited labs offering full diagnostic test panels.",
    long: "Access pathology, radiology, and imaging services with home sample collection and digital report delivery.",
    features: ["Home sample collection", "NABL accredited labs", "Digital reports in 24h", "MRI, CT, X-Ray, ECG"],
    benefits: ["Convenient scheduling", "Trusted accuracy", "Doctor interpretation", "Affordable packages"],
    color: "from-warning/20 to-warning/5",
  },
  {
    slug: "pharmacy",
    icon: Pill,
    title: "Online Pharmacy",
    desc: "Genuine medicines delivered to your doorstep with discounts.",
    long: "Order prescription and OTC medicines online with verified authenticity, fast delivery, and exclusive savings.",
    features: ["100% genuine medicines", "Up to 30% off", "Same-day delivery", "Auto-refill subscriptions"],
    benefits: ["Skip the pharmacy queue", "Refill reminders", "Insurance billing", "Pharmacist consultation"],
    color: "from-success/20 to-success/5",
  },
  {
    slug: "ambulance",
    icon: Ambulance,
    title: "Ambulance Service",
    desc: "GPS-tracked ambulances with paramedic support 24/7.",
    long: "Advanced life support and basic life support ambulances dispatched in minutes with real-time GPS tracking.",
    features: ["BLS & ALS units", "GPS tracked", "Trained paramedics", "Direct hospital coordination"],
    benefits: ["Fastest response", "Real-time updates to family", "Inter-city transfers", "Insurance support"],
    color: "from-destructive/20 to-destructive/5",
  },
  {
    slug: "maternity",
    icon: Baby,
    title: "Maternity Care",
    desc: "Complete prenatal, delivery, and postnatal care packages.",
    long: "Compassionate end-to-end care for expecting mothers including ultrasounds, birthing classes, and newborn care.",
    features: ["Prenatal monitoring", "Birthing plan support", "Lactation consultants", "Postnatal checkups"],
    benefits: ["Holistic motherhood support", "Modern birthing suites", "Newborn immunization", "Mental wellness"],
    color: "from-warning/20 to-warning/5",
  },
  {
    slug: "mental-health",
    icon: Brain,
    title: "Mental Wellness",
    desc: "Confidential therapy and psychiatric care for all ages.",
    long: "Connect with licensed therapists and psychiatrists for anxiety, depression, relationship counseling, and more—online or in person.",
    features: ["Licensed therapists", "Anonymous booking", "Group therapy options", "Crisis support hotline"],
    benefits: ["Judgment-free space", "Flexible scheduling", "Insurance accepted", "Sliding scale fees"],
    color: "from-primary/20 to-primary/5",
  },
  {
    slug: "physiotherapy",
    icon: Activity,
    title: "Physiotherapy",
    desc: "Recovery and rehabilitation by certified physiotherapists.",
    long: "Personalized physiotherapy for sports injuries, post-surgical recovery, chronic pain, and mobility improvement.",
    features: ["Custom recovery plans", "Sports rehab specialists", "Home visits available", "Modern equipment"],
    benefits: ["Faster recovery", "Pain management", "Improved mobility", "Injury prevention"],
    color: "from-success/20 to-success/5",
  },
];
