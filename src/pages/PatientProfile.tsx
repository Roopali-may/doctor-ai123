import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { usePatient } from "@/context/PatientContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { User, Heart, Shield, Phone, MapPin, AlertTriangle, Save, Edit, X, Plus } from "lucide-react";
import { motion } from "framer-motion";

const PatientProfile = () => {
  const { profile, updateProfile } = usePatient();
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile!);
  const [newAllergy, setNewAllergy] = useState("");
  const [newCondition, setNewCondition] = useState("");
  const [newMedication, setNewMedication] = useState("");

  if (!profile) return null;

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
    toast.success("Profile updated successfully!");
  };

  const addItem = (field: "allergies" | "chronicConditions" | "currentMedications", value: string, setter: (v: string) => void) => {
    if (value.trim()) {
      setForm((prev) => ({ ...prev, [field]: [...prev[field], value.trim()] }));
      setter("");
    }
  };

  const removeItem = (field: "allergies" | "chronicConditions" | "currentMedications", index: number) => {
    setForm((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  const sections = [
    {
      title: "Personal Information",
      icon: User,
      fields: (
        <div className="grid gap-4 sm:grid-cols-2">
          <div><Label>Full Name</Label><Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} disabled={!editing} className="mt-1" /></div>
          <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={!editing} className="mt-1" /></div>
          <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} disabled={!editing} className="mt-1" /></div>
          <div><Label>Date of Birth</Label><Input type="date" value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} disabled={!editing} className="mt-1" /></div>
          <div>
            <Label>Gender</Label>
            <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v as any })} disabled={!editing}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Blood Group</Label>
            <Select value={form.bloodGroup} onValueChange={(v) => setForm({ ...form, bloodGroup: v })} disabled={!editing}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                  <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div><Label>Height</Label><Input value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} disabled={!editing} className="mt-1" /></div>
          <div><Label>Weight</Label><Input value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} disabled={!editing} className="mt-1" /></div>
        </div>
      ),
    },
    {
      title: "Address",
      icon: MapPin,
      fields: (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><Label>Street Address</Label><Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} disabled={!editing} className="mt-1" /></div>
          <div><Label>City</Label><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} disabled={!editing} className="mt-1" /></div>
          <div><Label>State</Label><Input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} disabled={!editing} className="mt-1" /></div>
          <div><Label>Zip Code</Label><Input value={form.zipCode} onChange={(e) => setForm({ ...form, zipCode: e.target.value })} disabled={!editing} className="mt-1" /></div>
        </div>
      ),
    },
    {
      title: "Emergency Contact",
      icon: Phone,
      fields: (
        <div className="grid gap-4 sm:grid-cols-2">
          <div><Label>Contact Name</Label><Input value={form.emergencyContactName} onChange={(e) => setForm({ ...form, emergencyContactName: e.target.value })} disabled={!editing} className="mt-1" /></div>
          <div><Label>Contact Phone</Label><Input value={form.emergencyContactPhone} onChange={(e) => setForm({ ...form, emergencyContactPhone: e.target.value })} disabled={!editing} className="mt-1" /></div>
          <div><Label>Relationship</Label><Input value={form.emergencyContactRelation} onChange={(e) => setForm({ ...form, emergencyContactRelation: e.target.value })} disabled={!editing} className="mt-1" /></div>
        </div>
      ),
    },
    {
      title: "Medical Information",
      icon: Heart,
      fields: (
        <div className="space-y-6">
          {/* Allergies */}
          <div>
            <Label className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /> Allergies</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {form.allergies.map((a, i) => (
                <Badge key={i} variant="outline" className="gap-1 border-warning/30 bg-warning/5 text-warning">
                  {a} {editing && <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem("allergies", i)} />}
                </Badge>
              ))}
              {form.allergies.length === 0 && <span className="text-sm text-muted-foreground">None reported</span>}
            </div>
            {editing && (
              <div className="mt-2 flex gap-2">
                <Input value={newAllergy} onChange={(e) => setNewAllergy(e.target.value)} placeholder="Add allergy..." className="max-w-xs" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addItem("allergies", newAllergy, setNewAllergy))} />
                <Button size="sm" variant="outline" onClick={() => addItem("allergies", newAllergy, setNewAllergy)}><Plus className="h-4 w-4" /></Button>
              </div>
            )}
          </div>
          {/* Chronic Conditions */}
          <div>
            <Label>Chronic Conditions</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {form.chronicConditions.map((c, i) => (
                <Badge key={i} variant="outline" className="gap-1">
                  {c} {editing && <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem("chronicConditions", i)} />}
                </Badge>
              ))}
              {form.chronicConditions.length === 0 && <span className="text-sm text-muted-foreground">None reported</span>}
            </div>
            {editing && (
              <div className="mt-2 flex gap-2">
                <Input value={newCondition} onChange={(e) => setNewCondition(e.target.value)} placeholder="Add condition..." className="max-w-xs" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addItem("chronicConditions", newCondition, setNewCondition))} />
                <Button size="sm" variant="outline" onClick={() => addItem("chronicConditions", newCondition, setNewCondition)}><Plus className="h-4 w-4" /></Button>
              </div>
            )}
          </div>
          {/* Medications */}
          <div>
            <Label>Current Medications</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {form.currentMedications.map((m, i) => (
                <Badge key={i} variant="outline" className="gap-1 border-primary/30 bg-primary/5 text-primary">
                  {m} {editing && <X className="h-3 w-3 cursor-pointer" onClick={() => removeItem("currentMedications", i)} />}
                </Badge>
              ))}
              {form.currentMedications.length === 0 && <span className="text-sm text-muted-foreground">None reported</span>}
            </div>
            {editing && (
              <div className="mt-2 flex gap-2">
                <Input value={newMedication} onChange={(e) => setNewMedication(e.target.value)} placeholder="Add medication..." className="max-w-xs" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addItem("currentMedications", newMedication, setNewMedication))} />
                <Button size="sm" variant="outline" onClick={() => addItem("currentMedications", newMedication, setNewMedication)}><Plus className="h-4 w-4" /></Button>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Insurance Information",
      icon: Shield,
      fields: (
        <div className="grid gap-4 sm:grid-cols-2">
          <div><Label>Insurance Provider</Label><Input value={form.insuranceProvider} onChange={(e) => setForm({ ...form, insuranceProvider: e.target.value })} disabled={!editing} className="mt-1" /></div>
          <div><Label>Policy Number</Label><Input value={form.insurancePolicyNumber} onChange={(e) => setForm({ ...form, insurancePolicyNumber: e.target.value })} disabled={!editing} className="mt-1" /></div>
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">My Profile</h1>
            <p className="mt-1 text-muted-foreground">Manage your personal and medical information</p>
          </div>
          {editing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { setForm(profile); setEditing(false); }}><X className="mr-2 h-4 w-4" /> Cancel</Button>
              <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
            </div>
          ) : (
            <Button onClick={() => setEditing(true)}><Edit className="mr-2 h-4 w-4" /> Edit Profile</Button>
          )}
        </div>

        <div className="mt-8 space-y-6">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border bg-card p-6 shadow-card"
            >
              <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold">
                <section.icon className="h-5 w-5 text-primary" />
                {section.title}
              </h2>
              {section.fields}
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default PatientProfile;
