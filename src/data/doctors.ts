import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";
import doctor4 from "@/assets/doctor-4.jpg";
import doctor5 from "@/assets/doctor-5.jpg";
import doctor6 from "@/assets/doctor-6.jpg";
import doctor7 from "@/assets/doctor-7.jpg";
import doctor8 from "@/assets/doctor-8.jpg";
import doctor9 from "@/assets/doctor-9.jpg";
import doctor10 from "@/assets/doctor-10.jpg";
import doctor11 from "@/assets/doctor-11.jpg";
import doctor12 from "@/assets/doctor-12.jpg";

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  reviews: number;
  image: string;
  about: string;
  education: string;
  available: boolean;
  fee: number;
  slots: string[];
}

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. James Wilson",
    specialization: "Cardiologist",
    experience: 15,
    rating: 4.9,
    reviews: 234,
    image: doctor1,
    about: "Dr. Wilson is a board-certified cardiologist with over 15 years of experience in interventional cardiology. He specializes in heart disease prevention, diagnosis, and treatment.",
    education: "MD from Harvard Medical School",
    available: true,
    fee: 1200,
    slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"],
  },
  {
    id: "2",
    name: "Dr. Sarah Chen",
    specialization: "Dermatologist",
    experience: 10,
    rating: 4.8,
    reviews: 189,
    image: doctor2,
    about: "Dr. Chen specializes in medical and cosmetic dermatology. She treats conditions ranging from acne and eczema to skin cancer screening.",
    education: "MD from Stanford University",
    available: true,
    fee: 900,
    slots: ["09:30 AM", "10:30 AM", "11:30 AM", "01:00 PM", "02:30 PM"],
  },
  {
    id: "3",
    name: "Dr. Rajesh Patel",
    specialization: "Orthopedic Surgeon",
    experience: 18,
    rating: 4.9,
    reviews: 312,
    image: doctor3,
    about: "Dr. Patel is an expert orthopedic surgeon specializing in sports injuries, joint replacements, and minimally invasive surgical techniques.",
    education: "MD from AIIMS, Fellowship at Mayo Clinic",
    available: true,
    fee: 1500,
    slots: ["08:00 AM", "09:00 AM", "10:00 AM", "01:00 PM", "02:00 PM"],
  },
  {
    id: "4",
    name: "Dr. Amara Johnson",
    specialization: "Pediatrician",
    experience: 12,
    rating: 4.7,
    reviews: 276,
    image: doctor4,
    about: "Dr. Johnson is a compassionate pediatrician dedicated to providing comprehensive care for children from birth through adolescence.",
    education: "MD from Johns Hopkins University",
    available: true,
    fee: 800,
    slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"],
  },
  {
    id: "5",
    name: "Dr. Wei Zhang",
    specialization: "Neurologist",
    experience: 20,
    rating: 4.9,
    reviews: 198,
    image: doctor5,
    about: "Dr. Zhang is a leading neurologist specializing in headaches, epilepsy, stroke, and neurodegenerative disorders.",
    education: "MD from Peking University, Fellowship at UCLA",
    available: false,
    fee: 1400,
    slots: ["10:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"],
  },
  {
    id: "6",
    name: "Dr. Emily Roberts",
    specialization: "Gynecologist",
    experience: 14,
    rating: 4.8,
    reviews: 245,
    image: doctor6,
    about: "Dr. Roberts provides comprehensive women's health services including prenatal care, family planning, and minimally invasive surgery.",
    education: "MD from Columbia University",
    available: true,
    fee: 1100,
    slots: ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM"],
  },
  {
    id: "7",
    name: "Dr. Michael Torres",
    specialization: "General Physician",
    experience: 22,
    rating: 4.6,
    reviews: 420,
    image: doctor7,
    about: "Dr. Torres is a seasoned general physician providing primary care, preventive medicine, and chronic disease management.",
    education: "MD from University of Pennsylvania",
    available: true,
    fee: 600,
    slots: ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"],
  },
  {
    id: "8",
    name: "Dr. Fatima Al-Hassan",
    specialization: "Psychiatrist",
    experience: 11,
    rating: 4.8,
    reviews: 167,
    image: doctor8,
    about: "Dr. Al-Hassan specializes in mental health, offering therapy and medication management for anxiety, depression, PTSD, and other conditions.",
    education: "MD from University of Toronto",
    available: true,
    fee: 1300,
    slots: ["10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"],
  },
  {
    id: "9",
    name: "Dr. Lucas Meyer",
    specialization: "Oncologist",
    experience: 17,
    rating: 4.9,
    reviews: 201,
    image: doctor9,
    about: "Dr. Meyer specializes in medical oncology with a focus on personalized cancer treatment plans and immunotherapy.",
    education: "MD from Charité Berlin, Fellowship at MSKCC",
    available: true,
    fee: 1800,
    slots: ["09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM"],
  },
  {
    id: "10",
    name: "Dr. Priya Nair",
    specialization: "Ophthalmologist",
    experience: 9,
    rating: 4.8,
    reviews: 158,
    image: doctor10,
    about: "Dr. Nair offers comprehensive eye care including LASIK, cataract surgery, and pediatric ophthalmology.",
    education: "MD from AIIMS, Fellowship at Moorfields London",
    available: true,
    fee: 1000,
    slots: ["09:30 AM", "11:00 AM", "12:30 PM", "02:30 PM", "04:00 PM"],
  },
  {
    id: "11",
    name: "Dr. Marcus Bell",
    specialization: "Dentist",
    experience: 13,
    rating: 4.7,
    reviews: 287,
    image: doctor11,
    about: "Dr. Bell provides cosmetic dentistry, implants, and family dental care with a gentle approach.",
    education: "DDS from NYU College of Dentistry",
    available: true,
    fee: 700,
    slots: ["08:30 AM", "09:30 AM", "10:30 AM", "01:00 PM", "02:00 PM", "03:00 PM"],
  },
  {
    id: "12",
    name: "Dr. Elena Rossi",
    specialization: "Endocrinologist",
    experience: 16,
    rating: 4.9,
    reviews: 173,
    image: doctor12,
    about: "Dr. Rossi specializes in diabetes, thyroid disorders, and hormonal imbalances with a holistic care approach.",
    education: "MD from University of Milan, Fellowship at Cleveland Clinic",
    available: true,
    fee: 1400,
    slots: ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM"],
  },
];

export const specializations = [
  "All",
  "Cardiologist",
  "Dermatologist",
  "Orthopedic Surgeon",
  "Pediatrician",
  "Neurologist",
  "Gynecologist",
  "General Physician",
  "Psychiatrist",
  "Oncologist",
  "Ophthalmologist",
  "Dentist",
  "Endocrinologist",
];
