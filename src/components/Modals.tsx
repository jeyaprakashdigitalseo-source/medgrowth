import React, { useState } from "react";
import {
  X,
  Plus,
  DollarSign,
  Upload,
  Calendar,
  Layers,
  FileText,
  Video,
  Newspaper,
  Instagram,
  Youtube,
  Camera,
  Activity,
  CheckCircle,
  FolderOpen
} from "lucide-react";
import { MarketingActivity, Campaign, MediaItem } from "../types";

// Add Activity Modal
export function AddActivityModal({
  isOpen,
  onClose,
  onAdd
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (act: MarketingActivity) => void;
}) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<any>("Meta Campaign");
  const [budget, setBudget] = useState("");
  const [date, setDate] = useState("2026-07-16");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onAdd({
      id: "act-" + Math.random().toString(36).substr(2, 4),
      type,
      title,
      date,
      budget: parseFloat(budget) || 0,
      status: "Scheduled",
      description
    });
    // Reset
    setTitle("");
    setBudget("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] max-w-md w-full p-6 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-100 relative">
        <button onClick={onClose} className="absolute right-4 top-4 h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer">
          ✕
        </button>

        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
          <Layers className="h-4 w-4 text-blue-500" /> + Schedule Marketing Activity
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Activity Title</label>
            <input
              type="text"
              placeholder="e.g. Chronic Sciatica Facebook Campaign"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Channel Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none"
              >
                <option value="Newspaper Editorial">Newspaper</option>
                <option value="TV Interview">TV Interview</option>
                <option value="Instagram Reel">Instagram Reel</option>
                <option value="YouTube Video">YouTube Video</option>
                <option value="Photoshoot">Photoshoot</option>
                <option value="Video Shoot">Video Shoot</option>
                <option value="Meta Campaign">Meta Campaign</option>
                <option value="Google Campaign">Google Campaign</option>
                <option value="Influencer Collaboration">Influencer</option>
                <option value="Events">Local Event</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Budget Allocated (₹)</label>
              <input
                type="number"
                placeholder="25000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Publish/Run Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Description</label>
            <textarea
              placeholder="Provide strategic focus details for doctors/copywriters..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Schedule Content Run
          </button>
        </form>
      </div>
    </div>
  );
}

// Add Expense Modal
export function AddExpenseModal({
  isOpen,
  onClose,
  onAdd
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (category: string, amount: number) => void;
}) {
  const [category, setCategory] = useState("Meta Ads");
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    onAdd(category, parseFloat(amount) || 0);
    setAmount("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] max-w-sm w-full p-6 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-100 relative">
        <button onClick={onClose} className="absolute right-4 top-4 h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer">
          ✕
        </button>

        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
          <DollarSign className="h-4 w-4 text-blue-500" /> + Log Marketing Expense
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none"
            >
              <option value="Meta Ads">Meta Ads</option>
              <option value="Google Ads">Google Ads</option>
              <option value="SEO">SEO</option>
              <option value="Newspaper">Newspaper</option>
              <option value="Influencer">Influencer</option>
              <option value="TV">TV</option>
              <option value="Video Shoot">Video Shoot</option>
              <option value="Photography">Photography</option>
              <option value="Events">Events</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Amount (₹)</label>
            <input
              type="number"
              placeholder="e.g. 15000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Apply Cost Log
          </button>
        </form>
      </div>
    </div>
  );
}

// Upload Media Asset Modal
export function UploadMediaModal({
  isOpen,
  onClose,
  onAdd
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: MediaItem) => void;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<any>("Newspaper");
  const [imagePlaceholder, setImagePlaceholder] = useState<any>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Mock base64 URL representation for immediate canvas display
      setImagePlaceholder(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onAdd({
      id: "media-" + Math.random().toString(36).substr(2, 4),
      category,
      title,
      date: "July 2026",
      thumbnail: imagePlaceholder || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400&h=300",
      aspect: category === "Reels" ? "aspect-[3/4]" : "aspect-video"
    });

    setTitle("");
    setImagePlaceholder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] max-w-sm w-full p-6 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-100 relative">
        <button onClick={onClose} className="absolute right-4 top-4 h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer">
          ✕
        </button>

        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
          <Upload className="h-4 w-4 text-blue-500" /> + Upload Marketing Asset
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Asset Label</label>
            <input
              type="text"
              placeholder="e.g. Scitica Patient Rehabilitation Interview"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Asset Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none"
            >
              <option value="Newspaper">Newspaper publication scan</option>
              <option value="TV">TV segment recording</option>
              <option value="Reels">Instagram vertical reel</option>
              <option value="Videos">YouTube/clinical video</option>
              <option value="Photos">Physician group photoshoot</option>
              <option value="Testimonials">Patient testimony sheet</option>
              <option value="Posters">Hospital wing posters</option>
              <option value="Certificates">NABH/Health certificates</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Asset File</label>
            <div className="border border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer relative">
              <Upload className="h-5 w-5 text-slate-400 mb-1" />
              <span className="text-[10px] text-slate-500 font-semibold text-center">Drag and drop or click to upload</span>
              <span className="text-[8px] text-slate-400 mt-0.5">PNG, JPG, MP4 supported</span>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            {imagePlaceholder && (
              <div className="mt-2.5 p-1 bg-slate-100 border rounded-lg overflow-hidden flex items-center gap-2">
                <div className="h-10 w-10 bg-slate-200 rounded overflow-hidden">
                  <img src={imagePlaceholder} className="h-full w-full object-cover" />
                </div>
                <span className="text-[10px] text-emerald-600 font-bold">✓ Loaded successfully</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Upload to Media Library
          </button>
        </form>
      </div>
    </div>
  );
}

// Add Task Modal
export function AddTaskModal({
  isOpen,
  onClose,
  onAdd
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (text: string, category: string) => void;
}) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Campaigns");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    onAdd(text, category);
    setText("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] max-w-sm w-full p-6 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-100 relative">
        <button onClick={onClose} className="absolute right-4 top-4 h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer">
          ✕
        </button>

        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
          <CheckCircle className="h-4 w-4 text-blue-500" /> + Add Action Task
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Task Description</label>
            <input
              type="text"
              placeholder="e.g. Schedule photoshoot for sciatica doctor block"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Operation Scope</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none"
            >
              <option value="Campaigns">Campaign launches</option>
              <option value="TV/Newspaper">TV & Newspapers</option>
              <option value="Media Library">Media & Design assets</option>
              <option value="Invoicing">Billing & Contracts</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Append Task to Checklist
          </button>
        </form>
      </div>
    </div>
  );
}

// Add Campaign Modal
export function AddCampaignModal({
  isOpen,
  onClose,
  onAdd
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (camp: Campaign) => void;
}) {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [leads, setLeads] = useState("");
  const [appointments, setAppointments] = useState("");
  const [patients, setPatients] = useState("");
  const [roi, setRoi] = useState("");
  const [status, setStatus] = useState<any>("Excellent");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    onAdd({
      id: "camp-" + Math.random().toString(36).substr(2, 4),
      name,
      budget: parseFloat(budget) || 0,
      leads: parseInt(leads) || 0,
      appointments: parseInt(appointments) || 0,
      patients: parseInt(patients) || 0,
      roi: parseFloat(roi) || 1.0,
      status,
      leadTrend: [10, 15, 12, 18, 20, 22, 25]
    });

    setName("");
    setBudget("");
    setLeads("");
    setAppointments("");
    setPatients("");
    setRoi("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] max-w-md w-full p-6 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-100 relative">
        <button onClick={onClose} className="absolute right-4 top-4 h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer">
          ✕
        </button>

        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
          <Activity className="h-4 w-4 text-blue-500" /> + Add New Campaign
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Campaign Name</label>
            <input
              type="text"
              placeholder="e.g. Lumbar Joint Orthopedic Campaign"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Budget (₹)</label>
              <input
                type="number"
                placeholder="30000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Leads Captured</label>
              <input
                type="number"
                placeholder="100"
                value={leads}
                onChange={(e) => setLeads(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Appointments</label>
              <input
                type="number"
                placeholder="40"
                value={appointments}
                onChange={(e) => setAppointments(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Patients Visited</label>
              <input
                type="number"
                placeholder="25"
                value={patients}
                onChange={(e) => setPatients(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">ROI Multiplier</label>
              <input
                type="text"
                placeholder="6.4"
                value={roi}
                onChange={(e) => setRoi(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">ROI Status Badge</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none"
            >
              <option value="Excellent">Excellent (Green)</option>
              <option value="Good">Good (Blue)</option>
              <option value="Average">Average (Orange)</option>
              <option value="Poor">Poor (Red)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Launch Campaign Entry
          </button>
        </form>
      </div>
    </div>
  );
}

// REAL EXPORT MODAL (Triggers Excel/CSV and PDF formats)
export function ExportModal({
  isOpen,
  onClose,
  hospital,
  month,
  campaigns
}: {
  isOpen: boolean;
  onClose: () => void;
  hospital: string;
  month: string;
  campaigns: Campaign[];
}) {
  if (!isOpen) return null;

  // Real client-side CSV trigger
  const handleExportExcel = () => {
    const csvHeaders = ["Campaign ID", "Campaign Name", "Budget (INR)", "Leads Captured", "Appointments Booked", "Patients Visited", "ROI Factor", "ROI Rating"];
    const csvRows = campaigns.map((c) => [
      c.id,
      `"${c.name.replace(/"/g, '""')}"`,
      c.budget,
      c.leads,
      c.appointments,
      c.patients,
      c.roi.toFixed(1),
      c.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [csvHeaders.join(","), ...csvRows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MedGrowthOS_${hospital.replace(/\s+/g, "_")}_${month.replace(/\s+/g, "_")}_Export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  // Real print document generator for PDF exports
  const handleExportPDF = () => {
    const printContent = `
      <html>
        <head>
          <title>MedGrowth OS - Executive Marketing Audit</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #1E293B; background: #FFF; }
            .header { border-bottom: 2px solid #2563EB; padding-bottom: 15px; margin-bottom: 30px; }
            .header h1 { font-size: 24px; margin: 0; color: #0F172A; }
            .header p { font-size: 13px; color: #64748B; margin: 4px 0 0 0; }
            .summary { background: #F8FAFC; border: 1px solid #E2E8F0; padding: 20px; border-radius: 12px; margin-bottom: 30px; display: grid; grid-template-cols: 3-column; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th { text-align: left; padding: 12px; border-bottom: 2px solid #E2E8F0; font-size: 12px; color: #64748B; text-transform: uppercase; }
            td { padding: 12px; border-bottom: 1px solid #F1F5F9; font-size: 13px; }
            .footer { margin-top: 50px; font-size: 11px; color: #94A3B8; text-align: center; border-top: 1px solid #E2E8F0; padding-top: 15px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>MedGrowth OS — Executive Campaign Audit</h1>
            <p><strong>Hospital client:</strong> ${hospital} | <strong>Month:</strong> ${month}</p>
          </div>
          <div class="summary">
            <h3>July 2026 Aggregate Performance Resume</h3>
            <p><strong>Total Monitored Campaigns:</strong> ${campaigns.length}</p>
            <p><strong>Total Combined Budget:</strong> INR ${campaigns.reduce((a,c)=>a+c.budget, 0).toLocaleString()}</p>
            <p><strong>Total Captured Leads:</strong> ${campaigns.reduce((a,c)=>a+c.leads, 0)}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Budget (INR)</th>
                <th>Leads</th>
                <th>Appointments</th>
                <th>Patients Visited</th>
                <th>ROI</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${campaigns.map(c => `
                <tr>
                  <td><strong>${c.name}</strong></td>
                  <td>INR ${c.budget.toLocaleString()}</td>
                  <td>${c.leads}</td>
                  <td>${c.appointments}</td>
                  <td>${c.patients}</td>
                  <td>${c.roi.toFixed(1)}x</td>
                  <td>${c.status}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          <div class="footer">
            Generated via MedGrowth OS executive client workspace • Authorized Agency Audit
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] max-w-sm w-full p-6 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-100 relative">
        <button onClick={onClose} className="absolute right-4 top-4 h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer">
          ✕
        </button>

        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2 pb-2 border-b border-slate-100">
          <FileText className="h-4 w-4 text-blue-500" /> Export Marketing Metrics
        </h3>
        <p className="text-[10px] text-slate-400 mb-4 leading-relaxed">
          Generate agency-ready audits for hospital client review. Outputs are fully functional and formatted based on current filtering settings.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleExportExcel}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all text-center gap-2.5 group cursor-pointer"
          >
            <FolderOpen className="h-6 w-6 text-emerald-500 group-hover:scale-105 transition-transform" />
            <div>
              <span className="text-xs font-bold text-slate-850 block">Export CSV</span>
              <span className="text-[8px] text-slate-400 mt-0.5 block">Excel spreadsheet</span>
            </div>
          </button>

          <button
            onClick={handleExportPDF}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all text-center gap-2.5 group cursor-pointer"
          >
            <FileText className="h-6 w-6 text-red-500 group-hover:scale-105 transition-transform" />
            <div>
              <span className="text-xs font-bold text-slate-850 block">Export PDF</span>
              <span className="text-[8px] text-slate-400 mt-0.5 block">Executive Printable report</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
