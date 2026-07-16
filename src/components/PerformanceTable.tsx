import { useState } from "react";
import { Campaign } from "../types";
import {
  TrendingUp,
  Search,
  ArrowUpDown,
  SlidersHorizontal,
  ChevronRight,
  Plus,
  HelpCircle,
  TrendingDown
} from "lucide-react";

interface PerformanceTableProps {
  campaigns: Campaign[];
  onAddCampaignClick: () => void;
  selectedCampaignFilter: string | null;
}

export default function PerformanceTable({
  campaigns,
  onAddCampaignClick,
  selectedCampaignFilter
}: PerformanceTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof Campaign>("leads");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Handle Sort Toggle
  const handleSort = (field: keyof Campaign) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Status Badge styling Map
  const statusBadgeStyles = {
    Excellent: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Good: "bg-blue-50 text-blue-700 border-blue-100",
    Average: "bg-amber-50 text-amber-700 border-amber-100",
    Poor: "bg-rose-50 text-rose-700 border-rose-100",
  };

  // Filters & Search logic
  const filteredCampaigns = campaigns
    .filter((campaign) => {
      // 1. Text Search
      const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
      // 2. Status Filter
      const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
      // 3. Left Sidebar channel filter
      let matchesSidebar = true;
      if (selectedCampaignFilter) {
        const query = selectedCampaignFilter.toLowerCase();
        if (query === "meta") {
          matchesSidebar = campaign.name.toLowerCase().includes("meta") || campaign.name.toLowerCase().includes("instagram") || campaign.name.toLowerCase().includes("facebook");
        } else if (query === "google") {
          matchesSidebar = campaign.name.toLowerCase().includes("google") || campaign.name.toLowerCase().includes("search") || campaign.name.toLowerCase().includes("gads");
        } else if (query === "seo") {
          matchesSidebar = campaign.name.toLowerCase().includes("seo") || campaign.name.toLowerCase().includes("organic") || campaign.name.toLowerCase().includes("blog");
        } else {
          matchesSidebar = campaign.name.toLowerCase().includes(query);
        }
      }
      return matchesSearch && matchesStatus && matchesSidebar;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string" || typeof bValue === "string") {
        return sortDirection === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      }

      return sortDirection === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

  const totalBudget = filteredCampaigns.reduce((acc, c) => acc + c.budget, 0);
  const totalLeads = filteredCampaigns.reduce((acc, c) => acc + c.leads, 0);
  const totalAppointments = filteredCampaigns.reduce((acc, c) => acc + c.appointments, 0);
  const totalPatients = filteredCampaigns.reduce((acc, c) => acc + c.patients, 0);
  const avgROI =
    filteredCampaigns.length > 0
      ? filteredCampaigns.reduce((acc, c) => acc + c.roi, 0) / filteredCampaigns.length
      : 0;

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
        <div className="flex flex-1 items-center gap-2 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              id="campaign-table-search"
              type="text"
              placeholder="Filter campaigns by keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            />
          </div>

          <select
            id="campaign-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-semibold text-slate-600 focus:outline-none"
          >
            <option value="all">All ROI Status</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        <button
          id="add-campaign-quick-btn"
          onClick={onAddCampaignClick}
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-blue-500/10 cursor-pointer transition-colors"
        >
          <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
          <span>New Campaign</span>
        </button>
      </div>

      {/* Responsive Table Container */}
      <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200/80 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider select-none">
                <th className="py-3.5 px-5">Campaign</th>
                <th className="py-3.5 px-4 cursor-pointer hover:bg-slate-100/50" onClick={() => handleSort("budget")}>
                  <div className="flex items-center gap-1.5">
                    Budget
                    <ArrowUpDown className="h-3 w-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:bg-slate-100/50" onClick={() => handleSort("leads")}>
                  <div className="flex items-center gap-1.5">
                    Leads
                    <ArrowUpDown className="h-3 w-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:bg-slate-100/50" onClick={() => handleSort("appointments")}>
                  <div className="flex items-center gap-1.5">
                    Appointments
                    <ArrowUpDown className="h-3 w-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:bg-slate-100/50" onClick={() => handleSort("patients")}>
                  <div className="flex items-center gap-1.5">
                    Patients
                    <ArrowUpDown className="h-3 w-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer hover:bg-slate-100/50" onClick={() => handleSort("roi")}>
                  <div className="flex items-center gap-1.5">
                    ROI Factor
                    <ArrowUpDown className="h-3 w-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3.5 px-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {filteredCampaigns.length > 0 ? (
                filteredCampaigns.map((camp) => (
                  <tr
                    key={camp.id}
                    className="hover:bg-slate-50/50 transition-colors duration-100"
                  >
                    <td className="py-3.5 px-5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">{camp.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal mt-0.5">ID: {camp.id.toUpperCase()}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold">₹{camp.budget.toLocaleString()}</td>
                    <td className="py-3.5 px-4 font-mono">{camp.leads}</td>
                    <td className="py-3.5 px-4 font-mono">{camp.appointments}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-900 font-semibold">{camp.patients}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 font-mono font-bold text-slate-900">
                        <span>{camp.roi.toFixed(1)}x</span>
                        <span className="text-[9px] text-slate-400 font-medium">ROI</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusBadgeStyles[camp.status]}`}>
                        {camp.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-normal">
                    No matching campaigns found. Select another filter or add a campaign.
                  </td>
                </tr>
              )}
            </tbody>
            {/* Table Summary Footer */}
            {filteredCampaigns.length > 0 && (
              <tfoot className="bg-slate-50/50 border-t border-slate-200 text-xs font-bold text-slate-800">
                <tr>
                  <td className="py-3.5 px-5 text-[11px]">Aggregated Total</td>
                  <td className="py-3.5 px-4 font-mono text-blue-600">₹{totalBudget.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono">{totalLeads}</td>
                  <td className="py-3.5 px-4 font-mono">{totalAppointments}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-900">{totalPatients}</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-600">{avgROI.toFixed(1)}x avg</td>
                  <td className="py-3.5 px-5">
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md border border-slate-200">
                      {filteredCampaigns.length} Campaigns
                    </span>
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
