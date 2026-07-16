import { useState } from "react";
import { Task, UpcomingActivity, Alert } from "../types";
import {
  CheckSquare,
  Square,
  Clock,
  AlertTriangle,
  AlertOctagon,
  FileText,
  DollarSign,
  X,
  Plus,
  Play,
  Heart,
  Calendar
} from "lucide-react";

interface RightPanelProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  upcoming: UpcomingActivity[];
  alerts: Alert[];
  setAlerts: (alerts: Alert[]) => void;
  onAddTaskClick: () => void;
  onAddActivityClick?: () => void;
  onAddExpenseClick?: () => void;
  onUploadMediaClick?: () => void;
  onExportClick?: () => void;
}

export default function RightPanel({
  tasks,
  setTasks,
  upcoming,
  alerts,
  setAlerts,
  onAddTaskClick,
  onAddActivityClick,
  onAddExpenseClick,
  onUploadMediaClick,
  onExportClick
}: RightPanelProps) {
  const [activeTab, setActiveTab] = useState<"tasks" | "alerts" | "upcoming">("tasks");

  // Toggle checklist complete
  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Dismiss alert
  const handleDismissAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const pendingInvoice = {
    id: "INV-2026-042",
    client: "Epione Pain Management",
    amount: "₹1,20,000",
    dueDate: "July 20, 2026",
    status: "Pending Agency Sign-off"
  };

  const pendingReports = [
    { id: "REP-99", title: "June 2026 Monthly Print ROI", status: "Awaiting Client Sign-off" },
    { id: "REP-101", title: "H1 2026 Healthcare Funnel Audit", status: "Drafting" }
  ];

  return (
    <div id="right-panel" className="flex flex-col gap-6 h-full">
      {/* AI Insights Summary (Glassmorphic) */}
      <div className="bg-white/60 backdrop-blur-md rounded-[24px] p-5 shadow-sm border border-slate-100 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-800">AI Insights Summary</h4>
          <div className="w-4 h-4 bg-blue-100 rounded text-blue-600 flex items-center justify-center text-[8px] font-bold">AI</div>
        </div>
        <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100/50 text-[11px] leading-relaxed text-slate-600">
          <span className="font-bold text-blue-700">Growth Spark:</span> Knee Replacement campaign is performing <span className="text-blue-700 font-semibold">34% better</span> than last month. Suggested shift of 15% budget from Migraine to Knee.
        </div>
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] text-slate-400">Health Score</span>
          <span className="text-[10px] font-bold text-blue-600">92/100</span>
        </div>
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 w-[92%]"></div>
        </div>
      </div>

      {/* Tabs Section Card */}
      <div className="flex-1 bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 flex flex-col min-h-0">
        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 pb-2.5 gap-4">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`pb-1 text-xs font-bold relative cursor-pointer ${
              activeTab === "tasks" ? "text-blue-600 font-extrabold" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Today's Tasks
            {activeTab === "tasks" && (
              <div className="absolute bottom-[-11px] left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-1 text-xs font-bold relative cursor-pointer ${
              activeTab === "upcoming" ? "text-blue-600 font-extrabold" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Upcoming Runs
            {activeTab === "upcoming" && (
              <div className="absolute bottom-[-11px] left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("alerts")}
            className={`pb-1 text-xs font-bold relative cursor-pointer flex items-center gap-1.5 ${
              activeTab === "alerts" ? "text-rose-600 font-extrabold" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Alerts
            {alerts.length > 0 && (
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            )}
            {activeTab === "alerts" && (
              <div className="absolute bottom-[-11px] left-0 right-0 h-0.5 bg-rose-600 rounded-full" />
            )}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto no-scrollbar pt-4 min-h-0">
          {/* Checklist Content */}
          {activeTab === "tasks" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Action Checklist</span>
                <button
                  onClick={onAddTaskClick}
                  className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="h-3 w-3 stroke-[2.5]" /> Add Task
                </button>
              </div>

              <div className="space-y-2 max-h-[180px] overflow-y-auto no-scrollbar pr-1">
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleToggleTask(task.id)}
                      className={`p-2.5 rounded-xl border flex items-start gap-3 transition-all duration-150 cursor-pointer ${
                        task.completed
                          ? "bg-slate-50/70 border-slate-100 text-slate-400"
                          : "bg-white border-slate-100 hover:border-slate-200 text-slate-700 shadow-sm"
                      }`}
                    >
                      <span className="mt-0.5 flex-shrink-0">
                        {task.completed ? (
                          <CheckSquare className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Square className="h-4 w-4 text-slate-300" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={`text-xs font-semibold ${task.completed ? "line-through text-slate-400" : "text-slate-800"}`}>
                          {task.text}
                        </p>
                        <span className="text-[9px] text-slate-400 font-medium mt-0.5 inline-block uppercase tracking-wide">
                          {task.category}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-6 text-slate-400 text-xs font-normal">All tasks are checked off. Well done!</p>
                )}
              </div>
            </div>
          )}

          {/* Upcoming Activities Content */}
          {activeTab === "upcoming" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Scheduled Content Operations</span>
              <div className="space-y-3 max-h-[180px] overflow-y-auto no-scrollbar pr-1">
                {upcoming.map((up) => (
                  <div key={up.id} className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-slate-250 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{up.type}</span>
                      <span className="text-[9px] font-bold text-indigo-600 flex items-center gap-1 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-100">
                        <Clock className="h-2.5 w-2.5" />
                        {up.time}
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-800 mt-1">{up.title}</h5>
                    <span className="text-[9px] text-slate-500 font-mono mt-0.5 block">Scheduled Date: {up.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alerts Content */}
          {activeTab === "alerts" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Pixel & Budget Alerts</span>
              <div className="space-y-2.5 max-h-[180px] overflow-y-auto no-scrollbar pr-1">
                {alerts.length > 0 ? (
                  alerts.map((al) => {
                    const isDanger = al.type === "danger";
                    return (
                      <div
                        key={al.id}
                        className={`p-3 rounded-xl border flex items-start justify-between gap-3 relative ${
                          isDanger
                            ? "bg-rose-50/50 border-rose-100 text-rose-800"
                            : "bg-amber-50/50 border-amber-100 text-amber-800"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {isDanger ? (
                            <AlertOctagon className="h-4 w-4 text-rose-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          )}
                          <div>
                            <p className="text-xs font-bold leading-tight">{al.text}</p>
                            <span className="text-[9px] font-medium opacity-80 mt-1 block uppercase tracking-wider">
                              Source: {al.source}
                            </span>
                          </div>
                        </div>
                        <button
                          id={`dismiss-alert-${al.id}`}
                          onClick={() => handleDismissAlert(al.id)}
                          className="text-slate-400 hover:text-slate-600 font-bold text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center py-6 text-slate-400 text-xs font-normal">All tracking systems fully operational. No alerts active.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Administrative Operations Block */}
      <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 flex flex-col gap-3">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Admin Operations</span>
        <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-blue-600 flex items-center gap-1">
              <DollarSign className="h-3 w-3" /> Billing Invoice
            </span>
            <span className="text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-100 px-1.5 py-0.2 rounded">
              Pending
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div>
              <h5 className="font-bold text-slate-800">{pendingInvoice.client}</h5>
              <span className="text-[9px] text-slate-400 block font-mono">{pendingInvoice.id}</span>
            </div>
            <span className="font-bold text-slate-950">{pendingInvoice.amount}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions (Dark Theme block matching style HTML) */}
      <div className="bg-slate-900 rounded-[24px] p-5 text-white shadow-sm shrink-0">
        <h4 className="text-[10px] font-bold mb-4 opacity-70 uppercase tracking-widest">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={onAddActivityClick}
            className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all cursor-pointer flex flex-col items-center justify-center text-center duration-150"
          >
            <div className="w-4 h-4 bg-blue-500 rounded-sm mb-2"></div>
            <div className="text-[9px] font-bold">Add Activity</div>
          </div>
          <div
            onClick={onAddExpenseClick}
            className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all cursor-pointer flex flex-col items-center justify-center text-center duration-150"
          >
            <div className="w-4 h-4 bg-emerald-500 rounded-sm mb-2"></div>
            <div className="text-[9px] font-bold">Add Expense</div>
          </div>
          <div
            onClick={onUploadMediaClick}
            className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all cursor-pointer flex flex-col items-center justify-center text-center duration-150"
          >
            <div className="w-4 h-4 bg-amber-500 rounded-sm mb-2"></div>
            <div className="text-[9px] font-bold">Upload Media</div>
          </div>
          <div
            onClick={onExportClick}
            className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all cursor-pointer flex flex-col items-center justify-center text-center duration-150"
          >
            <div className="w-4 h-4 bg-purple-500 rounded-sm mb-2"></div>
            <div className="text-[9px] font-bold">Export PDF</div>
          </div>
        </div>
      </div>
    </div>
  );
}
