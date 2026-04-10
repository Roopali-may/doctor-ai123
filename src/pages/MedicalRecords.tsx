import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { usePatient, MedicalRecord } from "@/context/PatientContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { FileText, Plus, Trash2, Download, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

const recordTypeLabels: Record<MedicalRecord["type"], { label: string; color: string }> = {
  prescription: { label: "Prescription", color: "bg-primary/10 text-primary border-primary/20" },
  lab_report: { label: "Lab Report", color: "bg-success/10 text-success border-success/20" },
  imaging: { label: "Imaging", color: "bg-warning/10 text-warning border-warning/20" },
  discharge_summary: { label: "Discharge Summary", color: "bg-accent text-accent-foreground" },
  other: { label: "Other", color: "bg-muted text-muted-foreground" },
};

const MedicalRecords = () => {
  const { medicalRecords, addMedicalRecord, deleteMedicalRecord } = usePatient();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    type: "prescription" as MedicalRecord["type"],
    title: "",
    date: new Date().toISOString().split("T")[0],
    doctorName: "",
    notes: "",
    fileName: "",
    patientId: "p-1",
  });

  const filtered = medicalRecords.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.doctorName.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || r.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAdd = () => {
    if (!newRecord.title || !newRecord.doctorName) {
      toast.error("Please fill in required fields.");
      return;
    }
    addMedicalRecord({ ...newRecord, fileName: newRecord.fileName || `${newRecord.title.toLowerCase().replace(/\s+/g, "_")}.pdf` });
    toast.success("Medical record added!");
    setDialogOpen(false);
    setNewRecord({ type: "prescription", title: "", date: new Date().toISOString().split("T")[0], doctorName: "", notes: "", fileName: "", patientId: "p-1" });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Medical Records</h1>
            <p className="mt-1 text-muted-foreground">View and manage your medical documents</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" /> Add Record</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>Add Medical Record</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Record Type</Label>
                  <Select value={newRecord.type} onValueChange={(v) => setNewRecord({ ...newRecord, type: v as MedicalRecord["type"] })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(recordTypeLabels).map(([key, val]) => (
                        <SelectItem key={key} value={key}>{val.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Title *</Label><Input value={newRecord.title} onChange={(e) => setNewRecord({ ...newRecord, title: e.target.value })} className="mt-1" placeholder="e.g., Blood Test Results" /></div>
                <div><Label>Date</Label><Input type="date" value={newRecord.date} onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })} className="mt-1" /></div>
                <div><Label>Doctor Name *</Label><Input value={newRecord.doctorName} onChange={(e) => setNewRecord({ ...newRecord, doctorName: e.target.value })} className="mt-1" placeholder="Dr. Smith" /></div>
                <div><Label>Notes</Label><Textarea value={newRecord.notes} onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })} className="mt-1" placeholder="Additional notes..." /></div>
                <div>
                  <Label>File Upload</Label>
                  <div className="mt-1 rounded-lg border-2 border-dashed bg-muted/30 p-6 text-center">
                    <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Drag & drop or click to upload</p>
                    <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
                    <Button variant="outline" size="sm" className="mt-3">Choose File</Button>
                  </div>
                </div>
                <Button onClick={handleAdd} className="w-full">Add Record</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search records..." className="pl-10" />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-48"><Filter className="mr-2 h-4 w-4" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.entries(recordTypeLabels).map(([key, val]) => (
                <SelectItem key={key} value={key}>{val.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Records List */}
        <div className="mt-6 space-y-4">
          {filtered.length === 0 && (
            <div className="rounded-xl border bg-card p-10 text-center shadow-card">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-3 text-muted-foreground">No medical records found</p>
            </div>
          )}
          {filtered.map((record, i) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border bg-card p-5 shadow-card transition-all hover:shadow-card-hover"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">{record.title}</h3>
                    <p className="text-sm text-muted-foreground">{record.doctorName} · {record.date}</p>
                    {record.notes && <p className="mt-1 text-sm text-muted-foreground">{record.notes}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={recordTypeLabels[record.type].color}>
                    {recordTypeLabels[record.type].label}
                  </Badge>
                  <Button size="icon" variant="ghost" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => { deleteMedicalRecord(record.id); toast.success("Record deleted"); }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default MedicalRecords;
