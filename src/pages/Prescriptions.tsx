import MainLayout from "@/layouts/MainLayout";
import { useHealth } from "@/context/HealthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Pill, Calendar } from "lucide-react";
import { toast } from "sonner";

const Prescriptions = () => {
  const { prescriptions } = useHealth();

  const downloadPdf = (id: string) => {
    // Lightweight printable view
    const rx = prescriptions.find((p) => p.id === id);
    if (!rx) return;
    const html = `
      <html><head><title>Prescription ${rx.id}</title>
      <style>body{font-family:sans-serif;padding:32px;color:#111}h1{color:#0a73d6}table{width:100%;border-collapse:collapse;margin-top:12px}td,th{border:1px solid #ddd;padding:8px;text-align:left}</style>
      </head><body>
      <h1>MediCare — Prescription</h1>
      <p><strong>Date:</strong> ${rx.date}</p>
      <p><strong>Doctor:</strong> ${rx.doctorName}</p>
      <p><strong>Diagnosis:</strong> ${rx.diagnosis}</p>
      <table><tr><th>Medicine</th><th>Dosage</th><th>Frequency</th><th>Duration</th></tr>
      ${rx.medicines.map((m) => `<tr><td>${m.name}</td><td>${m.dosage}</td><td>${m.frequency}</td><td>${m.duration}</td></tr>`).join("")}
      </table>
      ${rx.nextVisit ? `<p style="margin-top:16px"><strong>Next visit:</strong> ${rx.nextVisit}</p>` : ""}
      ${rx.notes ? `<p><strong>Notes:</strong> ${rx.notes}</p>` : ""}
      </body></html>`;
    const w = window.open("", "_blank");
    if (w) {
      w.document.write(html);
      w.document.close();
      w.print();
      toast.success("Prescription opened for printing");
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="font-heading text-3xl font-bold">Reports & Prescriptions</h1>
        <p className="mt-1 text-muted-foreground">View, download, and track your treatment history</p>

        <div className="mt-8 grid gap-5">
          {prescriptions.map((rx) => (
            <Card key={rx.id} className="shadow-card transition-shadow hover:shadow-card-hover">
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-primary" />
                    {rx.diagnosis}
                  </CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {rx.doctorName} • {rx.date}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => downloadPdf(rx.id)} className="gap-2">
                  <Download className="h-4 w-4" /> PDF
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {rx.medicines.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Pill className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{m.name} <span className="text-sm text-muted-foreground">— {m.dosage}</span></p>
                        <p className="text-xs text-muted-foreground">{m.frequency} • {m.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {rx.nextVisit && (
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-success" />
                    <span>Next visit: <strong>{rx.nextVisit}</strong></span>
                    <Badge className="ml-2 bg-success/10 text-success">Scheduled</Badge>
                  </div>
                )}
                {rx.notes && (
                  <p className="mt-3 rounded-lg bg-accent/50 p-3 text-sm text-accent-foreground">
                    📝 {rx.notes}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Prescriptions;
