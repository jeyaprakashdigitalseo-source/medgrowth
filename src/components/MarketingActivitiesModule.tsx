import React, { useState, useMemo, useRef } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Download, 
  Upload, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  X, 
  FileText, 
  Sparkles,
  Info
} from "lucide-react";
import { MarketingActivity, ActivityType } from "../types";
import AddActivityForm from "./AddActivityForm";

interface MarketingActivitiesModuleProps {
  activities: MarketingActivity[];
  setActivities: React.Dispatch<React.SetStateAction<MarketingActivity[]>>;
  onAddActivity: (act: MarketingActivity) => void;
}

export default function MarketingActivitiesModule({
  activities,
  setActivities,
  onAddActivity
}: MarketingActivitiesModuleProps) {
  // Dedicated enterprise form view state
  const [isAddingDedicated, setIsAddingDedicated] = useState(false);

  // Navigation & view states
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedHospital, setSelectedHospital] = useState<string>("All");
  const [selectedMonth, setSelectedMonth] = useState<string>("All");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Dialog / Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<MarketingActivity | null>(null);

  // Form states for Create/Edit
  const [formTitle, setFormTitle] = useState("");
  const [formType, setFormType] = useState<ActivityType>("Meta Campaign");
  const [formBudget, setFormBudget] = useState("");
  const [formDate, setFormDate] = useState("2026-07-16");
  const [formStatus, setFormStatus] = useState<"Completed" | "In Progress" | "Scheduled">("Scheduled");
  const [formDescription, setFormDescription] = useState("");

  // CSV Import Ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Flash / Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");

  const showToast = (msg: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
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

  // Filters logic
  const filteredActivities = useMemo(() => {
    return activities.filter(act => {
      const matchesSearch = 
        act.title.toLowerCase().includes(search.toLowerCase()) ||
        (act.description && act.description.toLowerCase().includes(search.toLowerCase())) ||
        act.type.toLowerCase().includes(search.toLowerCase());
      
      const matchesType = selectedType === "All" || act.type === selectedType;
      const matchesStatus = selectedStatus === "All" || act.status === selectedStatus;

      // Hospital filter matching
      const matchesHospital = selectedHospital === "All" || 
        (act.hospital && act.hospital.toLowerCase() === selectedHospital.toLowerCase()) ||
        // If act has no hospital field, default to Epione to make sure they match properly or are categorized
        (selectedHospital.toLowerCase() === "epione pain management centre" && (!act.hospital || act.hospital === ""));

      // Month filter matching
      let matchesMonth = true;
      if (selectedMonth !== "All") {
        // act.date format is YYYY-MM-DD (e.g. 2026-07-12)
        const dateParts = act.date.split("-");
        if (dateParts.length >= 2) {
          const year = dateParts[0];
          const month = dateParts[1]; // "06" or "07"
          if (selectedMonth === "June 2026") {
            matchesMonth = year === "2026" && month === "06";
          } else if (selectedMonth === "July 2026") {
            matchesMonth = year === "2026" && month === "07";
          }
        } else {
          matchesMonth = false;
        }
      }

      return matchesSearch && matchesType && matchesStatus && matchesHospital && matchesMonth;
    });
  }, [activities, search, selectedType, selectedStatus, selectedHospital, selectedMonth]);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredActivities.length / itemsPerPage));
  const paginatedActivities = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredActivities.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredActivities, currentPage]);

  // Adjust page if current index exceeds filtered bounds
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredActivities, currentPage, totalPages]);

  // CRUD actions handlers
  const handleOpenCreate = () => {
    setFormTitle("");
    setFormType("Meta Campaign");
    setFormBudget("");
    setFormDate("2026-07-16");
    setFormStatus("Scheduled");
    setFormDescription("");
    setIsCreateOpen(true);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      showToast("Activity title cannot be empty", "error");
      return;
    }

    const newAct: MarketingActivity = {
      id: "act-" + Math.random().toString(36).substr(2, 5),
      type: formType,
      title: formTitle,
      date: formDate,
      budget: parseFloat(formBudget) || 0,
      status: formStatus,
      description: formDescription || "Staged clinical communication campaign run."
    };

    onAddActivity(newAct);
    setIsCreateOpen(false);
    showToast(`Activity "${formTitle}" scheduled successfully!`, "success");
  };

  const handleOpenEdit = (act: MarketingActivity) => {
    setSelectedActivity(act);
    setFormTitle(act.title);
    setFormType(act.type);
    setFormBudget(act.budget.toString());
    setFormDate(act.date);
    setFormStatus(act.status);
    setFormDescription(act.description || "");
    setIsEditOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedActivity) return;
    if (!formTitle.trim()) {
      showToast("Activity title cannot be empty", "error");
      return;
    }

    const payload = {
      ...selectedActivity,
      title: formTitle,
      type: formType,
      budget: parseFloat(formBudget) || 0,
      date: formDate,
      status: formStatus,
      description: formDescription
    };

    fetch(`/api/activities/${selectedActivity.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("HTTP error " + res.status);
        }
        return res.json();
      })
      .then(resData => {
        if (resData.success) {
          // Sync state on the frontend
          setActivities(prev => prev.map(act => act.id === selectedActivity.id ? { ...act, ...payload } : act));
          setIsEditOpen(false);
          setSelectedActivity(null);
          showToast(`Activity "${formTitle}" updated successfully!`, "success");
        } else {
          throw new Error(resData.error || "Update rejected by server");
        }
      })
      .catch(err => {
        console.error("Update error:", err);
        showToast("Failed to save changes on backend server.", "error");
      });
  };

  const handleOpenDelete = (act: MarketingActivity) => {
    setSelectedActivity(act);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedActivity) return;

    fetch(`/api/activities/${selectedActivity.id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("HTTP error " + res.status);
        }
        return res.json();
      })
      .then(resData => {
        if (resData.success) {
          setActivities(prev => prev.filter(act => act.id !== selectedActivity.id));
          setIsDeleteOpen(false);
          showToast(`Activity "${selectedActivity.title}" deleted successfully!`, "info");
          setSelectedActivity(null);
        } else {
          throw new Error(resData.error || "Delete rejected by server");
        }
      })
      .catch(err => {
        console.error("Delete error:", err);
        showToast("Failed to delete activity on backend server.", "error");
      });
  };

  // CSV Import Parser
  const handleCSVImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) return;

        const lines = text.split("\n");
        const parsedActivities: MarketingActivity[] = [];
        
        // Skip header line
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          // Simple CSV splitter (handles quotes partially or simple commas)
          const parts = line.split(",").map(p => p.replace(/^"|"$/g, "").trim());
          if (parts.length >= 4) {
            const title = parts[0];
            const typeInput = parts[1];
            const date = parts[2] || "2026-07-16";
            const budget = parseFloat(parts[3]) || 0;
            const statusInput = parts[4] as any;
            const description = parts[5] || "";

            // Validate activity type
            let matchedType: ActivityType = "Others";
            if (activityTypes.includes(typeInput as ActivityType)) {
              matchedType = typeInput as ActivityType;
            }

            // Validate status
            let matchedStatus: "Completed" | "In Progress" | "Scheduled" = "Scheduled";
            if (["Completed", "In Progress", "Scheduled"].includes(statusInput)) {
              matchedStatus = statusInput;
            }

            parsedActivities.push({
              id: "act-csv-" + Math.random().toString(36).substr(2, 4),
              title,
              type: matchedType,
              date,
              budget,
              status: matchedStatus,
              description: description || "Imported clinical marketing campaign run."
            });
          }
        }

        if (parsedActivities.length > 0) {
          setActivities(prev => [...parsedActivities, ...prev]);
          showToast(`Successfully imported ${parsedActivities.length} activities from CSV`, "success");
        } else {
          showToast("Could not find any valid activity records in CSV", "error");
        }
      } catch (err) {
        showToast("Error reading CSV file. Check formatting.", "error");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
  };

  // CSV Export Writer
  const handleCSVExport = () => {
    try {
      const headers = ["Title", "Type", "Date", "Budget (INR)", "Status", "Description"];
      const rows = filteredActivities.map(act => [
        `"${act.title.replace(/"/g, '""')}"`,
        act.type,
        act.date,
        act.budget,
        act.status,
        `"${(act.description || "").replace(/"/g, '""')}"`
      ]);

      const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `medgrowth_marketing_activities_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Spreadsheet CSV exported successfully!", "success");
    } catch (err) {
      showToast("Failed to export CSV file", "error");
    }
  };

  // Helper for status badge styling
  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-100/80";
      case "In Progress":
        return "bg-blue-50 text-blue-700 border-blue-100/80";
      case "Scheduled":
        return "bg-amber-50 text-amber-700 border-amber-100/80";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  if (isAddingDedicated) {
    return (
      <AddActivityForm 
        onSave={(data: any) => {
          // Send to full-stack backend endpoint to save in Supabase or memory fallback
          fetch("/api/activities", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
            .then(res => {
              if (!res.ok) {
                throw new Error("HTTP error: " + res.status);
              }
              return res.json();
            })
            .then(resData => {
              if (resData.success && resData.activity) {
                // Instantly sync React state on the frontend
                onAddActivity(resData.activity);
                
                const destinationLabel = resData.storage === "supabase" ? "Supabase" : "local database";
                if (!data.stayOpen) {
                  setIsAddingDedicated(false);
                  showToast(`Activity "${data.title}" saved successfully to ${destinationLabel}!`, "success");
                } else {
                  showToast(`Activity "${data.title}" saved! Ready for next.`, "success");
                }
              } else {
                throw new Error(resData.error || "Invalid response from backend server");
              }
            })
            .catch(err => {
              console.error("Save error:", err);
              showToast("Failed to connect to backend to save activity.", "error");
            });
        }}
        onCancel={() => setIsAddingDedicated(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border animate-in fade-in slide-in-from-bottom-4 duration-250 ${
          toastType === "success" 
            ? "bg-emerald-50 border-emerald-100 text-emerald-800" 
            : toastType === "error" 
            ? "bg-rose-50 border-rose-100 text-rose-800" 
            : "bg-blue-50 border-blue-100 text-blue-800"
        }`}>
          {toastType === "success" && <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0" />}
          {toastType === "error" && <AlertCircle className="h-4.5 w-4.5 text-rose-600 shrink-0" />}
          {toastType === "info" && <Info className="h-4.5 w-4.5 text-blue-600 shrink-0" />}
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Module Title and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Marketing Activities Registry</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Full-lifecycle CRUD center scheduling newspapers, video shoots, and meta ad campaign operations
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Invisible file input for CSV importing */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleCSVImport} 
            accept=".csv" 
            className="hidden" 
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
            title="Import activities from CSV spreadsheet"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Import CSV</span>
          </button>
          <button
            onClick={handleCSVExport}
            className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
            title="Export filtered activities to CSV"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAddingDedicated(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-blue-500/10 cursor-pointer"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Add Activity</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Live search input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, description, keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-50/70 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:outline-none transition-all text-slate-700"
            />
            {search && (
              <button 
                onClick={() => setSearch("")} 
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Controls: Filters & Toggle layout */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Channel:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="text-xs font-semibold bg-slate-50 hover:bg-slate-100/70 px-3 py-1.5 border border-slate-200 rounded-xl text-slate-700 focus:outline-none transition-colors cursor-pointer"
              >
                <option value="All">All Channels</option>
                {activityTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-xs font-semibold bg-slate-50 hover:bg-slate-100/70 px-3 py-1.5 border border-slate-200 rounded-xl text-slate-700 focus:outline-none transition-colors cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hospital:</span>
              <select
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                className="text-xs font-semibold bg-slate-50 hover:bg-slate-100/70 px-3 py-1.5 border border-slate-200 rounded-xl text-slate-700 focus:outline-none transition-colors cursor-pointer"
              >
                <option value="All">All Hospitals</option>
                <option value="Epione Pain Management Centre">Epione Pain</option>
                <option value="Apollo Heart & Vascular Institute">Apollo Heart</option>
                <option value="Zenith Joint Care Centre">Zenith Joint Care</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Month:</span>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="text-xs font-semibold bg-slate-50 hover:bg-slate-100/70 px-3 py-1.5 border border-slate-200 rounded-xl text-slate-700 focus:outline-none transition-colors cursor-pointer"
              >
                <option value="All">All Months</option>
                <option value="June 2026">June 2026</option>
                <option value="July 2026">July 2026</option>
              </select>
            </div>

            <div className="h-5 w-px bg-slate-200 hidden sm:block mx-1" />

            {/* View switcher */}
            <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200/40">
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-lg transition-all ${viewMode === "table" ? "bg-white text-blue-600 shadow-xs" : "text-slate-400 hover:text-slate-600"}`}
                title="Table view list"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-white text-blue-600 shadow-xs" : "text-slate-400 hover:text-slate-600"}`}
                title="Grid visual layout"
              >
                <Grid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Selected parameters indicator */}
        {(selectedType !== "All" || selectedStatus !== "All" || selectedHospital !== "All" || selectedMonth !== "All" || search) && (
          <div className="flex items-center flex-wrap gap-2 pt-1 border-t border-slate-50">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Filters:</span>
            {search && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg">
                Query: "{search}"
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSearch("")} />
              </span>
            )}
            {selectedType !== "All" && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg">
                Type: {selectedType}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedType("All")} />
              </span>
            )}
            {selectedStatus !== "All" && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg">
                Status: {selectedStatus}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedStatus("All")} />
              </span>
            )}
            {selectedHospital !== "All" && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg">
                Hospital: {selectedHospital.replace(" Centre", "").replace(" Institute", "")}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedHospital("All")} />
              </span>
            )}
            {selectedMonth !== "All" && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg">
                Month: {selectedMonth}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedMonth("All")} />
              </span>
            )}
            <button 
              onClick={() => {
                setSearch("");
                setSelectedType("All");
                setSelectedStatus("All");
                setSelectedHospital("All");
                setSelectedMonth("All");
              }}
              className="text-[10px] font-bold text-blue-600 hover:text-blue-700 ml-auto transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Main content display - TABLE or GRID */}
      {filteredActivities.length === 0 ? (
        <div className="bg-white rounded-[24px] p-12 text-center border border-slate-100 shadow-sm flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-4">
            <FileText className="h-6 w-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-800">No activities found</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            We couldn't find any activities matching the active filter criteria. Try clearing filters or create a new campaign.
          </p>
          <button
            onClick={() => setIsAddingDedicated(true)}
            className="mt-5 flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-blue-500/10 cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Create New Run
          </button>
        </div>
      ) : viewMode === "table" ? (
        /* TABLE LAYOUT */
        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-100">
                  <th className="py-3 px-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Marketing Activity Title</th>
                  <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Channel/Type</th>
                  <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Run Date</th>
                  <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Budget (INR)</th>
                  <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
                  <th className="py-3 px-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginatedActivities.map((act) => (
                  <tr key={act.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-3.5 px-5">
                      <div className="max-w-xs md:max-w-md">
                        <p className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">{act.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{act.description || "Staged clinical communication campaign."}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs font-medium text-slate-600 px-2 py-1 bg-slate-100/60 rounded-lg">{act.type}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        <span>{act.date}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-xs font-semibold text-slate-800">
                      ₹{act.budget.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${getStatusBadgeStyles(act.status)}`}>
                        {act.status === "Completed" && <CheckCircle className="h-2.5 w-2.5 fill-emerald-500 text-white" />}
                        {act.status === "In Progress" && <Clock className="h-2.5 w-2.5 text-blue-600" />}
                        {act.status === "Scheduled" && <Calendar className="h-2.5 w-2.5 text-amber-500" />}
                        <span>{act.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(act)}
                          className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                          title="Edit activity attributes"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(act)}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                          title="Delete activity record"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID LAYOUT WITH VISUAL PREVIEW MOCKUPS matching premium App data rules */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {paginatedActivities.map((act) => {
            // Pick a matching mock cover gradient/color depending on type
            let bgStyle = "from-blue-600 to-indigo-600 text-white";
            if (act.type === "Meta Campaign") bgStyle = "from-sky-500 to-blue-700 text-white";
            if (act.type === "Google Campaign") bgStyle = "from-emerald-500 to-teal-700 text-white";
            if (act.type === "Instagram Reel") bgStyle = "from-fuchsia-500 to-pink-600 text-white";
            if (act.type === "YouTube Video") bgStyle = "from-red-600 to-rose-700 text-white";
            if (act.type === "Newspaper Editorial") bgStyle = "from-slate-700 to-slate-900 text-white";
            if (act.type === "TV Interview") bgStyle = "from-purple-600 to-indigo-800 text-white";
            if (act.type === "Photoshoot") bgStyle = "from-yellow-500 to-orange-600 text-white";

            return (
              <div 
                key={act.id} 
                className="bg-white rounded-[24px] border border-slate-100 shadow-sm hover:border-slate-200 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group"
              >
                {/* Visual Header Thumbnail Block */}
                <div className={`p-4 bg-gradient-to-br ${bgStyle} h-24 flex flex-col justify-between relative`}>
                  <div className="absolute top-0 right-0 p-3 opacity-15">
                    <Sparkles className="h-16 w-16" />
                  </div>
                  <div className="flex justify-between items-center z-10">
                    <span className="text-[9px] uppercase tracking-widest font-extrabold bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-xs">
                      {act.type}
                    </span>
                    <span className="text-[10px] font-bold font-mono">
                      ID: {act.id.slice(-4).toUpperCase()}
                    </span>
                  </div>
                  <div className="z-10">
                    <h5 className="text-xs font-bold leading-tight truncate">{act.title}</h5>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium line-clamp-2">
                      {act.description || "Staged clinical communication and diagnostics support channel."}
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-slate-50 pt-3">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Scheduled Run Date:</span>
                      <span className="font-mono font-semibold text-slate-700 flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        {act.date}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Budget Limit:</span>
                      <span className="font-bold text-slate-800">₹{act.budget.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Live Status:</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border ${getStatusBadgeStyles(act.status)}`}>
                        {act.status}
                      </span>
                    </div>
                  </div>

                  {/* Actions buttons footer */}
                  <div className="border-t border-slate-50 pt-3 flex justify-end gap-2">
                    <button
                      onClick={() => handleOpenEdit(act)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                    >
                      <Edit2 className="h-3 w-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleOpenDelete(act)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PAGINATION SECTION */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-5">
        <div className="text-[11px] text-slate-400 font-medium">
          Showing <span className="font-bold text-slate-700">{Math.min(filteredActivities.length, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(filteredActivities.length, currentPage * itemsPerPage)}</span> of <span className="font-bold text-slate-700">{filteredActivities.length}</span> activities
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-700 disabled:opacity-40 hover:bg-slate-50 disabled:hover:bg-transparent transition-all cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${currentPage === page ? "bg-blue-600 text-white" : "border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-700 disabled:opacity-40 hover:bg-slate-50 disabled:hover:bg-transparent transition-all cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* CREATE DIALOG / MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-md w-full p-6 border border-slate-100 shadow-2xl animate-in zoom-in-95 duration-150 relative">
            <button 
              onClick={() => setIsCreateOpen(false)} 
              className="absolute right-4 top-4 h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-50">
              <Plus className="h-4 w-4 text-blue-600" /> 
              <span>Schedule New Marketing Run</span>
            </h3>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Activity Title</label>
                <input
                  type="text"
                  placeholder="e.g. Chronic Back Pain Video Campaign"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:bg-white transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Channel Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as ActivityType)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3 py-2.5 text-slate-700 focus:outline-none cursor-pointer"
                  >
                    {activityTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Budget Allocation (₹)</label>
                  <input
                    type="number"
                    placeholder="25000"
                    value={formBudget}
                    onChange={(e) => setFormBudget(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3 py-2.5 text-slate-700 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Publish Run Date</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3 py-2.5 text-slate-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Staging Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3 py-2.5 text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Strategic Description / Focus Points</label>
                <textarea
                  placeholder="State clinical goals, call-to-action copy and target doctor indices..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={3}
                  className="w-full text-xs bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Schedule Content Campaign
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT DIALOG / MODAL */}
      {isEditOpen && selectedActivity && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-md w-full p-6 border border-slate-100 shadow-2xl animate-in zoom-in-95 duration-150 relative">
            <button 
              onClick={() => setIsEditOpen(false)} 
              className="absolute right-4 top-4 h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-50">
              <Edit2 className="h-4 w-4 text-blue-600" /> 
              <span>Edit Marketing Activity Attributes</span>
            </h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Activity Title</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:bg-white transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Channel Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as ActivityType)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3 py-2.5 text-slate-700 focus:outline-none cursor-pointer"
                  >
                    {activityTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Budget Allocation (₹)</label>
                  <input
                    type="number"
                    value={formBudget}
                    onChange={(e) => setFormBudget(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3 py-2.5 text-slate-700 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Publish Run Date</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3 py-2.5 text-slate-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Staging Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3 py-2.5 text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Strategic Description / Focus Points</label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={3}
                  className="w-full text-xs bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:bg-white transition-colors"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {isDeleteOpen && selectedActivity && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-sm w-full p-6 border border-slate-100 shadow-2xl animate-in zoom-in-95 duration-150 relative">
            <button 
              onClick={() => setIsDeleteOpen(false)} 
              className="absolute right-4 top-4 h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-rose-600" />
              <span>Confirm Activity Deletion</span>
            </h3>

            <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium">
              Are you sure you want to delete <span className="font-bold text-slate-800">"{selectedActivity.title}"</span>? This will permanently remove the record from all active budget compilations and calendar operations.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                No, Keep It
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
