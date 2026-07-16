import {
  LayoutDashboard,
  Megaphone,
  BarChart3,
  Calendar,
  Image,
  Settings,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Search,
  Globe,
  Tv,
  FileText,
  Camera,
  Layers,
  Facebook,
  SearchCode,
  Users,
  Video,
  Newspaper,
  Sparkles
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  selectedCampaignFilter: string | null;
  setSelectedCampaignFilter: (filter: string | null) => void;
}

export default function Sidebar({
  activeView,
  setActiveView,
  selectedCampaignFilter,
  setSelectedCampaignFilter
}: SidebarProps) {
  const [campaignsOpen, setCampaignsOpen] = useState(true);

  const mainNav = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "activities", label: "Marketing Activities", icon: Megaphone },
    { id: "calendar", label: "Marketing Calendar", icon: Calendar },
    { id: "gallery", label: "Media Library", icon: Image },
    { id: "reports", label: "Reports & Exports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const channels = [
    { id: "meta", label: "Meta Ads", icon: Facebook, color: "text-[#1877F2]" },
    { id: "google", label: "Google Ads", icon: Globe, color: "text-[#4285F4]" },
    { id: "seo", label: "SEO", icon: SearchCode, color: "text-emerald-600" },
    { id: "tv", label: "TV Interviews", icon: Tv, color: "text-indigo-600" },
    { id: "newspaper", label: "Newspapers", icon: Newspaper, color: "text-stone-600" },
    { id: "photoshoot", label: "Photo Shoots", icon: Camera, color: "text-amber-500" },
    { id: "videoshoot", label: "Video Shoots", icon: Video, color: "text-red-500" },
    { id: "events", label: "Events", icon: Layers, color: "text-violet-600" },
    { id: "influencer", label: "Influencers", icon: Users, color: "text-pink-500" },
  ];

  const handleChannelClick = (channelId: string) => {
    setActiveView("dashboard");
    if (selectedCampaignFilter === channelId) {
      // Toggle off
      setSelectedCampaignFilter(null);
    } else {
      setSelectedCampaignFilter(channelId);
    }
  };

  return (
    <div id="sidebar" className="w-60 bg-white border-r border-slate-200 h-full py-6 px-5 flex flex-col select-none flex-shrink-0">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm shadow-blue-500/20">
          <TrendingUp className="h-4.5 w-4.5 text-white stroke-[2.5]" />
        </div>
        <span className="font-bold text-lg tracking-tight text-slate-900">MedGrowth OS</span>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto no-scrollbar">
        {/* Main Section */}
        <div>
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-2 mb-2">
            Dashboard
          </div>
          <div className="space-y-1">
            {mainNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id && selectedCampaignFilter === null;
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setSelectedCampaignFilter(null);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 stroke-[2] ${
                      isActive ? "text-blue-600" : "text-slate-400"
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Marketing Channels Section */}
        <div>
          <button
            onClick={() => setCampaignsOpen(!campaignsOpen)}
            className="w-full px-2 mb-2 flex items-center justify-between text-[10px] font-semibold tracking-widest text-slate-400 uppercase hover:text-slate-600 transition-colors"
          >
            <span>Channels</span>
            {campaignsOpen ? (
              <ChevronDown className="h-3 w-3 stroke-[2.5]" />
            ) : (
              <ChevronRight className="h-3 w-3 stroke-[2.5]" />
            )}
          </button>

          {campaignsOpen && (
            <div className="space-y-0.5 max-h-[300px] overflow-y-auto no-scrollbar">
              {channels.map((channel) => {
                const Icon = channel.icon;
                const isSelected = selectedCampaignFilter === channel.id;
                return (
                  <button
                    id={`channel-item-${channel.id}`}
                    key={channel.id}
                    onClick={() => handleChannelClick(channel.id)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 group ${
                      isSelected
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 stroke-[2] ${channel.color}`} />
                      <span>{channel.label}</span>
                    </div>
                    {isSelected && (
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* User / Hospital Overview Footer Info */}
      <div className="pt-4 border-t border-slate-100 mt-auto">
        <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-700 text-xs shrink-0">
            EP
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold text-slate-800 truncate">
              Sarah Jenkins
            </h4>
            <p className="text-[10px] text-slate-400 truncate">
              Senior Manager
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
