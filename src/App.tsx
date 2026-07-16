import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import KPICards from "./components/KPICards";
import { MonthlySpendChart, DonutChart } from "./components/Charts";
import PerformanceTable from "./components/PerformanceTable";
import Timeline from "./components/Timeline";
import Comparison from "./components/Comparison";
import Calendar from "./components/Calendar";
import MediaGallery from "./components/MediaGallery";
import AIInsights from "./components/AIInsights";
import RightPanel from "./components/RightPanel";
import Settings from "./components/Settings";
import MarketingActivitiesModule from "./components/MarketingActivitiesModule";
import {
  AddActivityModal,
  AddExpenseModal,
  UploadMediaModal,
  AddTaskModal,
  AddCampaignModal,
  ExportModal
} from "./components/Modals";

import {
  HOSPITALS,
  EPIONE_DATA,
  APOLLO_DATA,
  RECENT_ACTIVITIES_SEED,
  TODAY_TASKS_SEED,
  UPCOMING_SEED,
  ALERTS_SEED,
  CALENDAR_EVENTS_SEED,
  MEDIA_ITEMS_SEED
} from "./data";

import { Campaign, MarketingActivity, MediaItem, Task, CalendarEvent } from "./types";
import {
  Plus,
  Layers,
  DollarSign,
  Upload,
  FileText,
  Bookmark,
  Share2,
  Sparkles,
  HelpCircle,
  Building2,
  CheckCircle,
  FolderOpen
} from "lucide-react";

export default function App() {
  // Navigation & Filtering
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedHospital, setSelectedHospital] = useState(HOSPITALS[0]);
  const [selectedMonth, setSelectedMonth] = useState("July 2026");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCampaignFilter, setSelectedCampaignFilter] = useState<string | null>(null);

  // Core Reactive Datasets (allowing state additions)
  const [localCampaigns, setLocalCampaigns] = useState<Record<string, Campaign[]>>({
    epione_july: [...EPIONE_DATA.july.campaigns],
    epione_june: [...EPIONE_DATA.june.campaigns],
    apollo_july: [...APOLLO_DATA.july.campaigns],
    apollo_june: [...APOLLO_DATA.july.campaigns].map(c => ({...c, budget: c.budget * 0.9, leads: Math.round(c.leads * 0.85)})),
    zenith_july: [...EPIONE_DATA.july.campaigns].map(c => ({...c, name: c.name.replace("Back Pain", "Knee Replacement").replace("Shoulder", "Hip Joint"), budget: c.budget * 1.2, leads: Math.round(c.leads * 1.1)})),
    zenith_june: [...EPIONE_DATA.june.campaigns].map(c => ({...c, name: c.name.replace("Back Pain", "Knee Replacement"), budget: c.budget * 1.1}))
  });

  const [activities, setActivities] = useState<MarketingActivity[]>(RECENT_ACTIVITIES_SEED);

  // Load activities from database backend (Supabase or local memory fallback)
  useEffect(() => {
    fetch("/api/activities")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setActivities(data);
        }
      })
      .catch(err => console.error("Failed to load activities from server:", err));
  }, []);
  const [tasks, setTasks] = useState<Task[]>(TODAY_TASKS_SEED);
  const [alerts, setAlerts] = useState(ALERTS_SEED);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(MEDIA_ITEMS_SEED);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(CALENDAR_EVENTS_SEED);

  // Notifications State
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Google search campaign 'sciatica relief' reached its lead limit", time: "10m ago" },
    { id: 2, text: "Sunday Chronicle full page editorial draft ready for signoff", time: "2h ago" },
    { id: 3, text: "Meta ads lead deduplication error resolved", time: "5h ago" }
  ]);

  // Modal Control States
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isUploadMediaOpen, setIsUploadMediaOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddCampaignOpen, setIsAddCampaignOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Derived Key context identifiers
  const dataKey = `${selectedHospital.id}_${selectedMonth === "July 2026" ? "july" : "june"}`;

  // Grab active hospital/month seeds
  const getActiveMonthData = () => {
    const hospId = selectedHospital.id;
    const isJuly = selectedMonth === "July 2026";

    if (hospId === "apollo") {
      return APOLLO_DATA.july; // Fallback helper
    } else if (hospId === "zenith") {
      return EPIONE_DATA.july; // Map to zenith context
    }
    return isJuly ? EPIONE_DATA.july : EPIONE_DATA.june;
  };

  const activeBaseData = getActiveMonthData();

  // Dynamic Metrics Recalculations based on state
  const activeCampaignsList = localCampaigns[dataKey] || activeBaseData.campaigns;

  const totalCampaignBudget = activeCampaignsList.reduce((sum, c) => sum + c.budget, 0);
  const totalCampaignLeads = activeCampaignsList.reduce((sum, c) => sum + c.leads, 0);
  const totalCampaignAppointments = activeCampaignsList.reduce((sum, c) => sum + c.appointments, 0);
  const totalCampaignPatients = activeCampaignsList.reduce((sum, c) => sum + c.patients, 0);

  // Compose dynamic metrics card object
  const derivedMetrics = {
    spend: `₹${totalCampaignBudget.toLocaleString()}`,
    spendGrowth: activeBaseData.metrics.spendGrowth,
    spendGrowthIsPositive: true,
    leads: String(totalCampaignLeads),
    leadsGrowth: activeBaseData.metrics.leadsGrowth,
    appointments: String(totalCampaignAppointments),
    appointmentsGrowth: activeBaseData.metrics.appointmentsGrowth,
    patients: String(totalCampaignPatients),
    patientsGrowth: activeBaseData.metrics.patientsGrowth,
    revenue: selectedHospital.id === "apollo" ? "₹26.5 Lakhs" : selectedHospital.id === "zenith" ? "₹21.8 Lakhs" : activeBaseData.metrics.revenue,
    revenueGrowth: activeBaseData.metrics.revenueGrowth,
    roi: activeBaseData.metrics.roi,
    roiGrowth: activeBaseData.metrics.roiGrowth,

    // Sparklines seed passing
    spendSparkline: activeBaseData.metrics.spendSparkline,
    leadsSparkline: activeBaseData.metrics.leadsSparkline,
    appointmentsSparkline: activeBaseData.metrics.appointmentsSparkline,
    patientsSparkline: activeBaseData.metrics.patientsSparkline,
    revenueSparkline: activeBaseData.metrics.revenueSparkline,
    roiSparkline: activeBaseData.metrics.roiSparkline
  };

  // Add Dynamic campaign run
  const handleAddCampaign = (camp: Campaign) => {
    setLocalCampaigns(prev => ({
      ...prev,
      [dataKey]: [camp, ...(prev[dataKey] || [])]
    }));
    // Push notify
    setNotifications([
      { id: Date.now(), text: `New Campaign launched: ${camp.name}`, time: "Just now" },
      ...notifications
    ]);
  };

  // Add Dynamic activity
  const handleAddActivity = (act: MarketingActivity) => {
    setActivities([act, ...activities]);
    // Also append to calendar event triggers
    const d = new Date(act.date);
    const dayVal = d.getDate() || 15;
    setCalendarEvents([
      {
        id: "evt-" + act.id,
        day: dayVal,
        title: act.title,
        type: "Campaign Launch",
        budget: act.budget
      },
      ...calendarEvents
    ]);
  };

  // Add Dynamic logged expense
  const handleAddExpense = (cat: string, amount: number) => {
    // Add dynamically to local active campaigns list as a dummy sub-campaign cost increase
    if (activeCampaignsList.length > 0) {
      const updated = [...activeCampaignsList];
      updated[0] = {
        ...updated[0],
        budget: updated[0].budget + amount
      };
      setLocalCampaigns(prev => ({
        ...prev,
        [dataKey]: updated
      }));
    }
  };

  // Add Checklist task
  const handleAddTask = (text: string, category: string) => {
    setTasks([
      {
        id: "task-" + Date.now().toString().slice(-4),
        text,
        completed: false,
        dueDate: "2026-07-16",
        category
      },
      ...tasks
    ]);
  };

  // Add Media item
  const handleAddMedia = (item: MediaItem) => {
    setMediaItems([item, ...mediaItems]);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC]">
      {/* LEFT SIDEBAR */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        selectedCampaignFilter={selectedCampaignFilter}
        setSelectedCampaignFilter={setSelectedCampaignFilter}
      />

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* TOP HEADER */}
        <Header
          hospitals={HOSPITALS}
          selectedHospital={selectedHospital}
          setSelectedHospital={setSelectedHospital}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenNotifications={() => setNotificationsOpen(!notificationsOpen)}
          notificationCount={notifications.length}
        />

        {/* NOTIFICATIONS FLOAT DROPDOWN */}
        {notificationsOpen && (
          <div id="notifications-dropdown" className="absolute right-12 top-16 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-4 pb-2 border-b border-slate-100 flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent Activity Logs</span>
              <button onClick={() => setNotifications([])} className="text-[10px] font-semibold text-blue-600 hover:text-blue-700">Clear</button>
            </div>
            <div className="max-h-60 overflow-y-auto no-scrollbar pt-2 px-4 space-y-2.5">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div key={n.id} className="flex flex-col gap-0.5 border-b border-slate-50 pb-2">
                    <span className="text-xs font-semibold text-slate-700 leading-snug">{n.text}</span>
                    <span className="text-[9px] text-slate-400 font-mono mt-0.5">{n.time}</span>
                  </div>
                ))
              ) : (
                <p className="text-center py-6 text-slate-400 text-xs font-normal">No recent alerts logged.</p>
              )}
            </div>
          </div>
        )}

        {/* CENTRAL CORE VIEW GRID */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
          {/* SEARCH BAR RESULTS BANNER OVERRIDE */}
          {searchQuery && (
            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-center justify-between text-xs font-semibold text-blue-800 animate-in fade-in duration-100">
              <span>Displaying filtered search results matching: "{searchQuery}"</span>
              <button onClick={() => setSearchQuery("")} className="text-blue-500 font-bold hover:text-blue-700 text-xs">Clear Search</button>
            </div>
          )}

          {/* VIEW CONTROLLER SCOPE WRAPPERS */}
          {activeView === "dashboard" && (
            <div className="space-y-8">
              {/* TOP KPI CARDS */}
              <KPICards data={derivedMetrics} />

              {/* FIRST ROW: Large Line Chart + Lead Sources Pie */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-card p-6 rounded-[24px] bg-white">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <h3 className="text-xs font-bold text-slate-800">Monthly Marketing Spend Audit</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">Jan - Jul 2026 campaign spends & trajectory</p>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 px-2 py-0.5 bg-blue-50 border border-blue-100 rounded-md">
                      Interactive Spline
                    </span>
                  </div>
                  <MonthlySpendChart data={activeBaseData.chartMonthlySpend} />
                </div>

                <div className="glass-card p-6 rounded-[24px] bg-white flex flex-col justify-between">
                  <div className="border-b border-slate-100 pb-4 mb-4">
                    <h3 className="text-xs font-bold text-slate-800">Lead Sources Distribution</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">High-intent clinical patient triggers</p>
                  </div>
                  <DonutChart
                    title="Lead Sources"
                    data={activeBaseData.leadSources}
                    centerLabel="Total Leads"
                    centerValue={derivedMetrics.leads}
                  />
                </div>
              </div>

              {/* SECOND ROW: Campaign Performance Table + Activity Timeline */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-card p-6 rounded-[24px] bg-white">
                  <div className="border-b border-slate-100 pb-4 mb-4">
                    <h3 className="text-xs font-bold text-slate-800">Active Campaign Performance Matrix</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Monitored ROI indices & patient conversions</p>
                  </div>
                  <PerformanceTable
                    campaigns={activeCampaignsList}
                    onAddCampaignClick={() => setIsAddCampaignOpen(true)}
                    selectedCampaignFilter={selectedCampaignFilter}
                  />
                </div>

                <div className="glass-card p-6 rounded-[24px] bg-white flex flex-col justify-between">
                  <div className="border-b border-slate-100 pb-4 mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-slate-800">Recent Content runs</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">Completed & active timeline</p>
                    </div>
                    <button
                      onClick={() => setIsAddActivityOpen(true)}
                      className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 cursor-pointer"
                    >
                      + Schedule
                    </button>
                  </div>
                  <div className="max-h-[360px] overflow-y-auto no-scrollbar">
                    <Timeline activities={activities.slice(0, 5)} />
                  </div>
                </div>
              </div>

              {/* THIRD ROW: Expense Breakdown Donut + Monthly Comparison Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-[24px] bg-white flex flex-col justify-between">
                  <div className="border-b border-slate-100 pb-4 mb-4">
                    <h3 className="text-xs font-bold text-slate-800">Expense Allocation Breakdown</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Combined media & offline costs</p>
                  </div>
                  <DonutChart
                    title="Expense Breakdown"
                    data={activeBaseData.expenseBreakdown.map((e) => ({
                      name: e.category,
                      value: e.budget,
                      color: e.color
                    }))}
                    centerLabel="Total Budget"
                    centerValue={derivedMetrics.spend}
                  />
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-slate-800">June vs July Clinical Comparison</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">Bi-monthly marketing efficiency ratings</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                      Overall Positive Trend
                    </span>
                  </div>
                  <Comparison comparisons={activeBaseData.comparisons} />
                </div>
              </div>

              {/* FOURTH ROW: Calendar + Media Gallery Mini Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-card p-6 rounded-[24px] bg-white">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <h3 className="text-xs font-bold text-slate-800">Marketing Calendar</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">Active content releases & campaigns</p>
                    </div>
                    <button
                      onClick={() => setActiveView("calendar")}
                      className="text-[10px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      View Full Calendar →
                    </button>
                  </div>
                  <Calendar events={calendarEvents} onAddEventClick={() => setIsAddActivityOpen(true)} />
                </div>

                <div className="glass-card p-6 rounded-[24px] bg-white flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <h3 className="text-xs font-bold text-slate-800">Creative Media Gallery</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">Hospital creative assets & ads</p>
                    </div>
                    <button
                      onClick={() => setActiveView("gallery")}
                      className="text-[10px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      View All →
                    </button>
                  </div>
                  {/* Dynamic media assets grid */}
                  <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto max-h-[300px] no-scrollbar">
                    {mediaItems.slice(0, 4).map((m) => (
                      <div
                        key={m.id}
                        onClick={() => setActiveView("gallery")}
                        className="group relative rounded-xl overflow-hidden aspect-video bg-slate-900 border border-slate-100 cursor-pointer"
                      >
                        <img src={m.thumbnail} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-slate-950/45 flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[9px] font-bold text-white truncate">{m.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* FIFTH ROW: AI INSIGHTS CARD */}
              <AIInsights
                hospitalName={selectedHospital.name}
                month={selectedMonth}
                metrics={{
                  spend: derivedMetrics.spend,
                  leads: totalCampaignLeads,
                  appointments: totalCampaignAppointments,
                  patients: totalCampaignPatients,
                  revenue: derivedMetrics.revenue,
                  roi: derivedMetrics.roi
                }}
                campaigns={activeCampaignsList}
                activities={activities}
              />
            </div>
          )}

          {/* DEDICATED FULL VIEW SECTIONS */}
          {activeView === "activities" && (
            <MarketingActivitiesModule 
              activities={activities} 
              setActivities={setActivities} 
              onAddActivity={handleAddActivity} 
            />
          )}

          {activeView === "calendar" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200/80">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Operational Marketing Calendar</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Staged doctor sumits, shoots, newspaper editions</p>
                </div>
              </div>
              <Calendar events={calendarEvents} onAddEventClick={() => setIsAddActivityOpen(true)} />
            </div>
          )}

          {activeView === "gallery" && (
            <div className="glass-card p-6 rounded-[24px] bg-white animate-in fade-in duration-200">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Creative Media Assets Archive</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Accreditation copies, TV recordings, scan briefs</p>
                </div>
                <button
                  id="media-add-top"
                  onClick={() => setIsUploadMediaOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5 stroke-[2.5]" /> Upload Media
                </button>
              </div>
              <MediaGallery mediaItems={mediaItems} onUploadMediaClick={() => setIsUploadMediaOpen(true)} />
            </div>
          )}

          {activeView === "reports" && (
            <div className="glass-card p-6 rounded-[24px] bg-white animate-in fade-in duration-200 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Executive Report Center</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Generate compliant financial audits and printables</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* PDF generation widget */}
                <div className="border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:border-blue-300 hover:shadow-sm transition-all duration-200">
                  <div className="space-y-3">
                    <div className="h-10 w-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-800">Clinic Board Executive PDF Summary</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                      Formats and opens a print-friendly document showing current campaigns, ROI statistics, and expenditures.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsExportOpen(true)}
                    className="mt-6 w-full py-2 bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-red-700 border border-slate-200 hover:border-red-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Generate PDF Brief
                  </button>
                </div>

                {/* CSV / Excel widget */}
                <div className="border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:border-blue-300 hover:shadow-sm transition-all duration-200">
                  <div className="space-y-3">
                    <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                      <FolderOpen className="h-5 w-5" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-800">Financial Spend Spreadsheet (CSV)</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                      Compiles and downloads a fully formatted Excel-compliant CSV sheet of all active campaigns and allocations.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsExportOpen(true)}
                    className="mt-6 w-full py-2 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Download Excel/CSV
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeView === "settings" && (
            <Settings selectedHospital={selectedHospital} setSelectedHospital={setSelectedHospital} />
          )}

          {/* BOTTOM QUICK ACTIONS SECTION */}
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xs font-bold text-slate-800">Quick Actions Workspace</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Initiate fast administrative workflows and logs</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <button
                id="quick-act-activity"
                onClick={() => setIsAddActivityOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5 text-slate-400 stroke-[2.5]" />
                <span>+ Marketing Activity</span>
              </button>
              <button
                id="quick-act-expense"
                onClick={() => setIsAddExpenseOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5 text-slate-400 stroke-[2.5]" />
                <span>+ Expense</span>
              </button>
              <button
                id="quick-act-media"
                onClick={() => setIsUploadMediaOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                <Upload className="h-3.5 w-3.5 text-slate-400 stroke-[2.5]" />
                <span>+ Upload Media</span>
              </button>
              <button
                id="quick-act-task"
                onClick={() => setIsAddTaskOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5 text-slate-400 stroke-[2.5]" />
                <span>+ Task Checklist</span>
              </button>
              <button
                id="quick-act-export"
                onClick={() => setIsExportOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold shadow-md shadow-blue-500/10 transition-colors cursor-pointer"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Export Audit</span>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* RIGHT SIDE PANEL */}
      <div className="w-80 border-l border-slate-200 bg-white h-full p-6 overflow-y-auto no-scrollbar flex-shrink-0 hidden xl:block">
        <RightPanel
          tasks={tasks}
          setTasks={setTasks}
          upcoming={UPCOMING_SEED}
          alerts={alerts}
          setAlerts={setAlerts}
          onAddTaskClick={() => setIsAddTaskOpen(true)}
          onAddActivityClick={() => setIsAddActivityOpen(true)}
          onAddExpenseClick={() => setIsAddExpenseOpen(true)}
          onUploadMediaClick={() => setIsUploadMediaOpen(true)}
          onExportClick={() => setIsExportOpen(true)}
        />
      </div>

      {/* ADMIN DIALOG MODALS INJECTIONS */}
      <AddActivityModal
        isOpen={isAddActivityOpen}
        onClose={() => setIsAddActivityOpen(false)}
        onAdd={handleAddActivity}
      />
      <AddExpenseModal
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        onAdd={handleAddExpense}
      />
      <UploadMediaModal
        isOpen={isUploadMediaOpen}
        onClose={() => setIsUploadMediaOpen(false)}
        onAdd={handleAddMedia}
      />
      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAdd={handleAddTask}
      />
      <AddCampaignModal
        isOpen={isAddCampaignOpen}
        onClose={() => setIsAddCampaignOpen(false)}
        onAdd={handleAddCampaign}
      />
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        hospital={selectedHospital.name}
        month={selectedMonth}
        campaigns={activeCampaignsList}
      />
    </div>
  );
}
