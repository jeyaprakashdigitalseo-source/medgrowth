import {
  Search,
  Bell,
  ChevronDown,
  CalendarDays,
  Building2,
  Sparkles,
  Info
} from "lucide-react";
import { useState } from "react";
import { Hospital } from "../types";

interface HeaderProps {
  hospitals: Hospital[];
  selectedHospital: Hospital;
  setSelectedHospital: (hospital: Hospital) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenNotifications: () => void;
  notificationCount: number;
}

export default function Header({
  hospitals,
  selectedHospital,
  setSelectedHospital,
  selectedMonth,
  setSelectedMonth,
  searchQuery,
  setSearchQuery,
  onOpenNotifications,
  notificationCount
}: HeaderProps) {
  const [showHospitalDropdown, setShowHospitalDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  const months = ["July 2026", "June 2026"];

  return (
    <header id="top-header" className="h-16 border-b border-slate-200 bg-white/95 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40 select-none">
      {/* Welcome Message & Hospital Selector */}
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-sm font-semibold text-slate-800 tracking-tight flex items-center gap-1.5">
            Good Morning, Marketing Manager <span className="animate-bounce origin-bottom inline-block">👋</span>
          </h1>
          <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
            Agencies executive reporting panel
          </p>
        </div>

        {/* Divider */}
        <div className="h-6 w-[1px] bg-slate-200 hidden md:block" />

        {/* Dynamic Hospital Switcher */}
        <div className="relative hidden md:block">
          <button
            id="hospital-selector-btn"
            onClick={() => {
              setShowHospitalDropdown(!showHospitalDropdown);
              setShowMonthDropdown(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all text-xs font-medium text-slate-700"
          >
            <Building2 className="h-3.5 w-3.5 text-blue-500" />
            <span>{selectedHospital.name}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-1" />
          </button>

          {showHospitalDropdown && (
            <div className="absolute left-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-200/50 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1.5 mb-1.5">
                Switch Client Hospital
              </div>
              {hospitals.map((hospital) => (
                <button
                  key={hospital.id}
                  onClick={() => {
                    setSelectedHospital(hospital);
                    setShowHospitalDropdown(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex flex-col gap-0.5 hover:bg-slate-50 transition-colors ${
                    selectedHospital.id === hospital.id ? "bg-blue-50/50 text-blue-700 font-semibold" : "text-slate-600"
                  }`}
                >
                  <span>{hospital.name}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{hospital.specialty}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Month Selector */}
        <div className="relative">
          <button
            id="month-selector-btn"
            onClick={() => {
              setShowMonthDropdown(!showMonthDropdown);
              setShowHospitalDropdown(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all text-xs font-medium text-slate-700"
          >
            <CalendarDays className="h-3.5 w-3.5 text-blue-500" />
            <span>{selectedMonth}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-1" />
          </button>

          {showMonthDropdown && (
            <div className="absolute left-0 mt-1.5 w-40 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-200/50 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => {
                    setSelectedMonth(month);
                    setShowMonthDropdown(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 transition-colors ${
                    selectedMonth === month ? "bg-blue-50/50 text-blue-700 font-semibold" : "text-slate-600"
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search, Notifications & Profile */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative max-w-xs w-64 hidden lg:block">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            id="search-input"
            type="text"
            placeholder="Search campaigns, activities, tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-slate-50/70 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all font-medium"
          />
        </div>

        {/* Notifications Icon with active badge */}
        <button
          id="notifications-toggle"
          onClick={onOpenNotifications}
          className="relative h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer"
        >
          <Bell className="h-4.5 w-4.5 stroke-[2]" />
          {notificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
          )}
        </button>

        {/* Profile Info */}
        <div className="flex items-center gap-2.5 border-l border-slate-200 pl-4">
          <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100"
              alt="Manager Avatar"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-semibold text-slate-800 leading-none">
              Jeyaprakash
            </p>
            <p className="text-[9px] font-medium text-slate-400 mt-1">
              Senior strategist
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
