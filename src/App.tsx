import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { AppointmentProvider } from "@/context/AppointmentContext";
import { PatientProvider } from "@/context/PatientContext";
import { HealthProvider } from "@/context/HealthContext";

import Index from "./pages/Index";
import DoctorsPage from "./pages/DoctorsPage";
import DoctorDetails from "./pages/DoctorDetails";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import PatientDashboard from "./pages/PatientDashboard";
import PatientProfile from "./pages/PatientProfile";
import MedicalRecords from "./pages/MedicalRecords";
import HealthTips from "./pages/HealthTips";
import ArticleDetail from "./pages/ArticleDetail";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetail from "./pages/ServiceDetail";
import HealthTracker from "./pages/HealthTracker";
import Prescriptions from "./pages/Prescriptions";
import OnlineConsultation from "./pages/OnlineConsultation";
import Gallery from "./pages/Gallery";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppointmentProvider>
        <PatientProvider>
          <HealthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />

              {/* ✅ Updated Router (warning fix) */}
              <BrowserRouter
                future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true,
                }}
              >
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/doctors" element={<DoctorsPage />} />
                  <Route path="/doctors/:id" element={<DoctorDetails />} />
                  <Route path="/book/:id" element={<BookAppointment />} />
                  <Route path="/my-appointments" element={<MyAppointments />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/patient-dashboard" element={<PatientDashboard />} />
                  <Route path="/profile" element={<PatientProfile />} />
                  <Route path="/medical-records" element={<MedicalRecords />} />
                  <Route path="/health-tips" element={<HealthTips />} />
                  <Route path="/health-tips/:slug" element={<ArticleDetail />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/health-tracker" element={<HealthTracker />} />
                  <Route path="/online-consultation" element={<OnlineConsultation />} />
                  <Route path="/prescriptions" element={<Prescriptions />} />
                  <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>

            </TooltipProvider>
          </HealthProvider>
        </PatientProvider>
      </AppointmentProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;