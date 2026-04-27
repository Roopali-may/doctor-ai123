import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { useHealth } from "@/context/HealthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Droplet, HeartPulse, Scale, Plus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from "recharts";
import { toast } from "sonner";

const HealthTracker = () => {
  const { vitals, addVital } = useHealth();
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    systolic: 120,
    diastolic: 80,
    sugar: 95,
    weight: 165,
    heartRate: 70,
  });

  const latest = vitals[vitals.length - 1];

  const tiles = [
    { label: "Blood Pressure", value: `${latest.systolic}/${latest.diastolic}`, unit: "mmHg", icon: HeartPulse, color: "bg-destructive/10 text-destructive" },
    { label: "Blood Sugar", value: latest.sugar, unit: "mg/dL", icon: Droplet, color: "bg-warning/10 text-warning" },
    { label: "Weight", value: latest.weight, unit: "lbs", icon: Scale, color: "bg-primary/10 text-primary" },
    { label: "Heart Rate", value: latest.heartRate, unit: "bpm", icon: Activity, color: "bg-success/10 text-success" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVital(form);
    toast.success("Vitals recorded successfully");
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="font-heading text-3xl font-bold">Health Tracker</h1>
        <p className="mt-1 text-muted-foreground">Monitor your vitals over time</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t) => (
            <Card key={t.label} className="shadow-card transition-shadow hover:shadow-card-hover">
              <CardContent className="p-5">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${t.color}`}>
                  <t.icon className="h-5 w-5" />
                </div>
                <p className="mt-3 font-heading text-2xl font-bold">
                  {t.value} <span className="text-sm font-normal text-muted-foreground">{t.unit}</span>
                </p>
                <p className="text-sm text-muted-foreground">{t.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-lg">Blood Pressure Trend</CardTitle></CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vitals}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Legend />
                  <Line type="monotone" dataKey="systolic" stroke="hsl(var(--destructive))" strokeWidth={2} />
                  <Line type="monotone" dataKey="diastolic" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-lg">Blood Sugar Trend</CardTitle></CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={vitals}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Area type="monotone" dataKey="sugar" stroke="hsl(38, 92%, 50%)" fill="hsl(38, 92%, 50%)" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-lg">Weight Trend</CardTitle></CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vitals}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={["dataMin - 2", "dataMax + 2"]} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Line type="monotone" dataKey="weight" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-lg">Heart Rate Trend</CardTitle></CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vitals}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Line type="monotone" dataKey="heartRate" stroke="hsl(var(--success))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Add reading */}
        <Card className="mt-8 shadow-card">
          <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Plus className="h-5 w-5" /> Log New Reading</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="sys">Systolic</Label>
                <Input id="sys" type="number" value={form.systolic} onChange={(e) => setForm({ ...form, systolic: +e.target.value })} />
              </div>
              <div>
                <Label htmlFor="dia">Diastolic</Label>
                <Input id="dia" type="number" value={form.diastolic} onChange={(e) => setForm({ ...form, diastolic: +e.target.value })} />
              </div>
              <div>
                <Label htmlFor="sugar">Sugar (mg/dL)</Label>
                <Input id="sugar" type="number" value={form.sugar} onChange={(e) => setForm({ ...form, sugar: +e.target.value })} />
              </div>
              <div>
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input id="weight" type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: +e.target.value })} />
              </div>
              <div>
                <Label htmlFor="hr">Heart Rate</Label>
                <Input id="hr" type="number" value={form.heartRate} onChange={(e) => setForm({ ...form, heartRate: +e.target.value })} />
              </div>
              <div className="sm:col-span-3 lg:col-span-6">
                <Button type="submit" className="w-full sm:w-auto">Save Reading</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Timeline */}
        <h2 className="mt-10 font-heading text-xl font-semibold">History Timeline</h2>
        <div className="mt-4 space-y-3">
          {[...vitals].reverse().map((v) => (
            <div key={v.id} className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <div>
                  <p className="font-medium">{v.date}</p>
                  <p className="text-xs text-muted-foreground">BP {v.systolic}/{v.diastolic} • Sugar {v.sugar} • Weight {v.weight}lbs • HR {v.heartRate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default HealthTracker;
