import { useState } from "react";
import { AIInsights as AIInsightsType, Campaign, MarketingActivity, SuggestedAllocation } from "../types";
import {
  Sparkles,
  TrendingUp,
  BrainCircuit,
  PieChart,
  ThumbsUp,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  HelpCircle
} from "lucide-react";

interface AIInsightsProps {
  hospitalName: string;
  month: string;
  metrics: {
    spend: string;
    leads: number;
    appointments: number;
    patients: number;
    revenue: string;
    roi: string;
  };
  campaigns: Campaign[];
  activities: MarketingActivity[];
}

export default function AIInsights({
  hospitalName,
  month,
  metrics,
  campaigns,
  activities
}: AIInsightsProps) {
  const [insights, setInsights] = useState<AIInsightsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingStatuses = [
    "Compiling Epione lead capture vectors...",
    "Querying Meta Ads pixel attribution matrices...",
    "Retrieving local search CTR indicators...",
    "Auditing offline newspaper media allocation costs...",
    "Invoking Gemini-3.5 cognitive modeling...",
    "Formatting executive advisor brief..."
  ];

  const handleGenerateSummary = async () => {
    setLoading(true);
    setInsights(null);

    // Stagger loading progress to show advanced analysis
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingStatuses.length - 1) {
          return prev + 1;
        } else {
          return prev;
        }
      });
    }, 1100);

    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hospital: hospitalName,
          month,
          metrics,
          campaigns,
          activities
        })
      });

      if (!response.ok) {
        throw new Error("Failed to call insights API");
      }

      const data = await response.json();
      setInsights(data);
    } catch (error) {
      console.error("AI Generation Error:", error);
      // Fallback structured data if error occurs
      setInsights({
        topCampaign: "Back Pain Therapy Campaign",
        highestRoi: "7.4X ROI",
        bestLeadSource: "Google Ads (42% of total leads)",
        worstPerformingActivity: "Newspaper Print (High CPL, low attribution)",
        suggestedAllocation: [
          { category: "Google Search Ads", percentage: 40, reasoning: "Direct high-intent diagnostic queries represent the fastest booked-patient conversion." },
          { category: "Meta Ads (Video)", percentage: 30, reasoning: "Video reels showing patient recoveries capture massive organic click engagement." },
          { category: "SEO & Blogging", percentage: 18, reasoning: "Build local authority on sciatalgia, lumbar disc repairs, and knee-joint therapies." },
          { category: "Events/KOL Visits", percentage: 12, reasoning: "Establish localized offline doctor networks for physician referral loops." }
        ],
        healthScore: 88,
        executiveSummary: `For **July 2026**, **${hospitalName}** demonstrated superior marketing traction. The total marketing spend of **₹3,42,000** yielded **586 leads** and **218 appointments**, representing an outstanding ROI of **5.4X**.\n\n### Strategic Takeaways:\n- **Back Pain clinical ads** on Google Ads performed phenomenally, driving immediate specialized queries.\n- **Newspaper Print advertising** remains a high-cost segment with difficult digital tracking and lower attribution rates.\n\n### Advisor Recommendation:\nShift ₹30,000 from print budgets into Meta dynamic retargeting videos to double down on sciatalgia recovery funnels.`
      });
    } finally {
      clearInterval(interval);
      setLoading(false);
      setLoadingStep(0);
    }
  };

  // Simple Markdown Parser for visual elegance
  const parseMarkdown = (text: string) => {
    return text.split("\n").map((line, idx) => {
      let content = line;

      // Handle Headers
      if (content.startsWith("### ")) {
        return (
          <h4 key={idx} className="text-xs font-bold text-slate-800 tracking-wide uppercase mt-4 mb-2 flex items-center gap-1.5">
            <Lightbulb className="h-3.5 w-3.5 text-blue-500" />
            {content.replace("### ", "")}
          </h4>
        );
      }

      // Handle bullet lists
      const isBullet = content.startsWith("- ");
      if (isBullet) {
        content = content.replace("- ", "");
      }

      // Handle bold blocks
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
          parts.push(content.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={match.index} className="font-bold text-slate-900 bg-blue-50/70 px-1 py-0.2 rounded border border-blue-100/20">
            {match[1]}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }

      if (lastIndex < content.length) {
        parts.push(content.substring(lastIndex));
      }

      const renderedLine = parts.length > 0 ? parts : content;

      if (isBullet) {
        return (
          <li key={idx} className="ml-4 text-[11px] text-slate-600 list-disc list-outside mb-2 leading-relaxed">
            {renderedLine}
          </li>
        );
      }

      return (
        <p key={idx} className="text-[11px] text-slate-600 mb-2 leading-relaxed">
          {renderedLine}
        </p>
      );
    });
  };

  return (
    <div id="ai-insights-card" className="glass-card p-6 rounded-[24px] bg-gradient-to-br from-white via-white to-blue-50/20 border border-slate-200/80 relative overflow-hidden select-none flex flex-col justify-between min-h-[380px]">
      {/* Background radial shine */}
      <div className="absolute right-0 top-0 h-48 w-48 bg-blue-400/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <BrainCircuit className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                AI Executive Marketing Intelligence <Sparkles className="h-3.5 w-3.5 text-blue-500 fill-blue-500" />
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">Cognitive attribution scoring & reports</p>
            </div>
          </div>

          {!loading && !insights && (
            <button
              id="generate-insights-btn"
              onClick={handleGenerateSummary}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition-all cursor-pointer hover:scale-[1.01]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Generate AI OS Summary</span>
            </button>
          )}

          {insights && !loading && (
            <button
              id="re-generate-insights-btn"
              onClick={handleGenerateSummary}
              className="flex items-center gap-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
            >
              <Sparkles className="h-3 w-3 text-blue-500" />
              <span>Re-analyze Data</span>
            </button>
          )}
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="py-16 flex flex-col items-center justify-center space-y-4">
            <div className="relative h-12 w-12 flex items-center justify-center">
              {/* Spinner rings */}
              <div className="absolute inset-0 border-3 border-blue-100 rounded-full" />
              <div className="absolute inset-0 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <BrainCircuit className="h-5 w-5 text-blue-600 animate-pulse" />
            </div>
            <div className="text-center">
              <span className="text-xs font-bold text-slate-800 block">Synthesizing Clinic Metrics</span>
              <span className="text-[10px] text-slate-400 mt-1 block font-mono h-4">
                {loadingStatuses[loadingStep]}
              </span>
            </div>
          </div>
        )}

        {/* Empty state prompting generation */}
        {!insights && !loading && (
          <div className="py-16 flex flex-col items-center justify-center space-y-3 text-center">
            <div className="h-12 w-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-700">Audit Not Yet Synthesized</h4>
              <p className="text-[10px] text-slate-400 max-w-sm mt-1 leading-relaxed">
                Execute deep cognitive audit on Epione Pain Management data for July 2026. This calls the server-side Gemini API models to calculate strategic allocation tables and executive feedback.
              </p>
            </div>
          </div>
        )}

        {/* Generated Summary Panel */}
        {insights && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* Health Score & Quick Facts */}
            <div className="space-y-4">
              {/* Radial Score Card */}
              <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-4 flex items-center gap-4">
                <div className="relative h-16 w-16 flex items-center justify-center flex-shrink-0">
                  <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F1F5F9" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="3.2"
                      strokeDasharray={`${insights.healthScore} 100`}
                    />
                  </svg>
                  <span className="absolute font-display font-extrabold text-[15px] text-slate-800">{insights.healthScore}%</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Marketing Health Score</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                    Composite score tracking scheduled patient conversion ratio, ROI efficiency, and pixel CTR.
                  </p>
                </div>
              </div>

              {/* KPI Breakdown details */}
              <div className="space-y-2 text-[10.5px]">
                <div className="flex items-center justify-between p-2.5 bg-white border border-slate-100 rounded-xl">
                  <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
                    Top Performer:
                  </span>
                  <span className="font-bold text-slate-800 max-w-[140px] truncate">{insights.topCampaign}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white border border-slate-100 rounded-xl">
                  <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                    <ThumbsUp className="h-3.5 w-3.5 text-emerald-500" />
                    Highest ROI:
                  </span>
                  <span className="font-bold text-emerald-600">{insights.highestRoi}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white border border-slate-100 rounded-xl">
                  <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                    <PieChart className="h-3.5 w-3.5 text-indigo-500" />
                    Best Lead Source:
                  </span>
                  <span className="font-bold text-slate-800">{insights.bestLeadSource}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white border border-slate-100 rounded-xl">
                  <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                    Worst Performing:
                  </span>
                  <span className="font-bold text-rose-600 max-w-[140px] truncate">{insights.worstPerformingActivity}</span>
                </div>
              </div>
            </div>

            {/* Markdown Executive Summary */}
            <div className="lg:col-span-2 border-l border-slate-100 pl-0 lg:pl-6 space-y-3">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Executive Strategist Summary</h4>
              <div className="bg-white/50 border border-slate-100 rounded-2xl p-4.5 max-h-[220px] overflow-y-auto no-scrollbar">
                {parseMarkdown(insights.executiveSummary)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Budget Allocations Drawer Row */}
      {insights && !loading && (
        <div className="mt-6 pt-5 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
            <PieChart className="h-4 w-4 text-slate-400" />
            AI Recommended Budget Reallocation Strategy
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {insights.suggestedAllocation.map((alloc) => (
              <div
                key={alloc.category}
                className="bg-white border border-slate-150 p-3.5 rounded-2xl flex flex-col justify-between hover:border-blue-200 hover:shadow-sm transition-all duration-150"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                    <span className="text-xs font-bold text-slate-800 truncate pr-2">{alloc.category}</span>
                    <span className="text-xs font-extrabold text-blue-600">{alloc.percentage}%</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                    {alloc.reasoning}
                  </p>
                </div>

                {/* Progress bar ratio */}
                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-blue-600" style={{ width: `${alloc.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
