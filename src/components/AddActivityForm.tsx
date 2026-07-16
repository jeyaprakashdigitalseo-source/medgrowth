import React, { useState } from "react";
import { 
  ArrowLeft, 
  Save, 
  PlusCircle, 
  X, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  UploadCloud, 
  FileCheck,
  Percent,
  Layers,
  Sparkles,
  HelpCircle,
  Building,
  Target,
  Image,
  Video,
  Receipt,
  CheckCircle2
} from "lucide-react";
import { MarketingActivity, ActivityType } from "../types";

interface AddActivityFormProps {
  onSave: (activityData: any) => void;
  onCancel: () => void;
}

export default function AddActivityForm({ onSave, onCancel }: AddActivityFormProps) {
  // Section 1: Basic Campaign & Staging Info
  const [activityName, setActivityName] = useState("");
  const [category, setCategory] = useState<ActivityType>("Meta Campaign");
  const [subCategory, setSubCategory] = useState("");
  const [hospital, setHospital] = useState("Epione Pain Management Centre");
  const [campaign, setCampaign] = useState("");
  const [department, setDepartment] = useState("");
  const [vendor, setVendor] = useState("");
  const [marketingObjective, setMarketingObjective] = useState("");
  
  // Section 2: Timeline & Budgets
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("2026-07-16");
  const [endDate, setEndDate] = useState("2026-08-16");
  
  // Section 3: Reach & Funnel Metrics
  const [expectedReach, setExpectedReach] = useState("");
  const [actualReach, setActualReach] = useState("");
  const [impressions, setImpressions] = useState("");
  const [clicks, setClicks] = useState("");
  const [leads, setLeads] = useState("");
  const [calls, setCalls] = useState("");
  const [appointments, setAppointments] = useState("");
  const [patients, setPatients] = useState("");
  const [revenue, setRevenue] = useState("");
  const [roi, setRoi] = useState("");

  // Section 4: Attachments (File lists/names)
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [invoices, setInvoices] = useState<string[]>([]);
  const [pdfs, setPdfs] = useState<string[]>([]);

  // Section 5: Strategic Notes & Status
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"Scheduled" | "In Progress" | "Completed">("Scheduled");

  // Drag over states for files
  const [dragActiveField, setDragActiveField] = useState<string | null>(null);

  // Success state for "Save & New"
  const [showNotification, setShowNotification] = useState(false);

  // Auto calculate ROI if budget and revenue exist
  const handleAutoCalcROI = () => {
    const budVal = parseFloat(budget) || 0;
    const revVal = parseFloat(revenue) || 0;
    if (budVal > 0) {
      const calculatedRoi = (revVal / budVal).toFixed(2);
      setRoi(calculatedRoi);
    }
  };

  // Handle files adding mock
  const simulateFileUpload = (fieldType: "images" | "videos" | "invoices" | "pdfs", fileName: string) => {
    switch (fieldType) {
      case "images":
        setImages(prev => [...prev, fileName]);
        break;
      case "videos":
        setVideos(prev => [...prev, fileName]);
        break;
      case "invoices":
        setInvoices(prev => [...prev, fileName]);
        break;
      case "pdfs":
        setPdfs(prev => [...prev, fileName]);
        break;
    }
  };

  const handleDrag = (e: React.DragEvent, field: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActiveField(field);
    } else if (e.type === "dragleave") {
      setDragActiveField(null);
    }
  };

  const handleDrop = (e: React.DragEvent, field: "images" | "videos" | "invoices" | "pdfs") => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveField(null);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const fileName = e.dataTransfer.files[0].name;
      simulateFileUpload(field, fileName);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "images" | "videos" | "invoices" | "pdfs") => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      simulateFileUpload(field, fileName);
    }
  };

  const handleRemoveFile = (field: "images" | "videos" | "invoices" | "pdfs", index: number) => {
    switch (field) {
      case "images":
        setImages(prev => prev.filter((_, i) => i !== index));
        break;
      case "videos":
        setVideos(prev => prev.filter((_, i) => i !== index));
        break;
      case "invoices":
        setInvoices(prev => prev.filter((_, i) => i !== index));
        break;
      case "pdfs":
        setPdfs(prev => prev.filter((_, i) => i !== index));
        break;
    }
  };

  const constructPayload = () => {
    return {
      title: activityName || "Untitled Enterprise Campaign",
      type: category,
      subCategory,
      hospital,
      campaign,
      department,
      vendor,
      marketingObjective,
      budget: parseFloat(budget) || 0,
      startDate,
      endDate,
      date: startDate, // compatible key
      expectedReach: parseInt(expectedReach) || 0,
      actualReach: parseInt(actualReach) || 0,
      impressions: parseInt(impressions) || 0,
      clicks: parseInt(clicks) || 0,
      leads: parseInt(leads) || 0,
      calls: parseInt(calls) || 0,
      appointments: parseInt(appointments) || 0,
      patients: parseInt(patients) || 0,
      revenue: parseFloat(revenue) || 0,
      roi: parseFloat(roi) || 0,
      images,
      videos,
      invoices,
      pdfs,
      description: notes || marketingObjective || "Staged clinical enterprise operation.",
      status
    };
  };

  const handleSaveOnly = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityName.trim()) {
      alert("Please provide an Activity Name.");
      return;
    }
    const payload = constructPayload();
    onSave(payload);
  };

  const handleSaveAndNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityName.trim()) {
      alert("Please provide an Activity Name.");
      return;
    }
    const payload = constructPayload();
    onSave({ ...payload, stayOpen: true });
    
    // Reset inputs
    setActivityName("");
    setSubCategory("");
    setCampaign("");
    setDepartment("");
    setVendor("");
    setMarketingObjective("");
    setBudget("");
    setExpectedReach("");
    setActualReach("");
    setImpressions("");
    setClicks("");
    setLeads("");
    setCalls("");
    setAppointments("");
    setPatients("");
    setRevenue("");
    setRoi("");
    setImages([]);
    setVideos([]);
    setInvoices([]);
    setPdfs([]);
    setNotes("");
    
    // Display banner toast
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const activityTypes: ActivityType[] = [
    "Meta Campaign",
    "Google Campaign",
    "Instagram Reel",
    "YouTube Video",
    "Newspaper Editorial",
    "TV Interview",
    "Photoshoot",
    "Video Shoot",
    "Influencer Collaboration",
    "Events",
    "Others"
  ];

  const inputStyle = "w-full text-xs px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-slate-800 font-semibold focus:outline-none transition-all";
  const labelStyle = "block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5";

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Banner / Success Toast */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-250">
          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold">Activity recorded! Form cleared for next input.</span>
        </div>
      )}

      {/* Top action header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={onCancel}
            className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
            title="Return to activities list"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Add Enterprise Marketing Activity</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Define metadata, funnel benchmarks, tracking pixels, and collateral attachments</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 sm:flex-initial px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveAndNew}
            className="flex-1 sm:flex-initial px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Save & Add New
          </button>
          <button
            type="button"
            onClick={handleSaveOnly}
            className="flex-1 sm:flex-initial px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-blue-500/10 transition-all cursor-pointer"
          >
            Save Activity
          </button>
        </div>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns (Col Span 2) - Config fields and metrics */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card A: Campaign Meta & Affiliations */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
              <Layers className="h-4 w-4 text-blue-600" />
              <h4 className="text-xs font-bold text-slate-800">1. Campaign Identity & Organizational Affiliation</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className={labelStyle}>Activity Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Back Pain Specialities Meta Campaign"
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  className={inputStyle}
                  required
                />
              </div>

              <div>
                <label className={labelStyle}>Marketing Channel Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ActivityType)}
                  className={inputStyle}
                >
                  {activityTypes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelStyle}>Sub-Category / Format</label>
                <input
                  type="text"
                  placeholder="e.g. Lead Gen Instant Forms"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Assigned Clinic / Hospital</label>
                <select
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  className={inputStyle}
                >
                  <option value="Epione Pain Management Centre">Epione Pain Management Centre</option>
                  <option value="Aasra Orthopaedics Hospital">Aasra Orthopaedics Hospital</option>
                  <option value="Star Joint Clinic">Star Joint Clinic</option>
                </select>
              </div>

              <div>
                <label className={labelStyle}>Marketing Campaign Name</label>
                <input
                  type="text"
                  placeholder="e.g. PainFree Monsoon Campaign"
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Internal Medical Department</label>
                <input
                  type="text"
                  placeholder="e.g. Orthopaedics, Spine"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Outsourced Vendor / Agency</label>
                <input
                  type="text"
                  placeholder="e.g. Zenith Diagnostics PR"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  className={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Card B: Schedule & Staged Objectives */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
              <Calendar className="h-4 w-4 text-blue-600" />
              <h4 className="text-xs font-bold text-slate-800">2. Staged Run Dates & Strategic Core Goals</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelStyle}>Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelStyle}>Marketing Objective</label>
                <textarea
                  placeholder="State clinical objective (e.g., Increase diagnostic bookings for spine specialist reviews)"
                  value={marketingObjective}
                  onChange={(e) => setMarketingObjective(e.target.value)}
                  rows={2}
                  className={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Card C: Staged Funnel Metrics & Financials */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <h4 className="text-xs font-bold text-slate-800">3. Funnel Acquisition Performance & Conversion Log</h4>
              </div>
              <button
                type="button"
                onClick={handleAutoCalcROI}
                className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50/50 hover:bg-blue-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                title="Calculate ROI from Budget and Revenue fields"
              >
                <Percent className="h-3 w-3" /> Auto Calc ROI
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelStyle}>Budget Limit (₹)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-[10px] font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className={`${inputStyle} pl-6`}
                  />
                </div>
              </div>

              <div>
                <label className={labelStyle}>Expected Reach</label>
                <input
                  type="number"
                  placeholder="e.g. 50000"
                  value={expectedReach}
                  onChange={(e) => setExpectedReach(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Actual Reach</label>
                <input
                  type="number"
                  placeholder="e.g. 42800"
                  value={actualReach}
                  onChange={(e) => setActualReach(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Impressions Log</label>
                <input
                  type="number"
                  placeholder="e.g. 85000"
                  value={impressions}
                  onChange={(e) => setImpressions(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Clicks Recorded</label>
                <input
                  type="number"
                  placeholder="e.g. 1200"
                  value={clicks}
                  onChange={(e) => setClicks(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Total Leads Inbound</label>
                <input
                  type="number"
                  placeholder="e.g. 180"
                  value={leads}
                  onChange={(e) => setLeads(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Phone Calls Logs</label>
                <input
                  type="number"
                  placeholder="e.g. 64"
                  value={calls}
                  onChange={(e) => setCalls(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Appointments Scheduled</label>
                <input
                  type="number"
                  placeholder="e.g. 38"
                  value={appointments}
                  onChange={(e) => setAppointments(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Acquired Patients</label>
                <input
                  type="number"
                  placeholder="e.g. 21"
                  value={patients}
                  onChange={(e) => setPatients(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Revenue Inbound (₹)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-[10px] font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    placeholder="e.g. 120000"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                    className={`${inputStyle} pl-6`}
                  />
                </div>
              </div>

              <div>
                <label className={labelStyle}>ROI Return Factor</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 4.8"
                    value={roi}
                    onChange={(e) => setRoi(e.target.value)}
                    className={`${inputStyle} pr-6`}
                  />
                  <span className="absolute right-3 top-3 text-[10px] font-bold text-slate-400">x</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Col Span 1) - Attachments, Notes and Status select */}
        <div className="space-y-6">
          
          {/* Status card */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
              <FileCheck className="h-4 w-4 text-blue-600" />
              <h4 className="text-xs font-bold text-slate-800">Staging Status</h4>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelStyle}>Campaign State</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus("Scheduled")}
                    className={`py-2 px-1.5 rounded-xl text-[10px] font-bold border transition-all text-center cursor-pointer ${status === "Scheduled" ? "bg-amber-50 text-amber-700 border-amber-300" : "bg-slate-50 text-slate-500 border-slate-200"}`}
                  >
                    Scheduled
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus("In Progress")}
                    className={`py-2 px-1.5 rounded-xl text-[10px] font-bold border transition-all text-center cursor-pointer ${status === "In Progress" ? "bg-blue-50 text-blue-700 border-blue-300" : "bg-slate-50 text-slate-500 border-slate-200"}`}
                  >
                    In Progress
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus("Completed")}
                    className={`py-2 px-1.5 rounded-xl text-[10px] font-bold border transition-all text-center cursor-pointer ${status === "Completed" ? "bg-emerald-50 text-emerald-700 border-emerald-300" : "bg-slate-50 text-slate-500 border-slate-200"}`}
                  >
                    Completed
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card D: Collateral Files & Document Uploads */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
              <UploadCloud className="h-4 w-4 text-blue-600" />
              <h4 className="text-xs font-bold text-slate-800">4. Collaterals & Operational Files</h4>
            </div>

            <div className="space-y-4">
              {/* Image upload */}
              <div>
                <label className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  <span>Upload Images</span>
                  <Image className="h-3 w-3 text-slate-400" />
                </label>
                <div 
                  className={`border-2 border-dashed rounded-xl p-3.5 text-center transition-all cursor-pointer relative ${dragActiveField === "images" ? "border-blue-500 bg-blue-50/20" : "border-slate-200 bg-slate-50/50"}`}
                  onDragEnter={(e) => handleDrag(e, "images")}
                  onDragOver={(e) => handleDrag(e, "images")}
                  onDragLeave={(e) => handleDrag(e, "")}
                  onDrop={(e) => handleDrop(e, "images")}
                >
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleFileChange(e, "images")}
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                  <UploadCloud className="h-5 w-5 text-slate-400 mx-auto mb-1" />
                  <p className="text-[10px] text-slate-500">Drag or click to attach image</p>
                </div>
                {images.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {images.map((img, i) => (
                      <div key={i} className="flex items-center justify-between p-1.5 bg-slate-50 rounded-lg text-[9px] font-semibold text-slate-600 border border-slate-100">
                        <span className="truncate max-w-[150px]">{img}</span>
                        <button type="button" onClick={() => handleRemoveFile("images", i)} className="text-slate-400 hover:text-rose-600">✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video upload */}
              <div>
                <label className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  <span>Upload Videos</span>
                  <Video className="h-3 w-3 text-slate-400" />
                </label>
                <div 
                  className={`border-2 border-dashed rounded-xl p-3.5 text-center transition-all cursor-pointer relative ${dragActiveField === "videos" ? "border-blue-500 bg-blue-50/20" : "border-slate-200 bg-slate-50/50"}`}
                  onDragEnter={(e) => handleDrag(e, "videos")}
                  onDragOver={(e) => handleDrag(e, "videos")}
                  onDragLeave={(e) => handleDrag(e, "")}
                  onDrop={(e) => handleDrop(e, "videos")}
                >
                  <input 
                    type="file" 
                    accept="video/*" 
                    onChange={(e) => handleFileChange(e, "videos")}
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                  <UploadCloud className="h-5 w-5 text-slate-400 mx-auto mb-1" />
                  <p className="text-[10px] text-slate-500">Drag or click to attach video</p>
                </div>
                {videos.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {videos.map((vid, i) => (
                      <div key={i} className="flex items-center justify-between p-1.5 bg-slate-50 rounded-lg text-[9px] font-semibold text-slate-600 border border-slate-100">
                        <span className="truncate max-w-[150px]">{vid}</span>
                        <button type="button" onClick={() => handleRemoveFile("videos", i)} className="text-slate-400 hover:text-rose-600">✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Invoice upload */}
              <div>
                <label className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  <span>Upload Agency Invoices</span>
                  <Receipt className="h-3 w-3 text-slate-400" />
                </label>
                <div 
                  className={`border-2 border-dashed rounded-xl p-3.5 text-center transition-all cursor-pointer relative ${dragActiveField === "invoices" ? "border-blue-500 bg-blue-50/20" : "border-slate-200 bg-slate-50/50"}`}
                  onDragEnter={(e) => handleDrag(e, "invoices")}
                  onDragOver={(e) => handleDrag(e, "invoices")}
                  onDragLeave={(e) => handleDrag(e, "")}
                  onDrop={(e) => handleDrop(e, "invoices")}
                >
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx,image/*" 
                    onChange={(e) => handleFileChange(e, "invoices")}
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                  <UploadCloud className="h-5 w-5 text-slate-400 mx-auto mb-1" />
                  <p className="text-[10px] text-slate-500">Drag or click to attach invoice</p>
                </div>
                {invoices.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {invoices.map((inv, i) => (
                      <div key={i} className="flex items-center justify-between p-1.5 bg-slate-50 rounded-lg text-[9px] font-semibold text-slate-600 border border-slate-100">
                        <span className="truncate max-w-[150px]">{inv}</span>
                        <button type="button" onClick={() => handleRemoveFile("invoices", i)} className="text-slate-400 hover:text-rose-600">✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* PDF upload */}
              <div>
                <label className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  <span>Upload Strategy PDFs / Reports</span>
                  <FileText className="h-3 w-3 text-slate-400" />
                </label>
                <div 
                  className={`border-2 border-dashed rounded-xl p-3.5 text-center transition-all cursor-pointer relative ${dragActiveField === "pdfs" ? "border-blue-500 bg-blue-50/20" : "border-slate-200 bg-slate-50/50"}`}
                  onDragEnter={(e) => handleDrag(e, "pdfs")}
                  onDragOver={(e) => handleDrag(e, "pdfs")}
                  onDragLeave={(e) => handleDrag(e, "")}
                  onDrop={(e) => handleDrop(e, "pdfs")}
                >
                  <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={(e) => handleFileChange(e, "pdfs")}
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                  <UploadCloud className="h-5 w-5 text-slate-400 mx-auto mb-1" />
                  <p className="text-[10px] text-slate-500">Drag or click to attach PDF</p>
                </div>
                {pdfs.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {pdfs.map((pdf, i) => (
                      <div key={i} className="flex items-center justify-between p-1.5 bg-slate-50 rounded-lg text-[9px] font-semibold text-slate-600 border border-slate-100">
                        <span className="truncate max-w-[150px]">{pdf}</span>
                        <button type="button" onClick={() => handleRemoveFile("pdfs", i)} className="text-slate-400 hover:text-rose-600">✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card E: Operational Notes */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
              <FileCheck className="h-4 w-4 text-blue-600" />
              <h4 className="text-xs font-bold text-slate-800">5. Operational Strategic Notes</h4>
            </div>

            <div>
              <label className={labelStyle}>Operational Diary Notes</label>
              <textarea
                placeholder="Log internal communication workflows, creative links, UTM indices or pixel audit outcomes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className={inputStyle}
              />
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}
