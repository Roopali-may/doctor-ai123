import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <Link to="/" className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold">MediCare</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Your trusted healthcare partner. Quality medical services for you and your family.
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-heading font-semibold">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/doctors" className="hover:text-primary">Find a Doctor</Link>
            <Link to="/contact" className="hover:text-primary">Contact Us</Link>
            <Link to="/login" className="hover:text-primary">Patient Login</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-heading font-semibold">Services</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>Consultation</span>
            <span>Emergency Care</span>
            <span>Online Appointments</span>
            <span>Lab Tests</span>
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-heading font-semibold">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +1 (555) 123-4567</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> contact@medicare.com</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> 123 Health Ave, Medical City</span>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
        © 2026 MediCare. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
