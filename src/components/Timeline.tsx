import { MarketingActivity } from "../types";
import {
  Calendar,
  CheckCircle,
  Play,
  Tv,
  Newspaper,
  Instagram,
  Youtube,
  Camera,
  Layers,
  Sparkles,
  Search,
  Globe,
  DollarSign,
  Briefcase,
  Users
} from "lucide-react";

interface TimelineProps {
  activities: MarketingActivity[];
}

// Custom visual thumbnail representation for premium appeal
function ActivityThumbnail({ type, title }: { type: string; title: string }) {
  if (type === "Newspaper Editorial" || type === "Newspapers") {
    return (
      <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 flex flex-col p-2 overflow-hidden select-none relative shadow-sm">
        <div className="flex justify-between items-center border-b border-slate-200 pb-1 mb-1">
          <span className="text-[6px] font-extrabold tracking-tight text-slate-800 uppercase">THE CHRONICLE</span>
          <span className="text-[4px] text-slate-400">JULY</span>
        </div>
        <div className="h-1.5 w-10 bg-slate-800 rounded-sm mb-1" />
        <div className="space-y-0.5">
          <div className="h-0.5 w-full bg-slate-400 rounded-sm" />
          <div className="h-0.5 w-full bg-slate-400 rounded-sm" />
          <div className="h-0.5 w-4 bg-slate-400 rounded-sm" />
        </div>
        <div className="absolute right-1 bottom-1 h-4 w-4 bg-blue-50 border border-blue-200 rounded flex items-center justify-center">
          <Newspaper className="h-2 w-2 text-blue-600" />
        </div>
      </div>
    );
  }

  if (type === "TV Interview") {
    return (
      <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 flex flex-col p-1.5 overflow-hidden select-none relative shadow-sm items-center justify-center">
        {/* Mock camera view */}
        <div className="w-full h-full rounded border border-slate-800 bg-gradient-to-tr from-slate-950 via-slate-800 to-indigo-950 flex flex-col justify-between p-1">
          <div className="flex items-center justify-between text-[4px] text-red-500 font-extrabold">
            <span>● REC</span>
            <span>1080P</span>
          </div>
          <div className="h-4 w-4 rounded-full border border-slate-600 self-center bg-slate-700/40 flex items-center justify-center relative">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          </div>
          <div className="flex items-center justify-between">
            <div className="bg-slate-900/80 px-1 py-0.2 rounded text-[4px] text-slate-100 font-bold max-w-[28px] truncate">
              Dr. Epione
            </div>
            <div className="h-2 w-3 bg-red-600 rounded flex items-center justify-center">
              <Tv className="h-1 w-1 text-white" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "Instagram Reel") {
    return (
      <div className="w-16 h-16 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center overflow-hidden select-none relative shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 via-slate-900 to-indigo-500/20" />
        {/* Phone UI Layout */}
        <div className="w-full h-full flex flex-col justify-between p-1.5 z-10">
          <div className="h-1 w-8 bg-white/20 rounded-full self-center" />
          <div className="flex flex-col items-start gap-0.5">
            <div className="h-1 w-8 bg-white/70 rounded-sm" />
            <div className="h-0.5 w-10 bg-white/40 rounded-sm" />
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
            <Play className="h-1.5 w-1.5 text-white fill-white" />
          </div>
        </div>
        <Instagram className="absolute right-1 top-1 h-2.5 w-2.5 text-pink-500" />
      </div>
    );
  }

  if (type === "YouTube Video" || type === "Video Shoot") {
    return (
      <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden select-none relative shadow-sm">
        <div className="absolute inset-0 bg-slate-950 flex flex-col justify-between p-1">
          <div className="h-1.5 w-full bg-slate-800 rounded-sm flex items-center px-1">
            <div className="h-0.5 w-6 bg-red-500 rounded" />
          </div>
          <div className="h-5 w-5 rounded-full bg-red-600 flex items-center justify-center self-center shadow">
            <Play className="h-1.5 w-1.5 text-white fill-white ml-0.5" />
          </div>
          <div className="h-1 w-full bg-red-500 rounded" />
        </div>
        <Youtube className="absolute right-1 top-1 h-3 w-3 text-red-500" />
      </div>
    );
  }

  if (type === "Photoshoot" || type === "Photo Shoots") {
    return (
      <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden select-none relative shadow-sm">
        <div className="absolute inset-1 rounded-lg border border-dashed border-slate-300 bg-slate-100 flex flex-col items-center justify-center gap-1">
          <Camera className="h-4 w-4 text-slate-400" />
          <div className="h-1 w-6 bg-slate-300 rounded" />
        </div>
      </div>
    );
  }

  if (type === "Meta Campaign") {
    return (
      <div className="w-16 h-16 rounded-xl bg-[#1877F2]/5 border border-[#1877F2]/20 flex flex-col p-1.5 justify-between overflow-hidden relative shadow-sm">
        <div className="flex items-center gap-1 border-b border-blue-100/50 pb-0.5">
          <div className="h-1.5 w-1.5 rounded-full bg-[#1877F2]" />
          <span className="text-[5px] font-extrabold text-[#1877F2]">META ADS</span>
        </div>
        <div className="space-y-0.5">
          <div className="h-1 w-10 bg-slate-800 rounded" />
          <div className="h-1 w-8 bg-[#1877F2] rounded" />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[4px] text-slate-400">ROI 5.8x</span>
          <span className="text-[4px] font-bold text-emerald-600">+12%</span>
        </div>
      </div>
    );
  }

  if (type === "Google Campaign") {
    return (
      <div className="w-16 h-16 rounded-xl bg-[#4285F4]/5 border border-[#4285F4]/20 flex flex-col p-1.5 justify-between overflow-hidden relative shadow-sm">
        <div className="flex items-center gap-1 border-b border-blue-100/50 pb-0.5">
          <div className="h-1.5 w-1.5 rounded-full bg-[#ea4335]" />
          <span className="text-[5px] font-extrabold text-slate-800">GOOGLE SEARCH</span>
        </div>
        <div className="space-y-0.5">
          <div className="h-1 w-8 bg-slate-800 rounded" />
          <div className="h-1 w-11 bg-[#4285F4] rounded" />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[4px] text-slate-400">CTR 8.4%</span>
          <span className="text-[4px] font-bold text-emerald-600">Excellent</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-16 h-16 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shadow-sm select-none">
      <Sparkles className="h-5 w-5 text-blue-600" />
    </div>
  );
}

export default function Timeline({ activities }: { activities: MarketingActivity[] }) {
  const statusColorMap = {
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
    "In Progress": "bg-blue-50 text-blue-700 border-blue-100",
    Scheduled: "bg-stone-50 text-stone-600 border-stone-200",
  };

  return (
    <div className="space-y-6">
      {/* List container with relative line */}
      <div className="relative pl-6 border-l border-slate-200 space-y-6 ml-2.5">
        {activities.map((act, index) => {
          const isCompleted = act.status === "Completed";
          return (
            <div key={act.id} className="relative group">
              {/* Timeline dot marker */}
              <div
                className={`absolute -left-[31px] top-1 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-150 bg-white ${
                  isCompleted
                    ? "border-emerald-500 text-emerald-500 shadow-sm shadow-emerald-100"
                    : act.status === "In Progress"
                    ? "border-blue-500 text-blue-500 shadow-sm shadow-blue-100 animate-pulse"
                    : "border-slate-300 text-slate-400"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="h-3 w-3 fill-emerald-500 text-white" />
                ) : (
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${
                      act.status === "In Progress" ? "bg-blue-600" : "bg-slate-400"
                    }`}
                  />
                )}
              </div>

              {/* Activity Card */}
              <div className="glass-card p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200 hover:border-slate-300 hover:shadow-sm">
                <div className="flex items-start gap-4">
                  {/* Styled Thumbnail Preview */}
                  <ActivityThumbnail type={act.type} title={act.title} />

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {act.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">•</span>
                      <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        {act.date}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-1 max-w-lg leading-relaxed">
                      {act.description || `Executed campaign channel focusing on specific diagnostic therapies and clinical support.`}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] font-bold text-slate-700 font-mono px-2 py-0.5 bg-slate-100 rounded">
                        Budget: ₹{act.budget.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        ID: {act.id.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="sm:self-center flex flex-col items-end gap-1.5">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                      statusColorMap[act.status]
                    }`}
                  >
                    {act.status}
                  </span>
                  <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">
                    {act.type}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
